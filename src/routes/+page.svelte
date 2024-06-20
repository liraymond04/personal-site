<script>
	import Social from '$lib/ui/social/social.svelte';
</script>

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
	
	<!-- <div class="hidden sm:flex shrink-0 w-[240px] my-2"> -->
	<!-- 	<Sidebar root_dir="" root_item={data.props.root} /> -->
	<!-- </div> -->
	<!---->
	<!-- <main class="sm:max-w-[calc(100vw-240px)] w-full"> -->
	<!-- 	<div class="sm:hidden w-full"> -->
	<!-- 		<Sidebar root_dir="" root_item={data.props.root} /> -->
	<!-- 	</div> -->
	<!-- 	<div class="mx-6 my-2"> -->
	<!-- 		<slot /> -->
	<!-- 	</div> -->
	<!-- </main> -->
</div>
