import { Metadata } from 'next';
import ProductDetailClient from '@/components/page/ProductDetailClient';
import { customBoxProducts } from '@/data/customBoxProducts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = customBoxProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan - Percetakan Dallas',
      description: 'Maaf, produk yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: `${product.name} - Cetak Custom Murah & Berkualitas`,
    description: `Cetak ${product.name} di Percetakan Dallas Kediri. ${product.description} Harga terbaik, kualitas premium, dan pengerjaan cepat.`,
    openGraph: {
      images: [product.image],
    }
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
