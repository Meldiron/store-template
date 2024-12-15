import { products } from '../../utils/products';
import { categories, filterOptions } from '../store';

export async function GET({ url }) {
	const body = sitemap(url, websitePages());
	const response = new Response(body);
	response.headers.set('Content-Type', 'application/xml');
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	return response;
}

const websitePages = () => {
	const productPages = products.map((product) => `product-${product.slug}`);
	const encodedFilters = filterOptions.map(
		(filter) => `?filter=${encodeURIComponent(filter.value)}`
	);

	const encodedCategories = categories.map(
		(category) => `?category=${encodeURIComponent(category)}`
	);

	const paginatedPages = [];
	const totalPages = Math.ceil(productPages.length / 12);

	for (let page = 1; page <= totalPages; page++) {
		paginatedPages.push(`?page=${page}`);
	}

	// first empty item for the main site
	return ['', ...paginatedPages, ...encodedCategories, ...encodedFilters, ...productPages];
};

const sitemap = (url: URL, pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${url.origin}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;
