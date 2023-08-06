<script lang="ts">
	import type { Item } from './sidebar.svelte';

	export let root_dir: string;
	export let root_item: Item;

	let dir = `${root_dir}/${root_item.name}`;
	if (root_item.name === 'index') {
		dir = `${root_dir}`;
	}
</script>

<li><a href={dir} class="">{root_item.name}</a></li>
