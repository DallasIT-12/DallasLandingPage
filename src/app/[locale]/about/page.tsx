import { Metadata } from 'next';
import AboutClient from '@/components/page/AboutClient';

// This is a Server Component
export const metadata: Metadata = {
  title: 'Tentang Kami - Percetakan Dallas Terpercaya Sejak 1983',
  description: 'Mengenal lebih dekat Percetakan Offset Dallas Kediri. Partner cetak terpercaya dengan pengalaman puluhan tahun dalam industri packaging dan percetakan offset.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/about',
    languages: {
      'id': 'https://dallas-printingid.com/id/about',
      'en': 'https://dallas-printingid.com/en/about',
      'zh': 'https://dallas-printingid.com/zh/about',
      'x-default': 'https://dallas-printingid.com/id/about',
    },
  },
};

export default function About() {
  return <AboutClient />;
}