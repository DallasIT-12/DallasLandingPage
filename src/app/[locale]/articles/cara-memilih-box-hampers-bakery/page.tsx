import { Metadata } from 'next';
import CaraMemilihBoxHampersClient from '@/components/page/articles/CaraMemilihBoxHampersClient';

export const metadata: Metadata = {
    title: 'Cara Memilih Box Hampers dan Box Bakery yang Menarik | SEO 2026',
    description: 'Berapa biaya cetak box hampers custom? Temukan cara memilih box hampers dan bakery untuk meningkatkan nilai jual, lengkap dengan jenis bahan dan tren 2026.',
    keywords: [
        'Cara Memilih Box Hampers',
        'Box Bakery yang Menarik',
        'biaya cetak box hampers custom',
        'cetak box bakery jendela mika',
        'box hampers ramah lingkungan',
        'harga cetak box hampers'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/cara-memilih-box-hampers-bakery',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/cara-memilih-box-hampers-bakery',
            'en': 'https://dallas-printingid.com/en/articles/cara-memilih-box-hampers-bakery',
            'x-default': 'https://dallas-printingid.com/id/articles/cara-memilih-box-hampers-bakery',
        },
    },
};

export default function CaraMemilihBoxHampersPage() {
    return <CaraMemilihBoxHampersClient />;
}
