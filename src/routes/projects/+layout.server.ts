import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Item } from '$lib/ui/sidebar/types'

const partition = <T>(array: T[], filter: (e: T, idx: number, arr: T[]) => boolean) => {
  const pass: T[] = [], fail: T[] = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}

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

  if (root.children) {
    const index = root.children?.[0].name === 'index' ? root.children[0] : undefined
    if (index) root.children.shift()
    root.children.sort((a, b) => a.name.localeCompare(b.name))
    const [folders, files] = partition<Item>(root.children, e => e.children !== undefined)
    root.children = folders.concat(files)
    if (index) root.children = [index].concat(root.children)
  }

  return {
    props: {
      root
    }
  };
}
