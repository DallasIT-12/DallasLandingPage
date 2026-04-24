import { MetadataRoute } from 'next';
import { customBoxProducts } from '@/data/customBoxProducts';

const BASE_URL = 'https://dallas-printingid.com';

/**
 * Generates realistic, differentiated lastModified dates.
 * Google uses lastmod accuracy as a trust signal — having all URLs with the
 * exact same timestamp causes Google to IGNORE lastmod entirely.
 * 
 * Each content type gets a different base date, reflecting when it was
 * last meaningfully updated. Update these dates when content actually changes.
 */
const LAST_UPDATED = {
    homepage: new Date('2026-04-24'),
    staticPages: new Date('2026-04-15'),
    categories: new Date('2026-04-16'),
    products: new Date('2026-04-22'),
    articles: new Date('2026-02-06'),
    layanan: new Date('2026-04-08'),
};

// Per-article last updated dates for more accurate sitemap
const ARTICLE_DATES: Record<string, Date> = {
    'jasa-cetak-kotak-rokok-map-buku-instansi': new Date('2026-02-06'),
    'panduan-memilih-paper-tray-box-nasi': new Date('2026-02-06'),
    'cara-memilih-box-hampers-bakery': new Date('2026-02-06'),
    'panduan-lengkap-cetak-kemasan': new Date('2026-04-02'),
    'ide-box-hampers-lebaran-natal': new Date('2026-02-06'),
    'ukuran-box-nasi-katering': new Date('2026-02-06'),
    'cetak-kotak-rokok-duplex': new Date('2026-02-06'),
    'ide-bisnis-tren-2026': new Date('2026-02-06'),
    'kemasan-ramah-lingkungan': new Date('2026-02-06'),
    'kertas-ivory': new Date('2026-02-06'),
    'offset-vs-digital': new Date('2026-02-06'),
};

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['id', 'en', 'zh'];

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/products',
        '/paperlisens',
        '/tools',
        '/tools/image-compressor',
        '/faq',
        '/articles',
        '/karir',
    ];

    const staticEntries = staticRoutes.flatMap((route) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}${route}`,
            lastModified: route === '' ? LAST_UPDATED.homepage : LAST_UPDATED.staticPages,
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
        'duplex',
        'kraft-paper',
    ];

    const categoryEntries = categorySlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/produk/${slug}`,
            lastModified: LAST_UPDATED.categories,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    );

    // 3. Product Routes
    // product URL pattern: /[locale]/products/[slug]
    const productEntries = customBoxProducts.flatMap((product) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/products/${product.slug}`,
            lastModified: LAST_UPDATED.products,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    );

    // 4. Article Routes
    const articleSlugs = Object.keys(ARTICLE_DATES);

    const articleEntries = articleSlugs.flatMap((slug) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/articles/${slug}`,
            lastModified: ARTICLE_DATES[slug] || LAST_UPDATED.articles,
            changeFrequency: 'monthly' as const,
            priority: slug === 'panduan-lengkap-cetak-kemasan' ? 0.95 : 0.7,
        }))
    );

    // 5. Landing Page Routes (/layanan/)
    const layananSlugs = [
        'percetakan-offset-kediri',
        'cetak-kemasan-custom',
        'cetak-packaging-skincare',
    ];

    const layananEntries = layananSlugs.flatMap((slug) =>
        ['id', 'en'].map((locale) => ({
            url: `${BASE_URL}/${locale}/layanan/${slug}`,
            lastModified: LAST_UPDATED.layanan,
            changeFrequency: 'weekly' as const,
            priority: 0.95,
        }))
    );

    return [...staticEntries, ...categoryEntries, ...productEntries, ...articleEntries, ...layananEntries];
}

