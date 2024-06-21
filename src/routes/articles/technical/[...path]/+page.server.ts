import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseMetadata } from '$lib/metadata';
import { getLatestCommitSha, getFileContentFromBlob, getCommitInfoFromPath } from '$lib/github';

const run: PageServerLoad = async ({ params, parent }) => {
  const dir = '/static/articles/technical'
  const files = import.meta.glob(`/static/articles/technical/**/*.md`, { as: 'raw' })

  const data = await parent();
  const check_path = `${dir}/${params.path}/index.md`

  if (check_path in files) {
    let markdownContent = '';

    try {
      if (files[`${dir}/${params.path}.md`]) {
        const result = await files[`${dir}/${params.path}.md`]();
        markdownContent = result
      } else {
        const result = await files[`${dir}/${params.path}/index.md`]();
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

    return {
      props: {
        metadata,
        markdownContent,
      },
    };
  }

  const result = data.props.items.filter(item => params.path.includes(item.path))?.[0]
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
  const repo_path = params.path.replace(result.path, '')
  const commit_info_res = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

  if (!Array.isArray(commit_info_res)) {
    throw error(500, 'Commit info from Github path is empty.')
  }

  const commit_info = commit_info_res.shift()

  if (!commit_info) {
    throw error(500, 'Commit info from Github path is empty.')
  }

  const content = await getFileContentFromBlob(github_owner, github_repo, commit_info.sha)

  if (content.content === undefined) {
    throw error(500, "Content from commit is empty.")
  }

  if (content.encoding !== 'base64') {
    throw error(500, 'Expected content encoding to be base64.')
  }

  let decoded = atob(content.content);
  const decodedMetadata = parseMetadata(decoded)

  const start_decoded_metadata = decoded.indexOf('---')
  if (start_decoded_metadata === 0) {
    const end_metadata = decoded.indexOf('---', 1)
    decoded = decoded.substring(end_metadata + 3)
  }

  return {
    props: {
      metadata: decodedMetadata,
      markdownContent: decoded,
    },
  };
}

export const load: PageServerLoad = async (props) => {
  return {
    path: props.params.path,
    streaming: {
      data: run(props)
    }
  }
}