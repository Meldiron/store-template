<script lang="ts">
	import { onMount } from 'svelte';
	import CartRowItem from './CartRowItem.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { Button } from '$lib/components/ui/button';

	function getDiscount(): number {
		return cart.getItems().reduce((total, cartItem) => {
			const discount = cartItem.product.discount || 0;

			if (!discount) {
				return total;
			}

			const discountedPrice = cartItem.product.price || 0;
			const originalPrice = discountedPrice / (1 - discount);

			return total + (originalPrice - discountedPrice) * cartItem.quantity;
		}, 0);
	}

	function getTotal(): number {
		return cart
			.getItems()
			.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);
	}

	let discounts = $derived(
		cart.getItems().reduce((total, cartItem) => {
			const discount = cartItem.product.discount || 0;
			const originalPrice = cartItem.product.price / (1 - discount);
			return total + originalPrice * discount * cartItem.quantity;
		}, 0)
	);

	onMount(() => {
		// scroll to the last item if one exits,
		// this makes the list appear not being cut off at the bottom, right above the cart details.
		if (cart.getTotalItems() > 1) {
			const lastCartItem = cart.getItems().at(-1);
			if (lastCartItem) {
				document.getElementById(lastCartItem.slug)?.scrollIntoView();
			}
		}
	});
</script>

<div class="mt-4 flex min-h-1 w-full flex-grow flex-col">
	<div class="flex flex-grow flex-col gap-2 overflow-y-auto pb-4">
		{#each cart.getItems() as cartItem}
			<CartRowItem {cartItem} />
		{:else}
			<div class="flex flex-col justify-center gap-4 p-4 text-center">
				<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</h2>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Looks like you haven't added anything to your cart yet.
				</p>
			</div>
		{/each}
	</div>

	{#if cart.getTotalItems() > 0}
		<div class="mt-4 flex w-full flex-col gap-6">
			<div class="total-section flex flex-col gap-3">
				<div class="flex flex-wrap items-center justify-between">
					<span class="font-inter text-[16px] font-medium text-[#97979B] dark:text-[#5F5F63]"
						>Subtotal</span
					>
					<span class="product-price">${(getTotal() + getDiscount()).toFixed(2)}</span>
				</div>

				{#if discounts > 0}
					<div class="flex flex-wrap items-center justify-between">
						<span class="font-inter text-[16px] font-medium text-[#97979B] dark:text-[#5F5F63]"
							>Discounts</span
						>
						<span class="product-price">-${getDiscount().toFixed(2)}</span>
					</div>
				{/if}

				<div class="flex flex-wrap items-center justify-between">
					<span class="font-inter text-[16px] font-medium text-[#97979B] dark:text-[#5F5F63]"
						>Shipping</span
					>
					<span class="product-price">Calculated at next step</span>
				</div>

				<hr />

				<div class="flex flex-wrap items-center justify-between">
					<span class="font-inter text-[16px] font-medium text-[#2D2D31] dark:text-[#d1d1cd]"
						>Total</span
					>
					<span class="product-price text-[#2D2D31] dark:text-[#d1d1cd]"
						>${getTotal().toFixed(2)}</span
					>
				</div>
			</div>

			<form method="POST" action="/api/checkout">
				<input
					type="hidden"
					name="cart"
					value={JSON.stringify(
						cart.getItems().map((item) => ({
							slug: item.product.slug.split('_')[0],
							quantity: item.quantity,
							features: item.features
						}))
					)}
				/>
				<Button type="submit" class="w-full">Checkout</Button>
			</form>
		</div>
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

	:global(html.dark .product-price) {
		color: #a3a3a0;
	}
</style>
