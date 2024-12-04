import StripeService from './stripe.js';
import { throwIfMissing } from './utils.js';

export default async (context) => {
  const { req, res, error } = context;

  throwIfMissing(process.env, [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ]);

  const stripe = new StripeService();

  switch (req.path) {
    case '/checkout': {
      const fallbackUrl = req.scheme + '://' + req.headers['host'] + '/';

      const successUrl = req.body?.successUrl ?? fallbackUrl;
      const failureUrl = req.body?.failureUrl ?? fallbackUrl;

      const stripeSession = await stripe.createSession(
        req.body.lineItems,
        successUrl,
        failureUrl
      );
      if (!stripeSession) {
        error('Failed to create Stripe checkout session.');
        return res.redirect(failureUrl, 303);
      }

      return res.redirect(stripeSession.url, 303);
    }
    default:
      return res.text('Not Found', 404);
  }
};
