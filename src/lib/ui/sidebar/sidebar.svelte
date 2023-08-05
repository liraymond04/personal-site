<script lang="ts" context="module">
	export interface Item {
		name: string;
		children?: Item[];
	}
</script>

<script lang="ts">
	import Menu from './menu.svelte';

	export let root_dir: string;
	export let root_item: Item;
</script>

<Menu {root_dir} {root_item} />
