<script lang="ts">
	import type { Item } from '$lib/ui/sidebar/types';
	import Sidebar from '$lib/ui/sidebar/sidebar.svelte';

	export let root: Item;
</script>

<Sidebar root_dir="" root_item={root} />
