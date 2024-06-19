<script lang="ts">
	import type { Search } from '$lib/ui/sidebar/types';
	import { SearchButton, SearchAdditionalAdd, SearchAdditionalRemove } from '$lib/ui/asset-tree';

	export let additional: Search[];
	export let keys: string[];
	export let data;
</script>

<div class="{$$restProps.class || ''}">
	<div class="flex flex-col space-y-2">
		{#each additional as search, index}
			{#if index !== 0}
				<div>
					{search.function.toUpperCase()}
				</div>
			{/if}
			<div class="flex flex-wrap content-center items-center space-x-2">
				<input
					bind:value={search.val}
					type="text"
					placeholder="Search..."
					class="h-8 p-2 rounded"
				/>
				<div class="py-2">
					<SearchButton bind:search bind:search_item={search.path} data={data.props.items}
						>path</SearchButton
					>
					<SearchButton bind:search bind:search_item={search.tags} data={data.props.items}
						>tags</SearchButton
					>
					<SearchButton bind:search bind:search_item={search.keywords} data={data.props.items}
						>keywords</SearchButton
					>
				</div>
				{#if index === 0}
					<SearchAdditionalAdd bind:additional data={data.props.items} {keys} />
				{/if}
				{#if index !== 0}
					<SearchAdditionalRemove bind:additional {index} />
				{/if}
			</div>
		{/each}
	</div>
</div>
