import { Metadata } from 'next';
import PaperTrayBoxNasiClient from '@/components/page/articles/PaperTrayBoxNasiClient';

export const metadata: Metadata = {
    title: 'Panduan Memilih Paper Tray dan Box Nasi | Solusi Anti Bocor & Food Grade',
    description: 'Panduan lengkap memilih paper tray dan box nasi food grade yang tahan minyak, anti bocor, dan aman untuk makanan panas.',
    keywords: [
        'Panduan Memilih Paper Tray',
        'Box Nasi Food Grade',
        'paper tray anti bocor',
        'box nasi laminasi tahan panas',
        'cetak box nasi custom'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
            'en': 'https://dallas-printingid.com/en/articles/panduan-memilih-paper-tray-box-nasi',
            'x-default': 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Panduan Memilih Paper Tray dan Box Nasi | Solusi Anti Bocor & Food Grade",
    "description": "Panduan lengkap memilih paper tray dan box nasi food grade yang tahan minyak, anti bocor.",
    "image": "https://dallas-printingid.com/kotak%20nasi%20(1).webp",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi" }
};

export default function PanduanPaperTrayPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <PaperTrayBoxNasiClient />
        </>
    );
}
