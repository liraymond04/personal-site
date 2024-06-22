<blockquote class="p-2 bg-gray-700 border-gray-500 rounded-md">
	<slot />
</blockquote>

<style>
	blockquote {
		border-left-width: 6px;
	}

	blockquote :global(:first-child) {
		margin-top: 0;
	}

	blockquote :global(:last-child) {
		margin-bottom: 0;
	}
</style>
