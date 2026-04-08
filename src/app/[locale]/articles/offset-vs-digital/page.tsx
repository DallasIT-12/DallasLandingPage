import { Metadata } from 'next';
import OffsetVsDigitalClient from '@/components/page/articles/OffsetVsDigitalClient';

export const metadata: Metadata = {
  title: 'Percetakan Offset vs Digital Printing: Mana yang Lebih Untung?',
  description: 'Pahami perbedaan cetak offset dan digital. Kapan harus memilih offset printing untuk efisiensi biaya dan kualitas terbaik dalam jumlah besar.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/offset-vs-digital',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/offset-vs-digital',
      'en': 'https://dallas-printingid.com/en/articles/offset-vs-digital',
      'x-default': 'https://dallas-printingid.com/id/articles/offset-vs-digital',
    },
  },
};

export default function OffsetVsDigitalPage() {
  return <OffsetVsDigitalClient />;
}
