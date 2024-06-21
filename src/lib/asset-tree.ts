import { error } from '@sveltejs/kit';
import { parse } from 'yaml'
import type { Item, SearchItem } from '$lib/ui/sidebar/types'
import { parseMetadata } from '$lib/metadata';
import { getLatestCommitSha, getFileContentFromBlob, getFilesFromCommit, type GithubTreePath } from './github';

const partition = <T>(array: T[], filter: (e: T, idx: number, arr: T[]) => boolean) => {
	const pass: T[] = [], fail: T[] = [];
	array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
	return [pass, fail];
}

export const loadAssetTree = async (dir: string, root: Item, files: Record<string, () => Promise<string>>) => {
	let items: SearchItem[] = []

	// special metadata for search and filtering
	const tags: Set<string> = new Set()
	const keywords: Set<string> = new Set()

	try {
		for (const file in files) {
			const path_name = file.replace(dir, '')
			const path = path_name.split('/')

			let cur_root = root

			const result = await files[file]()
			const markdownContent = result
			const metadata = parseMetadata(markdownContent)

			let item = ""
			if (path[path.length - 1] === "index.md") {
				item = path.filter((_, index) => index !== path.length - 1 && index !== 0).join('/')
			}
			else if (path[path.length - 1].includes(".md")) {
				item = [...path.filter((_, index) => index !== path.length - 1 && index !== 0), path[path.length - 1].replace(".md", '')].join('/')
			}
			if (item) items.push({
				path: item,
				tags: metadata.tags,
				keywords: metadata.keywords,
				date: metadata.date,
				watched: metadata.watched
			})

			if (metadata['tags'] && Array.isArray(metadata['tags']))
				metadata['tags'].forEach(tag => {
					tags.add(tag)
				});
			if (metadata['keywords'] && Array.isArray(metadata['keywords']))
				metadata['keywords'].forEach(keyword => {
					keywords.add(keyword)
				});

			for (const _path of path) {
				if (_path === "") continue;
				if (_path === "index.md") {
					cur_root.children?.unshift({ name: _path.replace(".md", ''), metadata })

					const github_owner = metadata['github_owner']
					const github_repo = metadata['github_repo']
					const github_page_format = metadata['github_page_format'] === 'true'

					if (typeof github_owner === 'string' && typeof github_repo === 'string') {
						const commit = await getLatestCommitSha(github_owner, github_repo)
						const markdown_files = await getFilesFromCommit(github_owner, github_repo, commit)

						const data = await loadAssetTreeFromGitHub(cur_root, markdown_files, github_owner, github_repo, github_page_format)
						const new_root = data.props.root
						cur_root = new_root
						cur_root.github_remote = {
							owner: github_owner,
							repo: github_repo,
							commit_sha: commit,
							page_format: github_page_format
						}
						items = [...items, ...data.props.items]
					}

					continue;
				}
				if (_path.includes(".md")) {
					cur_root.children?.push({ name: _path.replace(".md", ''), metadata })
					continue;
				}
				const found = cur_root.children?.find((i: Item) => i.name === _path)
				if (found) {
					cur_root = found
				} else {
					const new_root: Item = { name: _path, children: [], metadata }
					cur_root.children?.push(new_root)
					cur_root = new_root
				}
			}
		}
	} catch (e) {
		if (e instanceof Error)
			throw error(404, e.message)
	}

	if (root.children) {
		const index = root.children?.[0].name === 'index' ? root.children[0] : undefined
		if (index) root.children.shift()
		root.children.sort((a, b) => a.name.localeCompare(b.name))
		const [folders, files] = partition<Item>(root.children, e => e.children !== undefined)
		root.children = folders.concat(files)
		if (index) root.children = [index].concat(root.children)
	}

	return {
		props: {
			root,
			items,
			tags,
			keywords
		}
	};
}

const loadAssetTreeFromGitHub = async (root: Item, paths: GithubTreePath[], github_owner: string, github_repo: string, github_page_format: boolean) => {
	const items: SearchItem[] = []

	try {
		for (const pathInfo of paths) {
			if (!pathInfo.path) {
				throw new Error('Path to github tree item is undefined.')
			}

			if (!pathInfo.sha) {
				throw new Error('Commit sha for github tree item is undefined.')
			}

			if (pathInfo.path === 'files.yaml') {
				const content = await getFileContentFromBlob(github_owner, github_repo, pathInfo.sha)

				if (!content.content) {
					throw new Error('File content is empty.')
				}

				if (content.encoding !== 'base64') {
					throw new Error('Expected content encoding to be base64.')
				}

				const yaml_string = atob(content.content);
				const parsed = parse(yaml_string)

				interface Directory {
					name: string
					directories?: Directory[]
					files?: {
						name: string
						tags?: string[]
						keywords?: string[]
					}[]
				}

				const iterate = async (directories: Directory[], cur_dir: string) => {
					for (const dir of directories) {
						const path = `${cur_dir}/${dir.name}`
						if (dir.directories) {
							iterate(dir.directories, path)
						}

						if (dir.files) {
							const file = dir.files.find(item => item.name === 'index.md')
							if (file) {
								items.push({
									path: path,
									tags: file.tags,
									keywords:file.keywords
								})
							}
						}
					}
				}

				iterate(parsed.directories, 'ctf-writeups')
			}

			const path = pathInfo.path.split('/');

			if (path[path.length - 1] === "index.md") {
				// item = path.filter((_, index) => index !== path.length - 1 && index !== 0).join('/');
			} else if (path[path.length - 1].includes(".md")) {
				if (github_page_format) {
					continue;
				}
			}

			if (github_page_format) {
				path.pop()
			}

			let cur_root = root;
			path.forEach(async (_path, i) => {
				let contains = cur_root.children?.filter(item => item.name === _path)?.[0]

				if (!contains) {
					const new_item: Item = {
						name: _path,
						children: (i !== path.length - 1) ? [] : undefined
					}
					cur_root.children?.push(new_item)
					contains = new_item
				}

				cur_root = contains
			})
		}
	} catch (e) {
		if (e instanceof Error)
			throw error(404, e.message);
	}

	return {
		props: {
			root,
			items
		}
	};
}

export const loadAssetMetadataFromGithub = async (root: Item) => {
	const items: SearchItem[] = []

	// special metadata for search and filtering
	const tags: Set<string> = new Set()
	const keywords: Set<string> = new Set()

	const traverse = async (item: Item) => {
		if (item.github_remote) {
			const res = await getFilesFromCommit(item.github_remote.owner, item.github_remote.repo, item.github_remote.commit_sha)

			for (const file of res) {
				if (!file.path?.endsWith('index.md')) {
					continue
				}

				let path = file.path
				if (item.github_remote?.page_format) {
					path = path.replace('/index.md', '')
				}

				if (!file.sha) {
					throw error(500, "Github commit sha is empty.")
				}

				const content = await getFileContentFromBlob(item.github_remote.owner, item.github_remote.repo, file.sha)

				if (content.content == undefined) {
					throw error(500, "Content from commit is empty.")
				}

				if (content.encoding !== 'base64') {
					throw error(500, 'Expected content encoding to be base64.')
				}

				const markdownContent = atob(content.content);
				const metadata = parseMetadata(markdownContent)

				items.push({
					path: `${item.name}/${path}`,
					tags: metadata?.tags,
					keywords: metadata?.keywords,
					date: metadata?.date,
					watched: metadata?.watched
				});

				if (metadata['tags'] && Array.isArray(metadata['tags']))
					metadata['tags'].forEach(tag => {
						tags.add(tag)
					});
				if (metadata['keywords'] && Array.isArray(metadata['keywords']))
					metadata['keywords'].forEach(keyword => {
						keywords.add(keyword)
					});
			}
		}

		// Recurse into children
		if (item.children) {
			for (const child of item.children) {
				await traverse(child);
			}
		}
	};

	await traverse(root);
	return {
		props: {
			root,
			items,
			tags,
			keywords
		}
	};
}
