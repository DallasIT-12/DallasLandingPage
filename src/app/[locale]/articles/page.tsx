'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function ArticlesListPage() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMediumMobile, setIsMediumMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMediumMobile(window.innerWidth < 640);
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navLinks = [
    { href: '/', label: t('Navbar.home') },
    { href: '/about', label: t('Navbar.about') },
    { href: '/products', label: t('Navbar.products') },
    { href: '/KATALOG DALLAS.pdf', label: t('Navbar.catalog'), download: true },
    { href: '/paperlisens', label: t('Navbar.paperlisens') },
    { href: '/articles', label: t('Navbar.articles') },
    { href: '#contact', label: t('Navbar.contact'), isScroll: true },
  ];

  const renderNavLinks = () => navLinks.map(link => (
    <Link
      key={link.label}
      href={link.href}
      download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
      onClick={() => {
        setIsMenuOpen(false);
      }}
      style={{
        color: link.href === '/articles' ? '#000000' : '#4b5563',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        padding: isLargeMobile ? '16px 0' : '0',
        textAlign: isLargeMobile ? 'center' : 'left',
        borderBottom: isLargeMobile ? '1px solid rgba(229,231,235,0.5)' : 'none',
        width: isLargeMobile ? '100%' : 'auto',
        fontWeight: '500'
      }}
      onMouseOver={(e) => {
        if (!isLargeMobile) {
          (e.target as HTMLElement).style.color = '#000000';
          (e.target as HTMLElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseOut={(e) => {
        if (!isLargeMobile) {
          (e.target as HTMLElement).style.color = link.href === '/articles' ? '#000000' : '#4b5563';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {link.label}
    </Link>
  ));

  const articles = [
    {
      title: '7 Ide Bisnis Tren 2026: Strategi Melejitkan Brand dengan Sentuhan Packaging Profesional',
      slug: 'ide-bisnis-tren-2026',
      excerpt: 'Simak peluang usaha paling menjanjikan di tahun ini dan bagaimana Percetakan Dallas Kediri membantu Anda menguasai pasar melalui kemasan premium.',
      date: '6 Februari 2026',
      image: '/artikel (2).png',
      category: 'Ide Bisnis'
    },
    {
      title: 'Kenapa Bisnis Besar Selalu Memilih Offset Printing? Ini Alasannya!',
      slug: 'offset-vs-digital',
      excerpt: 'Mengungkap keunggulan mutlak teknologi cetak offset dalam menghasilkan kualitas premium dengan efisiensi biaya produksi maksimal.',
      date: '6 Februari 2026',
      image: '/artikel.png',
      category: 'Edukasi'
    },
    {
      title: 'Panduan Teknis Material: Memahami Karakteristik Kertas Ivory dalam Manufaktur Packaging',
      slug: 'kertas-ivory',
      excerpt: 'Analisis komprehensif mengenai penggunaan kertas ivory untuk cetak kemasan premium, mulai dari gramasi hingga teknik finishing.',
      date: '5 Februari 2026',
      image: '/BAHAN-IVORY.jpg',
      category: 'Material'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', overflowX: 'hidden' }}>
      {/* Top Bar Contact Info & Social Media */}
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '12px',
        padding: isLargeMobile ? '6px 0' : '8px 0',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isLargeMobile ? '0 16px' : '0 24px',
          display: 'flex',
          justifyContent: isLargeMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexWrap: isLargeMobile ? 'wrap' : 'nowrap',
          gap: isLargeMobile ? '8px' : '0'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: isLargeMobile ? '12px' : '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {!isLargeMobile && (
              <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <Icon icon="mdi:map-marker" style={{ fontSize: '14px' }} />
                {t('TopBar.address')}
              </span>
            )}
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <Icon icon="mdi:phone" style={{ fontSize: '14px' }} />
              {isLargeMobile ? '081260001487' : '081260001487 | 085946896488 | 085235531946'}
            </span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Instagram">
              <Icon icon="mdi:instagram" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="TikTok">
              <Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Shopee Paperlisens">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Shopee Tray&me">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Facebook">
              <Icon icon="mdi:facebook" style={{ fontSize: '18px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(229,231,235,0.5)',
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: isLargeMobile ? '0 16px' : '0 24px', position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isLargeMobile ? '12px 0' : '16px 0'}}>
            <Link href="/" style={{textDecoration: 'none'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: isLargeMobile ? '28px' : '36px', width: 'auto', filter: 'invert(1)'}} />
            </Link>

            {isLargeMobile ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{background: 'none', border: 'none', color: '#000000', fontSize: '24px', padding: '4px', cursor: 'pointer'}}>
                <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
              </button>
            ) : (
              <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
                {renderNavLinks()}
                <LanguageSwitcher />
              </div>
            )}
          </div>

          {isLargeMobile && isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.98)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 16px 16px',
              borderBottom: '1px solid rgba(229,231,235,0.5)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              {renderNavLinks()}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(229,231,235,0.5)', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: isLargeMobile ? '32px 16px' : '60px 24px' }}>
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

