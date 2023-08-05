<script lang="ts">
	import type { Item } from './sidebar.svelte';

	export let root_dir: string;
	export let root_item: Item;
</script>

<h1>
	{root_item.name}
	{root_dir}
</h1>
