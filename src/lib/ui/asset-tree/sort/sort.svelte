<script lang="ts">
	import type { SearchItem } from '../sidebar/types';

	export let items: SearchItem[];
	export let sort: string;

	$: if (sort === 'ascending') {
		items = items.sort((a, b) => a.path.localeCompare(b.path));
	}

	$: if (sort === 'descending') {
		items = items.sort((a, b) => -1 * a.path.localeCompare(b.path));
	}

	$: if (sort === 'date-newest') {
		items = items.sort((a, b) => {
			if (!a.date) {
				if (!b.date) {
					return -1;
				}
				return 1;
			}
			if (!b.date) return -1;
			const c = Date.parse(a.date.toString());
			const d = Date.parse(b.date.toString());
			return c - d;
		});
	}

	$: if (sort === 'date-oldest') {
		items = items.sort((a, b) => {
			if (!a.date) {
				if (!b.date) {
					return -1;
				}
				return 1;
			}
			if (!b.date) return -1;
			const c = Date.parse(a.date.toString());
			const d = Date.parse(b.date.toString());
			return -1 * (c - d);
		});
	}
</script>

<div class="{$$restProps.class || ''}">
	<label for="sort">Sort by:</label>
	<select bind:value={sort} name="sort" id="sort" class="p-2 rounded">
		<option value="ascending">Ascending (A-Z)</option>
		<option value="descending">Descending (Z-A)</option>
		<option value="date-newest">Date (newest)</option>
		<option value="date-oldest">Date (oldest)</option>
	</select>
</div>
