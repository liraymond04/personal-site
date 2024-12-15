<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types.js';
	import Fuse from 'fuse.js';
	import 'iconify-icon';
	import { SearchComponent, ItemCard, Sort } from '$lib/ui/asset-tree';
	import { handleSort } from '$lib/ui/asset-tree/handleSort.js';
	import Link from '$lib/ui/shared/link.svelte';

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
	<title>Translations | liraymond04</title>
	<meta name="description" content="CN to EN translations for Re:Zero side stories" />
</svelte:head>

<h1>Translations</h1>

<p>Repository of CN to EN translations for Re:Zero side stories</p>
<p>Note that there may be some nuances lost from JP->CN->EN translation</p>
<p>
	I do my best to refer to the JP source text and adhere to the <Link
		href="https://docs.google.com/document/d/e/2PACX-1vTdk5zfpajh-8Gir4dale6WOFauq9xucmRA0jUDvv63TRDXMe6-e7fc6DLJOiaY6w/pub"
		newtab={true}
		>WCT Manual of Style</Link
	>, but the accuracy will not be 100%
</p>

<SearchComponent class="mx-4 mt-4" bind:additional bind:data {keys} />

<Sort class="mx-4 mt-4" bind:items sort="ascending" />

<div class="flex flex-col space-y-1 m-4">
	{#each items as item}
		<ItemCard dir={`/${data.props.root.name}`} {item} />
	{/each}
</div>
