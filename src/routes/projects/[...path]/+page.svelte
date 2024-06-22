<script lang="ts">
	import Markdown from '$lib/ui/markdown/markdown.svelte';

	export let data;

	$: source = data.props.markdownContent;
</script>

<Markdown {source} />
