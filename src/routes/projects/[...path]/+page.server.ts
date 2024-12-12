import type { PageServerLoad } from './$types';
import { parseMetadata } from '$lib/metadata';
import { getPost, replaceRemoteImagePaths } from '$lib/supabase';
import path from 'path';

export const trailingSlash = 'never';

const dir = '/static/projects'
const files = import.meta.glob("/static/projects/**/*.md", { as: 'raw' });

const fixParamsPath = (path: string) => {
  let params_path = path
  if (params_path.endsWith('/index')) {
    params_path = params_path.replace('/index', '')
  } else if (params_path.endsWith('/index.md')) {
    params_path = params_path.replace('/index.md', '')
  }
  return params_path
}

const run: PageServerLoad = async ({ params }) => {
  let params_path = params.path
  params_path = fixParamsPath(params_path)

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

    if (metadata['supabase_page_format'] &&
      metadata['repo_url'] &&
      metadata['file_path'] &&
      !Array.isArray(metadata['repo_url']) &&
      !Array.isArray(metadata['file_path'])
    ) {
      const result = await getPost(metadata['repo_url'], metadata['file_path']);
      const finalContent = await replaceRemoteImagePaths(result[0]?.content, metadata['repo_url'], metadata['file_path']);
      metadata['layout'] = result[0]?.layout || 'project-page';

      return {
        props: {
          metadata,
          markdownContent: finalContent,
        }
      }
    }

    if (
      !(metadata['supabase_root'] === 'true') &&
      !metadata['github_page_format'] &&
      !metadata['github_owner'] &&
      !metadata['github_repo']
    ) {
      return {
        props: {
          metadata,
          markdownContent,
        }
      }
    }
  }

  const pathArray = params_path.split(path.sep)
  const repo_name = pathArray[0]
  const file_path = path.relative(repo_name, params_path);
  const repo_url = `liraymond04/${repo_name}`

  if (!repo_url) {
    return;
  }

  const check_paths: string[] = [`${file_path}.md`, `${file_path}/index.md`];

  for (const check of check_paths) {
    const response = await getPost(repo_url, check);

    if (response.length !== 0) {
      const metadata = {
        title: response[0].title,
        tags: response[0].tags,
        keywords: response[0].tags,
        media_files: response[0].mediaFiles,
        layout: response[0].layout,
      }
      const content = response[0].content;

      const finalContent = await replaceRemoteImagePaths(content, repo_url, check);

      return {
        props: {
          metadata,
          markdownContent: finalContent,
        }
      }
    }
  }

  // if nothing, try and find repo root
  const response = await getPost(repo_url, "README.md");
  if (response.length !== 0) {
    const metadata = {
      title: response[0].title,
      media_files: response[0].mediaFiles,
      layout: response[0].layout,
    }
    const content = response[0].content
    return {
      props: {
        metadata,
        markdownContent: content,
      }
    }
  }
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
