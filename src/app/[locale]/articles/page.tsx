import { Metadata } from 'next';
import ArticlesListClient from '@/components/page/ArticlesListClient';

export const metadata: Metadata = {
  title: 'Wawasan Bisnis & Edukasi Percetakan - Blog Dallas',
  description: 'Temukan artikel menarik seputar ide bisnis, tren kemasan, edukasi material, dan tips memilih percetakan offset terbaik untuk bisnis Anda.',
};

export default function ArticlesListPage() {
  return <ArticlesListClient />;
}