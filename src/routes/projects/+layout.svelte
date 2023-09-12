<script lang="ts">
	import Sidebar from './sidebar.svelte';

	export let data;
</script>

<div class="flex">
	<div class="hidden sm:flex shrink-0 w-[240px] my-2">
		<Sidebar root={data.props.root} />
	</div>

	<main class="sm:max-w-[calc(100vw-240px)] w-full">
		<div class="sm:hidden w-full">
			<Sidebar root={data.props.root} />
		</div>
		<div class="mx-6 my-2">
			<slot />
		</div>
	</main>
</div>
