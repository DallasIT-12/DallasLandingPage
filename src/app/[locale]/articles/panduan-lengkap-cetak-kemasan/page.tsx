import { Metadata } from 'next';
import PanduanLengkapClient from '@/components/page/articles/PanduanLengkapClient';

export const metadata: Metadata = {
    title: 'Panduan Lengkap Cetak Kemasan & Atribut Bisnis: Dari Box Makanan hingga Kotak Rokok',
    description: 'Panduan lengkap cetak kemasan, packaging makanan, hampers, dan atribut bisnis perkantoran. Temukan vendor cetak terbaik untuk meningkatkan nilai jual produk Anda.',
    keywords: [
        'Panduan Lengkap Cetak Kemasan',
        'Cetak box hampers custom satuan terdekat',
        'Cetak box nasi laminasi tahan uap panas',
        'Cetak box kue kering bahan ivory premium',
        'Minimum order cetak box rokok custom logo sendiri',
        'Jasa cetak map rekam medis rumah sakit',
        'Vendor cetak kalender meja 2027 murah',
        'Cetak buku tahunan sekolah kualitas offset',
        'Harga paperbag sablon vs offset untuk hajatan'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/panduan-lengkap-cetak-kemasan',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/panduan-lengkap-cetak-kemasan',
            'en': 'https://dallas-printingid.com/en/articles/panduan-lengkap-cetak-kemasan',
            'x-default': 'https://dallas-printingid.com/id/articles/panduan-lengkap-cetak-kemasan',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Panduan Lengkap Cetak Kemasan & Atribut Bisnis: Dari Box Makanan hingga Kotak Rokok",
    "description": "Panduan lengkap cetak kemasan, packaging makanan, hampers, dan atribut bisnis perkantoran.",
    "image": "https://dallas-printingid.com/artikel%20(1).jpg",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/panduan-lengkap-cetak-kemasan" }
};

export default function PanduanLengkapPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <PanduanLengkapClient />
        </>
    );
}
