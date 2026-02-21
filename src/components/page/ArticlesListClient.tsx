'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useState, useEffect } from 'react';

export default function ArticlesListPage() {
  const t = useTranslations();
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMediumMobile, setIsMediumMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [screenReady, setScreenReady] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMediumMobile(window.innerWidth < 640);
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    setScreenReady(true);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



  const articles = [
    {
      title: 'Kemasan Kertas vs Plastik: Kenapa Brand Besar Mulai Beralih ke Paper-Based Packaging?',
      slug: 'kemasan-ramah-lingkungan',
      excerpt: 'Memahami urgensi penggunaan kemasan ramah lingkungan untuk meningkatkan reputasi brand dan menjaga ekosistem bumi.',
      date: '6 Februari 2026',
      image: '/artikel (1) (2).webp',
      category: 'Keberlanjutan'
    },
    {
      title: '7 Ide Bisnis Tren 2026: Strategi Melejitkan Brand dengan Sentuhan Packaging Profesional',
      slug: 'ide-bisnis-tren-2026',
      excerpt: 'Simak peluang usaha paling menjanjikan di tahun ini dan bagaimana Percetakan Dallas Kediri membantu Anda menguasai pasar melalui kemasan premium.',
      date: '6 Februari 2026',
      image: '/artikel (2).webp',
      category: 'Ide Bisnis'
    },
    {
      title: 'Kenapa Bisnis Besar Selalu Memilih Offset Printing? Ini Alasannya!',
      slug: 'offset-vs-digital',
      excerpt: 'Mengungkap keunggulan mutlak teknologi cetak offset dalam menghasilkan kualitas premium dengan efisiensi biaya produksi maksimal.',
      date: '6 Februari 2026',
      image: '/artikel (3).webp',
      category: 'Edukasi'
    },
    {
      title: 'Panduan Teknis Material: Memahami Karakteristik Kertas Ivory dalam Manufaktur Packaging',
      slug: 'kertas-ivory',
      excerpt: 'Analisis komprehensif mengenai penggunaan kertas ivory untuk cetak kemasan premium, mulai dari gramasi hingga teknik finishing.',
      date: '5 Februari 2026',
      image: '/artikel (1).webp',
      category: 'Material'
    }
  ];

  if (!screenReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,29,57,0.1)', borderTopColor: '#001D39', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', overflowX: 'hidden' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '120px auto 0', padding: isLargeMobile ? '32px 16px' : '60px 24px' }}>
        <header style={{ marginBottom: isLargeMobile ? '32px' : '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: isSmallMobile ? '1.75rem' : (isLargeMobile ? '2.25rem' : '3.5rem'), fontWeight: '800', color: '#001D39', marginBottom: '16px', lineHeight: '1.2' }}>{t('Navbar.articles')}</h1>
          <p style={{ fontSize: isLargeMobile ? '1rem' : '1.25rem', color: '#64748b', maxWidth: '800px', margin: '0 auto', padding: isLargeMobile ? '0 8px' : '0' }}>Wawasan mendalam mengenai industri percetakan dan pengemasan premium.</p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isLargeMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: isLargeMobile ? '20px' : '32px'
        }}>
          {articles.map((article, idx) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
              <motion.div
                whileHover={!isLargeMobile ? { y: -10 } : {}}
                style={{ backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', cursor: 'pointer', width: '100%' }}
              >
                <div style={{ height: isSmallMobile ? '180px' : '220px', overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: isLargeMobile ? '20px' : '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>{article.category}</span>
                  </div>
                  <h2 style={{ fontSize: isLargeMobile ? '1.15rem' : '1.5rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.3', color: '#001D39' }}>{article.title}</h2>
                  <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '24px', fontSize: isLargeMobile ? '0.9rem' : '1rem', flex: 1 }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{article.date}</span>
                    <span style={{ color: '#0A4174', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                      Baca Selengkapnya <Icon icon="mdi:arrow-right" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}