import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseMetadata } from '$lib/metadata';
import { getLatestCommitSha, getFileContentFromBlob, getCommitInfoFromPath } from '$lib/github';

const run: PageServerLoad = async ({ params, parent }) => {
  const dir = '/static/articles/technical'
  const files = import.meta.glob(`/static/articles/technical/**/*.md`, { as: 'raw' })

  let params_path = params.path
  if (params_path.endsWith('/index')) {
    params_path = params_path.replace('/index', '')
  } else if (params_path.endsWith('/index.md')) {
    params_path = params_path.replace('/index.md', '')
  }

  const data = await parent();
  const check_path = `${dir}/${params_path}/index.md`

  if (check_path in files) {
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

    const github_owner = metadata['github_owner']
    const github_repo = metadata['github_repo']

    // Load README as index page if it exists
    if (github_owner && !Array.isArray(github_owner) && github_repo && !Array.isArray(github_repo)) {
      try {
        const commit = await getLatestCommitSha(github_owner, github_repo)
        const repo_path = '/README.md'
        const commit_info = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

        if (Array.isArray(commit_info)) {
          throw new Error()
        }

        if (commit_info.type !== 'file') {
          throw new Error()
        }

        if (commit_info.content === undefined) {
          throw new Error()
        }

        const decoded = atob(commit_info.content);
        markdownContent = decoded
      } catch {
        //
      }
    }

    return {
      props: {
        metadata,
        markdownContent,
      },
    };
  }

  const result = data.props.items.filter(item => params_path.includes(item.path))?.[0]
  const path = `${dir}/${result.path}/index.md`

  let markdownContent = await files[path]()
  const metadata = parseMetadata(markdownContent)
  const start_metadata = markdownContent.indexOf('---')
  if (start_metadata === 0) {
    const end_metadata = markdownContent.indexOf('---', 1)
    markdownContent = markdownContent.substring(end_metadata + 3)
  }

  const github_owner = metadata['github_owner']
  const github_repo = metadata['github_repo']

  if (typeof github_owner !== 'string') {
    throw error(500, 'Tag "github_owner" in metadata is not a string.')
  }

  if (typeof github_repo !== 'string') {
    throw error(500, 'Tag "github_repo" in metadata is not a string.')
  }

  const commit = await getLatestCommitSha(github_owner, github_repo)
  let repo_path = params_path.replace(result.path, '')

  if (repo_path.endsWith('.jpg')) {
    console.log(repo_path)
    const commit_info_res = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

    if (Array.isArray(commit_info_res)) {
      throw error(500, 'Path is not a valid file.')
    }

    if (commit_info_res.type !== 'file') {
      throw error(500, 'Path is not a valid file.')
    }

    return {
      img_data: commit_info_res.content
    }
  }

  if (!data.props.items.find(item => item.path === params_path)) {
    repo_path += '/index.md'
  }
  const commit_info_res = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

  let commit_info

  if (!Array.isArray(commit_info_res)) {
    if (commit_info_res.type !== 'file') {
      throw error(500, 'Path is not a valid file.')
    }

    commit_info = commit_info_res
  } else {
    const commit_info_item = commit_info_res.shift()

    if (!commit_info_item) {
      throw error(500, 'Commit info from Github path is empty.')
    }

    commit_info = await getFileContentFromBlob(github_owner, github_repo, commit_info_item.sha)
  }

  if (commit_info.content === undefined) {
    throw error(500, "Content from commit is empty.")
  }

  if (commit_info.encoding !== 'base64') {
    throw error(500, 'Expected content encoding to be base64.')
  }

  let decoded = atob(commit_info.content);
  const decodedMetadata = parseMetadata(decoded)

  const start_decoded_metadata = decoded.indexOf('---')
  if (start_decoded_metadata === 0) {
    const end_metadata = decoded.indexOf('---', 1)
    decoded = decoded.substring(end_metadata + 3)
  }

  for (const image_path of data.props.image_paths) {
    const usage_path = image_path.replace(`${params_path}/`, '')
    const repo_path = image_path.replace(result.path, '')
    const commit_info = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

    if (Array.isArray(commit_info)) {
      continue
    }

    decoded = decoded.replaceAll(`(${usage_path})`, `(${commit_info.download_url})`)
  }

  return {
    props: {
      metadata: decodedMetadata,
      markdownContent: decoded,
    },
  };
}

export const load: PageServerLoad = async (props) => {
  let params_path = props.params.path
  if (params_path.endsWith('/index')) {
    params_path = params_path.replace('/index', '')
  } else if (params_path.endsWith('/index.md')) {
    params_path = params_path.replace('/index.md', '')
  }

  return {
    path: params_path,
    streaming: {
      data: run(props)
    }
  }
}
