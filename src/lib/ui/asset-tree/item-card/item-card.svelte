<script lang="ts">
	import type { SearchItem } from '$lib/ui/sidebar/types';

	export let dir;
	export let item: SearchItem;
</script>

<a href={`${dir}/${item.path}`} class="p-2 underline-first-child group hover:cursor-pointer">
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
		{#if item?.tags?.length && item?.tags?.length > 0}
			<div class="mb-1">tags:</div>
			{#each item.tags as tag}
				<div class="bg-gray-700 rounded overflow-hidden mb-1 px-1">{tag}</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-wrap space-x-1 text-xs text-center">
		{#if item?.keywords?.length && item?.keywords?.length > 0}
			<div class="mb-1">keywords:</div>
			{#each item.keywords as keyword}
				<div class="bg-gray-700 rounded overflow-hidden mb-1 px-1">{keyword}</div>
			{/each}
		{/if}
	</div>
</a>

<style>
	.underline-first-child:hover > *:first-child {
		text-decoration: underline;
	}
</style>
