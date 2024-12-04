import { error, redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import { products, type Product } from '../../../utils/products';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import type { Cart, CartItem } from '$lib/stores/cart';

/**
 * Validates if the provided item conforms to the CartItem type.
 * Throws an error if validation fails.
 */
function validateCartItem(item: unknown): asserts item is CartItem {
	if (typeof item !== 'object' || item === null) {
		throw error(400, `Invalid basket item: ${JSON.stringify(item)}`);
	}

	const { slug, variation, quantity } = item as CartItem;
	if (typeof slug !== 'string') {
		throw error(400, `Invalid or missing productSlug in basket item: ${JSON.stringify(item)}`);
	}

	if (variation !== undefined && (typeof variation !== 'object' || variation === null)) {
		throw error(400, `Invalid variation in basket item: ${JSON.stringify(item)}`);
	}

	if (typeof quantity !== 'number' || quantity <= 0) {
		throw error(400, `Invalid quantity in basket item: ${JSON.stringify(item)}`);
	}
}

/**
 * Calculates the unit amount for a product, including any price modifications from variations.
 */
function calculateUnitAmountWithVariations(
	product: Product,
	variation: Record<string, string> | undefined
): number {
	let unitAmount = product.price;

	if (variation && product.features) {
		for (const feature of product.features) {
			const featureName = feature.name;
			const selectedVariation = variation[featureName];

			if (!selectedVariation) {
				throw error(400, `Missing variation for feature: "${featureName}"`);
			}

			const matchingVariation = feature.variations.find((v) => v.name === selectedVariation);
			if (!matchingVariation) {
				const validVariations = feature.variations.map((v) => v.name).join(', ');
				throw error(
					400,
					`Invalid variation for feature "${featureName}". Valid values are: ${validVariations}`
				);
			}

			unitAmount = matchingVariation.priceModifier(unitAmount, product, matchingVariation, feature);
		}
	}

	if (typeof unitAmount !== 'number' || isNaN(unitAmount) || unitAmount <= 0) {
		throw error(500, `Calculated unit amount for product "${product.name}" is invalid`);
	}

	return unitAmount;
}

/**
 * Converts a BasketItem into a Stripe LineItem for the checkout session.
 */
function convertToStripeLineItem(
	item: CartItem,
	origin: string
): Stripe.Checkout.SessionCreateParams.LineItem {
	const product = products.find((p) => p.slug === item.slug);
	if (!product) {
		throw error(404, `Product with slug "${item.slug}" does not exist`);
	}

	const unitAmount = calculateUnitAmountWithVariations(product, item.variation);

	return {
		price_data: {
			currency: 'usd',
			product_data: {
				name: product.name,
				description: product.description,
				images: product.imageUrls.map((url) => new URL(url, origin).href)
			},
			unit_amount: Math.round(unitAmount * 100)
		},
		quantity: item.quantity
	};
}

/**
 * Handles the POST request to create a Stripe checkout session.
 */
export async function POST({ request }) {
	const origin = request.headers.get('origin');
	if (!origin) {
		throw error(400, 'Missing "Origin" header');
	}

	let body;

	try {
		body = await request.json();
	} catch (e) {
		if (e instanceof SyntaxError) {
			throw error(400, 'Invalid request: Body must be a JSON object');
		} else {
			throw error(500, 'Internal server error: Failed to parse request body');
		}
	}

	if (!body || typeof body !== 'object' || !Array.isArray(body.cart) || body.cart.length === 0) {
		throw error(400, 'Invalid request: `cart` must be a non-empty array');
	}

	const cart: Cart = body.basket;
	cart.forEach(validateCartItem);

	if (!STRIPE_SECRET_KEY) {
		console.error('Stripe secret key is not configured');
		throw error(500, 'Internal server error: Stripe is not configured');
	}

	const stripe = new Stripe(STRIPE_SECRET_KEY);
	const lineItems = cart.map((item) => convertToStripeLineItem(item, origin));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: lineItems,
		mode: 'payment',
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/checkout/cancel`
	});

	if (!session?.url) {
		console.error('Stripe session creation failed:', session);
		throw error(500, 'Failed to create Stripe session');
	}

	return redirect(303, session.url);
}
