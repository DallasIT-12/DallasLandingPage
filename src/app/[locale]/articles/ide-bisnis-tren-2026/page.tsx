import { Metadata } from 'next';
import IdeBisnisClient from '@/components/page/articles/IdeBisnisClient';

export const metadata: Metadata = {
  title: 'Tips Desain Kemasan Produk Agar Menarik & 7 Ide Bisnis Tren 2026',
  description: 'Pelajari 7 ide bisnis yang sedang tren di tahun 2026 beserta tips desain kemasan yang menarik untuk meningkatkan penjualan produk Anda.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/ide-bisnis-tren-2026',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/ide-bisnis-tren-2026',
      'en': 'https://dallas-printingid.com/en/articles/ide-bisnis-tren-2026',
      'x-default': 'https://dallas-printingid.com/id/articles/ide-bisnis-tren-2026',
    },
  },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tips Desain Kemasan Produk Agar Menarik & 7 Ide Bisnis Tren 2026",
    "description": "Pelajari 7 ide bisnis yang sedang tren di tahun 2026 beserta tips desain kemasan yang menarik.",
    "image": "https://dallas-printingid.com/artikel%20(1).png",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/ide-bisnis-tren-2026" }
};

export default function IdeBisnisPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <IdeBisnisClient />
        </>
    );
}
