<script lang="ts">
	import Items from './items.svelte';
</script>

<div class="flex">
	<div class="hidden sm:flex shrink-0 w-[240px] mx-4 my-2 ">
		<Items />
	</div>

	<main class="w-full">
		<div class="sm:hidden w-full">
			<Items />
		</div>
		<div class="mx-6 my-2">
			<slot />
		</div>
	</main>
</div>
