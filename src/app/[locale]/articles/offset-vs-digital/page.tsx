'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function OffsetVsDigitalArticle() {
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

  const renderNavLinks = () => navLinks.map(link => {
    if (link.isScroll) {
      return (
        <Link
          key={link.label}
          href="/#contact"
          onClick={() => {
            setIsMenuOpen(false);
          }}
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
    );
  });

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
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
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
        position: 'fixed',
        top: '36px',
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(229,231,235,0.5)',
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0'}}>
            <Link href="/" style={{textDecoration: 'none'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '36px', width: 'auto', filter: 'invert(1)'}} />
            </Link>

            {isLargeMobile ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{background: 'none', border: 'none', color: '#000000', fontSize: '24px'}}>
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
              <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '600' }}>EDUKASI CETAK</span>
              <span style={{ color: '#64748b', fontSize: '0.8rem', alignSelf: 'center' }}>6 Februari 2026 • 10 Menit Baca</span>
            </div>
            <h1 style={{ fontSize: isSmallMobile ? '1.75rem' : (isLargeMobile ? '2.25rem' : '3.5rem'), fontWeight: '800', color: '#001D39', lineHeight: '1.2', marginBottom: '24px' }}>
              Kenapa Bisnis Besar Selalu Memilih Offset Printing? Ini Alasannya!
            </h1>
            <p style={{ fontSize: isLargeMobile ? '1rem' : '1.25rem', color: '#64748b', lineHeight: '1.6' }}>
              Mengungkap keunggulan teknologi cetak offset dalam menghasilkan kualitas premium dengan efisiensi biaya produksi maksimal.
            </p>
          </header>

          <img 
            src="/artikel (3).png" 
            alt="Kenapa Bisnis Besar Selalu Memilih Offset Printing" 
            style={{ width: '100%', borderRadius: '24px', marginBottom: isLargeMobile ? '32px' : '48px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
          />

          <section style={{ fontSize: isLargeMobile ? '1rem' : '1.125rem', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ marginBottom: '24px' }}>
              Bagi pelaku usaha yang ingin menaikkan level brand mereka, pemahaman mengenai <strong>apa itu offset printing</strong> sangatlah krusial. Seringkali, digital printing dijadikan alternatif karena kemudahannya untuk cetak satuan, namun untuk standar industri dan profesionalisme bisnis, <strong>offset printing</strong> tetap menjadi juara yang tak tergantikan.
            </p>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Apa Itu Offset Printing?</h2>
            <p style={{ marginBottom: '24px' }}>
              <strong>Offset printing</strong> adalah teknologi cetak industrial yang menggunakan plat logam untuk mentransfer tinta ke media cetak melalui silinder karet. Proses ini memastikan tinta meresap sempurna ke dalam serat kertas, menghasilkan tekstur yang halus, tajam, dan terlihat jauh lebih mewah dibandingkan hasil cetak printer digital biasa.
            </p>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Keunggulan Percetakan Offset Dibandingkan Digital</h2>
            <p style={{ marginBottom: '20px' }}>
              Meskipun digital printing hadir for kebutuhan instan, teknologi ini memiliki banyak batasan yang tidak dimiliki oleh mesin offset profesional:
            </p>
            
            <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Kualitas Warna yang Presisi:</strong> Offset menggunakan tinta basah <strong>CMYK</strong> dan warna khusus <strong>Pantone</strong>. Ini menjamin warna logo brand Anda akan selalu sama persis, sesuatu yang sulit dicapai oleh toner digital yang warnanya sering berubah-ubah di tiap sesi cetak.</li>
              <li style={{ marginBottom: '12px' }}><strong>Efisiensi Harga Skala Besar:</strong> Inilah alasan utama kenapa <strong>percetakan offset</strong> selalu dipilih for <strong>cetak packaging makanan</strong> atau <strong>kotak rokok</strong>. Semakin banyak Anda mencetak, harga per pcs akan turun drastis—bahkan bisa mencapai 1/10 dari harga digital printing.</li>
              <li style={{ marginBottom: '12px' }}><strong>Ketahanan dan Profesionalisme:</strong> Hasil cetak offset tidak mudah luntur dan memberikan kesan "mahal". Tinta offset menyerap ke kertas, sedangkan digital cenderung hanya menempel di permukaan dan terasa seperti lapisan plastik yang bisa terkelupas.</li>
              <li style={{ marginBottom: '12px' }}><strong>Dukungan Bahan Beragam:</strong> Mesin offset mampu menangani berbagai jenis kertas premium seperti <strong>Ivory</strong>, <strong>Duplex</strong>, hingga <strong>Art Paper</strong> dengan ketebalan tinggi yang seringkali membuat printer digital macet (jamming).</li>
            </ul>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Perbandingan Biaya: Investasi vs Pemborosan</h2>
            
            <div style={{ overflowX: 'auto', marginBottom: '32px', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0A4174', color: '#ffffff' }}>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Aspek</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Offset Printing (Industrial)</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Digital Printing (Standar)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Tujuan Utama</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Kualitas Premium & Produksi Massal</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Cetak Instan & Satuan</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Skalabilitas Harga</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}><strong>Sangat Murah</strong> untuk jumlah banyak</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Tetap Mahal meskipun cetak banyak</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Akurasi Warna</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Sempurna (Support Pantone)</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Terbatas (Hanya CMYK simulasi)</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Hasil Akhir</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Eksklusif dan Tahan Lama</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Standar dan Cepat Pudar</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginBottom: '24px' }}>
              Digital printing memang praktis jika Anda hanya ingin mencetak 1-2 lembar. Namun, untuk bisnis yang sedang berkembang, terus-menerus menggunakan digital printing adalah pemborosan biaya produksi yang seharusnya bisa dialokasikan untuk pengembangan bisnis lainnya.
            </p>

            <div style={{ backgroundColor: '#f1f5f9', padding: isLargeMobile ? '24px' : '32px', borderRadius: '24px', marginTop: '48px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#001D39', marginBottom: '16px' }}>Pencarian Populer Terkait Percetakan</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                <em>percetakan offset terdekat, harga cetak box packaging, jasa percetakan murah, cetak offset kediri, cetak kemasan produk makanan, keuntungan cetak offset, cetak kotak rokok premium.</em>
              </p>
            </div>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Kesimpulan</h2>
            <p style={{ marginBottom: '24px' }}>
              Jika Anda serius membangun brand and ingin menekan biaya operasional tanpa mengorbankan kualitas, <strong>Offset Printing</strong> adalah satu-satunya jawaban yang masuk akal. Di <strong>Percetakan Dallas</strong>, kami memastikan setiap lembar yang keluar dari mesin kami memiliki kualitas standar internasional yang siap mendukung kesuksesan bisnis Anda.
            </p>
          </section>
        </motion.article>

        <div style={{ marginTop: isLargeMobile ? '40px' : '80px', paddingTop: '40px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <h3 style={{ fontSize: isLargeMobile ? '1.25rem' : '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Dapatkan Harga Offset Terbaik Sekarang!</h3>
          <p style={{ marginBottom: '24px', color: '#64748b', fontSize: isLargeMobile ? '0.95rem' : '1rem' }}>Berhenti membuang budget di digital printing. Beralih ke offset dan rasakan bedanya.</p>
          <Link href="https://wa.me/6281260001487" style={{ backgroundColor: '#25D366', color: '#ffffff', padding: isLargeMobile ? '14px 24px' : '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s', fontSize: isLargeMobile ? '0.95rem' : '1rem' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Icon icon="mdi:whatsapp" fontSize="24" /> Konsultasi Gratis Sekarang
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
