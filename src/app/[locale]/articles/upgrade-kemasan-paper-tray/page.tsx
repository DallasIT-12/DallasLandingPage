import { Metadata } from 'next';
import UpgradeKemasanPaperTrayClient from '@/components/page/articles/UpgradeKemasanPaperTrayClient';

export const metadata: Metadata = {
    title: 'Saatnya Upgrade Kemasan: 5 Alasan Beralih ke Paper Tray',
    description: 'Ingin tampilan produk lebih premium dan ramah lingkungan? Simak 5 alasan kenapa bisnismu perlu beralih ke paper tray sekarang.',
    keywords: [
        'paper tray',
        'kemasan paper tray',
        'beralih ke paper tray',
        'kemasan ramah lingkungan',
        'kemasan produk premium',
        'kemasan eco friendly',
        'alternatif styrofoam',
        'kemasan makanan ramah lingkungan',
        'paper tray kemasan produk',
        'jual paper tray',
        'supplier paper tray Kediri Surabaya',
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/upgrade-kemasan-paper-tray',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/upgrade-kemasan-paper-tray',
            'en': 'https://dallas-printingid.com/en/articles/upgrade-kemasan-paper-tray',
            'x-default': 'https://dallas-printingid.com/id/articles/upgrade-kemasan-paper-tray',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Saatnya Upgrade Kemasan: 5 Alasan Harus Beralih ke Paper Tray",
    "description": "Ingin tampilan produk lebih premium dan ramah lingkungan? Simak 5 alasan kenapa bisnismu perlu beralih ke paper tray sekarang.",
    "image": "https://dallas-printingid.com/paperlisens%20papertray.webp",
    "datePublished": "2026-08-21",
    "dateModified": "2026-08-21",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/upgrade-kemasan-paper-tray" }
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Apa itu paper tray?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Paper tray adalah jenis kemasan berbahan dasar kertas yang biasa digunakan sebagai wadah makanan, produk retail, atau hampers, sebagai alternatif dari styrofoam dan plastik."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah paper tray aman untuk makanan?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ya, paper tray umumnya dilapisi material food grade sehingga aman digunakan untuk kontak langsung dengan makanan."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah paper tray lebih mahal dari styrofoam?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Harga bisa bervariasi tergantung ukuran, ketebalan, dan finishing. Namun banyak brand menilai nilai tambah dari sisi tampilan dan citra ramah lingkungan sebanding dengan selisih biayanya."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah Paperlisens bisa kirim paper tray ke luar Kediri dan Surabaya?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bisa. Paperlisens melayani pengiriman paper tray dan kemasan food grade lainnya ke seluruh Indonesia, dengan basis produksi di Kediri & Surabaya."
            }
        }
    ]
};

export default function UpgradeKemasanPaperTrayPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <UpgradeKemasanPaperTrayClient />
        </>
    );
}
