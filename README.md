# Store template

A modern template designed for online stores with a mobile-friendly interface, customizable theme, and an integrated payments using Stripe.

## Showcase

### 1. Homepage

Paginated list of products with featured picture, name, price, and available discount. Products can be sorted by multiple parameters, or filtered by categories.

### 2. Product details

Product gallery with detailed description and ability to configure and select variations. Product can be added to the cart, or purchased with 1 click.

### 3. Cart and checkout

Slideover cart with overview of products, price summary, and ability to modify quantity of products in cart. Checkout button to continue to payment step.

### 4. Payment and shipping

Stripe-managed page with all payment and delivery views. The receipt is sent by email automatically after a successful payment.

## Highlight

### 1. Image optimization

[BlurHash](https://github.com/woltapp/blurhash) technology (commonly known from Wolt app) optimizes application experience and looks while images are still loading. A very useful improvement for use on mobile devices with limited internet access and speed.

### 2. Dark theme

Theme toggle in footer allows visitors to switch to dark theme when browsing during night. Developer can easily enforce a theme, set default theme, or remove the feature all-together.

### 3. Performance, accessibility and SEO

Near-perfect Lighthouse score to ensure great accessibility for people with disabilities, and SEO optimizations to ensure search engines can scan the website with ease.

## Useful links

- Site settings: [src/routes/store.ts](./src/routes/store.ts)
- Products list: [src/utils/products.ts](./src/utils/products.ts)
- Products pictures: [static/images/products](./static/images/products)
- Site footer: [src/lib/components/footer/Footer.svelte](./src/lib/components/footer/Footer.svelte)
- Logo: [static/logo.svg](./static/logo.svg) and [static/favicon.ico](./static/favicon.ico)
- OG image (preview thumbnail): [static/thumbnail.png](./static/thumbnail.png)

## Technologies

We use [Svelte](https://svelte.dev/docs/svelte/overview) and [SvelteKit](https://svelte.dev/docs/kit/introduction) as a web framework with [TypeScript](https://www.typescriptlang.org/) codebase.

CSS framework [TailwindCSS](https://tailwindcss.com/) and UI library [shadcn-svelte](https://www.shadcn-svelte.com/) are used for all styling needs.

Financial and payments infrastructure [Stripe](https://stripe.com/en-cz) to collect (not only) card payments, generate invoices, send receipt, calculate VAT, make reports, and much more.

All of backend needs such as saving the cart contents, or validating cart before payment is covered by [Appwrite](https://appwrite.io/).

## Tips and tricks

- Product description supports [Markdown](https://www.markdownguide.org/) syntax
- Convert product images to `.webp` or `.avif` formats for best loading speed of your site
- Never use images with resolution greater than 1080p
- Before production use, connect to analytics tool such as [Plausible](https://plausible.io/) or [Google Analytics](https://marketingplatform.google.com/about/analytics/)

## Local development

1. Install dependencies with `npm install` (or `pnpm install` or `yarn`)
2. Start a development server with `npm run dev` (or `pnpm dev` or `yarn dev`)
3. Visit [localhost:5173](http://localhost:5173/)

## Deploy to production

When used with Appwrite, all changes to `main` branch are automatically deployed to production.

Otherwise, use `npm run build` (or `pnpm build` or `yarn build`), and deploy as Node.js server with entrypoint `./build/index.js`.
