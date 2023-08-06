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

<aside class="w-full">
	<nav>
		<ul class="flex flex-col space-y-1 menu menu-sm dropdown-content" tabindex="0" role="menu">
			<Menu {root_dir} {root_item} />
		</ul>
	</nav>
</aside>
