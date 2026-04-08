import { Metadata } from 'next';
import KertasIvoryClient from '@/components/page/articles/KertasIvoryClient';

export const metadata: Metadata = {
  title: 'Perbedaan Bahan Kertas Ivory dan Art Paper - Standar Food Grade',
  description: 'Pelajari perbedaan mendasar antara kertas Ivory dan Art Paper. Mana yang food grade? Mana yang tepat untuk kemasan produk Anda?',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/kertas-ivory',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/kertas-ivory',
      'en': 'https://dallas-printingid.com/en/articles/kertas-ivory',
      'x-default': 'https://dallas-printingid.com/id/articles/kertas-ivory',
    },
  },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Perbedaan Bahan Kertas Ivory dan Art Paper - Standar Food Grade",
    "description": "Pelajari perbedaan mendasar antara kertas Ivory dan Art Paper. Mana yang food grade?",
    "image": "https://dallas-printingid.com/BAHAN-IVORY.webp",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/kertas-ivory" }
};

export default function KertasIvoryPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <KertasIvoryClient />
        </>
    );
}