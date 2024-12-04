/// <reference types="stripe-event-types" />

import stripe from 'stripe';

class StripeService {
  /** @type {import('stripe').Stripe} */
  client;

  constructor() {
    this.client = stripe(process.env.STRIPE_SECRET_KEY);
  }

  /**
   * @param {import('stripe').stripe.Checkout.SessionCreateParams.LineItem[]} lineItems
   * @param {string} successUrl
   * @param {string} failureUrl
   */
  async createSession(lineItems, successUrl, failureUrl) {
    return await this.client.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: failureUrl,
      mode: 'payment',
    });
  }
}

export default StripeService;
