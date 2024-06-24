<script lang="ts">
	import Markdown from '$lib/ui/markdown/markdown.svelte';
	import { writable } from 'svelte/store';

	export let data;

	$: title = $$props.data.path.replace(/^.*[\\/]/, '')

	let source = writable(null);
	let description = writable(
		"Explore Raymond Li's projects as a Computer Science and Mathematics major at the University of British Columbia (UBC), showcasing skills in software development, algorithms, and problem-solving."
	);

	$: (async () => {
		const result = await data.streaming.data;
		source.set(result?.props.markdownContent);

		description.set(result?.props?.metadata?.description || $description);
	})();
</script>

<svelte:head>
	<title>{title} | liraymond04</title>
	<meta name="description" content={`${$description}`} />
</svelte:head>

{#await data.streaming.data}
	<div class="p-8 flex justify-center">
		<span class="loading loading-spinner loading-lg" />
	</div>
{:then source}
	<Markdown source={source?.props.markdownContent} />
{/await}
