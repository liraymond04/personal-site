<script lang="ts">
	import Sidebar from '$lib/ui/sidebar/sidebar.svelte';

	export let data;
</script>

<div class="flex pb-12">
	<div class="hidden sm:flex shrink-0 w-[340px] my-2">
		<Sidebar root_dir="" root_item={data.props.root} />
	</div>

	<main class="sm:max-w-[calc(100vw-340px)] w-full">
		<div class="sm:hidden w-full">
			<Sidebar root_dir="" root_item={data.props.root} />
		</div>
		<div class="mx-6 my-2">
			<slot />
		</div>
	</main>
</div>
