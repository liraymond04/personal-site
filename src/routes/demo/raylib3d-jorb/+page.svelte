<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement | undefined;
	let scriptLoaded = false;

	onMount(() => {
		if (canvas) {
			window.Module = { canvas: canvas };
		}

		if (!scriptLoaded) {
			const script = document.createElement('script');
			script.src = '/wasm/awa5_rs-wasm-raylib.js';
			script.onload = () => {
				scriptLoaded = true;
			};
			document.head.appendChild(script);
			window.addEventListener('resize', updateCanvasWidth);
		}

		// We know the canvas/window is initialized here
		function onTitleChange() {
			updateCanvasWidth();
		}

		const titleElement = document.querySelector('title');

		if (titleElement) {
			const observer = new MutationObserver(() => {
				onTitleChange();
			});

			observer.observe(titleElement, {
				childList: true,
				subtree: true,
				characterData: true
			});

			onDestroy(() => {
				observer.disconnect();
				window.removeEventListener('resize', updateCanvasWidth);
			});
		} else {
			console.error('Title element not found');
		}
	});

	function updateCanvasWidth() {
		if (canvas) {
			canvas.style.width = '80%';
		}
	}
</script>

<svelte:head>
	<title>AWA5.0 Raylib 3D | liraymond04</title>
	<meta name="description" content="Demo page for AWA5.0 Raylib 3D Emscripten WASM build" />
</svelte:head>

<body>
	<canvas class="canvas" bind:this={canvas} />
</body>

<style>
	.canvas {
		padding-right: 0;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>
