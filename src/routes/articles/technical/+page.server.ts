import { loadAssetMetadataFromGithub } from "$lib/asset-tree";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const res = await parent();

  return {
    streamed: {
      github_content: loadAssetMetadataFromGithub(res.props.root)
    }
  }
}
