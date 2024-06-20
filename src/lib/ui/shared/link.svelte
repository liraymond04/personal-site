<script lang="ts">
	export let newtab = false;
</script>

<a
	href={$$restProps.href || ''}
	class={`link-base link-hover ${$$restProps.class}`}
	target={newtab ? '_blank' : ''}><slot /></a
>
