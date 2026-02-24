import { Metadata } from 'next';
import FaqClient from '@/components/page/FaqClient';

export const metadata: Metadata = {
    title: 'FAQ Percetakan Dallas | Pertanyaan Seputar Cetak Kemasan',
    description: 'Temukan jawaban lengkap seputar pemesanan cetak kemasan, bahan paper tray food grade, minimum order (MOQ), hingga pengiriman nasional dari Kediri.',
    keywords: [
        'FAQ Percetakan Dallas',
        'pusat cetak kemasan termurah di Kediri',
        'cetak paper tray custom',
        'bahan box nasi food grade',
        'pengiriman cetak seluruh indonesia'
    ],
};

export default function FaqPage() {
    return <FaqClient />;
}
