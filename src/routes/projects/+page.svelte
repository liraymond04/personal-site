<script lang="ts">
	export let data;
	$: items = data.props.items;

	let search = '';
</script>

<h1>Projects</h1>

<input bind:value={search} type="text" class="mx-4 mt-4" placeholder="Search..." />

<div class="m-4">
	{#each items.filter((item) => {
		if (search === '') return true;
		return item?.keywords?.includes(search);
	}) as item}
		<a class="flex flex-col hover:cursor-pointer hover:underline" href={`/projects/${item.path}`}
			>{item.path}</a
		>
	{/each}
</div>
