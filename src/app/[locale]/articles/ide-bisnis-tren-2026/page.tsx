'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function BusinessTrendsArticle() {
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

  const businessIdeas = [
    {
      title: 'Skincare Lokal & Kosmetik Natural',
      explanation: 'Bisnis ini berfokus pada pengembangan produk perawatan diri yang menggunakan bahan-bahan alami atau aktif dengan formulasi yang disesuaikan untuk kulit masyarakat Indonesia. Brand skincare lokal kini mengedepankan transparansi bahan dan kemasan yang estetis untuk membangun kepercayaan konsumen.',
      whyTrend: 'Kesadaran masyarakat akan pentingnya merawat diri (self-care) meningkat drastis. Konsumen kini lebih cerdas dalam memilih produk yang bebas bahan kimia berbahaya. Selain itu, sentimen positif terhadap produk "Bangga Buatan Indonesia" membuat brand lokal memiliki panggung yang sangat luas di pasar digital maupun offline.',
      examples: 'Serum wajah dengan ekstrak botani lokal, masker organik bubuk, sunscreen ramah terumbu karang, dan pelembab wajah non-komedogenik.'
    },
    {
      title: 'Healthy Catering & Healthy Bakery',
      explanation: 'Usaha penyediaan makanan sehat yang diproses dengan standar nutrisi tertentu. Ini mencakup katering harian untuk diet, hingga produk roti dan kue yang menggunakan bahan alternatif seperti tepung almond, pemanis stevia, atau bahan bebas gluten.',
      whyTrend: 'Gaya hidup sehat telah menjadi status sosial baru. Banyak pekerja kantoran dan ibu rumah tangga yang mencari solusi praktis untuk tetap makan enak tanpa mengkhawatirkan kalori berlebih atau efek buruk gula. Makanan sehat kini tidak lagi dianggap hambar, melainkan produk premium yang lezat.',
      examples: 'Menu katering keto-friendly, cookies oat rendah gula, sourdough bread murni, dan paket smoothie bowl siap santap.'
    },
    {
      title: 'Hampers & Gift Box Terkurasi (Curated Gifts)',
      explanation: 'Bisnis jasa yang mengkurasi berbagai produk berkualitas ke dalam satu kotak kado yang didesain secara tematik. Keunggulan bisnis ini terletak pada kemampuan pemiliknya dalam memadukan warna, jenis barang, dan kemasan agar terlihat harmonis dan mewah.',
      whyTrend: 'Budaya berbagi di Indonesia sangat kuat. Orang lebih suka mengirimkan hampers yang sudah "siap pajang" dan terlihat eksklusif daripada memberikan barang satuan. Momen seperti hari raya, kelahiran bayi, hingga ucapan terima kasih korporat menjadi pendorong utama bisnis ini.',
      examples: 'Hampers "Self-Care" (isi lilin aroma & handuk), gift box bayi baru lahir dengan perlengkapan premium, dan paket kado perpisahan rekan kerja.'
    },
    {
      title: 'Minuman Botolan RTD (Ready to Drink) Literan',
      explanation: 'Produksi minuman dalam kemasan botol besar (literan) atau botol personal yang siap diminum kapan saja. Fokus utamanya adalah rasa yang konsisten dan kemasan yang memudahkan penyimpanan di lemari es dalam waktu lama.',
      whyTrend: 'Konsumen mengejar efisiensi. Membeli kopi atau teh literan dianggap jauh lebih hemat dan praktis dibandingkan membeli per gelas setiap hari. Tren ini didukung oleh kemudahan pengiriman instan yang membuat stok minuman segar bisa sampai ke tangan konsumen dalam hitungan menit.',
      examples: 'Kopi susu literan (cold brew), artisan tea botolan, minuman herbal modern (empon-empon kekinian), dan jus sayur cold-pressed.'
    },
    {
      title: 'Pet Care & Camilan Hewan Premium',
      explanation: 'Bisnis yang menyediakan kebutuhan gaya hidup hewan peliharaan, terutama makanan ringan (treats) yang dibuat secara homemade dengan standar kualitas manusia (human-grade) tanpa pengawet atau pewarna sintetis.',
      whyTrend: 'Fenomena "Pet Parent" atau menganggap hewan sebagai anak sendiri membuat pemilik hewan tidak ragu mengeluarkan uang lebih untuk kesehatan anabul mereka. Mereka sangat memperhatikan label kandungan nutrisi pada kemasan produk hewan yang mereka beli.',
      examples: 'Freeze-dried meat treats, biskuit hewan bebas gluten, vitamin kucing organik, dan aksesoris kalung hewan custom.'
    },
    {
      title: 'Home Fragrance & Produk Relaksasi',
      explanation: 'Usaha yang memproduksi atau mengemas ulang produk wewangian ruangan seperti lilin aromaterapi, reed diffuser, atau room spray dengan aroma yang menenangkan dan desain wadah yang dekoratif.',
      whyTrend: 'Semakin banyak orang menghabiskan waktu di rumah (WFH atau Hybrid), semakin tinggi kebutuhan akan suasana yang nyaman untuk bekerja dan beristirahat. Produk home fragrance kini menjadi bagian dari elemen dekorasi rumah minimalis yang sangat populer di media sosial.',
      examples: 'Scented candle dari soy wax, reed diffuser dengan stik rotan, room spray anti-bakteri aroma lavender, dan essential oil blend.'
    },
    {
      title: 'Local Fashion & Modest Wear Tematik',
      explanation: 'Pengembangan brand pakaian lokal dengan desain orisinal yang memiliki cerita atau tema tertentu. Seringkali fokus pada pasar pakaian muslimah (modest wear) yang menggabungkan unsur modernitas dengan kesantunan.',
      whyTrend: 'Fashion lokal kini dianggap lebih eksklusif dan unik daripada brand fast-fashion massal. Konsumen bangga memakai pakaian yang memiliki identitas visual yang kuat, seperti motif kain custom atau desain hangtag yang menarik.',
      examples: 'Hijab motif printing desain sendiri, gaun muslimah minimalis, set pakaian kerja wanita modern, dan tote bag kanvas premium.'
    }
  ];

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
              <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '600' }}>IDE BISNIS</span>
              <span style={{ color: '#64748b', fontSize: '0.8rem', alignSelf: 'center' }}>6 Februari 2026 • 18 Menit Baca</span>
            </div>
            <h1 style={{ fontSize: isSmallMobile ? '1.75rem' : (isLargeMobile ? '2.25rem' : '3.5rem'), fontWeight: '800', color: '#001D39', lineHeight: '1.2', marginBottom: '24px' }}>
              7 Ide Bisnis Paling Menjanjikan Tahun 2026: Strategi Memulai & Menguasai Pasar
            </h1>
            <p style={{ fontSize: isLargeMobile ? '1rem' : '1.25rem', color: '#64748b', lineHeight: '1.6' }}>
              Simak analisis mendalam mengenai peluang usaha yang sedang tren, strategi visualisasi brand, hingga rahasia menekan biaya produksi melalui konsultasi di Percetakan Dallas Kediri.
            </p>
          </header>

          <img src="/artikel (2).png" alt="Tren Bisnis 2026" style={{ width: '100%', borderRadius: '24px', marginBottom: isLargeMobile ? '32px' : '48px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />

          <section style={{ fontSize: isLargeMobile ? '1rem' : '1.125rem', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ marginBottom: '24px' }}>
              Dunia bisnis di tahun 2026 menuntut kreativitas yang lebih tinggi dari sebelumnya. Persaingan tidak lagi hanya soal harga, tapi soal bagaimana sebuah brand bisa "berbicara" kepada konsumennya melalui identitas visual yang kuat. Berikut adalah 7 ide bisnis yang kami amati sedang berkembang pesat dan memiliki potensi jangka panjang.
            </p>

            {businessIdeas.map((item, index) => (
              <div key={index} style={{ marginTop: isLargeMobile ? '32px' : '48px', borderBottom: '1px solid #e2e8f0', paddingBottom: isLargeMobile ? '24px' : '32px' }}>
                <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', color: '#001D39', marginBottom: '16px' }}>{index + 1}. {item.title}</h2>
                
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#0A4174', fontSize: isLargeMobile ? '1rem' : '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Penjelasan:</h4>
                  <p>{item.explanation}</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#0A4174', fontSize: isLargeMobile ? '1rem' : '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Kenapa Menjadi Tren?</h4>
                  <p>{item.whyTrend}</p>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <h4 style={{ color: '#0A4174', fontSize: isLargeMobile ? '1rem' : '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Contoh Produk yang Sedang Tren:</h4>
                  <p style={{ fontStyle: 'italic', color: '#475569' }}>{item.examples}</p>
                </div>
              </div>
            ))}

            <div style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: isLargeMobile ? '24px' : '50px', borderRadius: '32px', marginTop: isLargeMobile ? '40px' : '60px' }}>
              <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '20px', textAlign: 'center', lineHeight: '1.2' }}>
                Bagaimana Percetakan Dallas Kediri Mendukung Bisnis Anda?
              </h2>
              <p style={{ textAlign: 'center', marginBottom: '32px', opacity: 0.9, fontSize: isLargeMobile ? '0.95rem' : '1rem' }}>
                Setelah Anda menentukan ide bisnis di atas, langkah selanjutnya adalah visualisasi brand melalui kemasan yang menjual. Percetakan Dallas hadir sebagai partner teknis yang menguasai berbagai kategori pasar:
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '20px' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: isLargeMobile ? '1rem' : '1.1rem' }}>📦 Solusi Packaging Skincare & Hampers</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Gunakan Box Ivory premium atau Hardbox dengan finishing UV Spot/Gold Foil untuk memberikan kesan "mahal" pada brand skincare atau hampers Anda.</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '20px' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: isLargeMobile ? '1rem' : '1.1rem' }}>🍲 Solusi Kemasan Kuliner Food Grade</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Tersedia Paper Tray, Lunch Box, dan Food Wrapper yang telah tersertifikasi aman for makanan panas atau berminyak bagi katering sehat Anda.</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '20px' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: isLargeMobile ? '1rem' : '1.1rem' }}>🏷️ Solusi Label, Hangtag & Sticker</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Sticker Vinyl tahan air for botol minuman literan dan Hangtag tebal berkualitas tinggi for identitas brand fashion lokal Anda.</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '20px' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: isLargeMobile ? '1rem' : '1.1rem' }}>📊 Konsultasi Gratis Dallas</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Bingung pilih bahan? Kami berikan edukasi gratis mengenai gramasi kertas dan teknik cetak paling hemat sesuai skala bisnis Anda.</p>
                </div>
              </div>

              <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '32px' }}>
                <h3 style={{ fontSize: isLargeMobile ? '1.25rem' : '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Mulai Konsultasi Cetak Sekarang</h3>
                <p style={{ marginBottom: '24px', opacity: 0.9, fontSize: isLargeMobile ? '0.9rem' : '1rem' }}>
                  Jangan biarkan budget produksi Anda terbuang percuma. Hubungi tim ahli kami for mendapatkan spesifikasi kemasan terbaik dengan harga pabrik.
                </p>
                <Link href="https://wa.me/6281260001487" style={{ backgroundColor: '#25D366', color: '#ffffff', padding: isLargeMobile ? '14px 24px' : '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: isLargeMobile ? '0.95rem' : '1.1rem' }}>
                  <Icon icon="mdi:whatsapp" fontSize="24" /> Hubungi Kami Sekarang
                </Link>
              </div>
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: isLargeMobile ? '24px' : '32px', borderRadius: '24px', marginTop: '48px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#001D39', marginBottom: '16px' }}>Pencarian Terkait Ide Bisnis</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                <em>ide bisnis tren 2026, katering sehat kediri, cetak box skincare premium, supplier lunch box food grade, hangtag fashion murah, percetakan kediri terbaik, jasa cetak offset profesional, konsultasi kemasan gratis.</em>
              </p>
            </div>
          </section>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
