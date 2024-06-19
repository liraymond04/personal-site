<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types.ts';
	import Fuse from 'fuse.js';

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
