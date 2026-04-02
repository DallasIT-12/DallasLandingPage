import { Metadata } from 'next';
import RokokClient from '@/components/page/RokokClient';

export const metadata: Metadata = {
    title: 'Custom Box Rokok Murah & Premium - Jasa Cetak Kemasan Rokok Terdekat',
    description: 'Jasa cetak box rokok custom murah di Kediri. Percetakan Offset Dallas melayani cetak kemasan rokok dengan finishing premium: emboss, hotprint, spot UV. Preview desain rokok Anda secara 3D langsung di sini.',
    keywords: ['cetak box rokok', 'kemasan rokok custom', 'cetak kotak rokok terdekat', 'percetakan rokok kediri', 'emboss rokok', 'hotprint rokok', 'spot uv rokok', 'packaging rokok premium'],
};

export default function RokokPage() {
    return <RokokClient />;
}
