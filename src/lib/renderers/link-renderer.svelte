<script lang="ts">
	import { page } from '$app/stores';

	export let href = '';
	export let title: string | undefined = undefined;

	function isExternalURL(url: string) {
		// Create a URL object from the given URL string
		const link = new URL(url, window.location.origin);

		// Check if the hostname of the link is different from the current site's hostname
		return link.hostname !== window.location.hostname;
	}

	if (!isExternalURL(href) && href.endsWith('/index.md')) {
		href = href.replace('/index.md', '')
	}

	if (!isExternalURL(href) && href.endsWith('.md')) {
		href = '../' + href.replace('.md', '')
	}

	$: dir = ''

	$: {
		const { url } = $page;
		dir = url.pathname
	}
</script>

<a
	href={isExternalURL(href) ? href : `${dir}/${href}`}
	{title}
	class="link-base visited:link-visit link-hover"
	target={isExternalURL(href) ? '_blank' : ''}
>
	<slot />
</a>

<style>
</style>
