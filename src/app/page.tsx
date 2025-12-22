'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

const ClassicProductCardGrid = () => {
  const categories = [
    { title: "Kotak Hampers", slug: "kotak-hampers", img: "/kotak hampers.jpg", desc: "Kemasan cetak premium dengan detail presisi, warna memukau, dan finishing elegan.", tags: ["Estetika", "Mewah"] },
    { title: "Kotak Bakery", slug: "kotak-bakery", img: "/kotak cake.jpg", desc: "Kemasan elegan dan fungsional untuk melindungi dan mempercantik produk bakery Anda.", tags: ["Elegan", "Food-Grade"] },
    { title: "Rokok", slug: "rokok", img: "/custom rokok 3.jpg", desc: "Cetak box rokok dengan detail grafis tajam dan material berkualitas tinggi.", tags: ["Tajam", "Konsisten"] },
    { title: "Kotak Nasi", slug: "kotak-nasi", img: "/mobile_banner_2.jpg", desc: "Kotak nasi praktis dan higienis untuk berbagai acara dan kebutuhan katering.", tags: ["Praktis", "Higienis"] },
    { title: "Buku", slug: "buku", img: "/buku (6).jpg", desc: "Teks jelas, gambar tajam, binding kuat untuk pengalaman membaca terbaik.", tags: ["Binding Kuat"] },
    { title: "Kalender", slug: "kalender", img: "/foto kalender.png", desc: "Desain menarik dan material terbaik, alat promosi fungsional.", tags: ["Fungsional"] },
    { title: "Paperbag", slug: "paperbag", img: "/paperbag.jpg", desc: "Paperbag kuat, stylish, dan mencerminkan identitas brand.", tags: ["Premium", "Kuat"] },
    { title: "Map", slug: "map", img: "/map.jpg", desc: "Cetak map custom untuk kebutuhan kantor, seminar, atau acara. Profesional dan fungsional.", tags: ["Profesional", "Fungsional"] },
    { title: "Brosur", slug: "brosur", img: "/foto brosur.png", desc: "Informasi jelas, gambar memukau, dan lipatan presisi.", tags: ["Informatif"] }
  ];

  return (
    <div className="max-w-7xl mx-auto relative px-4 pb-10">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {categories.map((category, i) => (
          <Link key={category.slug} href={`/produk/${category.slug}`} style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                backgroundColor: '#f3f4f6',
                borderRadius: '16px',
                padding: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                transform: 'scale(1)',
                border: '1px solid #e5e7eb'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={category.img}
                alt={category.title}
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  marginBottom: '16px'
                }}
              />
              <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '8px', color: '#111827' }}>{category.title}</h4>
              <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '16px', flexGrow: 1 }}>{category.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                {category.tags.map(tag => (
                  <span key={tag} style={{ backgroundColor: '#e5e7eb', color: '#4b5563', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const smoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buttonStyle = {
    padding: '12px 32px',
    borderRadius: '50px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-block',
    cursor: 'pointer',
    transform: 'scale(1)'
  };

  const primaryButton = {
    ...buttonStyle,
    backgroundColor: '#ffffff',
    color: '#000000'
  };

  const secondaryButton = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff'
  };

  const productImageStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '12px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)'
  };

// --- Banner Slider Component ---
const BannerSlider = ({ images, interval = 10000, transitionType = 'fade' }: { images: string[], interval?: number, transitionType?: 'fade' | 'slide' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    resetTimer();
    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, interval);

    return () => {
      resetTimer();
    };
  }, [currentIndex, images.length, interval]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end on new touch
    setTouchStart(e.targetTouches[0].clientX);
    resetTimer(); // Pause timer on user interaction
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }
    // The useEffect will restart the timer automatically when currentIndex changes
  };

  return (
    <div 
      style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {transitionType === 'slide' ? (
        <div style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.7s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>
          {images.map((src) => (
            <div key={src} style={{ position: 'relative', width: '100%', height: '100%', flexShrink: 0 }}>
              <Image
                src={src}
                alt={`Banner`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
                priority={images.indexOf(src) === 0}
              />
            </div>
          ))}
        </div>
      ) : (
        // Default fade transition
        images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Banner ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 80vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: currentIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          />
        ))
      )}

      {/* Previous Button */}
      <button
        onClick={goToPrevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          zIndex: 10,
        }}
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          zIndex: 10,
        }}
      >
        &#10095;
      </button>

      {/* Navigation Dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            style={{
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: currentIndex === slideIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

  const desktopBanners = ['/main banner dallas.png', '/main banner dallas 2.png', '/main banner dallas 3.png', '/main banner dallas 4.png'];
  const mobileBanners = [
    '/mobile_banner_1.jpg',
    '/mobile_banner_2.jpg',
    '/mobile_banner_3.jpg',
    '/mobile_banner_4.jpg',
    '/mobile_banner_5.jpg',
    '/mobile_banner_6.jpg',
    '/mobile_banner_7.jpg',
    '/mobile_banner_8.jpg',
    '/mobile_banner_9.jpg'
  ]; 

  const machineImages = [
    '/foto mesin.png',
    '/foto mesin (1).png',
    '/foto mesin (2).png',
    '/foto mesin (3).png',
    '/foto mesin (4).png',
    '/foto mesin (5).png',
    '/foto mesin (6).png',
    '/foto mesin (7).png'
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false); // < 480px
  const [isMediumMobile, setIsMediumMobile] = useState(false); // < 640px
  const [isLargeMobile, setIsLargeMobile] = useState(false); // < 768px

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
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Custom Box Rokok' },
    { href: '/KATALOG DALLAS.pdf', label: 'Katalog', download: true },
    { href: '/paperlisens', label: 'Paperlisens' },
    { href: '#contact', label: 'Kontak', isScroll: true },
  ];

  const renderNavLinks = () => navLinks.map(link => (
    <a
      key={link.label}
      href={link.href}
      download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
      onClick={(e) => {
        if (link.isScroll) smoothScroll(e, link.href);
        setIsMenuOpen(false);
      }}
      style={{
        color: link.href === '/' ? '#000000' : '#4b5563',
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
          (e.target as HTMLElement).style.color = link.href === '/' ? '#000000' : '#4b5563';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {link.label}
    </a>
  ));
  
  return (
    <div style={{
      backgroundColor: '#000000', 
      color: '#ffffff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* Top Bar Contact Info & Social Media */}
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '12px',
        padding: isLargeMobile ? '4px 0' : '8px 0', // Reduced vertical padding for mobile
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
          flexWrap: isLargeMobile ? 'wrap' : 'nowrap',
          gap: isLargeMobile ? '8px' : '0'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {!isLargeMobile && (
              <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <Icon icon="mdi:map-marker" style={{ fontSize: '14px' }} />
                Jl. Kilisuci no 71, Singonegaran, Kec. Kota, Kota Kediri.
              </span>
            )}
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <Icon icon="mdi:phone" style={{ fontSize: '14px' }} />
              {isLargeMobile ? '081260001487' : '081260001487 | 085946896488 | 085235531946'} {/* Display only one number on mobile */}
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

      /* Navigation */
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
            <a href="/" style={{textDecoration: 'none'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '36px', width: 'auto', filter: 'invert(1)'}} />
            </a>

            {isLargeMobile ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{background: 'none', border: 'none', color: '#000000', fontSize: '24px'}}>
                <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
              </button>
            ) : (
              <div style={{display: 'flex', gap: '32px'}}>
                {renderNavLinks()}
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
            </div>
          )}
        </div>
      </nav>

            {/* Hero Section */}
            <section style={{
              height: isLargeMobile ? '100vw' : 'calc(100vh - 88px)', // 100vw = Kotak di HP, Fullscreen di Desktop
              position: 'relative',
              marginTop: '88px'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <BannerSlider images={isLargeMobile ? mobileBanners : desktopBanners} transitionType="slide" />
              </div>
            </section>

            {/* Company Profile Section */}
            <section style={{
              padding: isMediumMobile ? '64px 24px' : '128px 24px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              color: '#1f2937'
            }}>
                <div style={{maxWidth: '800px', margin: '0 auto'}}>
                    <h2 style={{
                      fontSize: isMediumMobile ? '2rem' : '2.5rem',
                      fontWeight: '600',
                      marginBottom: '16px',
                      lineHeight: '1.2',
                      color: '#111827'
                    }}>
                        Sejak 1983: Warisan Kepercayaan dan Kualitas Tak Tertandingi
                    </h2>
                    <p style={{
                      fontSize: isMediumMobile ? '1rem' : '1.125rem',
                      color: '#4b5563',
                      lineHeight: '1.75'
                    }}>
                        Percetakan Offset Dallas adalah pionir dan pemimpin dalam industri percetakan offset di Kediri, dengan rekam jejak yang tak terputus sejak didirikan pada tahun 1983. Dengan pengalaman yang kaya selama lebih dari empat dekade, kami telah menguasai seni dan teknologi cetak, selalu mengutamakan kualitas tinggi untuk memenuhi dan melampaui kebutuhan spesifik setiap pelanggan.
                        Komitmen kami dibuktikan dengan layanan kepada puluhan ribu klien dari berbagai skala industri, menegaskan konsistensi dan keandalan hasil cetak kami.
                    </p>
                </div>
            </section>

            {/* About Us Section */}
            <section style={{
              padding: isMediumMobile ? '64px 24px' : '100px 24px',
              backgroundColor: '#1f2937',
              color: '#ffffff',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr',
                gap: isLargeMobile ? '48px' : '64px',
                alignItems: 'center'
              }}>
                {/* Text Column */}
                <div style={{ order: isLargeMobile ? 2 : 1 }}>
                  <h2 style={{
                    fontSize: isMediumMobile ? '2rem' : '2.25rem',
                    fontWeight: '600',
                    marginBottom: '24px',
                    lineHeight: '1.2'
                  }}>
                    Teknologi Modern untuk Hasil Presisi
                  </h2>
                  <p style={{
                    fontSize: isMediumMobile ? '1rem' : '1.125rem',
                    color: '#e5e7eb',
                    lineHeight: '1.75',
                    marginBottom: '16px'
                  }}>
                    Kami menggunakan mesin offset terkini untuk menjamin ketajaman detail dan konsistensi warna di setiap lembar. Didukung tim operator yang ahli, Percetakan Dallas siap menangani berbagai kebutuhan cetak Anda dengan cepat, rapi, dan efisien.
                  </p>
                </div>
                {/* Image Slider Column */}
                <div style={{ 
                  order: isLargeMobile ? 1 : 2,
                  height: isSmallMobile ? '280px' : (isLargeMobile ? '350px' : '450px'),
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                }}>
                  <BannerSlider images={machineImages} interval={4000} />
                </div>
              </div>
            </section>
			
            {/* Why Choose Dallas Section */}
            <section style={{
                padding: isMediumMobile ? '64px 24px' : '100px 24px',
                textAlign: 'center',
                backgroundColor: '#1f2937',
                color: '#ffffff',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                    <div style={{marginBottom: '64px'}}>
                         <h2 style={{
                            fontSize: isMediumMobile ? '1.75rem' : '2.25rem',
                            fontWeight: '700',
                            marginBottom: '16px',
                            color: 'white'
                        }}>
                            Mengapa Memilih Percetakan Offset Dallas?
                        </h2>
                        <p style={{
                            fontSize: isMediumMobile ? '1rem' : '1.125rem',
                            color: '#9ca3af',
                            fontWeight: '400'
                        }}>
                            Dedikasi pada Kualitas dan Ketepatan Waktu Sejak 1983.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isSmallMobile ? '1fr' : (isMediumMobile ? '1fr 1fr' : 'repeat(4, 1fr)'),
                        gap: '32px',
                        marginBottom: '64px'
                    }}>
                        {/* POIN 1: PENGALAMAN (LEGACY) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:shield-check" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>Pengalaman 4 Dekade</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                Lebih dari 40 tahun berkarya memberikan kami keahlian mendalam untuk menangani berbagai kompleksitas proyek cetak Anda, dari skala kecil hingga produksi massal.
                            </p>
                        </div>

                        {/* POIN 2: KUALITAS (PRECISION) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:crosshairs-gps" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>Standar Kualitas Presisi</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                Kami memadukan ketelitian operator berpengalaman dengan teknologi mesin terkini untuk memastikan warna yang akurat, potongan yang rapi, dan hasil yang konsisten.
                            </p>
                        </div>

                         {/* POIN 3: KONSULTASI (SOLUTION) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:lightbulb-on-outline" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>Mitra Konsultasi Solutif</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                Kami lebih dari sekadar tukang cetak. Tim kami siap memberikan saran ahli mengenai pemilihan bahan, efisiensi biaya, hingga finishing terbaik untuk produk Anda.
                            </p>
                        </div>

                         {/* POIN 4: WAKTU (PUNCTUALITY) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:clock-check-outline" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>Jaminan Ketepatan Waktu</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                Kami menghargai bisnis Anda dengan menghargai waktu Anda. Dengan manajemen alur kerja yang terstruktur, kami berkomitmen menyelesaikan pesanan sesuai tenggat yang disepakati.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '40px',
                        marginTop: '20px'
                    }}>
                        <h4 style={{fontSize: '1.25rem', fontWeight: '500', marginBottom: '24px', color: 'white', maxWidth: '800px', margin: '0 auto'}}>
                            Percayakan citra bisnis Anda pada ahlinya. Hubungi Percetakan Offset Dallas hari ini untuk konsultasi proyek Anda.
                        </h4>
                    </div>
                </div>
            </section>

            {/* Premium Quality Section */}
            <section style={{
                padding: isMediumMobile ? '64px 24px' : '128px 24px',
                textAlign: 'center',
                backgroundColor: '#000000',
                color: '#ffffff'
            }}>
                <h1 style={{
                  fontSize: isMediumMobile ? '2.5rem' : (isLargeMobile ? '3rem' : '4rem'),
                  fontWeight: '300',
                  marginBottom: isMediumMobile ? '16px' : '24px',
                  lineHeight: '1.1',
                  color: '#ffffff'
                }}>
                  Premium Quality<br/>
                  <span style={{
                    fontWeight: '600',
                    color: '#ffffff'
                  }}>
                    Products
                  </span>
                </h1>
                <p style={{
                  fontSize: isMediumMobile ? '1rem' : (isLargeMobile ? '1.25rem' : '1.5rem'),
                  color: '#9ca3af',
                  fontWeight: '300',
                  maxWidth: '600px',
                  margin: '0 auto',
                  marginBottom: isMediumMobile ? '32px' : '48px'
                }}>
                  Discover our exceptional range of cigarette and non-cigarette products
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  flexDirection: isSmallMobile ? 'column' : 'row',
                  alignItems: 'center'
                }}>
                  <a href="/KATALOG DALLAS.pdf"
                     download="KATALOG DALLAS.pdf"
                     style={{
                       ...primaryButton,
                       backgroundColor: '#ffffff',
                       color: '#000000',
                       padding: isMediumMobile ? '10px 24px' : '12px 32px',
                       fontSize: isMediumMobile ? '14px' : '16px',
                       width: isSmallMobile ? '100%' : 'auto',
                       maxWidth: isSmallMobile ? '280px' : 'none'
                     }}
                     onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#f3f4f6'}}
                     onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'}}
                     onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                     onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                    Download Katalog
                  </a>
                  <a href="#non-cigarettes"
                     onClick={(e) => smoothScroll(e, '#non-cigarettes')}
                     style={{
                       ...secondaryButton,
                       color: '#ffffff',
                       border: '1px solid #ffffff',
                       padding: isMediumMobile ? '10px 24px' : '12px 32px',
                       fontSize: isMediumMobile ? '14px' : '16px',
                       width: isSmallMobile ? '100%' : 'auto',
                       maxWidth: isSmallMobile ? '280px' : 'none'
                     }}
                     onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'; (e.target as HTMLElement).style.color = '#000000'}}
                     onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#ffffff'}}
                     onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                     onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                    Non-Cigarette Products
                  </a>
                </div>
            </section>

      {/* Classic Product Card Grid Section */}
      <section id="classic-products" className="bg-slate-900 py-[100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight">
            Produk Unggulan Kami
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl font-light text-slate-400 mb-20">
            Temukan berbagai solusi cetak berkualitas tinggi untuk kebutuhan bisnis Anda.<br /><br />
          </p>
        </div>
        <ClassicProductCardGrid />
      </section>

      {/* Restored Materials Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: '0' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px', color: '#111827' }}>BEBERAPA BAHAN UNGGULAN KAMI</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isSmallMobile ? '1fr' : (isLargeMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))'),
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: 'ART PAPER', slug: 'art-paper', description: 'Kertas ini memiliki permukaan halus dan mengkilap, sehingga hasil cetak nya tajam dan berwarna cerah.', image: 'BAHAN-AP.jpg' },
                { name: 'IVORY PAPER', slug: 'ivory-paper', description: 'Jenis kertas kemasan glossy/doff yang memadukan art carton dan matte paper, elegan sekaligus kuat.', image: 'BAHAN-IVORY.jpg' },
                { name: 'Tipping', slug: 'bahan-tipping', description: 'Kertas tipping khusus untuk filter rokok, sering digunakan untuk branding dengan cetakan logo atau garis.', image: 'BAHAN-TIPPING.jpg' },
                { name: 'Duplex', slug: 'duplex', description: 'Kertas karton daur ulang berlapis white liner, dengan satu sisi putih dan satu sisi abu-abu.', image: 'BAHAN-DC.jpg' }
              ].map((product, index) => (
                <Link key={product.slug} href={`/produk/${product.slug}`} style={{ textDecoration: 'none', height: '100%' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderRadius: '16px',
                      padding: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1)'}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '250px',
                        borderRadius: '12px',
                        objectFit: 'cover',
                        marginBottom: '12px'
                      }}
                    />
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '4px', color: '#111827' }}>{product.name}</h4>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5', flexGrow: 1 }}>{product.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Non-Cigarette Products Section */}
      <section id="non-cigarettes" style={{
        padding: '80px 0', 
        backgroundColor: '#000000'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <h2 style={{fontSize: '3rem', fontWeight: '300', marginBottom: '24px'}}>Solusi Kemasan Berkualitas Sejak 2022</h2>
            <p style={{fontSize: '1.25rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto'}}>
              Paperlisens memahami bahwa kemasan adalah wajah brand kuliner Anda. Sejak 2022, kami berdedikasi menyediakan papertray dan box takeaway terbaik melalui layanan online yang mudah dan cepat. Kepercayaan ribuan pelanggan di berbagai marketplace membuktikan komitmen kami dalam membantu bisnis Anda tampil lebih profesional.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginTop: '48px' }}>
            <img src="/paperlisens%20banner%20(1).png" alt="Paperlisens Banner 1" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }} />
            <img src="/paperlisens%20banner%20(2).png" alt="Paperlisens Banner 2" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }} />
          </div>
          <br /><br />
          <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Produk Unggulan Kami</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="/paperlisens%20produk%20unggulan%20(1).png"
                alt="Solusi Cup Serbaguna & Trendi"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>Solusi Cup Serbaguna & Trendi</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  Bukan sekadar wadah, tapi panggung untuk sajian kuliner Anda. Mulai dari Cup Toast untuk roti panggang, hingga berbagai varian cup (Tipe A, B, Sakura, dan Es) yang dirancang presisi. Bentuk tray yang estetik ini sangat pas untuk menyajikan aneka finger food, gorengan, atau jajanan kekinian agar terlihat lebih penuh, menarik, dan pastinya Instagramable.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="/paperlisens%20produk%20unggulan%20(2).png"
                alt="Kotak Donat Berbagai Ukuran"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>Kotak Donat Berbagai Ukuran</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  Apapun kebutuhan porsi jualan Anda, kami punya kotaknya! Tersedia mulai dari ukuran personal (isi 1 & 2) hingga ukuran keluarga atau hampers (isi 3 & 6). Didesain dengan material yang kokoh untuk menjaga bentuk donat tetap sempurna dan cantik hingga ke tangan pelanggan.
                </p>
              </div>
            </div>
          </div>
          
          {/* Paperlisens Product Gallery */}
          <div style={{marginTop: '80px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Featured Products on Paperlisens</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isSmallMobile ? '1fr' : (isLargeMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))'),
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: 'Cup A', price: 'Rp 24.420 - 26.000', variant: 'Best Seller', rating: '4.9', sold: '15k+', image: '/dallas%20cup%20a.png' },
                { name: 'Cup B', price: 'Rp 26.500 - 28.200', variant: 'Ekonomis', rating: '4.6', sold: '3.2k', image: '/dallas%20cup%20b.png' },
                { name: 'Donat isi 3', price: 'Rp 30.800 - 66.250', variant: 'Premium', rating: '4.8', sold: '1.4k', image: '/dallas%20donat%20isi%203.png' },
                { name: 'Donat isi 6', price: 'Rp 33.600 - 78.750', variant: 'Wholesale', rating: '4.8', sold: '1.2k', image: '/dallas%20donat%20isi%206.png' }
              ].map((product, index) => (
                <div key={index} 
                     onClick={() => window.open('/paperlisens', '_blank')}
                     style={{
                       backgroundColor: '#ffffff',
                       color: '#000000',
                       borderRadius: '16px',
                       padding: '0',
                       cursor: 'pointer',
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                       transform: 'translateY(0)',
                       border: '1px solid #e5e7eb',
                       overflow: 'hidden'
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)';
                       e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                     onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(0.98)'}
                     onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1)'}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{padding: '16px'}}>
                    <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4'}}>{product.name}</h4>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <span style={{color: '#fbbf24', fontSize: '14px'}}>★</span>
                        <span style={{fontSize: '14px', color: '#6b7280'}}>{product.rating}</span>
                      </div>
                      <span style={{fontSize: '14px', color: '#6b7280'}}>|</span>
                      <span style={{fontSize: '14px', color: '#6b7280'}}>{product.sold} terjual</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                      <span style={{fontSize: '1.25rem', fontWeight: '600', color: '#dc2626'}}>{product.price}</span>
                      <span style={{fontSize: '0.75rem', backgroundColor: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: '500'}}>{product.variant}</span>
                    </div>
                    <div style={{
                      backgroundColor: '#059669',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginTop: '12px'
                    }}>
                      Beli di Paperlisens
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Products Button */}
            <div style={{textAlign: 'center', marginTop: '48px'}}>
              <button
                onClick={() => window.open('/paperlisens', '_blank')}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#047857'}}
                onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = '#059669'}}
                onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                Lihat Semua Produk di Paperlisens
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281260001487?text=halo%20kak%20aku%20ingin%20tanya%20tanya"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 999,
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Chat via WhatsApp"
      >
        <Icon icon="mdi:whatsapp" style={{ fontSize: '32px' }} />
      </a>
    </div>
  );
}