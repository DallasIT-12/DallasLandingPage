import { MetadataRoute } from 'next';
import { customBoxProducts } from '@/data/customBoxProducts';

const BASE_URL = 'https://dallas-printingid.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['id', 'en', 'zh'];

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/products',
        '/paperlisens',
        '/tools',
        '/contact', // Assuming contact page exists based on standard practices, though not explicitly seen in file list. If not, it will just 404 which is fine for now or I can double check. 
        // Wait, let me check the file list again. 
        // I saw 'about', 'articles', 'maintenance', 'paperlisens', 'products', 'produk', 'tools'.
        // 'contact' was not in the list. I will remove it to be safe.
    ];

    // Refined static routes based on file list
    const refinedStaticRoutes = [
        '',
        '/about',
        '/products',
        '/paperlisens',
        '/tools',
        // '/produk' removed as it is not a valid page, only /produk/[slug] exists
    ];

    const staticEntries = refinedStaticRoutes.flatMap((route) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    // 2. Product Category Routes (from /produk/[slug])
    const categorySlugs = [
        'kotak-hampers',
        'kotak-bakery',
        'rokok',
        'kotak-nasi',
        'buku',
        'kalender',
        'paperbag',
        'map',
        'brosur',
        // Materials
        'art-paper',
        'ivory-paper',
        'bahan-tipping',
        'duplex'
    ];

    const categoryEntries = categorySlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/produk/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }))
    );

    // 3. Product Routes
    // product URL pattern: /[locale]/products/[slug]
    const productEntries = customBoxProducts.flatMap((product) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }))
    );

    // 3. Article Routes
    // I detected these folders in [locale]/articles: 
    // - ide-bisnis-tren-2026
    // - kemasan-ramah-lingkungan
    // - kertas-ivory
    // - offset-vs-digital

    const articleSlugs = [
        'ide-bisnis-tren-2026',
        'kemasan-ramah-lingkungan',
        'kertas-ivory',
        'offset-vs-digital',
    ];

    const articleEntries = articleSlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/articles/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    return [...staticEntries, ...categoryEntries, ...productEntries, ...articleEntries];
}
