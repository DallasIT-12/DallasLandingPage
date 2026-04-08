import { Metadata } from 'next';
import KemasanRamahClient from '@/components/page/articles/KemasanRamahClient';

export const metadata: Metadata = {
  title: 'Kemasan Kertas vs Plastik: Solusi Packaging Ramah Lingkungan',
  description: 'Kenapa kemasan kertas lebih baik daripada plastik? Pelajari dampak lingkungan dan keunggulan beralih ke packaging berbahan kertas.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
      'en': 'https://dallas-printingid.com/en/articles/kemasan-ramah-lingkungan',
      'x-default': 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
    },
  },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kemasan Kertas vs Plastik: Solusi Packaging Ramah Lingkungan",
    "description": "Kenapa kemasan kertas lebih baik daripada plastik? Pelajari dampak lingkungan dan keunggulan beralih ke packaging berbahan kertas.",
    "image": "https://dallas-printingid.com/artikel%20(2).png",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan" }
};

export default function KemasanRamahLingkunganPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <KemasanRamahClient />
        </>
    );
}
