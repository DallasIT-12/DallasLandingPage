import { Metadata } from 'next';
import PanduanLengkapClient from '@/components/page/articles/PanduanLengkapClient';

export const metadata: Metadata = {
    title: 'Panduan Lengkap Cetak Kemasan & Atribut Bisnis: Dari Box Makanan hingga Kotak Rokok',
    description: 'Panduan lengkap cetak kemasan, packaging makanan, hampers, dan atribut bisnis perkantoran. Temukan vendor cetak terbaik untuk meningkatkan nilai jual produk Anda.',
    keywords: [
        'Panduan Lengkap Cetak Kemasan',
        'Cetak box hampers custom satuan terdekat',
        'Cetak box nasi laminasi tahan uap panas',
        'Cetak box kue kering bahan ivory premium',
        'Minimum order cetak box rokok custom logo sendiri',
        'Jasa cetak map rekam medis rumah sakit',
        'Vendor cetak kalender meja 2027 murah',
        'Cetak buku tahunan sekolah kualitas offset',
        'Harga paperbag sablon vs offset untuk hajatan'
    ],
};

export default function PanduanLengkapPage() {
    return <PanduanLengkapClient />;
}
