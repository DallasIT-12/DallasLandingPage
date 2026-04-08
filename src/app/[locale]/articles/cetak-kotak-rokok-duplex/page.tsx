import { Metadata } from 'next';
import ArtikelPendekClient from '@/components/page/articles/ArtikelPendekClient';

export const metadata: Metadata = {
    title: 'Jasa Cetak Kotak Rokok Murah Bahan Duplex | Minimum Order Custom',
    description: 'Cari jasa cetak kotak rokok murah bahan duplex? Dapatkan minimum order cetak box rokok custom logo sendiri dengan kualitas cetak offset.',
    keywords: ['Jasa cetak kotak rokok murah bahan duplex', 'minimum order cetak box rokok custom logo sendiri', 'cetak kemasan rokok'],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/cetak-kotak-rokok-duplex',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/cetak-kotak-rokok-duplex',
            'en': 'https://dallas-printingid.com/en/articles/cetak-kotak-rokok-duplex',
            'x-default': 'https://dallas-printingid.com/id/articles/cetak-kotak-rokok-duplex',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jasa Cetak Kotak Rokok Murah Bahan Duplex | Minimum Order Custom",
    "description": "Cari jasa cetak kotak rokok murah bahan duplex? Minimum order cetak box rokok custom logo sendiri.",
    "image": "https://dallas-printingid.com/artikel%20(1)%20(2).webp",
    "datePublished": "2026-02-25",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/cetak-kotak-rokok-duplex" }
};

export default function KotakRokokFAQPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <ArtikelPendekClient
                title="Jasa Cetak Kotak Rokok Murah Duplex & Syarat Minimum Order"
                date="25 Februari 2026"
                category="Bisnis Rokok"
                image="/artikel (1) (2).webp"
                productLink="/produk/rokok"
                productName="Kotak Kemasan Rokok"
                content={
                    <>
                        <p style={{ marginBottom: '24px' }}>Industri rokok kretek rumahan atau herbal terus bergeliat. Banyak pelaku usaha mencari <strong>jasa cetak kotak rokok murah bahan duplex</strong> untuk menekan biaya produksi tanpa mengorbankan kualitas packaging produk.</p>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: '#001D39' }}>Kertas Duplex untuk Kotak Rokok</h3>
                        <p style={{ marginBottom: '24px' }}>Kertas duplex adalah material standar untuk kemasan rokok di Indonesia karena harganya yang ekonomis namun memiliki ketebalan yang pas (biasanya 250gsm) untuk dibentuk menjadi box.</p>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: '#001D39' }}>Minimum Order Custom Label</h3>
                        <p style={{ marginBottom: '24px' }}>Bagi merek baru, mencetak ratusan ribu pcs langsung sangatlah berisiko. Oleh karena itu, penting untuk berdiskusi dengan vendor percetakan terkait <strong>minimum order cetak box rokok custom logo sendiri</strong> agar sesuai dengan kapasitas produksi awal pabrik Anda.</p>
                    </>
                }
            />
        </>
    );
}

