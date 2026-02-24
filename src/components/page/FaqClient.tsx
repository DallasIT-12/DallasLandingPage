'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Icon } from '@iconify/react';

const faqs = [
    {
        category: "Umum & Pemesanan",
        items: [
            {
                question: "Apakah bisa pesan cetak custom dengan jumlah sedikit?",
                answer: "Tentu bisa! Kami mendukung UMKM dengan menyediakan layanan cetak jumlah kecil (low MOQ) untuk produk tertentu seperti paper tray dan box hampers. Silakan hubungi admin kami untuk detail jumlah minimal per produk."
            },
            {
                question: "Berapa lama proses pengerjaan pesanan?",
                answer: "Waktu pengerjaan standar adalah 3–7 hari kerja setelah desain disetujui, tergantung pada tingkat kerumitan dan jumlah pesanan. Untuk pesanan mendesak (kilat), kami menyediakan layanan prioritas."
            }
        ]
    },
    {
        category: "Bahan & Kualitas (Spesialisasi Kemasan)",
        items: [
            {
                question: "Apakah bahan paper tray dan box nasi di sini aman untuk makanan?",
                answer: "Ya, kami menggunakan bahan kertas Food Grade yang sudah dilengkapi dengan lapisan PE (laminasi) bagian dalam. Bahan ini aman bersentuhan langsung dengan makanan panas, berminyak, maupun berkuah tanpa merusak rasa."
            },
            {
                question: "Apa bedanya bahan Ivory dan Duplex?",
                answer: "Ivory memiliki kedua sisi berwarna putih bersih, memberikan kesan mewah untuk box bakery atau kosmetik. Sedangkan Duplex memiliki satu sisi putih dan satu sisi abu-abu, lebih ekonomis dan umum digunakan untuk kotak rokok atau box nasi."
            }
        ]
    },
    {
        category: "Desain & Teknis",
        items: [
            {
                question: "Apakah saya harus punya desain sendiri sebelum memesan?",
                answer: "Tidak harus. Jika Anda belum memiliki desain, tim desainer profesional Percetakan Dallas siap membantu pembuatan desain layout hingga siap cetak."
            },
            {
                question: "Format file apa yang paling bagus untuk dikirim?",
                answer: "Untuk hasil cetak maksimal dan tidak pecah, kami menyarankan format vektor seperti PDF, AI, atau CDR. Jika menggunakan gambar (JPG/PNG), pastikan resolusinya minimal 300 dpi."
            }
        ]
    },
    {
        category: "Pengiriman & Pembayaran",
        items: [
            {
                question: "Apakah bisa kirim ke luar kota Kediri?",
                answer: "Kami adalah pusat cetak kemasan termurah di Kediri yang melayani pengiriman nasional. Kami melayani pengiriman ke seluruh wilayah Indonesia menggunakan ekspedisi kargo yang aman dan terjangkau untuk berat volume besar."
            },
            {
                question: "Bagaimana sistem pembayarannya?",
                answer: "Pembayaran bisa dilakukan melalui transfer bank. Kami biasanya memberlakukan sistem DP (Down Payment) sebesar 50% di awal, dan pelunasan dilakukan saat pesanan siap dikirim."
            }
        ]
    }
];

// Generate JSON-LD schema dynamically
const generateFaqSchema = () => {
    const allItems = faqs.flatMap(cat => cat.items).map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }));

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allItems
    };
};

export default function FaqClient() {
    const t = useTranslations();
    const [openIndexes, setOpenIndexes] = useState<{ [key: string]: boolean }>({});

    const toggleAccordion = (catIndex: number, itemIndex: number) => {
        const key = `${catIndex}-${itemIndex}`;
        setOpenIndexes(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
            <Navbar />

            {/* Inject JSON-LD standard FAQ Schema for Google Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema()) }}
            />

            <main style={{ maxWidth: '900px', margin: '140px auto 60px', padding: '0 24px' }}>
                <header style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#001D39', marginBottom: '16px', lineHeight: '1.2' }}>
                        Daftar FAQ<br />Percetakan Dallas
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        Temukan jawaban atas pertanyaan yang sering diajukan seputar pemesanan, bahan, desain, dan pengiriman kami.
                    </p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    {faqs.map((category, catIndex) => (
                        <section key={catIndex} style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0A4174', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
                                {category.category}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {category.items.map((item, itemIndex) => {
                                    const key = `${catIndex}-${itemIndex}`;
                                    const isOpen = openIndexes[key];

                                    return (
                                        <div
                                            key={itemIndex}
                                            style={{
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                                                transition: 'background-color 0.3s'
                                            }}
                                        >
                                            <button
                                                onClick={() => toggleAccordion(catIndex, itemIndex)}
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '20px',
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    color: '#001D39'
                                                }}
                                            >
                                                <span style={{ paddingRight: '16px' }}>{item.question}</span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ color: '#0A4174', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <Icon icon="mdi:chevron-down" width="24" height="24" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div style={{ padding: '0 20px 20px', color: '#475569', lineHeight: '1.6', fontSize: '1rem' }}>
                                                            {item.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#001D39', borderRadius: '24px', color: '#ffffff', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>Belum menemukan jawaban Anda?</h3>
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                        Jangan ragu untuk berkonsultasi langsung dengan tim profesional kami. Kami selalu siap membantu kebutuhan cetak Anda!
                    </p>
                    <a href="https://wa.me/6281357888855" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#001D39', padding: '16px 32px', borderRadius: '9999px', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.3s' }}>
                        Tanya via WhatsApp
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
