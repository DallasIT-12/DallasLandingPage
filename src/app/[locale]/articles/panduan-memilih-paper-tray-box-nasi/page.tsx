import { Metadata } from 'next';
import PaperTrayBoxNasiClient from '@/components/page/articles/PaperTrayBoxNasiClient';

export const metadata: Metadata = {
    title: 'Panduan Memilih Paper Tray dan Box Nasi | Solusi Anti Bocor & Food Grade',
    description: 'Apa perbedaan utama Paper Tray dan Box Nasi? Temukan solusi kemasan praktis, tahan minyak, dan food grade untuk bisnis kuliner Anda. Cetak custom terjangkau di Percetakan Dallas.',
    keywords: [
        'Paper tray tahan minyak',
        'cetak box nasi laminasi',
        'Panduan Memilih Paper Tray',
        'Box Nasi Food Grade',
        'Kemasan Anti Bocor',
        'cetak paper tray makanan custom',
        'Box Nasi Berkualitas'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
            'en': 'https://dallas-printingid.com/en/articles/panduan-memilih-paper-tray-box-nasi',
            'x-default': 'https://dallas-printingid.com/id/articles/panduan-memilih-paper-tray-box-nasi',
        },
    },
};

export default function PaperTrayBoxNasiPage() {
    return <PaperTrayBoxNasiClient />;
}
