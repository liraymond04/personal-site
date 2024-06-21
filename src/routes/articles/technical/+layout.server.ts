import type { LayoutServerLoad } from './$types';
import { loadAssetTree } from '$lib/asset-tree';

export const load: LayoutServerLoad = async () => {
  const dir = '/static/articles/technical'
  const root = {
    name: 'articles/technical',
    children: [],
  }
  const files = import.meta.glob(`/static/articles/technical/**/*.md`, { as: 'raw' })

  return loadAssetTree(dir, root, files)
}
