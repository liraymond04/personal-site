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

<ul
	class="my-4"
	bind:this={element}
	style:list-style-type={depth % 3 === 0 ? 'disc' : depth % 3 === 1 ? 'circle' : 'square'}
>
	<slot />
</ul>

<style>
	ul {
		list-style-type: disc;
		padding-left: 1rem;
	}
</style>
