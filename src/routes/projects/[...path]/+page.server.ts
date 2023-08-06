import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const dir = '/static/projects'
  let markdownContent = '';

  try {
    const files = import.meta.glob("/static/projects/**/*.md", { as: 'raw' });
    const result = await files[`${dir}/${params.path}.md`]();
    markdownContent = result
  } catch (e) {
    throw error(404)
  }

  return {
    props: {
      markdownContent,
    },
  };
}
