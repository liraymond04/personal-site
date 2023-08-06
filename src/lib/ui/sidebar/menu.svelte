<script lang="ts">
	import type { Item } from './sidebar.svelte';
	import Route from './route.svelte';

	export let root_dir: string;
	export let root_item: Item;

	let dir = `${root_dir}/${root_item.name}`;
</script>

<li tabindex="0" role="tab" class="w-full">
	<details class="w-full" open>
		<summary>{root_item.name}</summary>
		<ul class="flex flex-col pb-1 w-auto whitespace-normal">
			{#if root_item.children}
				{#each root_item.children as item}
					{#if !item.children}
						<Route root_dir={dir} root_item={item} />
					{:else}
						<svelte:self root_dir={dir} root_item={item} />
					{/if}
				{/each}
			{/if}
		</ul>
	</details>
</li>
