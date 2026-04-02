import { Metadata } from 'next';
import CekOngkirClient from '@/components/page/CekOngkirClient';

export const metadata: Metadata = {
    title: 'Cek Ongkir Semua Ekspedisi Indonesia - Dallas Printing',
    description: 'Cek ongkos kirim dari semua ekspedisi Indonesia: JNE, SiCepat, Lion Parcel, SAP Express, POS Indonesia, ID Express, TIKI, dan AnterAja. Bandingkan harga dan estimasi pengiriman dalam satu halaman.',
    keywords: [
        'cek ongkir', 'ongkos kirim', 'cek tarif pengiriman', 'jne', 'sicepat',
        'lion parcel', 'pos indonesia', 'id express', 'sap express',
        'cek ongkir semua ekspedisi', 'bandingkan ongkir', 'ongkir termurah',
        'tarif pengiriman indonesia', 'cek biaya kirim paket'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/tools/cek-ongkir',
    },
};

export default function CekOngkirPage() {
    return <CekOngkirClient />;
}
