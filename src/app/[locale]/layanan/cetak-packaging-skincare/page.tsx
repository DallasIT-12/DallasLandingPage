import { Metadata } from 'next';
import CetakPackagingSkincareClient from '@/components/page/layanan/CetakPackagingSkincareClient';

export const metadata: Metadata = {
  title: 'Cetak Kemasan Skincare & Kosmetik Custom | Packaging Premium Berkualitas',
  description: 'Spesialis cetak kemasan skincare dan kosmetik custom. Box serum, toner, krim, paperbag premium dengan bahan Ivory food-safe dan finishing spot UV, emboss, hotprint. Kirim seluruh Indonesia.',
  keywords: [
    'cetak kemasan skincare',
    'kemasan skincare custom',
    'packaging kosmetik custom',
    'cetak box skincare',
    'kemasan kosmetik murah',
    'box skincare premium',
    'packaging serum custom',
    'kemasan toner custom',
    'cetak box kecantikan',
    'packaging produk kecantikan',
    'kemasan skincare kediri',
    'cetak kemasan beauty',
  ],
  alternates: {
    canonical: 'https://dallas-printingid.com/id/layanan/cetak-packaging-skincare',
    languages: {
      'id': 'https://dallas-printingid.com/id/layanan/cetak-packaging-skincare',
      'en': 'https://dallas-printingid.com/en/layanan/cetak-packaging-skincare',
      'x-default': 'https://dallas-printingid.com/id/layanan/cetak-packaging-skincare',
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Material apa yang direkomendasikan untuk kemasan skincare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kami merekomendasikan Ivory Paper 310gsm untuk kemasan skincare. Material ini memiliki satu sisi white glossy (untuk cetak full color tajam) dan sisi dalam yang aman. Tersedia juga Art Carton untuk kesan ultra glossy premium."
      }
    },
    {
      "@type": "Question",
      "name": "Finishing apa saja yang tersedia untuk kemasan skincare premium?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tersedia berbagai finishing premium: laminasi doff (matte elegan), laminasi glossy (kilap premium), spot UV (efek kilap parsial), emboss/deboss (timbul/tenggelam), dan hotprint foil emas/perak untuk kesan luxury."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah kemasan skincare dari Dallas aman untuk produk kosmetik?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, semua material yang kami gunakan untuk kemasan skincare sudah memenuhi standar keamanan yang dipersyaratkan. Tinta cetak yang kami gunakan bersifat food-safe dan tidak bereaksi dengan produk kosmetik."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa minimal order cetak kemasan skincare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimal order cetak kemasan skincare adalah 500 pcs. Untuk brand baru yang ingin trial, tersedia layanan digital printing mulai dari 100 pcs dengan harga per unit lebih tinggi namun tanpa biaya plate."
      }
    }
  ]
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://dallas-printingid.com/id" },
    { "@type": "ListItem", "position": 2, "name": "Layanan", "item": "https://dallas-printingid.com/id" },
    { "@type": "ListItem", "position": 3, "name": "Cetak Packaging Skincare", "item": "https://dallas-printingid.com/id/layanan/cetak-packaging-skincare" }
  ]
};

export default function CetakPackagingSkinarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CetakPackagingSkincareClient />
    </>
  );
}
