import type { LayoutServerLoad } from './$types';
import { loadAssetTree } from '$lib/asset-tree';

export const load: LayoutServerLoad = async () => {
  const dir = '/static/translations'
  const root = {
    name: 'translations',
    children: [],
  }
  const files = import.meta.glob(`/static/translations/**/*.md`, { as: 'raw' })

  return loadAssetTree(dir, root, files)
}
