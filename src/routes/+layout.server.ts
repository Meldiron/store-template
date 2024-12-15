export const load = async ({ cookies }) => {
	const cartTotal = cookies.get('cart-total');

	return {
		cartTotal: cartTotal ? parseInt(cartTotal, 10) : 0
	};
};
