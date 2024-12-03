<script lang="ts">
	import { page } from '$app/stores';

	const categories = ['All Products', 'Tops', 'Sweaters', 'Socks', 'Shoes', 'Accessories'];

	$: selectedCategory = $page.url.searchParams.get('category') || 'All Products';
</script>

<div class="mx-auto mt-[88px] flex w-full items-center justify-center gap-[12px]">
	{#each categories as category}
		<a
			data-sveltekit-noscroll
			href={`?category=${category}`}
			class="item cursor-pointer font-inter text-[14px] leading-[19.6px] tracking-[-0.063px] text-[#56565C]"
			class:is-selected={selectedCategory === category}
		>
			{category}
		</a>
	{/each}
</div>

<style>
	.item {
		display: flex;
		position: relative;
		padding: 0 var(--space-4, 8px);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-2, 4px);
		text-decoration: none;
	}

	.item::after {
		width: 90%;
		content: '';
		left: 50%;
		bottom: -4px;
		height: 1.2px;
		position: absolute;
		transform-origin: center;
		transform: translateX(-50%) scaleX(0);
		background-color: transparent;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
	}

	.is-selected {
		font-weight: 500;
		color: var(--color-fgColor-neutral-primary, #2d2d31);
	}

	.is-selected::after {
		transform: translateX(-50%) scaleX(1);
		background-color: var(--color-fgColor-neutral-primary, #2d2d31);
	}
</style>
