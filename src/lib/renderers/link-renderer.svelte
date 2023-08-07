<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
</script>

<a {href} {title} class="link-base visited:link-visit link-hover"><slot /></a>

<style>
</style>
