<script lang="ts">
	import Header from '$lib/ui/header/header.svelte';
	import Footer from '$lib/ui/footer/footer.svelte';
	import '../app.css';
</script>

<div class="flex flex-col h-screen">
	<Header />
	<div class="mb-auto">
		<slot />
	</div>
	<Footer />
</div>
