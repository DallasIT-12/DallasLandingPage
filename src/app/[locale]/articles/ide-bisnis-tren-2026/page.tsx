import { Metadata } from 'next';
import IdeBisnisClient from '@/components/page/articles/IdeBisnisClient';

export const metadata: Metadata = {
  title: 'Tips Desain Kemasan Produk Agar Menarik & 7 Ide Bisnis Tren 2026',
  description: 'Temukan 7 peluang bisnis dan Tips desain kemasan produk agar menarik di tahun 2026. Pelajari strategi branding dan solusi kemasan premium untuk memenangkan pasar.',
  keywords: ['Tips desain kemasan produk agar menarik', 'ide bisnis 2026', 'tren kemasan 2026', 'strategi branding produk', 'desain packaging menarik'],
};

export default function BusinessTrendsPage() {
  return <IdeBisnisClient />;
}
