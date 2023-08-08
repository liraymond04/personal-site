import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

  return {
    props: {
      markdownContent,
    },
  };
}
