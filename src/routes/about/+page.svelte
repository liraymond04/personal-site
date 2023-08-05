<script>
	import Sidebar from '$lib/ui/sidebar/sidebar.svelte';
</script>

<h1>About page</h1>

<Sidebar
	root_dir="/about"
	root_item={{
		name: 'root',
		children: [
			{ name: 'test' },
			{ name: 'test1' },
			{ name: 'test2' },
			{
				name: 'test3',
				children: [
					{
						name: 'test4'
					},
					{
						name: 'test5'
					}
				]
			},
			{ name: 'test6', children: [] },
			{ name: 'test7' },
			{ name: 'test8', children: [] },
			{
				name: 'test9',
				children: [
					{
						name: 'test10',
						children: [
							{
								name: 'test11'
							}
						]
					},
					{
						name: 'test12'
					}
				]
			}
		]
	}}
/>
