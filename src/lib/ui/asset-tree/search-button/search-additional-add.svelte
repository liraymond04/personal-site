<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types.ts';
	import Fuse from 'fuse.js';
	/* eslint-disable */
	// @ts-ignore
	import Popover from 'svelte-popover';
	import 'iconify-icon';

	export let additional: Search[];
	export let data;
	export let keys;
</script>

<Popover arrowColor="#374151" overlayColor="#00000000" action="click">
	<button slot="target" class="flex h-[30px] content-center items-center">
		<iconify-icon icon="ic:baseline-add-circle-outline" class="text-xl" />
	</button>
	<div slot="content" class="flex space-x-2 rounded bg-gray-700 -ml-1 p-2">
		<button
			on:click={() => {
				additional.push({
					val: '',
					path: true,
					tags: true,
					keywords: true,
					function: 'and',
					fuse: new Fuse(data, {
						keys: keys
					})
				});
				additional = additional;
			}}
		>
			AND
		</button>
		<button
			on:click={() => {
				additional.push({
					val: '',
					path: true,
					tags: true,
					keywords: true,
					function: 'or',
					fuse: new Fuse(data, {
						keys: keys
					})
				});
				additional = additional;
			}}
		>
			OR
		</button>
	</div>
</Popover>
