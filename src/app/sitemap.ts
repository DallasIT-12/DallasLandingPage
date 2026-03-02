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
        '/tools/image-compressor',
        '/faq',
        '/articles',
        '/karir',
    ];

    const staticEntries = staticRoutes.flatMap((route) =>
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
            priority: 0.9, // Increased priority for individual product categories for local SEO
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

    // 4. Article Routes
    const articleSlugs = [
        'jasa-cetak-kotak-rokok-map-buku-instansi',
        'panduan-memilih-paper-tray-box-nasi',
        'cara-memilih-box-hampers-bakery',
        'panduan-lengkap-cetak-kemasan',
        'ide-box-hampers-lebaran-natal',
        'ukuran-box-nasi-katering',
        'cetak-kotak-rokok-duplex',
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
            priority: slug === 'panduan-lengkap-cetak-kemasan' ? 0.95 : 0.7, // Highest priority for the main pillar article
        }))
    );

    return [...staticEntries, ...categoryEntries, ...productEntries, ...articleEntries];
}
