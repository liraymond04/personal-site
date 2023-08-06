<script>
	import Sidebar from '$lib/ui/sidebar/sidebar.svelte';
</script>

<Sidebar
	root_dir=""
	root_item={{
		name: 'projects',
		children: [
			{ name: 'index' },
			{ name: 'Monopoly-Java' },
			{
				name: 'olc',
				children: [
					{ name: 'index' },
					{ name: 'olc-bresenham' },
					{ name: 'olc-dijkstra' },
					{ name: 'olc-rts' }
				]
			},
			{
				name: 'Unity',
				children: [
					{ name: 'index' },
					{ name: 'ball-game' },
					{ name: 'hexagonal-grid' },
					{ name: 'modular-third-person-shooter' }
				]
			}
		]
	}}
/>
