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

  // Get translations on the server
  const tCat = await getTranslations({ locale, namespace: 'Categories' });
  const tMaterials = await getTranslations({ locale, namespace: 'Materials' });

  const categories = getDallasCategories(tCat, tMaterials);
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return notFound();
  }

  // SEO Optimized Title & Description
  // Stage 1: National Reach Formula
  const isMaterial = category.isMaterial;
  const fullTitle = isMaterial 
    ? `Informasi Bahan ${category.title} | Percetakan Dallas, Kediri`
    : `Pabrik Cetak ${category.title} Custom | Kediri & Kirim Seluruh Indonesia`;
  
  // Use explanation but clean it up/truncate if needed for meta description
  const metaDescription = category.explanation.length > 160 
    ? category.explanation.substring(0, 157).trim() + '...' 
    : category.explanation;

  // Construct Keywords from tags and applications
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

export default async function CategoryDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  // Fetch translations & data for JSON-LD (duplicated logic for simplicity, or we could refactor)
  const tCat = await getTranslations({ locale, namespace: 'Categories' });
  const tMaterials = await getTranslations({ locale, namespace: 'Materials' });
  const categories = getDallasCategories(tCat, tMaterials);
  const category = categories.find(c => c.slug === slug);

  if (!category) return notFound();

  // Stage 2: JSON-LD Schema Markup
  const jsonLd = {
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
        "image": "https://dallas-printingid.com/LOGO 1.png",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryDetailClient />
    </>
  );
}