<script lang="ts">
	import Header from '$lib/ui/header/header.svelte';
	import Footer from '$lib/ui/footer/footer.svelte';
	import '../app.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	$: {
		if (browser) {
			window.dataLayer = window.dataLayer || [];
			window.gtag = function gtag() {
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());

			window.gtag('config', 'G-CVCZVRFDHJ', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-CVCZVRFDHJ"></script>
</svelte:head>

<div class="flex flex-col h-screen">
	<Header />
	<div class="mb-auto">
		<slot />
	</div>
	<Footer />
</div>
