<script lang="ts">
	import Markdown from '$lib/ui/markdown/markdown.svelte';
	import Giscus from '@giscus/svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	export let data;

	$: title = $$props.data.path.replace(/^.*[\\/]/, '');

	let source = writable(null);
	let description = writable(
		"CN to EN translations for Re:Zero side stories"
	);

	$: (async () => {
		const result = await data.streaming.data;
		if (result?.props?.is_file) {
			goto(result?.props?.download_url);
		}

		source.set(result?.props.markdownContent);

		description.set(result?.props?.metadata?.description || $description);
	})();
</script>

<svelte:head>
	<title>{title} | liraymond04</title>
	<meta name="description" content={`${$description}`} />
</svelte:head>

{#await data.streaming.data}
	<div class="p-8 flex justify-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{:then source}
	{#if source?.props.is_file}
		<!-- Custom rendering for file download page -->
	{:else}
		<Markdown source={source?.props.markdownContent} layout={source?.props.metadata?.layout} />
		<div class="py-8">
			<Giscus
				id="comments"
				repo="liraymond04/personal-site-comments"
				repoId="R_kgDONXNuZA"
				category="Announcements"
				categoryId="DIC_kwDONXNuZM4CkxfG"
				mapping="pathname"
				term="Welcome to @giscus/svelte component!"
				strict="1"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="transparent_dark"
				lang="en"
			/>
		</div>
	{/if}
{/await}
