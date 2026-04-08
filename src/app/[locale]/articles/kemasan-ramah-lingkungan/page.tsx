import { Metadata } from 'next';
import KemasanRamahClient from '@/components/page/articles/KemasanRamahClient';

export const metadata: Metadata = {
  title: 'Kemasan Kertas vs Plastik: Solusi Packaging Ramah Lingkungan',
  description: 'Mengapa brand besar beralih ke kemasan kertas? Pelajari manfaat packaging ramah lingkungan untuk citra brand dan keberlanjutan bisnis Anda.',
  alternates: {
    canonical: 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
    languages: {
      'id': 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
      'en': 'https://dallas-printingid.com/en/articles/kemasan-ramah-lingkungan',
      'x-default': 'https://dallas-printingid.com/id/articles/kemasan-ramah-lingkungan',
    },
  },
};

export default function EcoFriendlyPage() {
  return <KemasanRamahClient />;
}
