import { Metadata } from 'next';
import ProductsClient from '@/components/page/ProductsClient';

export const metadata: Metadata = {
  title: 'Katalog Percetakan Murah Terdekat - Box Custom & Kemasan Premium',
  description: 'Lihat katalog lengkap Jasa Cetak Murah di Kediri dari Percetakan Offset Dallas. Melayani percetakan terdekat untuk kemasan makanan premium, box custom terjangkau, paperbag, hingga offset printing berkualitas.',
  keywords: ['percetakan terdekat', 'percetakan murah terdekat', 'Percetakan offset dallas kediri', 'offset printing', 'Jasa cetak murah di kediri', 'cetak box custom terdekat', 'Cetak Paper Tray makanan custom', 'Cetak Dus Box kemasan murah', 'Jasa cetak undangan pernikahan elegan', 'Cetak stiker label kemasan terdekat', 'Cetak brosur kilat 1 hari jadi', 'Cetak nota rangkap (NCR) custom'],
};

export default function Products() {
  return <ProductsClient />;
}