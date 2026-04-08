import { Metadata } from 'next';
import CetakKemasanCustomClient from '@/components/page/layanan/CetakKemasanCustomClient';

export const metadata: Metadata = {
  title: 'Cetak Kemasan Custom Indonesia | Box, Paperbag & Packaging Premium',
  description: 'Jasa cetak kemasan custom terpercaya. Melayani box makanan food grade, kotak hampers, paperbag custom, kemasan skincare & semua kebutuhan packaging bisnis Anda. Kualitas offset, harga kompetitif.',
  keywords: [
    'cetak kemasan custom',
    'jasa cetak kemasan',
    'custom packaging indonesia',
    'cetak box custom murah',
    'packaging custom logo',
    'cetak kemasan makanan',
    'kemasan produk custom',
    'percetakan kemasan',
    'packaging box murah',
    'cetak box food grade',
    'kemasan custom umkm',
    'percetakan kemasan jakarta',
    'percetakan kemasan surabaya',
  ],
  alternates: {
    canonical: 'https://dallas-printingid.com/id/layanan/cetak-kemasan-custom',
    languages: {
      'id': 'https://dallas-printingid.com/id/layanan/cetak-kemasan-custom',
      'en': 'https://dallas-printingid.com/en/layanan/cetak-kemasan-custom',
      'x-default': 'https://dallas-printingid.com/id/layanan/cetak-kemasan-custom',
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apa saja jenis kemasan custom yang bisa dicetak di Percetakan Dallas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kami mencetak berbagai jenis kemasan custom: box hampers, kotak nasi food grade, box bakery (cupcake, tart, roti), kotak rokok, paperbag custom, dan kemasan skincare/kosmetik. Semua bisa dikustomisasi ukuran, material, dan finishing-nya."
      }
    },
    {
      "@type": "Question",
      "name": "Material apa yang tersedia untuk cetak kemasan custom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tersedia berbagai pilihan material: Art Carton (glossy premium), Ivory Paper (food grade, cocok untuk makanan & kosmetik), Duplex (ekonomis untuk box nasi & rokok), Kraft Paper (natural & ramah lingkungan). Tersedia ketebalan 210-400gsm."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa minimal order cetak kemasan custom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimal order berbeda per produk. Untuk kemasan food grade dan paperbag: mulai 500 pcs. Kotak rokok: mulai 1.000 pcs. Kami juga melayani jumlah lebih kecil dengan teknologi digital printing untuk kebutuhan trial/sampel."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah termasuk jasa desain kemasan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya! Tim desainer profesional kami siap membantu dari awal — mulai dari konsultasi ukuran, pembuatan mockup 3D, hingga file siap cetak. Anda cukup menyediakan logo dan konsep yang diinginkan."
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
    { "@type": "ListItem", "position": 3, "name": "Cetak Kemasan Custom", "item": "https://dallas-printingid.com/id/layanan/cetak-kemasan-custom" }
  ]
};

export default function CetakKemasanCustomPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CetakKemasanCustomClient />
    </>
  );
}
