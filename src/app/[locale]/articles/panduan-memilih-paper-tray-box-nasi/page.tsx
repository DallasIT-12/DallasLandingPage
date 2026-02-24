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
};

export default function PaperTrayBoxNasiPage() {
    return <PaperTrayBoxNasiClient />;
}
