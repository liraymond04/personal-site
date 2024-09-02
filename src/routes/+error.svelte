<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page?.status || "Error"} | liraymond04</title>
	<meta name="description" content={`${$page.error?.message || "Something went wrong"}`} />
</svelte:head>

<div class="p-8">
	<div class="error-page">
		<div class="status">{$page?.status}</div>
		<div class="message">{$page.error?.message}</div>
	</div>
</div>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.status {
		font-size: 6rem;
		font-weight: bold;
	}

	.message {
		font-size: 1.5rem;
	}
</style>
