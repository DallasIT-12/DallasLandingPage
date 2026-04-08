import { Metadata } from 'next';
import CategoryDetailClient from '@/components/page/CategoryDetailClient';
import { getTranslations } from 'next-intl/server';
import { getDallasCategories } from '@/data/categories';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const tCat = await getTranslations({ locale, namespace: 'Categories' });
  const tMaterials = await getTranslations({ locale, namespace: 'Materials' });

  const categories = getDallasCategories(tCat, tMaterials);
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return notFound();
  }

  const isMaterial = category.isMaterial;
  const fullTitle = isMaterial
    ? `Informasi Bahan ${category.title} | Percetakan Dallas, Kediri`
    : `Pabrik Cetak ${category.title} Custom | Kediri & Kirim Seluruh Indonesia`;

  const metaDescription = category.explanation.length > 160
    ? category.explanation.substring(0, 157).trim() + '...'
    : category.explanation;

  const keywords = [
    `cetak ${category.title.toLowerCase()} murah`,
    `cetak ${category.title.toLowerCase()} kediri`,
    'percetakan terdekat',
    'percetakan dallas kediri',
    'offset printing kediri',
    ...(category.tags || []),
    ...(category.applications || []).slice(0, 3)
  ];

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: `https://dallas-printingid.com/id/produk/${slug}`,
      siteName: 'Percetakan Offset Dallas',
      images: [
        {
          url: category.img,
          width: 800,
          height: 800,
          alt: category.title,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [category.img],
    },
    alternates: {
      canonical: `https://dallas-printingid.com/id/produk/${slug}`,
      languages: {
        'id': `https://dallas-printingid.com/id/produk/${slug}`,
        'en': `https://dallas-printingid.com/en/produk/${slug}`,
        'zh': `https://dallas-printingid.com/zh/produk/${slug}`,
        'x-default': `https://dallas-printingid.com/id/produk/${slug}`,
      },
    }
  };
}

// FAQ data per product slug — unique questions per category to avoid duplication
const productFAQs: Record<string, { question: string; answer: string }[]> = {
  'kotak-hampers': [
    { question: 'Berapa minimal order cetak kotak hampers di Percetakan Dallas?', answer: 'Minimal order cetak kotak hampers di Dallas dimulai dari 500 pcs. Untuk jumlah lebih kecil (custom satuan), silakan konsultasikan langsung dengan tim kami via WhatsApp.' },
    { question: 'Berapa lama pengerjaan kotak hampers custom?', answer: 'Waktu pengerjaan standar adalah 5-7 hari kerja setelah desain disetujui. Untuk order mendesak (kilat), tersedia layanan express 3 hari kerja dengan biaya tambahan.' },
    { question: 'Apakah bisa cetak kotak hampers dengan finishing emboss atau hotprint?', answer: 'Ya! Kami menyediakan berbagai pilihan finishing premium: emboss, deboss, hotprint (foil emas/perak), spot UV, dan laminasi doff/glossy untuk kesan mewah.' },
    { question: 'Apakah Percetakan Dallas bisa kirim ke luar kota Kediri?', answer: 'Ya, kami melayani pengiriman ke seluruh Indonesia menggunakan ekspedisi kargo. Ongkos kirim dihitung berdasarkan berat dan volume paket ke kota tujuan.' },
  ],
  'kotak-bakery': [
    { question: 'Apakah kotak bakery dari Dallas aman untuk makanan (food grade)?', answer: 'Ya, kami menggunakan bahan Ivory Paper yang telah tersertifikasi food safe. Lapisan dalam box dilengkapi lapisan PE yang tahan minyak dan uap panas.' },
    { question: 'Bisa pesan kotak bakery dengan ukuran custom sesuai kebutuhan?', answer: 'Bisa! Kami melayani cetak kotak bakery dengan ukuran custom sesuai dimensi produk Anda, dari box donat kecil hingga tart besar.' },
    { question: 'Apa saja jenis kotak bakery yang bisa dicetak?', answer: 'Kami cetak berbagai jenis box bakery: box cupcake (isi 1, 4, 6, 9, 12), box slice cake, box tart, box roti, box donat, dan kotak roll cake.' },
    { question: 'Berapa harga cetak kotak bakery di Percetakan Dallas?', answer: 'Harga bergantung pada ukuran, jumlah order, dan finishing. Mulai dari Rp 500/pcs untuk order besar. Hubungi kami untuk penawaran harga spesifik sesuai kebutuhan Anda.' },
  ],
  'rokok': [
    { question: 'Apakah Percetakan Dallas bisa cetak kotak rokok sesuai regulasi pemerintah?', answer: 'Ya, kami berpengalaman mencetak kemasan rokok yang memenuhi standar peraturan pemerintah Indonesia, termasuk penempatan peringatan kesehatan bergambar (PHW) dan informasi kandungan tar/nikotin.' },
    { question: 'Berapa presisi ukuran kotak rokok yang bisa dicetak?', answer: 'Kami menggunakan mesin offset dengan presisi cutting hingga ±0.5mm, memastikan setiap kotak rokok terlipat rapi tanpa celah berlebih.' },
    { question: 'Material apa yang digunakan untuk cetak kotak rokok?', answer: 'Kami menggunakan Ivory Paper, Tipping Paper, dan SBS (Solid Bleached Sulfate) Board sesuai standar industri rokok Indonesia.' },
    { question: 'Apakah bisa cetak kotak rokok edisi terbatas (limited edition)?', answer: 'Ya! Kami melayani cetak kotak rokok limited edition dengan desain eksklusif dan finishing premium seperti foil emas untuk peluncuran produk spesial.' },
  ],
  'kotak-nasi': [
    { question: 'Apakah kotak nasi dari Dallas tahan terhadap nasi panas?', answer: 'Ya, kotak nasi kami menggunakan bahan food grade dengan lapisan PE (laminasi) di bagian dalam yang tahan terhadap uap panas, minyak, dan air sehingga kotak tidak mudah bocor atau lembek.' },
    { question: 'Apa ukuran standar kotak nasi yang tersedia?', answer: 'Ukuran standar yang paling populer adalah 18x18 cm dan 20x20 cm. Kami juga menerima pesanan ukuran custom untuk kebutuhan spesifik katering Anda.' },
    { question: 'Berapa minimal order cetak kotak nasi custom?', answer: 'Minimum order kotak nasi custom adalah 1.000 pcs. Untuk jumlah lebih besar, kami memberikan harga grosir yang lebih kompetitif.' },
    { question: 'Bisakah saya mencetak logo dan informasi bisnis di kotak nasi?', answer: 'Tentu! Kami cetak full color di seluruh permukaan kotak nasi Anda, termasuk logo, nama bisnis, nomor telepon, QR Code, hingga media sosial.' },
  ],
  'paperbag': [
    { question: 'Apakah paperbag dari Percetakan Dallas kuat dan tahan beban?', answer: 'Ya, kami menggunakan kertas dengan gramatur tinggi (Ivory 310gsm atau Art Carton) diperkuat dengan ring punch dan tali yang berkualitas, mampu menahan beban 2-5 kg.' },
    { question: 'Bisa cetak paperbag dengan ukuran dan bentuk custom?', answer: 'Bisa! Kami melayani paperbag custom berbagai ukuran: kecil (untuk perhiasan), medium (retail fashion), hingga besar (premium gift). Tali bisa dipilih: pita, tali rami, atau tali PE.' },
    { question: 'Apa perbedaan paperbag sablon vs offset?', answer: 'Sablon cocok untuk jumlah kecil dengan warna terbatas. Offset printing memberikan hasil full color yang lebih tajam, presisi, dan cocok untuk jumlah besar (500+ pcs) dengan harga lebih ekonomis.' },
    { question: 'Berapa lama proses cetak paperbag custom?', answer: 'Estimasi waktu pengerjaan 5-10 hari kerja setelah desain ACC. Tersedia layanan kilat untuk kebutuhan mendesak.' },
  ],
  'buku': [
    { question: 'Jenis jilid apa saja yang tersedia untuk cetak buku di Dallas?', answer: 'Kami menyediakan: jilid lem panas (perfect binding), jilid kawat/ring spiral, jilid jahit benang, dan jilid hardcover untuk buku premium dan yearbook.' },
    { question: 'Apakah bisa cetak buku dalam jumlah kecil?', answer: 'Ya, kami melayani cetak buku mulai dari 50 eksemplar (digital printing). Untuk offset printing, minimal order biasanya 500 eksemplar dengan harga per unit yang lebih murah.' },
    { question: 'Berapa ukuran standar buku yang bisa dicetak?', answer: 'Ukuran populer: A4 (21x29.7cm), A5 (14.8x21cm), B5 (17.6x25cm), dan ukuran custom. Kami konsultasikan ukuran terbaik sesuai konten buku Anda.' },
  ],
  'kalender': [
    { question: 'Kapan waktu terbaik memesan cetak kalender?', answer: 'Idealnya pesan mulai bulan September-Oktober untuk kalender tahun berikutnya, agar proses desain dan cetak cukup waktu tanpa rush. Kami juga melayani cetak kalender sepanjang tahun.' },
    { question: 'Apa saja jenis kalender yang bisa dicetak di Dallas?', answer: 'Kami cetak: kalender dinding (wall calendar), kalender meja/duduk, kalender spiral wire, kalender poster, dan kalender saku (agenda planner).' },
    { question: 'Bisakah cetak kalender dengan foto perusahaan sendiri?', answer: 'Tentu! Kami menerima desain custom menggunakan foto dan identitas perusahaan Anda. Tim desainer kami siap membantu jika belum punya file desain.' },
  ],
  'map': [
    { question: 'Untuk apa saja map / folder dokumen dari Percetakan Dallas?', answer: 'Map kami banyak digunakan untuk: folder ijazah/sertifikat sekolah, map raport, document folder perusahaan, map seminar, hingga folder laporan medis rumah sakit.' },
    { question: 'Apakah map bisa dilengkapi dengan kantong penyimpan dokumen?', answer: 'Ya, kami menyediakan map dengan berbagai tipe: map polos, map dengan satu kantong, map dengan dua kantong, dan map dengan pengunci elastis.' },
    { question: 'Berapa ketebalan map yang tersedia?', answer: 'Tersedia dari 230gsm hingga 350gsm Art Carton atau Ivory. Semakin tebal, semakin kokoh dan premium tampilannya.' },
  ],
  'brosur': [
    { question: 'Berapa ukuran brosur yang paling populer dicetak di Dallas?', answer: 'Ukuran paling populer: A4 (21x29.7cm) untuk brosur lipat 3, A5 (14.8x21cm) untuk leaflet, dan DL (10x21cm) untuk flyer.' },
    { question: 'Apa perbedaan brosur, flyer, dan leaflet?', answer: 'Flyer biasanya satu halaman tanpa lipatan. Brosur memiliki lipatan (2-3 lipatan) dengan informasi lebih detail. Leaflet mirip flyer namun ukurannya lebih kecil.' },
    { question: 'Apakah bisa cetak brosur kilat 1 hari?', answer: 'Ya, kami menyediakan layanan cetak kilat untuk brosur dengan waktu pengerjaan 1-2 hari kerja untuk kualitas digital printing, tergantung jumlah dan kerumitan desain.' },
  ],
};

export default async function CategoryDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const tCat = await getTranslations({ locale, namespace: 'Categories' });
  const tMaterials = await getTranslations({ locale, namespace: 'Materials' });
  const categories = getDallasCategories(tCat, tMaterials);
  const category = categories.find(c => c.slug === slug);

  if (!category) return notFound();

  const isMaterial = category.isMaterial;
  const fullTitle = isMaterial
    ? `Informasi Bahan ${category.title} | Percetakan Dallas, Kediri`
    : `Pabrik Cetak ${category.title} Custom | Kediri & Kirim Seluruh Indonesia`;

  // Product JSON-LD Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${category.title} Custom`,
    "description": category.explanation,
    "image": `https://dallas-printingid.com${category.img}`,
    "brand": { "@type": "Brand", "name": "Dallas Printing" },
    "offers": {
      "@type": "Offer",
      "url": `https://dallas-printingid.com/id/produk/${slug}`,
      "priceCurrency": "IDR",
      "price": category.slug === 'rokok' ? "200" : (category.slug === 'kotak-nasi' ? "300" : "500"),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "Percetakan Offset Dallas",
        "url": "https://dallas-printingid.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Kilisuci No.71, Setono Pande",
          "addressLocality": "Kediri",
          "addressRegion": "Jawa Timur",
          "postalCode": "64129",
          "addressCountry": "ID"
        },
        "telephone": "+6281260001487"
      }
    }
  };

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://dallas-printingid.com/id" },
      { "@type": "ListItem", "position": 2, "name": "Produk", "item": "https://dallas-printingid.com/id" },
      { "@type": "ListItem", "position": 3, "name": category.title, "item": `https://dallas-printingid.com/id/produk/${slug}` }
    ]
  };

  // FAQPage Schema (unique per product)
  const faqs = productFAQs[slug];
  const faqJsonLd = faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <CategoryDetailClient />
    </>
  );
}