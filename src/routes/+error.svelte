<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page?.status || "Error"} | Raymond Li</title>
	<meta name="description" content={`${$page.error?.message || "Something went wrong"}`} />
</svelte:head>

<div class="py-16 md:py-24">
	<div class="max-w-2xl mx-auto text-center">
		<div class="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
			<div class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
				{$page?.status || "Error"}
			</div>
			<div class="text-xl md:text-2xl text-gray-300 mb-8">
				{$page.error?.message || "Something went wrong"}
			</div>
			<a href="/" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg inline-block">
				Go Home
			</a>
		</div>
	</div>
</div>
