import { Metadata } from 'next';
import OffsetVsDigitalClient from '@/components/page/articles/OffsetVsDigitalClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset vs Digital Printing: Mana yang Lebih Untung?',
  description: 'Pahami perbedaan cetak offset dan digital. Kapan harus memilih offset printing untuk efisiensi biaya dan kualitas terbaik dalam jumlah besar.',
};

export default function OffsetVsDigitalPage() {
  return <OffsetVsDigitalClient />;
}
