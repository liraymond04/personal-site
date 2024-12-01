<script lang="ts">
	import { page } from '$app/stores';

	export let id;
	export let href;
	export let title;

	function isRelativeUrl(url: string) {
		// A URL is considered relative if it does not start with a scheme like 'http://' or 'https://'
		return !/^(?:[a-z]+:)?\/\//i.test(url);
	}

	const normalizePath = (path: string) => path.replace(/[\\/]+/g, '/');

	if (isRelativeUrl(href) && href.endsWith('/index.md')) {
		href = href.replace('/index.md', '');
	}

	if (isRelativeUrl(href) && href.endsWith('.md')) {
		href = '../' + href.replace('.md', '');
	}

	$: dir = '';

	$: {
		const { url } = $page;
		dir = url.pathname;
	}
</script>

<a
	{id}
	href={!isRelativeUrl(href) ? href : normalizePath(`${dir}/${href}`)}
	{title}
	class="link-base visited:link-visit link-hover"
	target={!isRelativeUrl(href) ? '_blank' : ''}
>
	<slot />
</a>
