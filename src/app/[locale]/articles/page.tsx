import { Metadata } from 'next';
import ArticlesListClient from '@/components/page/ArticlesListClient';

export const metadata: Metadata = {
  title: 'Wawasan Bisnis & Edukasi Percetakan - Blog Dallas',
  description: 'Temukan artikel menarik seputar Harga cetak paper tray per pcs, Ukuran standar paper tray makanan, Tips desain kemasan produk agar menarik, dan edukasi material percetakan.',
  keywords: ['Harga cetak paper tray per pcs', 'Ukuran standar paper tray makanan', 'Perbedaan bahan kertas Ivory dan Art Paper', 'Tips desain kemasan produk agar menarik', 'edukasi percetakan', 'tips kemasan', 'blog dallas'],
};

export default function ArticlesListPage() {
  return <ArticlesListClient />;
}