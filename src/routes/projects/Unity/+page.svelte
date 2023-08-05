<script lang="ts">
	let books = [
		{
			bookName: 'Eye of the World',
			author: 'Robert Jordan'
		},
		{
			bookName: 'The Great Hunt',
			author: 'Robert Jordan'
		},
		{
			bookName: 'The Dragon Reborn',
			author: 'Robert Jordan'
		}
	];
</script>

<h1>Unity index</h1>

{#each books as book}
	<div class="flex">
		{book.bookName}
		-
		{book.author}
	</div>
{/each}
