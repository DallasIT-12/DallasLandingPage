import { Metadata } from 'next';
import ToolsClient from '@/components/page/ToolsClient';

export const metadata: Metadata = {
    title: 'Pusat Alat Bantu Digital - Dallas Printing',
    description: 'Kumpulan alat digital gratis dari Percetakan Dallas: Cek Ongkir, Image Compressor, dan PDF Export. Memudahkan desain dan pengiriman packaging Anda.',
    keywords: [
        'tools percetakan', 'alat bantu desain', 'cek ongkir', 'kompres gambar',
        'edit pdf online', 'gabung pdf', 'dallas printing tools', 'percetakan kediri'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/tools',
    },
};

export default function ToolsPage() {
    return <ToolsClient />;
}
