<script lang="ts">
	import seedRandom from 'seedrandom';
	import RowItem from '$lib/components/grid/RowItem.svelte';
	import { type Product, products } from '../../../utils/products';

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();

	const randomInstance = seedRandom(product.slug);

	const getRelatedProducts = (products: Product[], product: Product, count: number = 3) => {
		const sameCategoryItem = products.find(
			(prod) =>
				prod.slug !== product.slug &&
				prod.categories.some((category) => product.categories.includes(category))
		);

		let relatedProducts: Product[] = [];
		if (sameCategoryItem) {
			relatedProducts.push(sameCategoryItem);

			const otherCategoryItems = products.filter(
				(prod) =>
					prod.slug !== product.slug &&
					!prod.categories.some((category) => product.categories.includes(category))
			);

			const shuffledOtherCategories = [...otherCategoryItems].sort(() => randomInstance() - 0.5);
			relatedProducts.push(...shuffledOtherCategories.slice(0, count - 1));
		} else {
			const shuffledProducts = [...products.filter((prod) => prod.slug !== product.slug)].sort(
				() => randomInstance() - 0.5
			);
			relatedProducts = shuffledProducts.slice(0, count);
		}

		return relatedProducts;
	};

	let relatedProducts = $derived(getRelatedProducts(products, product, 3));
</script>

<div class="m-8 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 md:px-16 lg:px-16">
	<h1
		class="font-inter text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] dark:text-[#e6e6e3]"
	>
		More products
	</h1>

	<!-- Related Products Horizontal Scroll -->
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
		{#each relatedProducts as horizontalProduct}
			<RowItem product={horizontalProduct} />
		{/each}
	</div>
</div>
