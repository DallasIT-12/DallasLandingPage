'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function IvoryArticlePage() {
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
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.98)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 24px 16px',
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

      <main style={{ maxWidth: '900px', margin: '88px auto 0', padding: isLargeMobile ? '32px 16px' : '60px 24px' }}>
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <header style={{ marginBottom: isLargeMobile ? '32px' : '48px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '600' }}>MATERIAL</span>
              <span style={{ color: '#64748b', fontSize: '0.8rem', alignSelf: 'center' }}>5 Februari 2026 • 8 Menit Baca</span>
            </div>
            <h1 style={{ fontSize: isSmallMobile ? '1.75rem' : (isLargeMobile ? '2.25rem' : '3.5rem'), fontWeight: '800', color: '#001D39', lineHeight: '1.2', marginBottom: '24px' }}>
              Panduan Teknis Material: Memahami Karakteristik Kertas Ivory dalam Manufaktur Packaging
            </h1>
            <p style={{ fontSize: isLargeMobile ? '1rem' : '1.25rem', color: '#64748b', lineHeight: '1.6', fontStyle: 'italic' }}>
              Optimasi pemilihan material untuk cetak kemasan premium dan standar keamanan pangan.
            </p>
          </header>

          <img src="/artikel (1).jpg" alt="Kertas Ivory" style={{ width: '100%', borderRadius: '24px', marginBottom: isLargeMobile ? '32px' : '48px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />

          <section style={{ fontSize: isLargeMobile ? '1rem' : '1.125rem', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ marginBottom: '24px' }}>
              Dalam ekosistem <strong>manufaktur packaging</strong> modern, pemilihan material bukan sekadar urusan biaya, melainkan tentang integritas struktural dan representasi brand. Kertas Ivory (Ivory Paper) telah lama menjadi standar industri untuk <strong>cetak kemasan premium</strong> berkat perpaduan unik antara estetika dan rigiditas.
            </p>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Analisis Teknis Sisi Kertas: Coated vs Uncoated</h2>
            <p style={{ marginBottom: '24px' }}>
              Karakteristik kertas ivory yang paling menonjol adalah perbedaan tekstur pada kedua sisinya. Hal ini terjadi karena proses manufaktur yang hanya memberikan lapisan coating pada satu permukaan saja.
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Sisi Depan (Coated/Glossy):</strong> Memiliki permukaan yang sangat halus dan putih bersih. Coating ini berfungsi untuk menahan tinta agar tetap berada di permukaan (ink holdout), menghasilkan warna yang tajam, vibrant, dan kontras tinggi.</li>
              <li style={{ marginBottom: '12px' }}><strong>Sisi Belakang (Uncoated/Doff):</strong> Tidak memiliki lapisan kimia tambahan, sehingga teksturnya sedikit lebih kasar and doff. Sisi ini memiliki daya serap tinta yang lebih tinggi namun saturasi warna yang dihasilkan lebih rendah dibandingkan sisi depan.</li>
            </ul>
            <p style={{ marginBottom: '24px' }}>
              <strong>Implikasi Cetak Dua Sisi:</strong> Untuk cetak dua sisi (duplex printing), operator harus melakukan penyesuaian profil warna (ICC profile) yang berbeda untuk masing-masing sisi. Sisi belakang biasanya digunakan untuk instruksi penggunaan atau informasi legal yang tidak memerlukan grafis kompleks.
            </p>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Rentang Gramasi & Matriks Aplikasi</h2>
            <p style={{ marginBottom: '20px' }}>
              Ketebalan kertas ivory diukur dalam gram per meter persegi (gsm). Setiap berat memiliki peruntukan spesifik dalam industri pengemasan:
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '32px', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9' }}>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Gramasi (gsm)</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Kekakuan (Stiffness)</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Aplikasi Utama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>210 - 230</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Sedang</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Paperbag premium, brosur eksklusif, box kosmetik kecil.</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>250 - 310</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Tinggi</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Kotak obat (pharmaceutical), packaging gadget, kartu undangan.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>350 - 400</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Sangat Tinggi</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Packaging makanan berat, alas kue (cake board), box souvenir besar.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Proses Finishing: Kompatibilitas Kimiawi</h2>
            <p style={{ marginBottom: '20px' }}>
              Permukaan coated pada ivory sangat responsif terhadap berbagai teknik finishing pasca-cetak:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Laminasi (Doff/Glossy):</strong> Memberikan perlindungan ekstra terhadap air and gesekan.</li>
              <li style={{ marginBottom: '8px' }}><strong>UV Spot:</strong> Sangat efektif pada ivory karena kontras antara area glossy spot and permukaan kertas yang halus sangat kentara.</li>
              <li style={{ marginBottom: '8px' }}><strong>Hot Stamping (Poly):</strong> Permukaan yang rata memungkinkan foil emas atau perak menempel dengan presisi sempurna.</li>
              <li style={{ marginBottom: '8px' }}><strong>Emboss/Deboss:</strong> Karena seratnya yang panjang and kuat, ivory tidak mudah retak (cracking) saat diberi tekanan for efek timbul.</li>
            </ul>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Standardisasi Food Grade</h2>
            <p style={{ marginBottom: '20px' }}>
              Tidak semua kertas ivory bersifat food grade. Untuk aplikasi kuliner, kertas harus memenuhi kriteria ketat:
            </p>
            <ol style={{ paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Bebas OBA (Optical Brightening Agents):</strong> Zat pemutih optik tidak boleh digunakan karena risiko migrasi zat kimia ke makanan.</li>
              <li style={{ marginBottom: '12px' }}><strong>Virgin Pulp:</strong> Harus terbuat dari serat kayu murni, bukan kertas daur ulang yang berisiko mengandung kontaminan tinta bekas atau perekat.</li>
              <li style={{ marginBottom: '12px' }}><strong>Sertifikasi FDA/ISEGA:</strong> Memastikan material aman bersentuhan langsung dengan makanan berminyak atau lembap.</li>
            </ol>

            <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginTop: isLargeMobile ? '32px' : '48px', marginBottom: '16px' }}>Analisis Komparatif: Ivory vs Duplex vs Art Carton</h2>
            <div style={{ overflowX: 'auto', marginBottom: '32px', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0A4174', color: '#ffffff' }}>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Fitur</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Ivory</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Duplex</th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Art Carton</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Sisi Belakang</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Putih Doff</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Abu-abu</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Putih Coated</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Rigiditas</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Sangat Tinggi</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Tinggi</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Sedang</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: '600' }}>Harga</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Premium</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Ekonomis</td>
                    <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Menengah</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: isLargeMobile ? '24px' : '32px', borderRadius: '24px', marginTop: '48px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#001D39', marginBottom: '16px' }}>FAQ Kertas Ivory</h3>
              <p style={{ marginBottom: '12px' }}><strong>Q: Apakah kertas ivory bisa dicetak offset?</strong><br />A: Ya, ini adalah metode terbaik. Ivory sangat ideal for mesin offset Heidelberg atau Komori.</p>
              <p><strong>Q: Bisakah ivory digunakan for packaging produk beku?</strong><br />A: Bisa, namun wajib menggunakan varian PE-Coated for mencegah kertas hancur akibat kondensasi.</p>
            </div>
          </section>
        </motion.article>

        <div style={{ marginTop: isLargeMobile ? '40px' : '80px', paddingTop: '40px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <h3 style={{ fontSize: isLargeMobile ? '1.25rem' : '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Butuh Konsultasi Cetak Kemasan Premium?</h3>
          <Link href="https://wa.me/6281260001487" style={{ backgroundColor: '#25D366', color: '#ffffff', padding: isLargeMobile ? '14px 24px' : '16px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s', fontSize: isLargeMobile ? '0.95rem' : '1rem' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Icon icon="mdi:whatsapp" fontSize="24" /> Hubungi Kami Sekarang
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}