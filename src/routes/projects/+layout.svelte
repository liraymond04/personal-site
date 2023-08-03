<script>
	import Items from './items.svelte';
</script>

<div class="grid gap-2 grid-cols-[200px_auto]">
	<div class="hidden sm:flex">
		<Items />
	</div>

	<main>
		<div class="sm:hidden">
			<Items />
		</div>
		<div class="mx-6 my-2">
		<slot />
		</div>
	</main>
</div>
