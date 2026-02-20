import { Metadata } from 'next';
import KemasanRamahClient from '@/components/page/articles/KemasanRamahClient';

export const metadata: Metadata = {
  title: 'Kemasan Kertas vs Plastik: Solusi Packaging Ramah Lingkungan',
  description: 'Mengapa brand besar beralih ke kemasan kertas? Pelajari manfaat packaging ramah lingkungan untuk citra brand dan keberlanjutan bisnis Anda.',
};

export default function EcoFriendlyPage() {
  return <KemasanRamahClient />;
}
