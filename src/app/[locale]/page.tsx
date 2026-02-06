'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const PromoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations('Promo');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999, // Ensure it's on top of everything
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <Icon icon="mdi:close" style={{ fontSize: '20px', color: '#374151' }} />
            </button>

            {/* Header Image / Pattern */}
            <div style={{
              background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
              padding: '40px 30px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
               {/* Decorative Circles */}
               <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
               <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
               
               <Icon icon="mdi:star-shooting-outline" style={{ fontSize: '64px', color: '#FCD34D', marginBottom: '16px' }} />
               <h2 style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: '700', margin: 0, lineHeight: 1.2 }}>
                 {t('title')}
               </h2>
               <p style={{ color: '#BDD8E9', marginTop: '8px', fontSize: '0.95rem' }}>
                 {t('subtitle')}
               </p>
            </div>

            {/* Content */}
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <p 
                  style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}
                  dangerouslySetInnerHTML={{ __html: t.raw('description') }}
                />
                
                <ul style={{ textAlign: 'left', display: 'inline-block', color: '#374151', fontSize: '0.95rem', listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '18px' }} />
                    {t('point1')}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '18px' }} />
                    {t('point2')}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '18px' }} />
                    {t('point3')}
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href={`https://wa.me/6281260001487?text=${encodeURIComponent(t('whatsappMessage'))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(37, 211, 102, 0.3)'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#20bd5a')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
              >
                <Icon icon="mdi:whatsapp" style={{ fontSize: '24px' }} />
                {t('cta')}
              </a>
              
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button 
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {t('later')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ClassicProductCardGrid = () => {
  const t = useTranslations('Categories');
  const tFeatured = useTranslations('FeaturedProducts');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const categories = [
    { title: t('hampers.title'), slug: "kotak-hampers", img: "/kotak%20hampers.jpg", desc: t('hampers.desc'), tags: [t('hampers.tags.tag1'), t('hampers.tags.tag2')] },
    { title: t('bakery.title'), slug: "kotak-bakery", img: "/kotak%20cake.jpg", desc: t('bakery.desc'), tags: [t('bakery.tags.tag1'), t('bakery.tags.tag2')] },
    { title: t('rokok.title'), slug: "rokok", img: "/custom%20rokok%203.jpg", desc: t('rokok.desc'), tags: [t('rokok.tags.tag1'), t('rokok.tags.tag2')] },
    { title: t('nasi.title'), slug: "kotak-nasi", img: "/mobile_banner_2.jpg", desc: t('nasi.desc'), tags: [t('nasi.tags.tag1'), t('nasi.tags.tag2')] },
    { title: t('buku.title'), slug: "buku", img: "/buku%20(6).jpg", desc: t('buku.desc'), tags: [t('buku.tags.tag1')] },
    { title: t('kalender.title'), slug: "kalender", img: "/foto%20kalender.png", desc: t('kalender.desc'), tags: [t('kalender.tags.tag1')] },
    { title: t('paperbag.title'), slug: "paperbag", img: "/paperbag.jpg", desc: t('paperbag.desc'), tags: [t('paperbag.tags.tag1'), t('paperbag.tags.tag2')] },
    { title: t('map.title'), slug: "map", img: "/map.jpg", desc: t('map.desc'), tags: [t('map.tags.tag1'), t('map.tags.tag2')] },
    { title: t('brosur.title'), slug: "brosur", img: "/foto%20brosur.png", desc: t('brosur.desc'), tags: [t('brosur.tags.tag1')] }
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
          <motion.div
            layoutId={category.slug}
            key={category.slug}
            onClick={() => setSelectedId(category.slug)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              backgroundColor: '#BDD8E9',
              borderRadius: '16px',
              padding: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              border: '1px solid #e5e7eb'
            }}
            whileHover={{ scale: 1.02, y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <motion.img
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
            <motion.h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '8px', color: '#111827' }}>{category.title}</motion.h4>
            <motion.p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '16px', flexGrow: 1 }}>{category.desc}</motion.p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
              {category.tags.map(tag => (
                <span key={tag} style={{ backgroundColor: '#ffffff', color: '#4b5563', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px'
            }}
          >
            {categories.map(category => {
                if (category.slug !== selectedId) return null;
                return (
                  <motion.div
                    layoutId={selectedId}
                    key={selectedId}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      width: '100%',
                      maxWidth: '800px',
                      maxHeight: '90vh',
                      overflowY: 'auto',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                     <motion.div style={{ position: 'relative', height: '300px' }}>
                        <motion.img
                            src={category.img}
                            alt={category.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                            onClick={() => setSelectedId(null)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Icon icon="mdi:close" style={{fontSize: '20px'}} />
                        </button>
                     </motion.div>
                     
                     <div style={{ padding: '32px' }}>
                        <motion.h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>{category.title}</motion.h2>
                        <motion.div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                             {category.tags.map(tag => (
                                <span key={tag} style={{ backgroundColor: '#f3f4f6', color: '#374151', fontSize: '0.875rem', padding: '6px 12px', borderRadius: '9999px', fontWeight: '500' }}>
                                  {tag}
                                </span>
                              ))}
                        </motion.div>
                        <motion.p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#4b5563', marginBottom: '32px' }}>
                            {category.desc}
                        </motion.p>
                        
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                            <Link href={`/produk/${category.slug}`}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#0A4174',
                                    color: 'white',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'inline-block'
                                }}
                            >
                                {tFeatured('viewDetails')}
                            </Link>
                        </div>
                     </div>
                  </motion.div>
                );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already seen the promo in this session (optional, but good UX)
      // For now, we'll just show it every time after refresh for demonstration
      setShowPromo(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);
  
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
             <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                smoothScroll(e, link.href);
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
            </a>
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
        </Link>
    )
  });
  
  return (
    <div style={{
      backgroundColor: '#001D39', 
      color: '#ffffff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />

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
                {t('TopBar.address')}
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

            {/* Premium Quality Section with Video Background */}
            <section style={{
                height: isLargeMobile ? '100vw' : 'calc(100vh - 88px)',
                position: 'relative',
                marginTop: '88px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
                color: '#ffffff'
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1
                    }}
                >
                    <source src="/vidio.webm" type="video/webm" />
                </video>
                
                {/* Overlay to ensure text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 2
                }}></div>

                <div style={{ position: 'relative', zIndex: 3, padding: '0 24px' }}>
                    <h1 style={{
                      fontSize: isMediumMobile ? '2.5rem' : (isLargeMobile ? '3rem' : '4rem'),
                      fontWeight: '300',
                      marginBottom: isMediumMobile ? '16px' : '24px',
                      lineHeight: '1.1',
                      color: '#ffffff'
                    }}>
                      {t('PremiumQuality.title')}<br/>
                      <span style={{
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                        {t('PremiumQuality.titleSpan')}
                      </span>
                    </h1>
                    <p style={{
                      fontSize: isMediumMobile ? '1rem' : (isLargeMobile ? '1.25rem' : '1.5rem'),
                      color: '#e5e7eb',
                      fontWeight: '300',
                      maxWidth: '600px',
                      margin: '0 auto',
                      marginBottom: isMediumMobile ? '32px' : '48px'
                    }}>
                      {t('PremiumQuality.description')}
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
                        {t('PremiumQuality.btnDownload')}
                      </a>
                      <a href="https://wa.me/6281260001487?text=Halo%20kak%2C%20saya%20ingin%20tanya%20produk%20percetakan"
                         target="_blank"
                         rel="noopener noreferrer"
                         style={{
                           ...secondaryButton,
                           color: '#ffffff',
                           border: '1px solid #ffffff',
                           padding: isMediumMobile ? '10px 24px' : '12px 32px',
                           fontSize: isMediumMobile ? '14px' : '16px',
                           width: isSmallMobile ? '100%' : 'auto',
                           maxWidth: isSmallMobile ? '280px' : 'none',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           gap: '8px'
                         }}
                         onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'; (e.target as HTMLElement).style.color = '#000000'}}
                         onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#ffffff'}}
                         onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                         onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                        <Icon icon="mdi:whatsapp" style={{ fontSize: '20px' }} />
                        {t('Paperlisens.orderWa')}
                      </a>
                    </div>
                </div>
            </section>

            {/* Price Promotion Section */}
            <section style={{
              padding: isMediumMobile ? '80px 24px' : '120px 24px',
              backgroundColor: '#f8fafc',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative background elements */}
              <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(10, 65, 116, 0.03) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0
              }}></div>

              <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                  <h2 style={{ 
                    fontSize: isMediumMobile ? '2.25rem' : '3rem', 
                    fontWeight: '800', 
                    color: '#001D39', 
                    marginBottom: '20px',
                    letterSpacing: '-0.02em'
                  }}>
                    Harga Minimal, <span style={{ color: '#0A4174' }}>Kualitas Maksimal</span>
                  </h2>
                  <div style={{ 
                    width: '80px', 
                    height: '4px', 
                    backgroundColor: '#0A4174', 
                    margin: '0 auto 24px',
                    borderRadius: '2px'
                  }}></div>
                  <p style={{ 
                    color: '#4b5563', 
                    fontSize: isMediumMobile ? '1.1rem' : '1.25rem',
                    maxWidth: '700px',
                    margin: '0 auto'
                  }}>
                    Solusi cetak profesional dengan efisiensi biaya yang mendukung akselerasi bisnis Anda.
                  </p>
                </motion.div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isSmallMobile ? '1fr' : (isMediumMobile ? '1fr 1fr' : 'repeat(3, 1fr)'),
                  gap: '32px'
                }}>
                  {[
                    {
                      title: 'Custom Box & Packaging',
                      price: 'Rp 200',
                      desc: 'Box rokok, hampers, dan packaging produk dengan bahan berkualitas tinggi.',
                      icon: 'mdi:package-variant-closed',
                      color: '#0A4174',
                      delay: 0.1
                    },
                    {
                      title: 'Packaging Kuliner',
                      price: 'Rp 300',
                      desc: 'Paper tray, box donat, dan takeaway box food-grade yang higienis.',
                      icon: 'mdi:food-takeout-box',
                      color: '#059669',
                      delay: 0.2
                    },
                    {
                      title: 'Buku & Publikasi',
                      price: 'Harga Grosir',
                      desc: 'Cetak buku, katalog, dan kalender dengan binding kuat & hasil presisi.',
                      icon: 'mdi:book-open-page-variant',
                      color: '#f97316',
                      delay: 0.3
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      whileHover={{ 
                        y: -12, 
                        boxShadow: '0 25px 50px -12px rgba(10, 65, 116, 0.15)',
                        borderColor: item.color
                      }}
                      style={{
                        padding: '48px 32px',
                        borderRadius: '24px',
                        backgroundColor: '#ffffff',
                        border: '2px solid transparent',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        cursor: 'default'
                      }}
                    >
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '20px',
                          backgroundColor: `${item.color}10`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '28px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Icon icon={item.icon} style={{ fontSize: '40px', color: item.color }} />
                      </motion.div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#111827' }}>{item.title}</h3>
                      <div style={{
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        color: item.color,
                        marginBottom: '8px',
                        display: 'inline-block',
                        padding: '4px 16px',
                        backgroundColor: `${item.color}08`,
                        borderRadius: '12px'
                      }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, verticalAlign: 'middle', marginRight: '4px' }}>Mulai</span>
                        {item.price}{item.price.includes('Rp') ? <span style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.7 }}> /pcs</span> : ''}
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                        {item.desc}
                      </p>
                      <a 
                        href={`https://wa.me/6281260001487?text=Halo%20kak%2C%20saya%20tertarik%20ingin%20konsultasi%20dan%20pesan%20${encodeURIComponent(item.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '12px',
                          backgroundColor: item.color,
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <Icon icon="mdi:whatsapp" style={{ fontSize: '20px' }} />
                        Konsultasi & Pesan Sekarang
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trusted By Section (Marquee) */}
            <section style={{
              padding: '60px 0',
              backgroundColor: '#f9fafb',
              borderTop: '1px solid #e5e7eb',
              borderBottom: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {useTranslations('TrustedBy')('title')}
                </h3>
              </div>
              
              <div style={{ display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' }}>
                {/* Marquee Group 1 */}
                <div className="animate-marquee" style={{ display: 'flex', gap: '80px', paddingRight: '80px', minWidth: '100%', flexShrink: 0, alignItems: 'center' }}>
                  {Array.from({ length: 25 }, (_, i) => `/logo brand (${i + 1}).jpg`).map((src, idx) => (
                    <div key={`logo-1-${idx}`} style={{ width: '220px', height: '140px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img 
                         src={src} 
                         alt={`Brand Partner ${idx + 1}`} 
                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s' }}
                         className="hover:scale-110"
                       />
                    </div>
                  ))}
                </div>
                
                {/* Marquee Group 2 (Duplicate) */}
                <div className="animate-marquee" style={{ display: 'flex', gap: '80px', paddingRight: '80px', minWidth: '100%', flexShrink: 0, alignItems: 'center' }}>
                   {Array.from({ length: 25 }, (_, i) => `/logo brand (${i + 1}).jpg`).map((src, idx) => (
                    <div key={`logo-2-${idx}`} style={{ width: '220px', height: '140px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img 
                         src={src} 
                         alt={`Brand Partner ${idx + 1}`} 
                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s' }}
                         className="hover:scale-110"
                       />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Dallas Section */}
            <section style={{
                padding: isMediumMobile ? '64px 24px' : '100px 24px',
                textAlign: 'center',
                backgroundColor: '#0A4174',
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
                            {t('WhyChoose.title')}
                        </h2>
                        <p style={{
                            fontSize: isMediumMobile ? '1rem' : '1.125rem',
                            color: '#9ca3af',
                            fontWeight: '400'
                        }}>
                            {t('WhyChoose.subtitle')}
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
                                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:shield-check" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>{t('WhyChoose.points.experience.title')}</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                {t('WhyChoose.points.experience.desc')}
                            </p>
                        </div>

                        {/* POIN 2: KUALITAS (PRECISION) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:crosshairs-gps" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>{t('WhyChoose.points.quality.title')}</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                {t('WhyChoose.points.quality.desc')}
                            </p>
                        </div>

                         {/* POIN 3: KONSULTASI (SOLUTION) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:lightbulb-on-outline" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>{t('WhyChoose.points.consultation.title')}</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                {t('WhyChoose.points.consultation.desc')}
                            </p>
                        </div>

                         {/* POIN 4: WAKTU (PUNCTUALITY) */}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                            <div style={{
                                width: '80px', height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '8px'
                            }}>
                                <Icon icon="mdi:clock-check-outline" width="40" height="40" color="#f97316" />
                            </div>
                            <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>{t('WhyChoose.points.punctuality.title')}</h3>
                            <p style={{color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6'}}>
                                {t('WhyChoose.points.punctuality.desc')}
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
                            {t('WhyChoose.cta')}
                        </h4>
                    </div>
                </div>
            </section>

            {/* Classic Product Card Grid Section */}
      <section id="classic-products" className="bg-[#0A4174] py-[100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight">
            {t('FeaturedProducts.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl font-light text-slate-400 mb-20">
            {t('FeaturedProducts.subtitle')}<br /><br />
          </p>
        </div>
        <ClassicProductCardGrid />
      </section>

      {/* Restored Materials Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: '0' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px', color: '#111827' }}>{t('Materials.title')}</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isLargeMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: t('Materials.artPaper.name'), slug: 'art-paper', description: t('Materials.artPaper.desc'), image: '/BAHAN-AP.jpg' },
                { name: t('Materials.ivoryPaper.name'), slug: 'ivory-paper', description: t('Materials.ivoryPaper.desc'), image: '/BAHAN-IVORY.jpg' },
                { name: t('Materials.tipping.name'), slug: 'bahan-tipping', description: t('Materials.tipping.desc'), image: '/BAHAN-TIPPING.jpg' },
                { name: t('Materials.duplex.name'), slug: 'duplex', description: t('Materials.duplex.desc'), image: '/BAHAN-DC.jpg' }
              ].map((product, index) => (
                <Link key={product.slug} href={`/produk/${product.slug}`} style={{ textDecoration: 'none', height: '100%' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      backgroundColor: '#BDD8E9',
                      borderRadius: '16px',
                      padding: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 2, 1)',
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
        backgroundColor: '#001D39'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <h2 style={{fontSize: '3rem', fontWeight: '300', marginBottom: '24px'}}>{t('NonCigarette.title')}</h2>
            <p style={{fontSize: '1.25rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto'}}>
              {t('NonCigarette.description')}
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px', 
            marginTop: '64px' 
          }}>
            {[
              { src: "/mesin potong.png", alt: "Mesin Potong Canggih" },
              { src: "/foto%20(9).jpg", alt: "Proses Produksi Berkualitas" }
            ].map((img, idx) => (
              <div key={idx} style={{ 
                position: 'relative', 
                height: '350px', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)', 
                border: '1px solid rgba(255,255,255,0.1)' 
              }}>
                 <img 
                   src={img.src} 
                   alt={img.alt} 
                   style={{ 
                     width: '100%', 
                     height: '100%', 
                     objectFit: 'cover', 
                     transition: 'transform 0.5s ease',
                     cursor: 'pointer'
                   }} 
                   onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                   onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                 />
              </div>
            ))}
          </div>
          <br /><br />
          <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>{t('NonCigarette.productsTitle')}</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: '#0A4174',
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
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>{t('NonCigarette.card1.title')}</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  {t('NonCigarette.card1.desc')}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: '#0A4174',
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
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>{t('NonCigarette.card2.title')}</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  {t('NonCigarette.card2.desc')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Paperlisens Product Gallery */}
          <div style={{marginTop: '80px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>{t('NonCigarette.galleryTitle')}</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isLargeMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: 'Cup A', price: 'Rp 24.420 - 26.000', variant: 'Best Seller', rating: '4.9', sold: '15k+', image: '/dallas%20cup%20a.png' },
                { name: 'Cup B', price: 'Rp 26.500 - 28.200', variant: 'Ekonomis', rating: '4.6', sold: '3.2k', image: '/dallas%20cup%20b.png' },
                { name: 'Donat isi 3', price: 'Rp 30.800 - 66.250', variant: 'Premium', rating: '4.8', sold: '1.4k', image: '/dallas%20donat%20isi%203.png' },
                { name: 'Donat isi 6', price: 'Rp 33.600 - 78.750', variant: 'Wholesale', rating: '4.8', sold: '1.2k', image: '/dallas%20donat%20isi%206.png' }
              ].map((product, index) => (
                <div key={index} 
                     onClick={() => router.push('/paperlisens')}
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
                      {t('NonCigarette.btnBuy')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Products Button */}
            <div style={{textAlign: 'center', marginTop: '48px'}}>
              <button
                onClick={() => router.push('/paperlisens')}
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
                {t('NonCigarette.btnViewAll')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}