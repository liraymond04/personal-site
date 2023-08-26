import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { parseMetadata } from '$lib/metadata';

export const load: PageServerLoad = async ({ params }) => {
  const dir = '/static/projects'
  let markdownContent = '';

  try {
    const files = import.meta.glob("/static/projects/**/*.md", { as: 'raw' });
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
