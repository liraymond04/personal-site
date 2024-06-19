import type { LayoutServerLoad } from './$types';
import { loadAssetTree } from '$lib/asset-tree';

export const load: LayoutServerLoad = async () => {
  const dir = '/static/projects'
  const root = {
    name: 'projects',
    children: [],
  }
  const files = import.meta.glob(`/static/projects/**/*.md`, { as: 'raw' })

  return loadAssetTree(dir, root, files)
}
