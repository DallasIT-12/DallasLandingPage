import { Metadata } from 'next';
import CaraMemilihUkuranPaperTrayClient from '@/components/page/articles/CaraMemilihUkuranPaperTrayClient';

export const metadata: Metadata = {
    title: 'Cara Memilih Ukuran Paper Tray yang Tepat untuk Bisnismu',
    description: 'Bingung pilih ukuran paper tray untuk usahamu? Kenali detail ukuran Cup A, B, C, dan D dari Paperlisens beserta rekomendasi penggunaannya, supaya tidak salah pilih.',
    keywords: [
        'ukuran paper tray',
        'cara memilih ukuran paper tray',
        'paper tray cup',
        'paper tray kemasan makanan',
        'ukuran kemasan makanan custom',
        'jual paper tray custom',
        'paper tray Kediri Surabaya',
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/cara-memilih-ukuran-paper-tray',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/cara-memilih-ukuran-paper-tray',
            'en': 'https://dallas-printingid.com/en/articles/cara-memilih-ukuran-paper-tray',
            'x-default': 'https://dallas-printingid.com/id/articles/cara-memilih-ukuran-paper-tray',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cara Memilih Ukuran Paper Tray yang Tepat untuk Bisnismu",
    "description": "Bingung pilih ukuran paper tray untuk usahamu? Kenali detail ukuran Cup A, B, C, dan D dari Paperlisens beserta rekomendasi penggunaannya, supaya tidak salah pilih.",
    "image": "https://dallas-printingid.com/artikel_cup_A.webp",
    "datePublished": "2026-08-22",
    "dateModified": "2026-08-22",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/cara-memilih-ukuran-paper-tray" }
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Ukuran paper tray apa yang paling laris digunakan UMKM kuliner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cup B dan Cup C umumnya paling banyak dipilih karena cocok untuk porsi camilan hingga menu utama ringan, sesuai dengan mayoritas produk UMKM kuliner rumahan."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah bisa pesan sample sebelum order dalam jumlah besar?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bisa. Sebelum memutuskan ukuran akhir, kamu bisa konsultasi dan meminta sample ke tim Paperlisens agar sesuai dengan produkmu."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah paper tray Cup A-D bisa dicetak custom logo?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bisa. Semua varian ukuran bisa dicetak dengan desain dan logo custom sesuai kebutuhan branding bisnismu, di luar pilihan corak siap pakai yang sudah tersedia."
            }
        },
        {
            "@type": "Question",
            "name": "Bagaimana kalau produk saya tidak pas dengan salah satu dari 4 ukuran ini?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kamu bisa konsultasikan langsung ke tim Paperlisens untuk opsi ukuran custom di luar varian standar Cup A-D."
            }
        }
    ]
};

export default function CaraMemilihUkuranPaperTrayPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <CaraMemilihUkuranPaperTrayClient />
        </>
    );
}
