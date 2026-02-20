import { Metadata } from 'next';
import HomeClient from '@/components/page/HomeClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset Dallas Kediri - Spesialis Cetak Kemasan & Box Custom',
  description: 'Pusat cetak kemasan dan box custom di Kediri & Surabaya. Melayani cetak dus makanan, packaging produk, kardus hampers, dan paperbag dengan kualitas premium.',
  alternates: {
    canonical: 'https://dallas-printingid.com',
  }
};

export default function Home() {
  return <HomeClient />;
}