import { Metadata } from 'next';
import CategoryDetailClient from '@/components/page/CategoryDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Format slug to readable title
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return {
    title: `Jual ${title} Custom - Percetakan Dallas Kediri`,
    description: `Layanan cetak ${title} custom dengan desain menarik dan bahan berkualitas. Percetakan Offset Dallas siap memenuhi kebutuhan packaging bisnis Anda.`,
  };
}

export default function CategoryDetailPage() {
  return <CategoryDetailClient />;
}