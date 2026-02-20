import { Metadata } from 'next';
import AboutClient from '@/components/page/AboutClient';

// This is a Server Component
export const metadata: Metadata = {
  title: 'Tentang Kami - Percetakan Dallas Terpercaya Sejak 2005',
  description: 'Mengenal lebih dekat Percetakan Offset Dallas Kediri. Partner cetak terpercaya dengan pengalaman puluhan tahun dalam industri packaging dan percetakan offset.',
};

export default function About() {
  return <AboutClient />;
}