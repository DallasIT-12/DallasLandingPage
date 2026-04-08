import { Metadata } from 'next';
import OffsetVsDigitalClient from '@/components/page/articles/OffsetVsDigitalClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset vs Digital Printing: Mana yang Lebih Untung?',
  description: 'Panduan memilih antara offset dan digital printing untuk bisnis Anda. Pelajari kelebihan, kekurangan, dan kapan harus menggunakan masing-masing.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/offset-vs-digital',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/offset-vs-digital',
      'en': 'https://dallas-printingid.com/en/articles/offset-vs-digital',
      'x-default': 'https://dallas-printingid.com/id/articles/offset-vs-digital',
    },
  },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Percetakan Offset vs Digital Printing: Mana yang Lebih Untung?",
    "description": "Panduan memilih antara offset dan digital printing untuk bisnis Anda.",
    "image": "https://dallas-printingid.com/artikel%20(3).png",
    "datePublished": "2025-11-26",
    "dateModified": "2026-04-08",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/offset-vs-digital" }
};

export default function OffsetVsDigitalPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <OffsetVsDigitalClient />
        </>
    );
}
