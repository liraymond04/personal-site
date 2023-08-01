<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	const close = (e: CustomEvent<MouseEvent>) => {
		const et = e.target as HTMLInputElement;
		if (et.hasAttribute('open')) et.removeAttribute('open');
	};

	const closelink = (e: MouseEvent) => {
		const et = e.target as HTMLInputElement;
		const menu = et.parentElement?.parentElement?.parentElement;
		if (menu) menu.removeAttribute('open');
	};
</script>

<li><a href="/projects">Projects</a></li>

<li><a href="/resume">Resume</a></li>

<li tabindex="0" role="tab">
	<details use:clickoutside on:clickoutside={close}>
		<summary>Articles</summary>
		<ul class="p-2">
			<li><a href="/articles/technical" on:click={closelink}>Technical</a></li>
			<li><a href="/articles/personal" on:click={closelink}>Personal</a></li>
		</ul>
	</details>
</li>
