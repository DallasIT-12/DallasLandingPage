import { Metadata } from 'next';
import KertasIvoryClient from '@/components/page/articles/KertasIvoryClient';

export const metadata: Metadata = {
  title: 'Mengenal Kertas Ivory: Standar Food Grade untuk Kemasan Makanan',
  description: 'Panduan lengkap kertas Ivory untuk packaging. Karakteristik food grade, higienis, dan hasil cetak mewah. Pilihan terbaik untuk dus makanan.',
};

export default function IvoryPaperPage() {
  return <KertasIvoryClient />;
}