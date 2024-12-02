<script lang="ts">
	const products = [
		{ id: 1, name: 'Product 1', image: 'https://via.placeholder.com/300x150' },
		{ id: 2, name: 'Product 2', image: 'https://via.placeholder.com/300x150' },
		{ id: 3, name: 'Product 3', image: 'https://via.placeholder.com/300x150' },
		{ id: 4, name: 'Product 4', image: 'https://via.placeholder.com/300x300' },
		{ id: 5, name: 'Product 5', image: 'https://via.placeholder.com/300x150' },
		{ id: 6, name: 'Product 6', image: 'https://via.placeholder.com/300x150' },
		{ id: 7, name: 'Product 7', image: 'https://via.placeholder.com/300x150' },
		{ id: 8, name: 'Product 8', image: 'https://via.placeholder.com/300x300' },
		{ id: 9, name: 'Product 9', image: 'https://via.placeholder.com/300x150' }
	];
</script>

<div class="mx-auto mb-16 mt-[72px] flex w-full max-w-6xl flex-col gap-8">
	<h1 class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C]">
		All products
	</h1>

	<!-- Section 1: 3 horizontal -->
	<div class="grid grid-cols-3 gap-4">
		{#each products.slice(0, 3) as product}
			<div class="overflow-hidden rounded-lg">
				<img
					src={product.image}
					alt={product.name}
					class="h-auto w-full rounded-lg border border-gray-200"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{product.name}</p>
			</div>
		{/each}
	</div>

	<!-- Section 2: 2 vertical + 1 horizontal -->
	<div class="grid grid-cols-3 gap-4">
		<!-- Vertical section with two stacked images -->
		<div class="flex h-[565px] flex-col gap-4">
			<div class="h-[50%] overflow-hidden rounded-lg">
				<img
					src={products[3].image}
					alt={products[3].name}
					class="h-full w-full rounded-lg border border-gray-200 object-cover"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{products[3].name}</p>
			</div>
			<div class="h-[50%] overflow-hidden rounded-lg">
				<img
					src={products[4].image}
					alt={products[4].name}
					class="h-full w-full rounded-lg border border-gray-200 object-cover"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{products[4].name}</p>
			</div>
		</div>

		<!-- Horizontal item spanning 2 columns -->
		<div class="col-span-2 h-[565px] overflow-hidden rounded-lg">
			<img
				src={products[5].image}
				alt={products[5].name}
				class="h-full w-full rounded-lg border border-gray-200 object-cover"
			/>
			<p class="mt-2 text-center text-sm text-gray-600">{products[5].name}</p>
		</div>
	</div>

	<!-- Section 3: 1 horizontal + 2 vertical -->
	<div class="grid grid-cols-3 gap-4">
		<!-- Horizontal item spanning 2 columns -->
		<div class="col-span-2 h-[565px] overflow-hidden rounded-lg">
			<img
				src={products[6].image}
				alt={products[6].name}
				class="h-full w-full rounded-lg border border-gray-200 object-cover"
			/>
			<p class="mt-2 text-center text-sm text-gray-600">{products[6].name}</p>
		</div>

		<!-- Vertical section with two stacked images -->
		<div class="flex h-[565px] flex-col gap-4">
			<div class="h-[50%] overflow-hidden rounded-lg">
				<img
					src={products[7].image}
					alt={products[7].name}
					class="h-full w-full rounded-lg border border-gray-200 object-cover"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{products[7].name}</p>
			</div>
			<div class="h-[50%] overflow-hidden rounded-lg">
				<img
					src={products[8].image}
					alt={products[8].name}
					class="h-full w-full rounded-lg border border-gray-200 object-cover"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{products[8].name}</p>
			</div>
		</div>
	</div>

	<!-- Section 4: 3 horizontal -->
	<div class="grid grid-cols-3 gap-4">
		{#each products.slice(0, 3) as product}
			<div class="overflow-hidden rounded-lg">
				<img
					src={product.image}
					alt={product.name}
					class="h-auto w-full rounded-lg border border-gray-200"
				/>
				<p class="mt-2 text-center text-sm text-gray-600">{product.name}</p>
			</div>
		{/each}
	</div>

	<!-- TODO: Pagination	-->
</div>
