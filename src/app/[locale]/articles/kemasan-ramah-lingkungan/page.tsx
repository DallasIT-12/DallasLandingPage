'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function EcoFriendlyPackagingArticle() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navLinks = [
    { href: '/', label: t('Navbar.home') },
    { href: '/about', label: t('Navbar.about') },
    { href: '/products', label: t('Navbar.products') },
    { href: '/KATALOG DALLAS.pdf', label: t('Navbar.catalog'), download: true },
    { href: '/paperlisens', label: t('Navbar.paperlisens') },
    { href: '/articles', label: t('Navbar.articles') },
    { href: '#contact', label: t('Navbar.contact'), isScroll: true },
  ];

  const renderNavLinks = () => navLinks.map(link => {
    if (link.isScroll) {
      return (
        <Link
          key={link.label}
          href="/#contact"
          onClick={() => setIsMenuOpen(false)}
          style={{
            color: '#4b5563',
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
              (e.target as HTMLElement).style.color = '#4b5563';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
            }
          }}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.href}
        download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
        onClick={() => setIsMenuOpen(false)}
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
    )
  });

  if (!screenReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,29,57,0.1)', borderTopColor: '#001D39', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1e293b', overflowX: 'hidden' }}>
      {/* Top Bar Contact Info & Social Media */}
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '12px',
        padding: isLargeMobile ? '4px 0' : '8px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: isLargeMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {!isLargeMobile && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon icon="mdi:map-marker" style={{ fontSize: '14px' }} />
                {t('TopBar.address')}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:phone" style={{ fontSize: '14px' }} />
              {isLargeMobile ? '081260001487' : '081260001487 | 085946896488 | 085235531946'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }} title="Instagram">
              <Icon icon="mdi:instagram" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }} title="TikTok">
              <Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }} title="Shopee Paperlisens">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }} title="Shopee Tray&me">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }} title="Facebook">
              <Icon icon="mdi:facebook" style={{ fontSize: '18px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '36px',
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(229,231,235,0.5)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{ height: '36px', width: 'auto', filter: 'invert(1)' }} />
            </Link>

            {isLargeMobile ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: '#000000', fontSize: '24px' }}>
                <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                {renderNavLinks()}
                <LanguageSwitcher />
              </div>
            )}
          </div>
          {isLargeMobile && isMenuOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px 16px', borderBottom: '1px solid rgba(229,231,235,0.5)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              {renderNavLinks()}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(229,231,235,0.5)', width: '100%', display: 'flex', justifyContent: 'center' }}><LanguageSwitcher /></div>
            </div>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '88px auto 0', padding: isLargeMobile ? '32px 16px' : '60px 24px' }}>
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <header style={{ marginBottom: isLargeMobile ? '32px' : '48px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '600' }}>KEBERLANJUTAN</span>
              <span style={{ color: '#64748b', fontSize: '0.8rem', alignSelf: 'center' }}>6 Februari 2026 • 10 Menit Baca</span>
            </div>
            <h1 style={{ fontSize: isSmallMobile ? '1.75rem' : (isLargeMobile ? '2.25rem' : '3.5rem'), fontWeight: '800', color: '#001D39', lineHeight: '1.2', marginBottom: '20px' }}>
              Kemasan Kertas vs Plastik: Kenapa Brand Besar Mulai Beralih ke Paper-Based Packaging?
            </h1>
            <p style={{ fontSize: isLargeMobile ? '1rem' : '1.25rem', color: '#64748b', lineHeight: '1.6' }}>
              Memahami urgensi penggunaan kemasan ramah lingkungan untuk meningkatkan reputasi brand dan menjaga ekosistem bumi.
            </p>
          </header>

          <img src="/artikel (1).png" alt="Kemasan Kertas Ramah Lingkungan" style={{ width: '100%', borderRadius: '24px', marginBottom: isLargeMobile ? '32px' : '48px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />

          <section style={{ fontSize: isLargeMobile ? '1rem' : '1.125rem', lineHeight: '1.8', color: '#334155' }}>
            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: '32px', marginBottom: '16px' }}>Penjelasan: Apa Itu Kemasan Ramah Lingkungan?</h2>
            <p style={{ marginBottom: '24px' }}>
              Kemasan ramah lingkungan atau <em>eco-friendly packaging</em> adalah kemasan yang didesain agar memiliki dampak minimal terhadap kerusakan lingkungan. Ciri utamanya adalah mudah terurai secara alami (biodegradable), dapat didaur ulang (recyclable), dan diproduksi dengan konsumsi energi yang rendah. Dalam hal ini, kemasan berbasis kertas menjadi primadona karena sifatnya yang organik dibandingkan plastik yang membutuhkan ratusan tahun untuk hancur.
            </p>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Masalah yang Disebabkan oleh Kemasan Plastik</h2>
            <p style={{ marginBottom: '20px' }}>
              Meskipun murah dan ringan, penggunaan plastik sekali pakai dalam jangka panjang telah menciptakan krisis global yang serius bagi kesehatan dan ekosistem kita:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Sulit Terurai:</strong> Plastik membutuhkan waktu 100 hingga 500 tahun untuk hancur sepenuhnya. Sampah plastik yang kita gunakan hari ini akan tetap ada hingga generasi cucu kita nanti.</li>
              <li style={{ marginBottom: '12px' }}><strong>Ancaman Mikroplastik:</strong> Plastik tidak benar-benar hancur, melainkan pecah menjadi partikel kecil yang disebut mikroplastik. Partikel ini kini telah masuk ke dalam rantai makanan melalui air dan hewan laut, yang akhirnya masuk ke tubuh manusia.</li>
              <li style={{ marginBottom: '12px' }}><strong>Migrasi Zat Kimia Berbahaya:</strong> Plastik mengandung zat seperti BPA dan Phthalates yang dapat bermigrasi ke dalam makanan atau minuman, terutama jika terkena suhu panas. Hal ini berpotensi memicu masalah kesehatan serius seperti gangguan hormon dan risiko kanker.</li>
              <li style={{ marginBottom: '12px' }}><strong>Pencemaran Ekosistem Laut:</strong> Jutaan ton sampah plastik berakhir di lautan setiap tahun, merusak terumbu karang dan membunuh jutaan hewan laut yang tidak sengaja memakannya.</li>
            </ul>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Keunggulan Kemasan Kertas Dibandingkan Plastik</h2>
            <p style={{ marginBottom: '20px' }}>
              Mengapa kemasan kertas dianggap jauh lebih unggul dalam kacamata bisnis dan lingkungan?
            </p>

            <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Sifat Biodegradable:</strong> Kertas terbuat dari serat kayu yang bisa hancur dan menyatu kembali dengan tanah dalam waktu singkat (biasanya 2-6 bulan), sedangkan plastik pecah menjadi mikroplastik yang berbahaya.</li>
              <li style={{ marginBottom: '12px' }}><strong>Citra Brand Premium:</strong> Secara psikologis, konsumen menganggap produk dalam kemasan kertas atau box memiliki nilai lebih tinggi dan eksklusif. Kemasan kertas memberikan tekstur yang lebih mewah dan profesional.</li>
              <li style={{ marginBottom: '12px' }}><strong>Keamanan Pangan (Food Grade):</strong> Kertas khusus seperti Ivory atau Greaseproof sangat aman untuk makanan karena tidak mengandung zat kimia berbahaya yang bisa bermigrasi saat terkena panas, berbeda dengan stereofoam atau plastik kualitas rendah.</li>
              <li style={{ marginBottom: '12px' }}><strong>Dukungan Terhadap Regulasi:</strong> Banyak pemerintah daerah di Indonesia mulai melarang penggunaan kantong plastik sekali pakai. Menggunakan kemasan kertas berarti brand Anda sudah siap menghadapi perubahan hukum di masa depan.</li>
            </ul>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Kenapa Harus Kertas?</h2>
            <p style={{ marginBottom: '24px' }}>
              Selain alasan lingkungan, penggunaan kertas memungkinkan teknik branding yang lebih luas. Melalui percetakan offset, kemasan kertas bisa dicetak dengan warna-warna tajam, diberi laminasi mewah, hingga efek timbul (emboss). Hal ini sulit dilakukan secara maksimal pada permukaan plastik yang tipis dan licin. Dengan kertas, brand Anda memiliki "kanvas" yang lebih luas untuk bercerita kepada pelanggan.
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: isLargeMobile ? '24px' : '40px', borderRadius: '32px', marginTop: '60px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2.25rem', fontWeight: '700', color: '#0A4174', marginBottom: '20px', textAlign: 'center', lineHeight: '1.2' }}>
                Wujudkan Kemasan Ramah Lingkungan Anda Bersama Percetakan Dallas
              </h2>
              <p style={{ textAlign: 'center', marginBottom: '32px', opacity: 0.9, fontSize: isLargeMobile ? '0.95rem' : '1rem' }}>
                Percetakan Dallas Kediri berkomitmen mendukung gerakan hijau dengan menyediakan berbagai pilihan material kertas berkualitas tinggi:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#0A4174' }}>🌱 Paper Tray & Lunch Box</h4>
                  <p style={{ fontSize: '0.9rem' }}>Solusi pengganti plastik dan stereofoam untuk bisnis kuliner Anda. Higienis dan ramah lingkungan.</p>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#0A4174' }}>🛍️ Paper Bag Berbagai Ukuran</h4>
                  <p style={{ fontSize: '0.9rem' }}>Pengganti kantong plastik yang kuat dan meningkatkan estetika brand fashion atau gift shop Anda.</p>
                </div>
              </div>

              <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '32px' }}>
                <h3 style={{ fontSize: isLargeMobile ? '1.25rem' : '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Konsultasi Gratis Sekarang</h3>
                <p style={{ marginBottom: '24px', opacity: 0.9, fontSize: isLargeMobile ? '0.9rem' : '1rem' }}>
                  Ingin beralih ke kemasan kertas tapi bingung soal biaya? Tim Dallas siap membantu menghitungkan spesifikasi paling efisien untuk bisnis Anda.
                </p>
                <Link href="https://wa.me/6281260001487" style={{ backgroundColor: '#25D366', color: '#ffffff', padding: isLargeMobile ? '14px 24px' : '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: isLargeMobile ? '0.95rem' : '1.1rem' }}>
                  <Icon icon="mdi:whatsapp" fontSize="24" /> Hubungi Kami Sekarang
                </Link>
              </div>
            </div>
          </section>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
