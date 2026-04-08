import { Metadata } from 'next';
import KertasIvoryClient from '@/components/page/articles/KertasIvoryClient';

export const metadata: Metadata = {
  title: 'Perbedaan Bahan Kertas Ivory dan Art Paper - Standar Food Grade',
  description: 'Ketahui Perbedaan bahan kertas Ivory dan Art Paper untuk packaging. Pelajari spesifikasi, karakteristik food grade, dan hasil cetak mewah untuk dus makanan Anda.',
  keywords: ['Perbedaan bahan kertas Ivory dan Art Paper', 'kertas ivory', 'art paper', 'kertas food grade', 'bahan dus makanan', 'jenis kertas kemasan'],
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/kertas-ivory',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/kertas-ivory',
      'en': 'https://dallas-printingid.com/en/articles/kertas-ivory',
      'x-default': 'https://dallas-printingid.com/id/articles/kertas-ivory',
    },
  },
};

export default function IvoryPaperPage() {
  return <KertasIvoryClient />;
}