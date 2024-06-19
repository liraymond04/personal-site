<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types.ts';

	export let additional: Search[];
	export let index: number;
</script>

<button
	class="flex content-center hover:cursor-pointer"
	on:click={() => {
		additional.splice(index, 1);
		additional = additional;
	}}
>
	<iconify-icon icon="ic:baseline-remove-circle-outline" class="text-xl" />
</button>
