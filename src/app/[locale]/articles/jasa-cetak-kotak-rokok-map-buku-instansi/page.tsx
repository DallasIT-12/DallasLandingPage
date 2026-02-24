import { Metadata } from 'next';
import JasaCetakB2BClient from '@/components/page/articles/JasaCetakB2BClient';

export const metadata: Metadata = {
    title: 'Jasa Cetak Kotak Rokok, Map Perusahaan & Buku | Solusi B2B Offset',
    description: 'Percetakan Dallas melayani cetak skala besar untuk industri & instansi. Tersedia jasa cetak kotak rokok duplex presisi tinggi, map rekam medis anti air, hingga buku sekolah.',
    keywords: [
        'Cetak kotak rokok murah',
        'Vendor kemasan rokok custom',
        'Cetak box rokok bahan duplex',
        'cetak map folder perusahaan',
        'Cetak buku tahunan sekolah',
        'Jasa Cetak Kotak Rokok',
        'Solusi Cetak Offset B2B'
    ],
};

export default function JasaCetakB2BPage() {
    return <JasaCetakB2BClient />;
}
