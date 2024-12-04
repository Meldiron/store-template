<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Cart } from '../../../utils/products';
	import { Button } from '$lib/components/ui/button';

	let cartItems = cart.allItems();

	cart.subscribe((items) => (cartItems = items));

	function updateCart(cartItem: Cart, action: 'add' | 'remove' | 'delete') {
		switch (action) {
			case 'add':
				cart.updateCount(cartItem.product, cartItem.size, cartItem.count + 1);
				break;

			case 'remove':
				if (cartItem.count >= 1) {
					cart.updateCount(cartItem.product, cartItem.size, cartItem.count - 1);
				} else {
					cart.removeItem(cartItem.product, cartItem.size);
				}
				break;

			case 'delete':
				cart.removeItem(cartItem.product, cartItem.size);
				break;

			default:
				throw new Error(`Invalid action: ${action}`);
		}
	}
</script>

<div class="mt-8 flex h-full w-full flex-col">
	<div class="no-scrollbar flex flex-col gap-2 overflow-auto pb-24">
		{#each cartItems as cartItem}
			{@const product = cartItem.product}
			<div class="flex h-fit flex-col items-start gap-6 rounded-lg bg-white p-3 md:flex-row">
				<img
					class="h-[124px] w-full flex-shrink-0 rounded-lg object-cover md:w-[199px]"
					src={product.imageUrls[0]}
					alt={product.name}
				/>

				<div class="flex w-full flex-1 flex-col justify-between gap-6 md:gap-10">
					<!-- top meta -->
					<div class="flex flex-col gap-2">
						<div class="flex flex-wrap items-center justify-between">
							<span class="font-inter text-[16px] font-medium text-[#2D2D31]">{product.name}</span>
							<span class="product-price">${product.price.toFixed(2)}</span>
						</div>

						<p class="text-sm text-gray-600">
							{#each product.features as feature, index}
								<span
									>{feature.name}: {cartItem.features[
										feature.name
									]}{#if index !== product.features.length - 1},&nbsp;{/if}
								</span>
							{/each}
						</p>
					</div>

					<!-- bottom actions -->
					<div class="flex flex-wrap justify-between">
						<div
							class="inline-flex w-fit items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-2 py-1"
						>
							<button
								aria-label="Add item"
								on:click={() => {
									updateCart(cartItem, 'add'); // add one
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M10 5C10.5523 5 11 5.44772 11 6V9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10C5 9.44771 5.44772 9 6 9L9 9V6C9 5.44771 9.44771 5 10 5Z"
										fill="#97979B"
									/>
								</svg>
							</button>

							{cartItem.count}

							<button
								aria-label="Remove item"
								on:click={() => {
									updateCart(cartItem, 'remove'); // remove one, if 0, remove from cart
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
										fill="#97979B"
									/>
								</svg>
							</button>
						</div>

						<div
							class="flex h-[34px] w-[32px] flex-shrink-0 items-center justify-center gap-[12px] rounded-lg border border-gray-300 bg-white px-[6px] py-[10px]"
						>
							<button
								aria-label="Remove item from cart"
								on:click={() => {
									updateCart(cartItem, 'delete');
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="18"
									viewBox="0 0 16 18"
									fill="none"
								>
									<path
										d="M10.2833 6.50019L9.995 14.0002M6.005 14.0002L5.71667 6.50019M14.0233 3.82519C14.3083 3.86852 14.5917 3.91436 14.875 3.96352M14.0233 3.82519L13.1333 15.3944C13.097 15.8654 12.8842 16.3053 12.5375 16.6262C12.1908 16.9471 11.7358 17.1253 11.2633 17.1252H4.73667C4.26425 17.1253 3.80919 16.9471 3.46248 16.6262C3.11578 16.3053 2.90299 15.8654 2.86667 15.3944L1.97667 3.82519M14.0233 3.82519C13.0616 3.67979 12.0948 3.56944 11.125 3.49436M1.97667 3.82519C1.69167 3.86769 1.40833 3.91352 1.125 3.96269M1.97667 3.82519C2.93844 3.67979 3.9052 3.56944 4.875 3.49436M11.125 3.49436V2.73102C11.125 1.74769 10.3667 0.92769 9.38333 0.896857C8.46135 0.867389 7.53865 0.867389 6.61667 0.896857C5.63333 0.92769 4.875 1.74852 4.875 2.73102V3.49436M11.125 3.49436C9.04477 3.33359 6.95523 3.33359 4.875 3.49436"
										stroke="#818186"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col justify-center gap-4 p-4 text-center">
				<h2 class="text-lg font-semibold text-gray-700">Your cart is empty</h2>
				<p class="text-sm text-gray-500">Looks like you haven’t added anything to your cart yet.</p>
			</div>
		{/each}
	</div>

	{#if cartItems.length}
		<Button class="sticky bottom-0 flex justify-center" on:click={() => console.log('Checkout')}>
			Checkout
		</Button>
	{/if}
</div>

<style>
	.product-price {
		color: #56565c;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;
	}
</style>
