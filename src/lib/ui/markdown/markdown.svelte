<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	import HeadingRenderer from '$lib/renderers/heading-renderer.svelte';
	import ParagraphRenderer from '$lib/renderers/paragraph-renderer.svelte';
	import LinkRenderer from '$lib/renderers/link-renderer.svelte';
	import ListRenderer from '$lib/renderers/list-renderer.svelte';
	import ListitemRenderer from '$lib/renderers/listitem-renderer.svelte';
	import TableRenderer from '$lib/renderers/table-renderer.svelte';
	import TablebodyRenderer from '$lib/renderers/tablebody-renderer.svelte';
	import TablecellRenderer from '$lib/renderers/tablecell-renderer.svelte';
	import TableheadRenderer from '$lib/renderers/tablehead-renderer.svelte';
	import TablerowRenderer from '$lib/renderers/tablerow-renderer.svelte';
	import CodeRenderer from '$lib/renderers/code-renderer.svelte';
	import CodespanRenderer from '$lib/renderers/codespan-renderer.svelte';
	import BlockquoteRenderer from '$lib/renderers/blockquote-renderer.svelte';

	import EmojiConverter from 'emoji-js';

	const emoji = new EmojiConverter();
	emoji.replace_mode = 'unified';

	export let source;

	$: parsed = emoji.replace_colons(source);
</script>

<SvelteMarkdown
	source={parsed}
	renderers={{
		heading: HeadingRenderer,
		paragraph: ParagraphRenderer,
		link: LinkRenderer,
		list: ListRenderer,
		listitem: ListitemRenderer,
		table: TableRenderer,
		tablebody: TablebodyRenderer,
		tablecell: TablecellRenderer,
		tablehead: TableheadRenderer,
		tablerow: TablerowRenderer,
		code: CodeRenderer,
		codespan: CodespanRenderer,
		blockquote: BlockquoteRenderer
	}}
/>
