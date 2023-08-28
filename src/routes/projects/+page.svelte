<script lang="ts">
	import Fuse from 'fuse.js'

	export let data;
	
	const fuse = new Fuse(data.props.items, {
		keys: ['path', 'tags', 'keywords']
	})

	let search = '';
	$: results = fuse.search(search).map(i => i.item)

	$: items = search ? results : data.props.items
</script>

<h1>Projects</h1>

<input bind:value={search} type="text" class="mx-4 mt-4" placeholder="Search..." />

<div class="m-4">
	{#each items as item}
		<a class="flex flex-col hover:cursor-pointer hover:underline" href={`/projects/${item.path}`}
			>{item.path}</a
		>
	{/each}
</div>
