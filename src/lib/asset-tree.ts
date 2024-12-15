import { error } from '@sveltejs/kit';
import type { Item, SearchItem } from '$lib/ui/sidebar/types'
import { parseMetadata } from '$lib/metadata';
import { getAllPostsFromRepo } from './supabase';
import pathLib from 'path';

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

					// check is supabase source
					const supabase_repo = metadata['repo_url']
					const supabase_root = metadata['supabase_root'] === 'true'

					let start_root = '';
					if (metadata['start_root'] && !Array.isArray(metadata['start_root'])) {
						start_root = metadata['start_root'];
					}

					if (typeof supabase_repo === 'string') {
						if (supabase_root) {
							const data = await loadAssetTreeFromSupabase(supabase_repo, start_root);
							cur_root.children = data.children;
							items = [...items, ...data.items]
						}
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
			error(404, e.message);
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
			keywords,
		}
	};
}

const fixParamsPath = (path: string) => {
	let params_path = path
	if (params_path.endsWith('/index')) {
		params_path = params_path.replace('/index', '')
	} else if (params_path.endsWith('/index.md')) {
		params_path = params_path.replace('/index.md', '')
	}
	return params_path
}

const buildFileStructure = (paths: string[]): Item[] => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const root: Record<string, any> = {};

	for (const path of paths) {
		const parts = path.split("/");
		let current = root;

		for (const part of parts) {
			if (!current[part]) {
				current[part] = {};
			}
			current = current[part];
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function buildItems(node: Record<string, any>, name: string): Item {
		const keys = Object.keys(node);

		if (keys.length === 0) {
			return { name: name.replace(/\.md$/, "") };
		}

		const hasIndex = keys.includes("index.md");
		const hasReadme = keys.includes("README.md");
		const children = keys
			.filter((key) => key !== "index.md" && key !== "README.md")
			.map((key) => buildItems(node[key], key))
			.sort((a, b) => a.name.localeCompare(b.name));

		if (hasIndex) {
			if (children.length === 0) {
				return { name: name.replace(/\.md$/, "") };
			} else {
				return { name, children: [{ name: "index" }, ...children] };
			}
		}

		if (hasReadme) {
			if (children.length === 0) {
				return { name: name.replace(/\.md$/, "") };
			} else {
				return { name, children: [{ name: "index" }, ...children] };
			}
		}

		return { name, children };
	}

	const result = Object.keys(root)
		.map((key) => buildItems(root[key], key))
		.sort((a, b) => a.name.localeCompare(b.name));

	const topLevelReadmeIndex = result.findIndex(item => item.name === "README");
	if (topLevelReadmeIndex !== -1) {
		const readmeItem = result.splice(topLevelReadmeIndex, 1)[0];
		result.unshift({ name: "index", children: readmeItem.children });
	}

	return result;
}

const loadAssetTreeFromSupabase = async (supabase_repo: string, start_root: string) => {
	const items: SearchItem[] = [];
	const posts = await getAllPostsFromRepo(supabase_repo);
	posts.map((post) => post.filePath = pathLib.relative(start_root, post.filePath));

	const children = buildFileStructure(posts.map((post) => post.filePath))

	posts.forEach((post) => {
		let file_path = post.filePath;
		if (file_path.endsWith(".md")) file_path = file_path.replace(".md", "");
		const finalPath = pathLib.join(pathLib.basename(supabase_repo), file_path);

		items.push({
			path: fixParamsPath(finalPath),
			tags: post.tags || [],
			keywords: post.keywords || [],
		})
	})

	return {
		items,
		children
	};
}
