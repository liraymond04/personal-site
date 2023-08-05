<script lang="ts">
	import type { Item } from './sidebar.svelte';
	import Route from './route.svelte';

	export let root_dir: string;
	export let root_item: Item;
</script>

<div>
	<h1>{root_item.name}</h1>
	{#if root_item.children}
		{#each root_item.children as item}
			{#if !item.children}
				<div class="flex">
					<div class="mr-4"/>
					<Route root_dir={`${root_dir}/${root_item.name}`} root_item={item} />
				</div>
			{:else}
				<div class="flex">
					<div class="mr-4"/>
					<svelte:self root_dir={`${root_dir}/${root_item.name}`} root_item={item} />
				</div>
			{/if}
		{/each}
	{/if}
</div>
