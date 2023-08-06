<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import CodeRenderer from '$lib/renderers/code-renderer.svelte';
	import CodespanRenderer from '$lib/renderers/codespan-renderer.svelte';
	import HeadingRenderer from '$lib/renderers/heading-renderer.svelte';
	import ParagraphRenderer from '$lib/renderers/paragraph-renderer.svelte';
	import OrderedlistitemRenderer from '$lib/renderers/orderedlistitem-renderer.svelte';
	import UnorderedlistitemRenderer from '$lib/renderers/unorderedlistitem-renderer.svelte';

	export let data;

	let source = data.props.markdownContent;
</script>

<SvelteMarkdown
	{source}
	renderers={{
		code: CodeRenderer,
		codespan: CodespanRenderer
	}}
/>