import { GITHUB_TOKEN } from "$env/static/private";
import { Octokit } from "@octokit/rest";
import { error } from "@sveltejs/kit";
import type { Metadata } from "./ui/sidebar/types";

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

export type GithubFileCommitInfo = {
	type: "file";
	size: number;
	name: string;
	path: string;
	content?: string | undefined;
	encoding?: string | undefined;
	sha: string;
	url: string;
	git_url: string | null;
	html_url: string | null;
	download_url: string | null;
	_links: {
		git: string | null;
		html: string | null;
		self: string;
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function IsGithubFileCommitInfo(object: any): object is GithubFileCommitInfo {
	return 'download_url' in object;
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

export const getCommitInfoFromPath = async (owner: string, repo: string, path: string, ref?: string): Promise<GithubFileCommitInfo | GithubBlobContent> => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
		owner: owner,
		repo: repo,
		path: path,
		ref: ref,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	let commit_info

	if (!Array.isArray(data)) {
		if (data.type !== 'file') {
			throw error(500, 'Path is not a valid file.')
		}

		data._links

		commit_info = data
	} else {
		const commit_info_item = data.shift()

		if (!commit_info_item) {
			throw error(500, 'Commit info from Github path is empty.')
		}

		commit_info = await getFileContentFromBlob(owner, repo, commit_info_item.sha)
	}

	return commit_info
}

export const getFilesFromCommit = async (owner: string, repo: string, commitSha: string): Promise<GithubTreePath[]> => {
	const { data } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
		owner: owner,
		repo: repo,
		tree_sha: commitSha,
		recursive: 'true',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})

	const markdownFiles = data.tree.filter(item => item.type === 'blob')

	return markdownFiles
}

export const getFileContentFromBlob = async (owner: string, repo: string, fileSha: string): Promise<GithubBlobContent> => {
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

export const getGithubDetailsFromMedata = (metadata: Metadata) => {
	const github_owner = metadata['github_owner']
	const github_repo = metadata['github_repo']

	if (typeof github_owner !== 'string') {
		throw error(500, 'Tag "github_owner" in metadata is not a string.')
	}

	if (typeof github_repo !== 'string') {
		throw error(500, 'Tag "github_repo" in metadata is not a string.')
	}

	return {
		github_owner,
		github_repo
	}
}

export const decodeContentFromCommitInfo = (commit_info: GithubFileCommitInfo | GithubBlobContent) => {
  if (commit_info.content === undefined) {
    throw error(500, "Content from commit is empty.")
  }

  if (commit_info.encoding !== 'base64') {
    throw error(500, 'Expected content encoding to be base64.')
  }

  const decoded = atob(commit_info.content);
	return decoded
}
