import { Metadata } from 'next';
import HomeClient from '@/components/page/HomeClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset Dallas Kediri - Jasa Cetak Box Murah Terdekat',
  description: 'Percetakan terdekat di Kediri. Melayani jasa cetak murah, box custom, & offset printing dengan kualitas premium dan harga terjangkau.',
  keywords: ['percetakan terdekat', 'percetakan murah terdekat', 'Percetakan offset dallas kediri', 'offset printing', 'Jasa cetak murah di kediri', 'cetak box custom', 'kemasan premium', 'box terjangkau', 'percetakan kediri', 'Cetak Paper Tray makanan custom', 'Cetak Dus Box kemasan murah', 'Jasa cetak undangan pernikahan elegan', 'Cetak stiker label kemasan terdekat', 'Cetak brosur kilat 1 hari jadi', 'Cetak nota rangkap (NCR) custom'],
  alternates: {
    canonical: 'https://dallas-printingid.com',
  }
};

export default function Home() {
  return <HomeClient />;
}