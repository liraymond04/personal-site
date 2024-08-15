<script lang="ts">
	import { onMount } from 'svelte';

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
				setTimeout(() => {
					updateCanvasWidth();
				}, 1000);
			};
			document.head.appendChild(script);
			window.addEventListener('resize', updateCanvasWidth);
		}
	});

	function updateCanvasWidth() {
		if (canvas) {
			canvas.style.width = '80%';
		}
	}
</script>

<svelte:head>
	<meta name="description" content="Demo page for AWA5.0 Raylib 3D Emscripten WASM build">
</svelte:head>

<body>
	<canvas class="canvas" bind:this={canvas} />
</body>

<style>
	.canvas {
		/* width: 100%; */
		padding-right: 0;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>
