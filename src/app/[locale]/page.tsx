import { Metadata } from 'next';
import HomeClient from '@/components/page/HomeClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset Dallas Kediri - Jasa Cetak Box Murah Terdekat',
  description: 'Percetakan terdekat di Kediri. Melayani jasa cetak murah, box custom, & offset printing dengan kualitas premium dan harga terjangkau.',
  keywords: ['percetakan terdekat', 'percetakan murah terdekat', 'Percetakan offset dallas kediri', 'offset printing', 'Jasa cetak murah di kediri', 'cetak box custom', 'kemasan premium', 'box terjangkau', 'percetakan kediri', 'Cetak Paper Tray makanan custom', 'Cetak Dus Box kemasan murah', 'Jasa cetak undangan pernikahan elegan', 'Cetak stiker label kemasan terdekat', 'Cetak brosur kilat 1 hari jadi', 'Cetak nota rangkap (NCR) custom'],
  alternates: {
    canonical: 'https://dallas-printingid.com/id',
    languages: {
      'id': 'https://dallas-printingid.com/id',
      'en': 'https://dallas-printingid.com/en',
      'zh': 'https://dallas-printingid.com/zh',
      'x-default': 'https://dallas-printingid.com/id',
    },
  }
};

// LocalBusiness + WebSite JSON-LD Schema for Google Local Pack & Rich Results
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dallas-printingid.com/#business",
  "name": "Percetakan Offset Dallas",
  "alternateName": ["Dallas Printing", "Percetakan Dallas Kediri", "UD Dallas"],
  "description": "Percetakan offset dan digital printing terpercaya di Kediri sejak 1983. Spesialis cetak box custom, kemasan makanan food grade, kotak rokok, paperbag, brosur, kalender, dan buku dengan kualitas premium dan harga terjangkau. Melayani pengiriman ke seluruh Indonesia.",
  "url": "https://dallas-printingid.com",
  "logo": "https://dallas-printingid.com/LOGO%201.png",
  "image": [
    "https://dallas-printingid.com/LOGO%201.png",
    "https://dallas-printingid.com/opengraph-image.png"
  ],
  "telephone": ["+6281260001487", "+6285946896488", "+6285235531946"],
  "email": "percetakandallas@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Kilisuci No.71, Setono Pande",
    "addressLocality": "Kediri",
    "addressRegion": "Jawa Timur",
    "postalCode": "64129",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.8167,
    "longitude": 112.0175
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "IDR",
  "paymentAccepted": "Cash, Bank Transfer",
  "areaServed": [
    { "@type": "City", "name": "Kediri" },
    { "@type": "City", "name": "Nganjuk" },
    { "@type": "City", "name": "Surabaya" },
    { "@type": "City", "name": "Blitar" },
    { "@type": "City", "name": "Tulungagung" },
    { "@type": "Country", "name": "Indonesia" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Layanan Percetakan Dallas",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Cetak Kemasan Custom",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Box Hampers Custom" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Box Makanan & Nasi" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Kotak Rokok" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Box Bakery & Kue" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Paperbag Custom" } }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Cetak Komersial",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Brosur & Flyer" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Kalender" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Buku & Majalah" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cetak Map Perusahaan" } }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.tiktok.com/@paperlisenss22",
    "https://www.instagram.com/percetakandallas/",
    "https://www.facebook.com/percetakandallas"
  ],
  "foundingDate": "1983",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Percetakan Dallas",
  "alternateName": "Dallas Printing",
  "url": "https://dallas-printingid.com",
  "publisher": {
    "@type": "Organization",
    "name": "Percetakan Offset Dallas",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dallas-printingid.com/LOGO%201.png"
    }
  },
  "inLanguage": ["id", "en", "zh"]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}