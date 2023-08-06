<script>
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';

	export let lang;
	export let text;

	let formatted = hljs.highlight(text, { language: lang }).value;
</script>

<div class="my-2 p-2 bg-gray-700 rounded-md">
	<pre class="whitespace-pre-wrap"><code>{@html formatted}</code></pre>
</div>
