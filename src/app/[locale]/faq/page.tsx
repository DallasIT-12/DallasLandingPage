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
    alternates: {
        canonical: 'https://dallas-printingid.com/id/faq',
        languages: {
            'id': 'https://dallas-printingid.com/id/faq',
            'en': 'https://dallas-printingid.com/en/faq',
            'zh': 'https://dallas-printingid.com/zh/faq',
            'x-default': 'https://dallas-printingid.com/id/faq',
        },
    },
};

export default function FaqPage() {
    return <FaqClient />;
}
