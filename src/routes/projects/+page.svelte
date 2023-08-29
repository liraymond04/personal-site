<script lang="ts">
	import Fuse from 'fuse.js';

	export let data;

	let path = true,
		tags = true,
		keywords = true;

	$: fuse = new Fuse(data.props.items, {
		keys: [...(path ? ['path'] : []), ...(tags ? ['tags'] : []), ...(keywords ? ['keywords'] : [])]
	});

	let search = '';
	$: results = fuse.search(search).map((i) => i.item);

	$: items = search ? results : data.props.items;
</script>

<h1>Projects</h1>

<div class="flex flex-wrap items-center space-x-2 mx-4 mt-4">
	<input bind:value={search} type="text" placeholder="Search..." class="h-8" />
	<div class="py-4">
		<button
			on:click={() => {
				path = !path;
			}}
			class={`p-1 h-auto rounded ${path && 'bg-gray-700'}`}>path</button
		>
		<button
			on:click={() => {
				tags = !tags;
			}}
			class={`p-1 h-auto rounded ${tags && 'bg-gray-700'}`}>tags</button
		>
		<button
			on:click={() => {
				keywords = !keywords;
			}}
			class={`p-1 h-auto rounded ${keywords && 'bg-gray-700'}`}>keywords</button
		>
	</div>
</div>

<div class="m-4">
	{#each items as item}
		<a class="flex flex-col hover:cursor-pointer hover:underline" href={`/projects/${item.path}`}
			>{item.path}</a
		>
	{/each}
</div>
