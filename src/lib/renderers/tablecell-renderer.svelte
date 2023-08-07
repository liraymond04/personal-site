<script lang="ts">
	export let header: boolean;
	export let align: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined | null;
</script>

{#if header}
	<th class="p-2" {align}><slot /></th>
{:else}
	<td class="p-2" {align}><slot /></td>
{/if}

<style>
	th, td {
		border: 1px solid;
		text-align: left;
	}
</style>
