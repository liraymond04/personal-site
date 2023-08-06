<script>
	export let depth;
	export let raw;
	// export let text;
</script>

{#if depth === 1}
	<h1 class="my-8 text-4xl font-bold">
		<slot />
		<hr class="my-4 solid" />
	</h1>
{:else if depth === 2}
	<h2 class="my-8 text-2xl font-bold">
		<slot />
		<hr class="my-4 solid" />
	</h2>
{:else if depth === 3}
	<h3 class="my-8 text-xl font-bold">
		<slot />
	</h3>
{:else if depth === 4}
	<h4 class="my-8 font-bold">
		<slot />
	</h4>
{:else if depth === 5}
	<h5 class="my-8 text-sm font-bold">
		<slot />
	</h5>
{:else if depth === 6}
	<h6 class="my-8 text-xs font-bold">
		<slot />
	</h6>
{:else}
	{raw}
{/if}
