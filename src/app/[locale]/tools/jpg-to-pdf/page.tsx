import { Metadata } from 'next';
import JpgToPdfClient from '@/components/page/JpgToPdfClient';

export const metadata: Metadata = {
    title: 'Konversi JPG ke PDF Online - Dallas Printing',
    description: 'Ubah gambar JPG, PNG, atau WEBP Anda menjadi file PDF profesional secara cepat dan gratis. Aman, diproses 100% di browser Anda.',
    keywords: ['jpg ke pdf', 'konversi gambar ke pdf', 'ubah png ke pdf', 'dallas printing tools', 'edit pdf online'],
};

export default function JpgToPdfPage() {
    return <JpgToPdfClient />;
}
