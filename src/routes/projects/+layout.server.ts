import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Item } from '$lib/ui/sidebar/types'

export const load: LayoutServerLoad = async () => {
  const dir = '/static/projects'
  const root: Item = {
    name: 'projects',
    children: []
  }

  try {
    const files = import.meta.glob("/static/projects/**/*.md", { as: 'raw' });
    for (const file in files) {
      const path_name = file.replace(dir, '')
      const path = path_name.split('/')

      let cur_root = root
      path.forEach((_path) => {
        if (_path === "") return;
        if (_path === "index.md") {
          cur_root.children?.unshift({ name: _path.replace(".md", '') })
          return;
        }
        if (_path.includes(".md")) {
          cur_root.children?.push({ name: _path.replace(".md", '') })
          return;
        }
        const found = cur_root.children?.find((i: Item) => i.name === _path)
        if (found) {
          cur_root = found
        } else {
          const new_root: Item = { name: _path, children: [] }
          cur_root.children?.push(new_root)
          cur_root = new_root
        }
      })
    }
  } catch (e) {
    if (e instanceof Error)
      throw error(404, e.message)
  }

  return {
    props: {
      root
    }
  };
}
