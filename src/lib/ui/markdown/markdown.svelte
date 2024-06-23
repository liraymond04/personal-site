<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import type { Plugin } from 'svelte-exmarkdown';

	import EmojiConverter from 'emoji-js';

	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	import rehypeHighlight from 'rehype-highlight';

	import * as Headings from '$lib/renderers/headings';
	import CodeRenderer from '$lib/renderers/code-renderer.svelte';
	import KatexRenderer from '$lib/renderers/katex-renderer.svelte';
	import CodespanRenderer from '$lib/renderers/codespan-renderer.svelte';
	import BlockquoteRenderer from '$lib/renderers/blockquote-renderer.svelte';
	import ParagraphRenderer from '$lib/renderers/paragraph-renderer.svelte';
	import TableRenderer from '$lib/renderers/table-renderer.svelte';
	import LinkRenderer from '$lib/renderers/link-renderer.svelte';
	import ThRenderer from '$lib/renderers/th-renderer.svelte';
	import TdRenderer from '$lib/renderers/td-renderer.svelte';
	import OlRenderer from '$lib/renderers/ol-renderer.svelte';
	import UlRenderer from '$lib/renderers/ul-renderer.svelte';
	import LiRenderer from '$lib/renderers/li-renderer.svelte';

	import 'katex/dist/katex.min.css';
	import 'highlight.js/styles/atom-one-dark.css';

	const plugins: Plugin[] = [
		gfmPlugin(),
		{ rehypePlugin: [rehypeHighlight] },
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] },
		{
			renderer: {
				h1: Headings.H1,
				h2: Headings.H2,
				h3: Headings.H3,
				h4: Headings.H4,
				h5: Headings.H5,
				h6: Headings.H6,
				p: ParagraphRenderer,
				table: TableRenderer,
				th: ThRenderer,
				td: TdRenderer,
				ol: OlRenderer,
				ul: UlRenderer,
				li: LiRenderer,
				a: LinkRenderer,
				blockquote: BlockquoteRenderer,
				pre: CodeRenderer,
				code: CodespanRenderer,
				span: KatexRenderer
			}
		}
	];

	const emoji = new EmojiConverter();
	emoji.replace_mode = 'unified';

	export let source;

	$: parsed = emoji.replace_colons(source);
</script>

<Markdown md={parsed} {plugins} />
