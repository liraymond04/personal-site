import { GITHUB_TOKEN } from "$env/static/private";
import { Octokit } from "@octokit/rest";

export interface GithubTreePath {
	path?: string;
	mode?: string;
	type?: string;
	sha?: string;
	size?: number;
	url?: string;
}

export interface GithubBlobContent {
	sha?: string;
	node_id?: string;
	size: number | null;
	url?: string;
	content?: string;
	encoding?: string;
}

const octokit = new Octokit({
	auth: GITHUB_TOKEN,
});

export const getLatestCommitSha = async (owner: string, repo: string) => {
	const { data: commit } = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
		owner: owner,
		repo: repo,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	return commit[0].sha;
}

export const getTopLevelDirectoriesFromCommit = async (owner: string, repo: string, commitSha: string) => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
		owner: owner,
		repo: repo,
		tree_sha: commitSha,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	const directories = data.tree
		.filter(item => item.type === 'tree')

	return directories
}

export const getCommitInfoFromPath = async (owner: string, repo: string, path: string, ref?: string) => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
		owner: owner,
		repo: repo,
		path: path,
		ref: ref,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	return data
}

export const getMarkdownFilesFromCommit = async (owner: string, repo: string, commitSha: string): Promise<GithubTreePath[]> => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
		owner: owner,
		repo: repo,
		tree_sha: commitSha,
		recursive: 'true',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	const markdownFiles = data.tree
		.filter(item => item.type === 'blob' && item.path?.endsWith('.md'))

	return markdownFiles
}

export const getMarkdownContentFromBlob = async (owner: string, repo: string, fileSha: string): Promise<GithubBlobContent> => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
		owner: owner,
		repo: repo,
		file_sha: fileSha,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	return data
}
