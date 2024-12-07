<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
	import type { Product } from '../../../utils/products';
	import { cart, type CartItem } from '$lib/stores/cart.svelte';

	interface Props {
		cartItem: CartItem;
	}

	let { cartItem }: Props = $props();

	const product: Product = cartItem.product;

	let isExpanded = $state(false);

	function toggleFeatures() {
		isExpanded = !isExpanded;
	}

	function updateCart(cartItem: CartItem, action: 'add' | 'remove' | 'delete') {
		switch (action) {
			case 'add':
				cart.updateQuantity(cartItem.product, cartItem.features, cartItem.quantity + 1);
				break;

			case 'remove':
				if (cartItem.quantity >= 1) {
					cart.updateQuantity(cartItem.product, cartItem.features, cartItem.quantity - 1);
				} else {
					cart.remove(cartItem.product, cartItem.features);
				}
				break;

			case 'delete':
				cart.remove(cartItem.product, cartItem.features);
				break;

			default:
				throw new Error(`Invalid action: ${action}`);
		}

		if (cart.getTotalItems() === 0 && cart.getIsOpen()) {
			cart.closeCart();
		}
	}
</script>

<div
	id={cartItem.slug}
	class="flex h-fit flex-col items-start gap-6 rounded-lg bg-white p-3 dark:bg-[#2c2c2f] md:flex-row"
>
	<img
		class="h-[124px] w-full flex-shrink-0 rounded-lg object-cover md:w-[199px]"
		src={'/images/products/' + product.images[0]}
		alt={product.name}
	/>

	<div class="flex w-full flex-1 flex-col justify-between gap-6 md:gap-10">
		<!-- top meta -->
		<div class="flex flex-col gap-2">
			<div class="flex w-full items-center justify-between">
				<span
					class="max-w-56 truncate font-inter text-[16px] font-medium text-[#2D2D31] dark:text-[#d1d1cd] md:max-w-36"
					>{product.name}</span
				>
				<span class="product-price flex-shrink-0"
					>${(cartItem.price * cartItem.quantity).toFixed(2)}</span
				>
			</div>

			<script>
				// Scoped toggle state for features
				let isExpanded = false;

				// Toggles the visibility of additional features
				function toggleFeatures() {
					isExpanded = !isExpanded;
				}
			</script>

			{#if product.features && product.features.length > 0}
				<div class="text-sm">
					<!-- Always show the first feature with the "More" button -->
					<div class="flex items-center">
						<span class="text-[#56565C] dark:text-[#A3A3A0]">
							{product.features[0].name}:
							<span class="font-medium">{cartItem.features[product.features[0].name]}</span>
						</span>

						<!-- "More" button -->
						{#if !isExpanded}
							<button
								onclick={toggleFeatures}
								class="ml-4 text-[#19191C] underline dark:text-[#e6e6e3]"
							>
								More
							</button>
						{/if}
					</div>

					<!-- Show additional features when expanded -->
					{#if isExpanded}
						<div class="mt-2 space-y-2">
							{#each product.features.slice(1) as feature, index (feature.name)}
								<div class="flex items-center">
									<span class="block text-[#56565C] dark:text-[#A3A3A0]">
										{feature.name}:
										<span class="font-medium">{cartItem.features[feature.name]}</span>
									</span>

									<!-- "Less" button on the last item -->
									{#if index === product.features.slice(1).length - 1}
										<button
											onclick={toggleFeatures}
											class="ml-4 text-[#19191C] underline dark:text-[#e6e6e3]"
										>
											Less
										</button>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- bottom actions -->
		<div class="flex flex-wrap justify-between">
			<div
				class="inline-flex w-fit items-center justify-center gap-3 rounded-lg border border-gray-300 px-2 py-1 dark:border-[#3F3F46]"
			>
				<button
					type="button"
					aria-label="Remove item"
					onclick={() => {
						updateCart(cartItem, 'remove');
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
							fill={theme.isDarkTheme() ? '#909094' : '#97979B'}
						/>
					</svg>
				</button>

				<span class="text-[#56565C] dark:text-[#A3A3A0]">
					{cartItem.quantity}
				</span>

				<button
					type="button"
					aria-label="Add item"
					onclick={() => {
						updateCart(cartItem, 'add');
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
							fill={theme.isDarkTheme() ? '#909094' : '#97979B'}
						/>
					</svg>
				</button>
			</div>

			<div
				class="flex h-[34px] w-[32px] flex-shrink-0 items-center justify-center gap-[12px] rounded-lg border border-gray-300 px-[6px] py-[10px] dark:border-[#3F3F46]"
			>
				<button
					type="button"
					aria-label="Remove item from cart"
					onclick={() => {
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
							stroke={theme.isDarkTheme() ? '#909094' : '#818186'}
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
