<script lang="ts">
	let span_class = $$props.class;

	const is_katex = span_class === 'katex';
</script>

{#if is_katex}
	<div class="p-2 flex justify-center items-center">
		<span {...$$props}>
			<slot />
		</span>
	</div>
{:else}
	<span {...$$props}>
		<slot />
	</span>
{/if}
