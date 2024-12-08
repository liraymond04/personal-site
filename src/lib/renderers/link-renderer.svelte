<script lang="ts">
	import { page } from '$app/stores';

	export let id;
	export let href;
	export let title;
	export let onclick;
	let _class = $$props.class;

	function isRelativeUrl(url: string) {
		// A URL is considered relative if it does not start with a scheme like 'http://' or 'https://'
		return !/^(?:[a-z]+:)?\/\//i.test(url);
	}

	const normalizePath = (path: string) => path.replace(/[\\/]+/g, '/');

	const isAnchorLink = (url: string) => url.startsWith('#');

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

	const handleClick = (event: Event) => {
		if (isAnchorLink(href)) {
			event.preventDefault();

			const targetElement = document.querySelector(href);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}

			if (onclick) {
				onclick(event);
			}
		}
	};
</script>

<a
	{id}
	href={!isRelativeUrl(href) ? href : normalizePath(`${dir}/${href}`)}
	{title}
	class={`link-base visited:link-visit link-hover ${
		isAnchorLink(href) && !_class?.includes('data-footnote-backref') ? 'data-footnote-ref' : ''
	} ${_class ? _class : ''}`}
	target={!isRelativeUrl(href) ? '_blank' : ''}
	on:click={handleClick}
>
	<slot />
</a>

<style>
	.data-footnote-ref::before {
		content: '[';
	}

	.data-footnote-ref::after {
		content: ']';
	}
</style>
