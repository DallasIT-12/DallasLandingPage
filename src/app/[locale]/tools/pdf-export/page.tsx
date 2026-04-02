import { Metadata } from 'next';
import PdfExportClient from '@/components/page/PdfExportClient';

export const metadata: Metadata = {
    title: 'Ekspor & Gabung Halaman PDF Online - Dallas Printing',
    description: 'Alat bantu untuk mengambil halaman tertentu dari beberapa file PDF dan menggabungkannya menjadi satu file baru secara instan dan gratis.',
    keywords: [
        'ekspor pdf', 'ambil halaman pdf', 'gabung pdf online', 'pdf merger',
        'split pdf', 'dallas printing tools', 'edit pdf gratis'
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/tools/pdf-export',
    },
};

export default function PdfExportPage() {
    return <PdfExportClient />;
}
