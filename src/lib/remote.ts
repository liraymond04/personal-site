import { error } from "@sveltejs/kit"
import { parseMetadata } from "./metadata";
import { IsGithubFileCommitInfo, decodeContentFromCommitInfo, getCommitInfoFromPath, getGithubDetailsFromMedata, getLatestCommitSha } from "./github";

export const loadRemoteIndex = async (files: Record<string, () => Promise<string>>, params_path: string, dir: string) => {
	let markdownContent = '';

	try {
		if (files[`${dir}/${params_path}.md`]) {
			const result = await files[`${dir}/${params_path}.md`]();
			markdownContent = result
		} else {
			const result = await files[`${dir}/${params_path}/index.md`]();
			markdownContent = result
		}
	} catch (e) {
		if (e instanceof Error)
			throw error(404, e.message)
	}

	const metadata = parseMetadata(markdownContent)
	const start_metadata = markdownContent.indexOf('---')
	if (start_metadata === 0) {
		const end_metadata = markdownContent.indexOf('---', 1)
		markdownContent = markdownContent.substring(end_metadata + 3)
	}

	const { github_owner, github_repo } = getGithubDetailsFromMedata(metadata)

	// Load README as index page if it exists
	try {
		const commit = await getLatestCommitSha(github_owner, github_repo)
		const repo_path = '/README.md'
		const commit_info = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

		const decoded = decodeContentFromCommitInfo(commit_info)
		markdownContent = decoded
	} catch {
		//
	}

	return {
		props: {
			metadata,
			markdownContent,
		},
	};
}

export const loadRemoteImagePaths = async (markdownContent: string, github_owner: string, github_repo: string, commit_sha: string, params_path: string, result_path: string, image_paths: string[]) => {
	let decoded = markdownContent

	for (const image_path of image_paths) {
		const usage_path = image_path.replace(`${params_path}/`, '')
		const repo_path = image_path.replace(result_path, '')
		const commit_info = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit_sha)

		if (!IsGithubFileCommitInfo(commit_info)) {
			continue
		}

		decoded = decoded.replaceAll(`(${usage_path})`, `(${commit_info.download_url})`)
	}

	return decoded
}
