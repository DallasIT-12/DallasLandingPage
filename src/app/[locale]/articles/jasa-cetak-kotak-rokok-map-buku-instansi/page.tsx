import { Metadata } from 'next';
import JasaCetakB2BClient from '@/components/page/articles/JasaCetakB2BClient';

export const metadata: Metadata = {
    title: 'Jasa Cetak Kotak Rokok, Map Perusahaan & Buku | Solusi B2B Offset',
    description: 'Layanan cetak B2B untuk kotak rokok custom, map perusahaan, dan buku dengan teknologi offset. Dapatkan solusi cetak profesional untuk kebutuhan bisnis Anda.',
    keywords: [
        'Jasa Cetak Kotak Rokok',
        'Map Perusahaan Custom',
        'Cetak Buku Offset',
        'solusi cetak B2B',
        'cetak rokok custom logo'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/jasa-cetak-kotak-rokok-map-buku-instansi',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/jasa-cetak-kotak-rokok-map-buku-instansi',
            'en': 'https://dallas-printingid.com/en/articles/jasa-cetak-kotak-rokok-map-buku-instansi',
            'x-default': 'https://dallas-printingid.com/id/articles/jasa-cetak-kotak-rokok-map-buku-instansi',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Jasa Cetak Kotak Rokok, Map Perusahaan & Buku | Solusi B2B Offset",
    "description": "Layanan cetak B2B untuk kotak rokok custom, map perusahaan, dan buku dengan teknologi offset.",
    "image": "https://dallas-printingid.com/custom%20rokok%203.webp",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/jasa-cetak-kotak-rokok-map-buku-instansi" }
};

export default function JasaCetakB2BPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <JasaCetakB2BClient />
        </>
    );
}
