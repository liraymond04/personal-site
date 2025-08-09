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
	<!-- Google Fonts - Inter -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
	<!-- Font Awesome for icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9I+P8W2U8yY5KkK3s9Rj1+T3H6s6xG3K6V+R0/KjJ0z4l5wL4VlE5g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<div class="bg-gray-900 text-gray-200 min-h-screen" style="font-family: 'Inter', sans-serif;">
	<Header />
	<main class="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
		<slot />
	</main>
	<Footer />
</div>
