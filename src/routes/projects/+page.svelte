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

	$: items = handleSort(data.props.items, additional);
</script>

<svelte:head>
	<title>Projects | liraymond04</title>
	<meta name="description" content="Explore Raymond Li's projects as a Computer Science and Mathematics major at the University of British Columbia (UBC), showcasing skills in software development, algorithms, and problem-solving.">
</svelte:head>

<h1>Projects (under construction)</h1>

<SearchComponent class="mx-4 mt-4" bind:additional bind:data {keys} />

<Sort class="mx-4 mt-4" bind:items sort="ascending" />

<div class="flex flex-col space-y-1 m-4">
	{#each items as item}
		<ItemCard dir={`/${data.props.root.name}`} item={item}/>
	{/each}
</div>
