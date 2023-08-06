<script lang="ts">
	export let raw: string;
</script>

<code class="p-1 bg-gray-700 rounded-md">{raw.replace(/`/g, '')}</code>
