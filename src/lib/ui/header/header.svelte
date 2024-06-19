<script lang="ts">
	import Items from './items.svelte';
	import { clickoutside } from '@svelte-put/clickoutside';

	let clicked = false;

	const close = (e: MouseEvent | KeyboardEvent) => {
		const et = e.target as HTMLInputElement;
		if (clicked && document.activeElement instanceof HTMLElement) {
			if (et.localName == 'summary') return;
			document.activeElement.blur();
			clicked = false;
		} else {
			clicked = true;
		}
	};
</script>

<div class="m-2 z-50">
	<div class="navbar bg-base-100 rounded-lg drop-shadow-lg">
		<div class="grow-0 w-[50%]">
			<div
				class="dropdown"
				tabindex="0"
				role="button"
				on:click={close}
				on:keypress={close}
				use:clickoutside
				on:clickoutside={() => {
					clicked = false;
				}}
			>
				<!-- hamburger menu icon -->
				<div tabindex="0" class="btn btn-ghost pointer-events-none sm:hidden" role="tab">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					role="menu"
				>
					<Items />
				</ul>
			</div>
			<a class="btn btn-ghost normal-case text-xl" href="/">liraymond04</a>
		</div>
		<div class="grow shrink-0 justify-center hidden sm:flex">
			<ul class="menu menu-horizontal px-1" role="menu">
				<Items />
			</ul>
		</div>
		<!-- divider to force last component to rightmost end -->
		<div class="sm:hidden grow" />
		<div class="grow-0 w-[50%] justify-end">
			<a class="btn" href="/about">About</a>
		</div>
	</div>
</div>
