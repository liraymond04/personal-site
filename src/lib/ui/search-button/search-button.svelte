<script lang="ts">
	import type { SearchItem } from '$lib/ui/sidebar/types.js';
	import Fuse from 'fuse.js';

	interface Search {
		val: string;
		path: boolean;
		tags: boolean;
		keywords: boolean;
		function: 'and' | 'or';
		fuse: Fuse<SearchItem>;
	}

  export let search: Search;
  export let search_item: boolean;
  export let data;
</script>

<button
	on:click={() => {
		search_item = !search_item;
		search.fuse = new Fuse(data, {
			keys: [
				...(search.path ? ['path'] : []),
				...(search.tags ? ['tags'] : []),
				...(search.keywords ? ['keywords'] : [])
			]
		});
	}}
	class={`p-1 h-auto rounded ${search_item && 'bg-gray-700'}`}><slot /></button
>
