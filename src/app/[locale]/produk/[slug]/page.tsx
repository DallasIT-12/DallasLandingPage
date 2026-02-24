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
    title: `Jasa Cetak ${title} Custom Murah & Premium - Percetakan Terdekat`,
    description: `Jasa cetak ${title} custom murah terdekat di Kediri. Percetakan Offset Dallas melayani offset printing dengan kualitas premium dan harga terjangkau untuk kebutuhan bisnis Anda.`,
    keywords: [`cetak ${title} murah`, `cetak ${title} terdekat`, 'percetakan terdekat', 'percetakan murah terdekat', 'Percetakan offset dallas kediri', 'offset printing', 'Jasa cetak murah di kediri', 'kemasan premium'],
  };
}

export default function CategoryDetailPage() {
  return <CategoryDetailClient />;
}