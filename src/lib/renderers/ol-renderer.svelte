<script lang="ts">
	import { onMount } from 'svelte';

	let element: HTMLElement;
	let depth = 0;

	onMount(() => {
		let parent = element.parentElement;
		while (parent) {
			if (parent.tagName === 'OL' || parent.tagName === 'UL') depth++;
			parent = parent.parentElement;
		}
	});
</script>

<ol
	bind:this={element}
	start={$$props.start}
	style:list-style-type={depth % 3 === 0
		? 'decimal'
		: depth % 3 === 1
		? 'lower-roman'
		: 'lower-alpha'}
>
	<slot />
</ol>

<style>
	ol {
		list-style-type: decimal;
		padding-left: 1rem;
	}
</style>
