<script lang="ts">
	import Sidebar from '$lib/ui/sidebar/sidebar.svelte';
	import { onMount } from 'svelte';

	export let data;

	let articleElement: HTMLElement;
	$: articleWidth = 0;
	$: screenWidth = window.innerWidth;

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth;
	};

	onMount(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (articleElement) {
				articleWidth = articleElement.offsetWidth;
			}
		});

		window.addEventListener('resize', updateScreenWidth);

		if (articleElement) {
			resizeObserver.observe(articleElement);
		}

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', updateScreenWidth);
		};
	});

	$: centeredArticleWidth = (screenWidth - articleWidth) / 2 - 340;
</script>

<div class="flex pb-12">
	<div class="hidden sm:flex shrink-0 w-[340px] my-2">
		<Sidebar root_dir="" root_item={data.props.root} />
	</div>

	<main class="sm:max-w-[calc(100vw-340px)] w-full" style="padding-left: {centeredArticleWidth}px;">
		<div class="sm:hidden w-full">
			<Sidebar root_dir="" root_item={data.props.root} />
		</div>
		<div class="mx-6 my-2 max-w-4xl" bind:this={articleElement}>
			<slot />
		</div>
	</main>
</div>
