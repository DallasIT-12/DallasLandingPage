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
          <img 
            src="/kotak rokok 1.png"
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
              filter: 'brightness(1.0) contrast(1.05) saturate(1.1)'
            }}
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

  const categories = ['All', 'Premium', 'Standard', 'Eco'];
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
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}}><Icon icon="mdi:instagram" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}}><Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}}><Icon icon="mdi:facebook" style={{ fontSize: '18px' }} /></a>
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

      {/* Header */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '60px',
        textAlign: 'center',
        background: '#001D39'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '300',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Custom Box Rokok
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#9ca3af',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Layanan percetakan kotak rokok custom dengan berbagai pilihan finishing premium
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{padding: '0 24px', marginBottom: '40px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: selectedCategory === category ? '2px solid #ffffff' : '2px solid transparent',
                  backgroundColor: selectedCategory === category ? '#ffffff' : 'rgba(255,255,255,0.1)',
                  color: selectedCategory === category ? '#001D39' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section style={{padding: '0 24px', marginBottom: '80px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', position: 'relative'}}>
          
          {/* Carousel Navigation */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px'}}>
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
                opacity: totalSlides <= 1 ? 0.3 : 1
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

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              width: '100%',
              maxWidth: '1000px'
            }}>
              {getCurrentSlideProducts().map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    backgroundColor: '#BDD8E9',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    border: '1px solid transparent',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    
                    // Add glowing effect to 3D box
                    const box3D = e.currentTarget.querySelector('.cigarette-box-3d') as HTMLElement;
                    if (box3D) {
                      box3D.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    
                    // Reset 3D box
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
                    overflow: 'visible',
                    transition: 'all 0.3s ease'
                  }}>
                    <FloatingCigaretteBox product={product} delay={getCurrentSlideProducts().indexOf(product)} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ffffff',
                      color: '#001D39',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      zIndex: 10
                    }}>
                      {product.category}
                    </div>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#111827',
                    transition: 'all 0.3s ease'
                  }} className="product-title">
                    {product.name}
                  </h3>
                  
                  <p style={{
                    color: '#4b5563',
                    fontSize: '14px',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#0A4174'
                    }}>
                      Rp {product?.price ? product.price.toLocaleString('id-ID') : '0'}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {product.packSize}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '11px',
                    color: '#6b7280'
                  }}>
                    <div>Finishing: {product.nicotineLevel}</div>
                    <div>Teknik: {product.tarLevel}</div>
                  </div>
                </div>
              ))}
            </div>

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
                opacity: totalSlides <= 1 ? 0.3 : 1
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
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '24px'
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              color: '#1f2937'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
              <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0}}>
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              width: '100%',
              height: '250px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ transform: 'scale(1.5)' }}>
                <FloatingCigaretteBox product={selectedProduct} delay={0} />
              </div>
            </div>

            <p style={{color: '#4b5563', marginBottom: '20px', lineHeight: '1.6'}}>
              {selectedProduct.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Kategori</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.category}</div>
              </div>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Layanan</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.brand}</div>
              </div>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Finishing</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.nicotineLevel}</div>
              </div>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Teknik</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.tarLevel}</div>
              </div>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Spesial</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.flavor}</div>
              </div>
              <div>
                <span style={{color: '#6b7280', fontSize: '14px'}}>Min. Order</span>
                <div style={{color: '#111827', fontWeight: '500'}}>{selectedProduct.packSize}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#0A4174'
              }}>
                Rp {selectedProduct.price.toLocaleString('id-ID')}
              </span>
              <button
                style={{
                  backgroundColor: '#0A4174',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#001D39'}
                onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#0A4174'}
              >
                Konsultasi & Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}