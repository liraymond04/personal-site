<script>
	import Social from '$lib/ui/social/social.svelte';
</script>

<svelte:head>
	<title>liraymond04</title>
	<meta name="description" content="Welcome to Raymond Li's personal site, a Computer Science and Mathematics major at the University of British Columbia (UBC). Discover my latest projects, professional background, blog posts, and insights. Explore my portfolio, connect with me, and learn more about my passions and expertise.">
</svelte:head>

<div class="flex flex-col space-y-8 max-w-2xl mx-auto py-16 px-4">
	<div class="sm:hidden mx-auto">
		<img class="max-h-48 rounded-full" src="./images/pfp.jpg" alt="pfp" />
	</div>
	<div class="flex justify-between items-center px-2">
		<div class="hidden sm:flex">
			<img class="max-h-48 rounded-full" src="./images/pfp.jpg" alt="pfp" />
		</div>
		<div class="flex flex-col space-y-2 text-2xl sm:text-4xl mx-auto sm:mx-0">
			<div>Hi, I'm Raymond Li,</div>
			<div>I write code sometimes</div>
			<Social size={72} />
		</div>
	</div>
</div>
