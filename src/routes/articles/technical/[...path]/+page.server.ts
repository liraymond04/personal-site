import type { PageServerLoad } from './$types';
import { parseMetadata } from '$lib/metadata';
import { getLatestCommitSha, getCommitInfoFromPath, getGithubDetailsFromMedata, decodeContentFromCommitInfo, IsGithubFileCommitInfo } from '$lib/github';
import { loadRemoteImagePaths, loadRemoteIndex } from '$lib/remote';

const dir = '/static/articles/technical'
const files = import.meta.glob(`/static/articles/technical/**/*.md`, { as: 'raw' })

const fixParamsPath = (path: string) => {
  let params_path = path
  if (params_path.endsWith('/index')) {
    params_path = params_path.replace('/index', '')
  } else if (params_path.endsWith('/index.md')) {
    params_path = params_path.replace('/index.md', '')
  }
  return params_path
}

function isFilePath(path: string): boolean {
  const pathRegex = /.+\..+/;
  return pathRegex.test(path);
}

const run: PageServerLoad = async ({ params, parent }) => {
  let params_path = params.path
  params_path = fixParamsPath(params_path)

  const data = await parent();
  const check_path = `${dir}/${params_path}/index.md`
  const second_check_path = `${dir}/${params_path}.md`

  // check local/static files and try to load this way first
  if (check_path in files || second_check_path in files) {
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
      //
    }

    const metadata = parseMetadata(markdownContent)
    const start_metadata = markdownContent.indexOf('---')
    if (start_metadata === 0) {
      const end_metadata = markdownContent.indexOf('---', 1)
      markdownContent = markdownContent.substring(end_metadata + 3)
    }

    if (!metadata['github_owner'] || !metadata['github_repo']) {
      return {
        props: {
          metadata,
          markdownContent
        }
      }
    }
  }

  if (check_path in files) {
    return loadRemoteIndex(files, params_path, dir);
  }

  const result = data.props.items.filter(item => params_path.includes(item.path))?.[0]
  const path = `${dir}/${result.path}/index.md`

  const markdownContent = await files[path]()
  const metadata = parseMetadata(markdownContent)

  if (isFilePath(params_path)) {
    const { github_owner, github_repo, title } = metadata;
    const full_path = params_path.replace(`${title}/`, '')
    const file = await getCommitInfoFromPath(github_owner.toString(), github_repo.toString(), full_path);

    if (IsGithubFileCommitInfo(file) && file.download_url) {
      return {
        props: {
          is_file: true,
          download_url: file.download_url,
        }
      }
    }
  }

  let github_owner, github_repo;
  try {
    ({ github_owner, github_repo } = getGithubDetailsFromMedata(metadata));
  } catch (error) {
    return;
  }

  const commit = await getLatestCommitSha(github_owner, github_repo)
  let repo_path = params_path.replace(result.path, '')

  if (!data.props.items.find(item => item.path === params_path)) {
    repo_path += '/index.md'
  }
  const commit_info = await getCommitInfoFromPath(github_owner, github_repo, repo_path, commit)

  let decoded = decodeContentFromCommitInfo(commit_info);
  const decodedMetadata = parseMetadata(decoded)

  const start_decoded_metadata = decoded.indexOf('---')
  if (start_decoded_metadata === 0) {
    const end_metadata = decoded.indexOf('---', 1)
    decoded = decoded.substring(end_metadata + 3)
  }

  decoded = await loadRemoteImagePaths(decoded, github_owner, github_repo, commit, params_path, result.path, data.props.image_paths)

  return {
    props: {
      metadata: decodedMetadata,
      markdownContent: decoded,
    },
  };

}

export const load: PageServerLoad = async (props) => {
  let params_path = props.params.path
  params_path = fixParamsPath(params_path)

  return {
    path: params_path,
    streaming: {
      data: run(props)
    }
  }
}
