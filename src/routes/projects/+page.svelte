<script lang="ts">
	import type { SearchItem } from '$lib/ui/sidebar/types.js';
	import Fuse from 'fuse.js';
	/* eslint-disable */
	// @ts-ignore
	import Popover from 'svelte-popover';
	import 'iconify-icon';
	import SearchButton from '$lib/ui/search-button/search-button.svelte';
	import SearchAdditionalAdd from '$lib/ui/search-button/search-additional-add.svelte';
	import SearchAdditionalRemove from '$lib/ui/search-button/search-additional-remove.svelte';

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

	let sort = 'ascending';

	$: if (sort === 'ascending') {
		items = items.sort((a, b) => a.path.localeCompare(b.path));
	}

	$: if (sort === 'descending') {
		items = items.sort((a, b) => -1 * a.path.localeCompare(b.path));
	}

	$: if (sort === 'date-newest') {
		items = items.sort((a, b) => {
			if (!a.date) {
				if (!b.date) {
					return -1;
				}
				return 1;
			}
			if (!b.date) return -1;
			const c = Date.parse(a.date.toString());
			const d = Date.parse(b.date.toString());
			return c - d;
		});
	}

	$: if (sort === 'date-oldest') {
		items = items.sort((a, b) => {
			if (!a.date) {
				if (!b.date) {
					return -1;
				}
				return 1;
			}
			if (!b.date) return -1;
			const c = Date.parse(a.date.toString());
			const d = Date.parse(b.date.toString());
			return -1 * (c - d);
		});
	}
</script>

<h1>Projects</h1>

<div class="flex flex-col space-y-2 mx-4 mt-4">
	{#each additional as search, index}
		{#if index !== 0}
			<div>
				{search.function.toUpperCase()}
			</div>
		{/if}
		<div class="flex flex-wrap content-center items-center space-x-2">
			<input bind:value={search.val} type="text" placeholder="Search..." class="h-8 p-2 rounded" />
			<div class="py-2">
				<SearchButton bind:search bind:search_item={search.path} data={data.props.items}
					>path</SearchButton
				>
				<SearchButton bind:search bind:search_item={search.tags} data={data.props.items}
					>tags</SearchButton
				>
				<SearchButton bind:search bind:search_item={search.keywords} data={data.props.items}
					>keywords</SearchButton
				>
			</div>
			{#if index === 0}
				<SearchAdditionalAdd
					bind:additional
					data={data.props.items}
					keys={['path', 'tags', 'keywords']}
				/>
			{/if}
			{#if index !== 0}
				<SearchAdditionalRemove bind:additional index={index} />
			{/if}
		</div>
	{/each}
</div>

<div class="mx-4 mt-4">
	<label for="sort">Sort by:</label>
	<select bind:value={sort} name="sort" id="sort" class="p-2 rounded">
		<option value="ascending">Ascending (A-Z)</option>
		<option value="descending">Descending (Z-A)</option>
		<option value="date-newest">Date (newest)</option>
		<option value="date-oldest">Date (oldest)</option>
	</select>
</div>

<div class="flex flex-col space-y-2 m-4">
	{#each items as item}
		<a href={`/projects/${item.path}`} class="m-2 underline-first-child group hover:cursor-pointer">
			<div class="flex justify-between space-x-2 max-w-2xl">
				<div class="break-all line-clamp-3">
					{item.path}
				</div>
				{#if item.date}
					<div>
						{item.date}
					</div>
				{/if}
			</div>

			<div class="flex flex-wrap space-x-1 text-xs text-center">
				{#if item?.tags?.length > 0}
					<div class="mb-1">tags:</div>
					{#each item.tags as tag}
						<div class="bg-gray-700 rounded overflow-hidden mb-1 px-1">{tag}</div>
					{/each}
				{/if}
			</div>
			<div class="flex flex-wrap space-x-1 text-xs text-center">
				{#if item?.keywords?.length > 0}
					<div class="mb-1">keywords:</div>
					{#each item.keywords as keyword}
						<div class="bg-gray-700 rounded overflow-hidden mb-1 px-1">{keyword}</div>
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
