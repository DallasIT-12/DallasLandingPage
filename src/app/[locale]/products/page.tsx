import { Metadata } from 'next';
import ProductsClient from '@/components/page/ProductsClient';

export const metadata: Metadata = {
  title: 'Katalog Produk Cetak & Kemasan - Box, Paperbag, Kalender',
  description: 'Lihat katalog lengkap produk Percetakan Dallas. Mulai dari kemasan makanan, box hampers, paperbag, kalender, hingga buku dan brosur. Kualitas premium dengan harga bersaing.',
};

export default function Products() {
  return <ProductsClient />;
}