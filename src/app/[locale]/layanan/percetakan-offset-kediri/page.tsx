import { Metadata } from 'next';
import PercetakanOffsetKediriClient from '@/components/page/layanan/PercetakanOffsetKediriClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset Kediri Terpercaya | Cetak Box, Kemasan & Komersial',
  description: 'Percetakan offset terpercaya di Kediri sejak 1983. Spesialis cetak box custom, kemasan makanan, kotak rokok, paperbag, brosur & kalender. Kualitas presisi, harga kompetitif, kirim seluruh Indonesia.',
  keywords: [
    'percetakan offset kediri',
    'percetakan kediri',
    'percetakan terdekat kediri',
    'jasa cetak offset kediri',
    'percetakan murah kediri',
    'percetakan box kediri',
    'offset printing kediri',
    'cetak kemasan kediri',
    'percetakan dallas',
    'jasa cetak murah jawa timur',
    'percetakan nganjuk',
    'percetakan blitar',
    'percetakan tulungagung',
  ],
  alternates: {
    canonical: 'https://dallas-printingid.com/id/layanan/percetakan-offset-kediri',
    languages: {
      'id': 'https://dallas-printingid.com/id/layanan/percetakan-offset-kediri',
      'en': 'https://dallas-printingid.com/en/layanan/percetakan-offset-kediri',
      'x-default': 'https://dallas-printingid.com/id/layanan/percetakan-offset-kediri',
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Jasa Percetakan Offset Kediri",
  "description": "Layanan percetakan offset profesional di Kediri, Jawa Timur. Melayani cetak kemasan custom, box makanan, kotak rokok, paperbag, brosur, dan kalender dengan kualitas premium.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Percetakan Offset Dallas",
    "url": "https://dallas-printingid.com",
    "telephone": "+6281260001487",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Kilisuci No.71, Singonegaran",
      "addressLocality": "Kediri",
      "addressRegion": "Jawa Timur",
      "postalCode": "64129",
      "addressCountry": "ID"
    }
  },
  "areaServed": ["Kediri", "Nganjuk", "Blitar", "Tulungagung", "Surabaya", "Indonesia"]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apa itu percetakan offset dan apa bedanya dengan digital printing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percetakan offset menggunakan pelat cetak (plate) yang mentransfer tinta ke rubber blanket, lalu ke media cetak. Hasilnya sangat tajam, konsisten, dan warna akurat untuk jumlah besar (500+ pcs). Digital printing langsung mencetak dari file digital, cocok untuk jumlah kecil tapi harga per unit lebih mahal untuk order besar."
      }
    },
    {
      "@type": "Question",
      "name": "Produk apa saja yang bisa dicetak di Percetakan Offset Dallas Kediri?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percetakan Dallas Kediri melayani: kotak hampers custom, box makanan food grade, kemasan rokok, kotak bakery, paperbag, brosur & flyer, kalender, buku, map perusahaan, dan berbagai kemasan custom lainnya."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah Percetakan Dallas melayani seluruh Indonesia, bukan hanya Kediri?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya! Meskipun berlokasi di Kediri, Jawa Timur, kami melayani pengiriman ke seluruh wilayah Indonesia. Pengiriman menggunakan ekspedisi kargo terpercaya dengan tarif kompetitif untuk kemasan jumlah besar."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama pengerjaan order di Percetakan Dallas Kediri?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waktu pengerjaan standar 5-7 hari kerja setelah desain disetujui dan DP masuk. Tersedia layanan kilat/express 2-3 hari kerja untuk order mendesak dengan biaya tambahan."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara memesan cetak di Percetakan Dallas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cara pesan sangat mudah: 1) Hubungi kami via WhatsApp di 081260001487, 2) Konsultasikan kebutuhan cetak Anda (produk, ukuran, jumlah, desain), 3) Tim kami kirimkan penawaran harga, 4) Setujui desain dan bayar DP 50%, 5) Proses cetak dimulai, 6) Pelunasan saat barang selesai dan siap kirim."
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
    { "@type": "ListItem", "position": 3, "name": "Percetakan Offset Kediri", "item": "https://dallas-printingid.com/id/layanan/percetakan-offset-kediri" }
  ]
};

export default function PercetakanOffsetKediriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PercetakanOffsetKediriClient />
    </>
  );
}
