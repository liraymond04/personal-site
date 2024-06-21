<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types.js';
	import Fuse from 'fuse.js';
	import 'iconify-icon';
	import { SearchComponent, ItemCard, Sort } from '$lib/ui/asset-tree';
	import { handleSort } from '$lib/ui/asset-tree/handleSort.js';

	export let data;

	const keys = ['path', 'tags', 'keywords'];

	let additional: Search[] = [
		{
			val: '',
			path: true,
			tags: true,
			keywords: true,
			function: 'and',
			fuse: new Fuse(data.props.items, {
				keys: keys
			})
		}
	];

	$: data = data
	$: data.props.items = data.props.items

	async function stream_github_content() {
		const res = await data.streamed.github_content
		data.props.items = [...new Set([...data.props.items ,...res.props.items])] 
	}
	stream_github_content()

	$: items = handleSort(data.props.items, additional);
</script>

<h1>Technical Articles</h1>

<SearchComponent class="mx-4 mt-4" bind:additional bind:data={data} {keys} />

<Sort class="mx-4 mt-4" bind:items sort="ascending" />

<div class="flex flex-col space-y-1 m-4">
	{#each items as item}
		<ItemCard dir={`/${data.props.root.name}`} item={item}/>
	{/each}
	{#await data.streamed.github_content}
		Loading...
	{/await}
</div>

