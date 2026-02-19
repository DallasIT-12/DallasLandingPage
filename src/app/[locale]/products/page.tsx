'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

import { Product, customBoxProducts } from '@/data/customBoxProducts';

const smoothScroll = (e: React.MouseEvent, targetId: string) => {
  e.preventDefault();
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 3D Floating Box Component
const FloatingCigaretteBox = ({ product, delay = 0 }: { product: Product, delay?: number }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        perspective: '1200px',
        animation: `float ${3 + delay * 0.5}s ease-in-out infinite`,
        animationDelay: `${delay * 0.3}s`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '140px',
          height: '180px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg) rotateX(0deg)',
          transition: 'all 0.3s ease'
        }}
        className="cigarette-box-3d"
      >
        {/* Front Face - Main Image */}
        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '180px',
            transform: 'translateZ(35px)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Image
            src="/kotak rokok 1.png"
            alt={product.name}
            width={420}
            height={540}
            unoptimized
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
              filter: 'brightness(1.0) contrast(1.05) saturate(1.1)'
            }}
            priority
          />
          {/* Minimal overlay - just for brand visibility */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.4)',
            padding: '3px 6px',
            borderRadius: '4px',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{
              color: '#ffffff',
              fontSize: '9px',
              fontWeight: '500',
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.6)'
            }}>
              {product.category}
            </div>
          </div>
        </div>

        {/* Right Face - Side with reduced opacity */}
        <div
          style={{
            position: 'absolute',
            width: '70px',
            height: '180px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
            borderRadius: '12px',
            transform: 'rotateY(90deg) translateZ(35px)',
            boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.4)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            overflow: 'hidden'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kotak rokok 1.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.4,
              filter: 'brightness(0.7)'
            }}
          />
        </div>

        {/* Top Face - Minimized */}
        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '70px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '12px',
            transform: 'rotateX(90deg) translateZ(90px)',
            boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kotak rokok 1.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.2,
              filter: 'brightness(1.3)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const t = useTranslations();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add CSS keyframes for floating animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateY(0deg) rotateX(0deg); }
        50% { transform: translateY(-10px) rotateY(0deg) rotateX(0deg); }
      }
      
      .cigarette-box-3d:hover {
        transform: rotateY(0deg) rotateX(0deg) scale(1.1) !important;
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
        50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6), 0 0 60px rgba(217, 119, 6, 0.3); }
      }
      
      .product-card-hover {
        /* animation: pulse-glow 2s ease-in-out infinite; */
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(customBoxProducts);

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
        onClick={() => setIsMenuOpen(false)}
        style={{
          color: link.href === '/products' ? '#000000' : '#4b5563',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          padding: isLargeMobile ? '16px 0' : '0',
          textAlign: isLargeMobile ? 'center' : 'left',
          borderBottom: isLargeMobile ? '1px solid rgba(229,231,235,0.5)' : 'none',
          width: isLargeMobile ? '100%' : 'auto',
          fontWeight: '500'
        }}
      >
        {link.label}
      </Link>
    )
  });

  const categories = [
    { value: 'All', label: t('CustomBoxProducts.filterAll') },
    { value: 'Premium', label: t('CustomBoxProducts.filterPremium') },
    { value: 'Standard', label: t('CustomBoxProducts.filterStandard') },
    { value: 'General', label: t('CustomBoxProducts.filterGeneral') }
  ];
  const productsPerSlide = 4;
  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(customBoxProducts);
    } else {
      setFilteredProducts(customBoxProducts.filter(product => product.category === selectedCategory));
    }
    setCurrentSlide(0);
  }, [selectedCategory]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideProducts = () => {
    const start = currentSlide * productsPerSlide;
    return filteredProducts.slice(start, start + productsPerSlide);
  };

  if (!screenReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#001D39' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#ffffff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#001D39',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
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
          flexWrap: isLargeMobile ? 'wrap' : 'nowrap',
          gap: isLargeMobile ? '8px' : '0'
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
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}><Icon icon="mdi:instagram" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}><Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" style={{ color: '#000000' }}><Icon icon="mdi:facebook" style={{ fontSize: '18px' }} /></a>
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

      {/* Header */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '60px',
        textAlign: 'center',
        background: '#001D39'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '300',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            {t('CustomBoxProducts.pageTitle')}
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#9ca3af',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t('CustomBoxProducts.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: isLargeMobile ? '0 16px' : '0 24px', marginBottom: isLargeMobile ? '24px' : '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: isLargeMobile ? '8px' : '16px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const filterStyle = cat.value === 'Premium'
                ? { activeBg: 'linear-gradient(135deg, #D4A017, #B8860B)', activeText: '#fff', inactiveBg: 'rgba(212, 160, 23, 0.15)', inactiveText: '#D4A017', border: 'rgba(212, 160, 23, 0.4)' }
                : cat.value === 'Standard'
                  ? { activeBg: 'linear-gradient(135deg, #0A4174, #1565C0)', activeText: '#fff', inactiveBg: 'rgba(10, 65, 116, 0.15)', inactiveText: '#4A9BD9', border: 'rgba(10, 65, 116, 0.4)' }
                  : cat.value === 'General'
                    ? { activeBg: 'linear-gradient(135deg, #6B7280, #4B5563)', activeText: '#fff', inactiveBg: 'rgba(107, 114, 128, 0.15)', inactiveText: '#9CA3AF', border: 'rgba(107, 114, 128, 0.4)' }
                    : { activeBg: '#ffffff', activeText: '#001D39', inactiveBg: 'rgba(255,255,255,0.1)', inactiveText: '#ffffff', border: 'rgba(255,255,255,0.3)' };

              const isActive = selectedCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    padding: isLargeMobile ? '8px 16px' : '12px 24px',
                    borderRadius: '25px',
                    border: isActive ? '2px solid transparent' : `2px solid ${filterStyle.border}`,
                    background: isActive ? filterStyle.activeBg : filterStyle.inactiveBg,
                    color: isActive ? filterStyle.activeText : filterStyle.inactiveText,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: isLargeMobile ? '14px' : '16px',
                    fontWeight: isActive ? '700' : '500',
                    letterSpacing: '0.3px'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section style={{ padding: isLargeMobile ? '0 16px' : '0 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

          {/* Carousel Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: isLargeMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isLargeMobile ? '24px' : '40px'
          }}>
            {/* Prev button - hidden on mobile, shown on desktop */}
            {!isLargeMobile && (
              <button
                onClick={prevSlide}
                disabled={totalSlides <= 1}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  cursor: totalSlides <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  opacity: totalSlides <= 1 ? 0.3 : 1,
                  flexShrink: 0
                }}
                onMouseOver={(e) => {
                  if (totalSlides > 1) {
                    (e.target as HTMLElement).style.borderColor = '#ffffff';
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (totalSlides > 1) {
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                ←
              </button>
            )}

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isLargeMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {getCurrentSlideProducts().map((product) => {
                const tierColors = product.category === 'Premium'
                  ? { card: '#FFF8E7', badge: 'linear-gradient(135deg, #D4A017, #B8860B)', badgeText: '#fff', finishing: { bg: 'rgba(180, 130, 0, 0.1)', text: '#8B6914' } }
                  : product.category === 'Standard'
                    ? { card: '#E8F0FE', badge: 'linear-gradient(135deg, #0A4174, #1565C0)', badgeText: '#fff', finishing: { bg: 'rgba(10, 65, 116, 0.1)', text: '#0A4174' } }
                    : { card: '#F3F4F6', badge: 'linear-gradient(135deg, #6B7280, #4B5563)', badgeText: '#fff', finishing: { bg: 'rgba(107, 114, 128, 0.1)', text: '#4B5563' } };

                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      backgroundColor: tierColors.card,
                      borderRadius: '16px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)',
                      border: product.category === 'Premium' ? '1px solid rgba(212, 160, 23, 0.3)' : '1px solid transparent',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      isolation: 'isolate',
                      position: 'relative',
                      zIndex: 1
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';

                      const box3D = e.currentTarget.querySelector('.cigarette-box-3d') as HTMLElement;
                      if (box3D) {
                        box3D.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

                      const box3D = e.currentTarget.querySelector('.cigarette-box-3d') as HTMLElement;
                      if (box3D) {
                        box3D.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                      }
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: 'transparent',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      <FloatingCigaretteBox product={product} delay={getCurrentSlideProducts().indexOf(product)} />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: tierColors.badge,
                        color: tierColors.badgeText,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        zIndex: 10
                      }}>
                        {product.category}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#111827',
                      transition: 'all 0.3s ease'
                    }} className="product-title">
                      {t(`CustomBoxProducts.products.${product.translationKey}.name`)}
                    </h3>

                    <p style={{
                      color: '#4b5563',
                      fontSize: '13px',
                      marginBottom: '12px',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {t(`CustomBoxProducts.products.${product.translationKey}.description`)}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: tierColors.finishing.text,
                        backgroundColor: tierColors.finishing.bg,
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}>
                        {t('CustomBoxProducts.finishing')}: {product.finishing}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: '#9ca3af',
                        fontWeight: '500'
                      }}>
                        Min. {product.packSize}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next button - hidden on mobile, shown on desktop */}
            {!isLargeMobile && (
              <button
                onClick={nextSlide}
                disabled={totalSlides <= 1}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  cursor: totalSlides <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  opacity: totalSlides <= 1 ? 0.3 : 1,
                  flexShrink: 0
                }}
                onMouseOver={(e) => {
                  if (totalSlides > 1) {
                    (e.target as HTMLElement).style.borderColor = '#ffffff';
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (totalSlides > 1) {
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                →
              </button>
            )}

            {/* Mobile Navigation Buttons */}
            {isLargeMobile && totalSlides > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '8px'
              }}>
                <button
                  onClick={prevSlide}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '32px'
            }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (() => {
        const modalTier = selectedProduct.category === 'Premium'
          ? { gradient: 'linear-gradient(135deg, #D4A017, #B8860B)', accent: '#D4A017', accentLight: 'rgba(212, 160, 23, 0.15)', accentBorder: 'rgba(212, 160, 23, 0.3)', showcaseBg: 'linear-gradient(135deg, #1a1407 0%, #2d2010 50%, #1a1407 100%)' }
          : selectedProduct.category === 'Standard'
            ? { gradient: 'linear-gradient(135deg, #0A4174, #1565C0)', accent: '#4A9BD9', accentLight: 'rgba(10, 65, 116, 0.15)', accentBorder: 'rgba(10, 65, 116, 0.3)', showcaseBg: 'linear-gradient(135deg, #0a1628 0%, #0d2240 50%, #0a1628 100%)' }
            : { gradient: 'linear-gradient(135deg, #6B7280, #4B5563)', accent: '#9CA3AF', accentLight: 'rgba(107, 114, 128, 0.15)', accentBorder: 'rgba(107, 114, 128, 0.3)', showcaseBg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' };

        return (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: isLargeMobile ? '16px' : '24px',
              animation: 'fadeIn 0.3s ease'
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <div
              style={{
                background: 'linear-gradient(145deg, #1a1d23 0%, #13161b 50%, #0d0f13 100%)',
                borderRadius: '24px',
                maxWidth: '520px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                color: '#e5e7eb',
                border: `1px solid ${modalTier.accentBorder}`,
                boxShadow: `0 0 60px rgba(0,0,0,0.5), 0 0 30px ${modalTier.accentLight}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tier Gradient Header Bar */}
              <div style={{
                background: modalTier.gradient,
                borderRadius: '24px 24px 0 0',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {selectedProduct.category}
                  </span>
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                  }} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.5px'
                  }}>
                    {selectedProduct.subcategory}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: '0',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.35)'; }}
                  onMouseOut={(e) => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.2)'; }}
                >
                  ✕
                </button>
              </div>

              {/* Product Showcase */}
              <div style={{
                width: '100%',
                height: isLargeMobile ? '220px' : '280px',
                background: modalTier.showcaseBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Subtle radial glow */}
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${modalTier.accentLight} 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                  opacity: 0.6
                }} />
                <div style={{ transform: 'scale(1.6)', position: 'relative', zIndex: 1 }}>
                  <FloatingCigaretteBox product={selectedProduct} delay={0} />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: isLargeMobile ? '20px' : '28px' }}>
                {/* Product Name */}
                <h2 style={{
                  fontSize: isLargeMobile ? '1.3rem' : '1.5rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  {t(`CustomBoxProducts.products.${selectedProduct.translationKey}.name`)}
                </h2>

                {/* Description */}
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  marginBottom: '24px',
                  lineHeight: '1.7'
                }}>
                  {t(`CustomBoxProducts.products.${selectedProduct.translationKey}.description`)}
                </p>

                {/* Info Cards Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {[
                    { label: t('CustomBoxProducts.category'), value: selectedProduct.category },
                    { label: t('CustomBoxProducts.service'), value: selectedProduct.brand },
                    { label: t('CustomBoxProducts.finishing'), value: selectedProduct.finishing },
                    { label: t('CustomBoxProducts.special'), value: selectedProduct.flavor },
                    { label: t('CustomBoxProducts.minOrder'), value: selectedProduct.packSize }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        ...(idx === 4 ? { gridColumn: '1 / -1' } : {})
                      }}
                    >
                      <span style={{
                        color: modalTier.accent,
                        fontSize: '11px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        {item.label}
                      </span>
                      <div style={{
                        color: '#f3f4f6',
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  marginBottom: '20px'
                }} />

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/6281260001487?text=${encodeURIComponent(t('CustomBoxProducts.whatsappMessage', { productName: t(`CustomBoxProducts.products.${selectedProduct.translationKey}.name`) }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    padding: '16px 24px',
                    borderRadius: '14px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                    letterSpacing: '0.3px'
                  }}
                >
                  <Icon icon="mdi:whatsapp" style={{ fontSize: '24px' }} />
                  {t('CustomBoxProducts.chatWhatsApp')}
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <Footer />
    </div>
  );
}