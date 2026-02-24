import { Metadata } from 'next';
import ArtikelPendekClient from '@/components/page/articles/ArtikelPendekClient';

export const metadata: Metadata = {
    title: 'Ukuran Box Nasi Standar Katering | Cetak Box Nasi Laminasi Tahan Panas',
    description: 'Ketahui ukuran box nasi standar katering (18x18 / 20x20). Kami sedia layanan cetak box nasi laminasi tahan uap panas agar makanan tetap higienis.',
    keywords: ['Ukuran box nasi standar katering (18x18 / 20x20)', 'cetak box nasi laminasi tahan uap panas', 'ukuran box kue', 'kemasan katering'],
};

export default function BoxNasiFAQPage() {
    return <ArtikelPendekClient
        title="Ukuran Box Nasi Standar Katering & Pentingnya Laminasi Tahan Panas"
        date="25 Februari 2026"
        category="Edukasi Katering"
        image="/artikel (3).webp"
        productLink="/produk/kotak-nasi"
        productName="Box Nasi Katering"
        content={
            <>
                <p style={{ marginBottom: '24px' }}>Menentukan <strong>ukuran box nasi standar katering (18x18 / 20x20)</strong> adalah langkah krusial bagi bisnis kuliner. Pemilihan ukuran yang tepat memastikan porsi makanan terlihat penuh dan estetis tanpa membuang banyak ruang kosong.</p>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: '#001D39' }}>Standar Ukuran Box Katering</h3>
                <p style={{ marginBottom: '24px' }}>Ukuran 18x18 cm sangat ideal untuk porsi standar (nasi, 1 lauk utama, 2 lauk pendamping). Sementara ukuran 20x20 cm lebih disukai untuk menu premium atau bento dengan banyak kompartemen.</p>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: '#001D39' }}>Mengapa Harus Dilaminasi?</h3>
                <p style={{ marginBottom: '24px' }}>Nasi panas menghasilkan uap. Tanpa laminasi yang baik, box karton akan basah dan hancur. Oleh karena itu, <strong>cetak box nasi laminasi tahan uap panas</strong> sangat diwajibkan untuk menjaga keutuhan susunan hidangan serta menjaga citra higienis catering Anda.</p>
            </>
        }
    />;
}
