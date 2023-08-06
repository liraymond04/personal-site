<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import CodeRenderer from '$lib/renderers/code-renderer.svelte';
	import CodespanRenderer from '$lib/renderers/codespan-renderer.svelte';
	import HeadingRenderer from '$lib/renderers/heading-renderer.svelte';
	import ParagraphRenderer from '$lib/renderers/paragraph-renderer.svelte';
	import ListRenderer from '$lib/renderers/list-renderer.svelte';
	import ListitemRenderer from '$lib/renderers/listitem-renderer.svelte';

	export let data;

	let source = data.props.markdownContent;
</script>

<SvelteMarkdown
	{source}
	renderers={{
		heading: HeadingRenderer,
		paragraph: ParagraphRenderer,
		list: ListRenderer,
		listitem: ListitemRenderer,
		code: CodeRenderer,
		codespan: CodespanRenderer
	}}
/>
