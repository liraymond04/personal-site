<script lang="ts">
	import type { SearchItem } from '$lib/ui/sidebar/types.js';
	import Fuse from 'fuse.js';
	import 'iconify-icon';

	export let data;

	interface Search {
		val: string;
		path: boolean;
		tags: boolean;
		keywords: boolean;
		function: 'and' | 'or';
		fuse: Fuse<SearchItem>;
	}

	let additional: Search[] = [
		{
			val: '',
			path: true,
			tags: true,
			keywords: true,
			function: 'and',
			fuse: new Fuse(data.props.items, {
				keys: ['path', 'tags', 'keywords']
			})
		}
	];

	function intersect<T>(a: T[], b: T[]) {
		return a.filter(Set.prototype.has, new Set(b));
	}

	function union<T>(a: T[], b: T[]) {
		return [...new Set([...a, ...b])];
	}

	function resolve(results: SearchItem[][]): SearchItem[] {
		let result = results[0];

		for (let i = 0; i < results.length; i++) {
			if (additional[i].val === '') continue;
			if (additional[i].function === 'and') {
				result = intersect(result, results[i]);
			} else if (additional[i].function === 'or') {
				result = union(result, results[i]);
			}
		}

		return result;
	}

	$: results = additional.map((item) => item.fuse.search(item.val).map((i) => i.item));

	$: items =
		additional.reduce((total, i) => total + (i.val !== '' ? 1 : 0), 0) !== 0
			? resolve(results)
			: data.props.items;
</script>

<h1>Projects</h1>

<div class="flex flex-col space-y-2 mx-4 mt-4">
	{#each additional as search, index}
		<div class="flex flex-wrap items-center space-x-2">
			<input bind:value={search.val} type="text" placeholder="Search..." class="h-8" />
			<div class="py-2">
				<button
					on:click={() => {
						search.path = !search.path;
						search.fuse = new Fuse(data.props.items, {
							keys: [
								...(search.path ? ['path'] : []),
								...(search.tags ? ['tags'] : []),
								...(search.keywords ? ['keywords'] : [])
							]
						});
					}}
					class={`p-1 h-auto rounded ${search.path && 'bg-gray-700'}`}>path</button
				>
				<button
					on:click={() => {
						search.tags = !search.tags;
						search.fuse = new Fuse(data.props.items, {
							keys: [
								...(search.path ? ['path'] : []),
								...(search.tags ? ['tags'] : []),
								...(search.keywords ? ['keywords'] : [])
							]
						});
					}}
					class={`p-1 h-auto rounded ${search.tags && 'bg-gray-700'}`}>tags</button
				>
				<button
					on:click={() => {
						search.keywords = !search.keywords;
						search.fuse = new Fuse(data.props.items, {
							keys: [
								...(search.path ? ['path'] : []),
								...(search.tags ? ['tags'] : []),
								...(search.keywords ? ['keywords'] : [])
							]
						});
					}}
					class={`p-1 h-auto rounded ${search.keywords && 'bg-gray-700'}`}>keywords</button
				>
			</div>
			<button
				class="flex content-center hover:cursor-pointer"
				on:click={() => {
					additional.push({
						val: '',
						path: true,
						tags: true,
						keywords: true,
						function: 'and',
						fuse: new Fuse(data.props.items, {
							keys: ['path', 'tags', 'keywords']
						})
					});
					additional = additional;
				}}
			>
				<iconify-icon icon="ic:baseline-add-circle-outline" class="text-xl" />
			</button>
			{#if index !== 0}
				<button
					class="flex content-center hover:cursor-pointer"
					on:click={() => {
						additional.splice(index, 1);
						additional = additional;
					}}
				>
					<iconify-icon icon="ic:baseline-remove-circle-outline" class="text-xl" />
				</button>
			{/if}
		</div>
	{/each}
</div>

<div class="flex flex-col space-y-2 m-4">
	{#each items as item}
		<a href={`/projects/${item.path}`} class="m-2 underline-first-child group hover:cursor-pointer">
			<div>{item.path}</div>
			<div class="flex flex-wrap space-x-1 text-xs text-center">
				{#if item?.tags?.length > 0}
					<div class="mb-1">tags:</div>
					{#each item.tags as tag}
						<div class="bg-gray-700 rounded overflow-hidden mb-1">{tag}</div>
					{/each}
				{/if}
			</div>
			<div class="flex flex-wrap space-x-1 text-xs text-center">
				{#if item?.keywords?.length > 0}
					<div class="mb-1">keywords:</div>
					{#each item.keywords as keyword}
						<div class="bg-gray-700 rounded overflow-hidden mb-1">{keyword}</div>
					{/each}
				{/if}
			</div>
		</a>
	{/each}
</div>

<style>
	.underline-first-child:hover > *:first-child {
		text-decoration: underline;
	}
</style>
