<script lang="ts">
	import RowItem from '$lib/components/grid/RowItem.svelte';
	import { type Product, products } from '../../../utils/products';

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();

	const relatedProducts = products.filter((prod) =>
		prod.categories.some((category) => product.categories.includes(category))
	);

	const getRandomProducts = (items: Product[], count: number) => {
		const shuffled = [...items].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	};

	const randomRelatedProducts = getRandomProducts(relatedProducts, 3);
</script>

<div class="m-8 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 md:px-16 lg:px-16">
	<h1 class="font-inter text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C]">
		More products
	</h1>

	<!-- Related Products Horizontal Scroll -->
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
		{#each randomRelatedProducts as horizontalProduct}
			<RowItem product={horizontalProduct} doReload />
		{/each}
	</div>
</div>
