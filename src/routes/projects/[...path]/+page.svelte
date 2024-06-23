<script lang="ts">
	import Markdown from '$lib/ui/markdown/markdown.svelte';

	export let data;
</script>

{#await data.streaming.data}
	<div class="p-8 flex justify-center">
		<span class="loading loading-spinner loading-lg" />
	</div>
{:then source}
	<Markdown source={source?.props.markdownContent} />
{/await}
