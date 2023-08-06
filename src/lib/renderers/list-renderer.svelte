<script lang="ts">
	import { onMount } from 'svelte';

	export let ordered: boolean;
	export let start: number;

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

{#if ordered}
	<ol
		bind:this={element}
		{start}
		style:list-style-type={depth % 3 === 0
			? 'decimal'
			: depth % 3 === 1
			? 'lower-roman'
			: 'lower-alpha'}
	>
		<slot />
	</ol>
{:else}
	<ul
		bind:this={element}
		style:list-style-type={depth % 3 === 0 ? 'disc' : depth % 3 === 1 ? 'circle' : 'square'}
	>
		<slot />
	</ul>
{/if}

<style>
	ol {
		list-style-type: decimal;
		padding-left: 1rem;
	}
	ul {
		list-style-type: disc;
		padding-left: 1rem;
	}
</style>
