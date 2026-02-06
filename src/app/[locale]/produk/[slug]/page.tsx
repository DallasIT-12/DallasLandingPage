'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ProductCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const t = useTranslations();
  const tCat = useTranslations('Categories');
  const tMaterials = useTranslations('Materials');
  const tCommon = useTranslations('Common');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMediumMobile, setIsMediumMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

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

  // Reset zoom when image changes or closes
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedImage]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

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
          color: link.href === '/produk' ? '#000000' : '#4b5563',
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
    )
  });

  // Construct categories dynamically from translations
  const dallasCategories = useMemo(() => [
    { title: tCat('hampers.title'), slug: "kotak-hampers", img: "/kotak hampers.jpg", desc: tCat('hampers.desc'), tags: [tCat('hampers.tags.tag1'), tCat('hampers.tags.tag2')], gallery: ["/kotak hampers.jpg"] },
    { title: tCat('bakery.title'), slug: "kotak-bakery", img: "/kotak cake.jpg", desc: tCat('bakery.desc'), tags: [tCat('bakery.tags.tag1'), tCat('bakery.tags.tag2')], gallery: ["/kotak cake.jpg"] },
    { title: tCat('rokok.title'), slug: "rokok", img: "/custom%20rokok%203.jpg", desc: tCat('rokok.desc'), tags: [tCat('rokok.tags.tag1'), tCat('rokok.tags.tag2')], gallery: ["/custom rokok.jpg", "/custom rokok 1.jpg", "/custom rokok 2.jpg", "/custom rokok 3.jpg", "/custom rokok 4.jpg"] },
    { title: tCat('nasi.title'), slug: "kotak-nasi", img: "/mobile_banner_2.jpg", desc: tCat('nasi.desc'), tags: [tCat('nasi.tags.tag1'), tCat('nasi.tags.tag2')], gallery: ["/mobile_banner_2.jpg"] },
    { title: tCat('buku.title'), slug: "buku", img: "/buku (6).jpg", desc: tCat('buku.desc'), tags: [tCat('buku.tags.tag1')], gallery: ["/buku (1).jpg", "/buku (2).jpg", "/buku (3).jpg", "/buku (4).jpg", "/buku (5).jpg", "/buku (6).jpg", "/buku (7).jpg", "/buku (8).jpg", "/buku (9).jpg"] },
    { title: tCat('kalender.title'), slug: "kalender", img: "/foto kalender.png", desc: tCat('kalender.desc'), tags: [tCat('kalender.tags.tag1')], gallery: ["/foto kalender.png"] },
    { title: tCat('paperbag.title'), slug: "paperbag", img: "/paperbag.jpg", desc: tCat('paperbag.desc'), tags: [tCat('paperbag.tags.tag1'), tCat('paperbag.tags.tag2')], gallery: ["/paperbag.jpg", "/paperbag (2).jpg", "/paperbag (3).jpg"] },
    { title: tCat('map.title'), slug: "map", img: "/map.jpg", desc: tCat('map.desc'), tags: [tCat('map.tags.tag1'), tCat('map.tags.tag2')], gallery: ["/map.jpg", "/map (1).jpg", "/map (2).jpg", "/map (3).jpg"] },
    { title: tCat('brosur.title'), slug: "brosur", img: "/foto brosur.png", desc: tCat('brosur.desc'), tags: [tCat('brosur.tags.tag1')], gallery: ["/foto brosur.png"] },
    
    // Materials with Detailed Info
    { 
      title: tMaterials('artPaper.name'), 
      slug: "art-paper", 
      img: "/BAHAN-AP.jpg", 
      desc: tMaterials('artPaper.desc'), 
      isMaterial: true,
      explanation: "Art Paper adalah jenis kertas dengan permukaan yang halus, licin, dan mengkilap (glossy) di kedua sisinya. Kertas ini memiliki daya serap tinta yang rendah sehingga hasil cetakan terlihat sangat tajam dan vibrant.",
      applications: ["Brosur eksklusif", "Flyer promosi", "Katalog produk", "Isi buku atau majalah premium", "Kalender dinding"],
      varieties: ["100 gsm", "120 gsm", "150 gsm (Standar brosur premium)"],
      gallery: ["/BAHAN-AP.jpg", "/foto brosur.png"] 
    },
    { 
      title: tMaterials('ivoryPaper.name'), 
      slug: "ivory-paper", 
      img: "/BAHAN-IVORY.jpg", 
      desc: tMaterials('ivoryPaper.desc'), 
      isMaterial: true,
      explanation: "Kertas Ivory adalah material 'all-in-one' yang menggabungkan karakteristik Art Carton dan BW. Satu sisinya memiliki coating glossy yang halus, sementara sisi lainnya doff (tanpa coating) namun tetap putih bersih.",
      applications: ["Box packaging skincare/kosmetik", "Paper bag premium", "Packaging makanan (Food Grade)", "Kotak obat-obatan", "Hangtag fashion"],
      varieties: ["210 gsm", "230 gsm", "250 gsm", "310 gsm (Paling populer untuk box)", "350 gsm"],
      gallery: ["/BAHAN-IVORY.jpg", "/paperlisens produk unggulan (1).png"] 
    },
    { 
      title: tMaterials('tipping.name'), 
      slug: "bahan-tipping", 
      img: "/BAHAN-TIPPING.jpg", 
      desc: tMaterials('tipping.desc'), 
      isMaterial: true,
      explanation: "Tipping Paper adalah kertas khusus industri yang didesain dengan ketahanan tinggi dan tekstur spesifik. Di Dallas, kami menguasai kategori ini dengan spesifikasi teknis yang sangat presisi.",
      applications: ["Pembungkus filter rokok (filter wrapping)", "Segel kemasan khusus", "Komponen teknis produk tembakau"],
      varieties: ["Standard White", "Cork Pattern (Motif kayu)", "Custom Printing dengan logo/poly"],
      gallery: ["/BAHAN-TIPPING.jpg"] 
    },
    { 
      title: tMaterials('duplex.name'), 
      slug: "duplex", 
      img: "/BAHAN-DC.jpg", 
      desc: tMaterials('duplex.desc'), 
      isMaterial: true,
      explanation: "Kertas Duplex (Duplex Board) memiliki ciri khas perbedaan warna di kedua sisinya: satu sisi putih (coated) untuk area cetak, dan sisi lainnya abu-abu (uncoated). Sangat ekonomis dan kokoh.",
      applications: ["Box martabak & nasi", "Packaging produk massal", "Alas kue", "Box kemasan sparepart", "Packaging mainan"],
      varieties: ["250 gsm", "310 gsm", "400 gsm (Sangat tebal dan kaku)"],
      gallery: ["/BAHAN-DC.jpg", "/mobile_banner_2.jpg"] 
    }
  ], [tCat, tMaterials]);

  const category = dallasCategories.find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', color: '#1f2937' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>{tCommon('categoryNotFound')}</h1>
            <p style={{ marginTop: '0.5rem', color: '#64748b' }}>{tCommon('categoryNotFoundDesc')}</p>
            <Link href="/" style={{ marginTop: '2rem', display: 'inline-block', color: '#0A4174', fontWeight: '600' }}>Kembali ke Home</Link>
          </div>
        </main>
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

      {/* Main Content */}
      <main style={{ padding: isLargeMobile ? '2rem 1.5rem' : '4rem 2rem', maxWidth: '1200px', margin: '120px auto 0' }}>
        
        {/* Breadcrumb / Back button style */}
        <div style={{ marginBottom: '32px' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A4174', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '1rem' }}>
                <Icon icon="mdi:arrow-left" />
                {tCommon('back')}
            </button>
        </div>

        {category.isMaterial ? (
          <div style={{ display: 'grid', gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr', gap: isLargeMobile ? '2rem' : '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <Image 
                 src={category.img} 
                 alt={category.title} 
                 width={600} 
                 height={600} 
                 style={{ borderRadius: '24px', width: '100%', height: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
               />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
               <span style={{ backgroundColor: '#0A4174', color: '#ffffff', padding: '4px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '16px', display: 'inline-block' }}>Informasi Bahan</span>
               <h2 style={{ fontSize: isLargeMobile ? '2rem' : '3rem', fontWeight: '800', color: '#001D39', marginBottom: '24px', lineHeight: '1.1' }}>Apa Itu {category.title}?</h2>
               <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '32px' }}>
                 {category.explanation}
               </p>
               
               <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon icon="mdi:tools" color="#0A4174" /> Bisa Dibuat Apa Saja?
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: '#4b5563', lineHeight: '1.8' }}>
                    {category.applications?.map((app, i) => <li key={i}>{app}</li>)}
                  </ul>
                  
                  <h4 style={{ fontWeight: '700', marginTop: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon icon="mdi:layers-outline" color="#0A4174" /> Macam / Ketebalan:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {category.varieties?.map((v, i) => (
                      <span key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500' }}>{v}</span>
                    ))}
                  </div>
               </div>
            </motion.div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <h1 style={{ fontSize: isLargeMobile ? '2.25rem' : '3.5rem', fontWeight: '800', color: '#001D39', marginBottom: '20px' }}>{category.title}</h1>
             <p style={{ fontSize: isLargeMobile ? '1rem' : '1.125rem', color: '#4b5563', maxWidth: '720px', margin: '0 auto', lineHeight: '1.8' }}>
               {category.desc}
             </p>
          </div>
        )}

        {/* Gallery Section */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: isLargeMobile ? 'left' : 'center' }}>
            Contoh Penggunaan & Gallery
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isLargeMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: isLargeMobile ? '12px' : '1.5rem' 
          }}>
            {category.gallery.map((imageSrc, index) => (
              <div key={index} 
                   onClick={() => setSelectedImage(imageSrc)}
                   style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '100%', 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      cursor: 'pointer'
              }}>
                <Image
                  src={imageSrc}
                  alt={`${category.title} - ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  className="hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#0A4174', padding: '48px 24px', borderRadius: '32px', color: 'white' }}>
           <h3 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '16px' }}>Tertarik Menggunakan Bahan Ini?</h3>
           <p style={{ marginBottom: '32px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 32px' }}>Dapatkan penawaran harga terbaik dan konsultasi gratis mengenai kebutuhan cetak Anda langsung dengan tim ahli kami.</p>
           <a href="https://wa.me/6281260001487" style={{ backgroundColor: '#25D366', color: 'white', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
              <Icon icon="mdi:whatsapp" fontSize="24" /> Hubungi Kami Sekarang
           </a>
        </div>
      </main>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            overflow: 'auto', 
            display: 'flex',
            alignItems: zoomLevel > 1 ? 'flex-start' : 'center', 
            justifyContent: zoomLevel > 1 ? 'flex-start' : 'center',
          }}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed', 
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 110,
              color: 'white',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Icon icon="mdi:close" style={{ fontSize: '24px' }} />
          </button>

          <div 
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(prev => prev === 1 ? 2.5 : 1);
            }}
            style={{ 
              position: 'relative',
              minWidth: zoomLevel > 1 ? '250vw' : 'auto', 
              minHeight: zoomLevel > 1 ? '250vh' : 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
              padding: '20px'
            }}
          >
             <img 
               src={selectedImage} 
               alt="Zoomed View" 
               style={{ 
                 maxWidth: zoomLevel > 1 ? 'none' : '100vw',
                 maxHeight: zoomLevel > 1 ? 'none' : '100vh',
                 width: zoomLevel > 1 ? 'auto' : '100%',
                 height: zoomLevel > 1 ? 'auto' : '100%',
                 objectFit: 'contain',
                 userSelect: 'none',
                 transform: zoomLevel > 1 ? 'scale(1)' : 'none', 
               }} 
             />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}