import { Metadata } from 'next';
import RumahKemasanClient from '@/components/page/articles/RumahKemasanClient';

export const metadata: Metadata = {
    title: 'Rumah Kemasan UMKM Kediri: Apa Itu dan Cara Memanfaatkannya',
    description: 'Pemkab Kediri siapkan Rumah Kemasan untuk UMKM. Simak apa itu program ini, siapa yang bisa mengaksesnya, dan bagaimana pelaku usaha bisa memanfaatkannya.',
    keywords: [
        'rumah kemasan Kediri',
        'kemasan UMKM Kediri',
        'program kemasan UMKM',
        'bantuan kemasan UMKM',
        'cetak kemasan UMKM Kediri',
        'Diskopusmik Kediri',
        'kemasan produk UMKM',
        'cetak kemasan Kediri',
    ],
    alternates: {
        canonical: 'https://dallas-printingid.com/id/articles/rumah-kemasan-umkm-kediri',
        languages: {
            'id': 'https://dallas-printingid.com/id/articles/rumah-kemasan-umkm-kediri',
            'en': 'https://dallas-printingid.com/en/articles/rumah-kemasan-umkm-kediri',
            'x-default': 'https://dallas-printingid.com/id/articles/rumah-kemasan-umkm-kediri',
        },
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Rumah Kemasan UMKM Kediri: Apa Itu dan Bagaimana Pelaku Usaha Bisa Memanfaatkannya?",
    "description": "Pemkab Kediri siapkan Rumah Kemasan untuk UMKM. Simak apa itu program ini, siapa yang bisa mengaksesnya, dan bagaimana pelaku usaha bisa memanfaatkannya.",
    "image": "https://dallas-printingid.com/paperlisens%20papertray.webp",
    "datePublished": "2026-08-22",
    "dateModified": "2026-08-22",
    "author": { "@type": "Organization", "name": "Percetakan Dallas", "url": "https://dallas-printingid.com" },
    "publisher": {
        "@type": "Organization",
        "name": "Percetakan Dallas",
        "logo": { "@type": "ImageObject", "url": "https://dallas-printingid.com/LOGO%201.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://dallas-printingid.com/id/articles/rumah-kemasan-umkm-kediri" }
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Apa itu Rumah Kemasan UMKM Kediri?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rumah Kemasan adalah program yang diinisiasi Pemkab Kediri melalui Diskopusmik untuk membantu pelaku UMKM mendesain dan mencetak kemasan produk mereka sendiri, tanpa harus memesan dalam jumlah besar ke pihak luar."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah program ini gratis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Berdasarkan keterangan Diskopusmik Kabupaten Kediri, layanan ini direncanakan tidak dipungut biaya bagi UMKM yang memanfaatkannya. Untuk kepastian dan syarat terbaru, disarankan menghubungi langsung Diskopusmik Kabupaten Kediri."
            }
        },
        {
            "@type": "Question",
            "name": "Siapa yang bisa menggunakan Rumah Kemasan?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Program ini ditujukan untuk pelaku UMKM yang terdaftar dan berdomisili di wilayah Kabupaten Kediri."
            }
        },
        {
            "@type": "Question",
            "name": "Apa bedanya Rumah Kemasan dengan jasa cetak kemasan swasta seperti Dallas Printing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rumah Kemasan bersifat fasilitas self-print dari pemerintah untuk UMKM Kabupaten Kediri, sementara Dallas Printing adalah pabrik cetak offset swasta yang independen, melayani cetak kemasan custom skala lebih besar, bahan food grade, dan pengiriman ke seluruh Indonesia."
            }
        },
        {
            "@type": "Question",
            "name": "Apakah UMKM di Kota Kediri bisa memanfaatkan program ini?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Program Rumah Kemasan ini secara khusus ditujukan untuk UMKM di wilayah Kabupaten Kediri. UMKM di Kota Kediri maupun daerah lain tetap bisa mengakses opsi kemasan berkualitas lewat mitra cetak swasta seperti Dallas Printing."
            }
        }
    ]
};

export default function RumahKemasanUMKMKediriPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <RumahKemasanClient />
        </>
    );
}
