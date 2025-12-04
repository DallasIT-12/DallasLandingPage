'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useCart } from '../../context/CartContext';

// --- Banner Slider Component ---
const BannerSlider = ({ images, interval = 5000 }: { images: string[], interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      interval
    );

    return () => {
      resetTimeout();
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
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', flexShrink: 0 }}
          />
        ))}
      </div>

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

      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
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


// --- Responsive Styles Component ---
const ResponsiveStyles = () => (
  <style>{`
    /* Fade Card Styles */
    .product-card {
      position: relative;
      background-color: white;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .product-card:hover {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }

    .card-image-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%; /* 1:1 Aspect Ratio */
      background-color: #fafafa;
      overflow: hidden;
    }

    .card-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px;
      text-align: center;
      z-index: 10;
    }

    .product-card:hover .card-overlay {
      opacity: 1;
    }

    .card-info {
      padding: 12px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Grid for Main Page */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      width: 100%;
    }

    @media (max-width: 768px) {
      .top-bar-text, .top-bar-separator {
        display: none;
      }
      .header-container {
        gap: 16px !important;
      }
      .header-logo {
        height: 32px !important;
      }
      .search-input {
        font-size: 12px !important;
      }
      .main-content {
        padding: 16px 8px !important;
      }
      
      /* Banner Grid Mobile Adjustments */
      .hero-banner-container {
        display: flex !important;
        flex-direction: column !important;
        height: auto !important;
        margin-bottom: 32px !important;
      }
      .main-banner-area {
        width: 100% !important;
        height: 160px !important;
      }
      .side-banners-area {
        display: flex !important;
        flex-direction: row !important;
        grid-template-rows: none !important;
        width: 100% !important;
        height: 100px !important;
        gap: 8px !important;
      }
      .side-banner-item {
        flex: 1 !important;
        height: 100% !important;
      }
      
      .section-title {
        margin-top: 16px !important;
      }
      
      /* Category Grid Mobile Adjustments */
      .category-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 8px !important;
      }
      .category-card {
        height: 100px !important;
      }
      .category-card-text {
        font-size: 13px !important;
        bottom: 8px !important;
      }

      /* Mobile Grid Layout for Products */
      .product-grid {
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 12px !important;
      }

      /* Mobile Overlay Behavior - Visible on tap? Or simplify?
         For now, keeping hover effect which works on tap for many devices, 
         but we might want to make buttons visible always on mobile if this is UX issue.
         Let's stick to the "fade" request for now.
      */
    }
  `}</style>
);


// --- Category Card Component ---
const CategoryCard = ({ title, image, slug }: { title: string; image: string; slug: string }) => (
  <Link href={`/paperlisens/category/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
    <div
      className="category-card"
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '180px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '12px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: '60%',
        }}
      >
        <span className="category-card-text" style={{ color: 'white', fontWeight: '600', fontSize: '1rem', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{title}</span>
      </div>
    </div>
  </Link>
);

// --- Fade Product Card Component ---
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((product.price + 5000) - product.price) / (product.price + 5000) * 100);

  return (
    <div className="product-card">
      <Link href={`/paperlisens/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        
        {/* Image & Overlay Section */}
        <div className="card-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            className="card-image"
          />
          <div style={{
            position: 'absolute', top: '0px', right: '0px', backgroundColor: 'rgba(255, 212, 36, 0.9)',
            padding: '4px 8px', textAlign: 'center', lineHeight: '1', zIndex: 2
          }}>
            <div style={{ color: '#ee4d2d', fontSize: '12px', fontWeight: 'bold' }}>{discount}%</div>
            <div style={{ color: 'white', fontSize: '10px', fontWeight: 'bold' }}>diskon</div>
          </div>

          {/* HOVER OVERLAY */}
          <div className="card-overlay">
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '16px', lineHeight: '1.5' }}>
              Solusi kemasan premium. Food grade, tahan minyak, desain presisi.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  addToCart(product, 1);
                }}
                style={{ 
                  backgroundColor: '#ee4d2d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  width: '100%'
                }}
              >
                <Icon icon="material-symbols:shopping-cart-outline" /> Add to Cart
              </button>

              <button 
                 onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://wa.me/6281260001487?text=Halo%20Paperlisens,%20saya%20mau%20pesan%20${product.name}`, '_blank');
                 }}
                 style={{ 
                  backgroundColor: '#25D366', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  width: '100%'
                }}
              >
                  <Icon icon="mdi:whatsapp" width="16" /> Order WA
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-info">
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#ee4d2d', 
              border: '1px solid #ee4d2d', 
              display: 'inline-block', 
              padding: '2px 4px', 
              borderRadius: '2px',
              marginBottom: '4px'
            }}>
              {product.category || 'Paperlisens'}
            </div>
            
            <h3 style={{ 
              fontSize: '14px', 
              color: '#333', 
              lineHeight: '1.4', 
              height: '40px', 
              overflow: 'hidden', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              {product.name}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ee4d2d', margin: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Rp</span>
              {product.price.toLocaleString('id-ID')}
            </p>
            <p style={{ fontSize: '11px', color: '#757575', margin: 0 }}>
              {product.sold} terjual
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

import { products, searchProducts } from '../../data/products';

// ... (rest of imports)

// --- Main Page Component ---
export default function PaperlisensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();

  // Use centralized data
  const filteredProducts = searchQuery 
    ? searchProducts(searchQuery) 
    : products;

  const mainBanners = ['/main banner.png', '/main banner 2.png'];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <ResponsiveStyles />

      {/* ===== TOP BAR (with inline styles) ===== */}
      <div style={{ backgroundColor: '#ee4d2d', color: 'white', fontSize: '12px', padding: '6px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" onClick={(e) => e.preventDefault()} className="top-bar-text" style={{ color: 'white', textDecoration: 'none' }}>Seller Centre</a>
            <span className="top-bar-separator" style={{ borderLeft: '1px solid rgba(255,255,255,0.5)', height: '12px' }}></span>
            <a href="#" onClick={(e) => e.preventDefault()} className="top-bar-text" style={{ color: 'white', textDecoration: 'none' }}>Download</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>paperlisens22</a>
          </div>
        </div>
      </div>

      {/* ===== HEADER (with inline styles for STICKY behavior) ===== */}
      <header style={{ 
        backgroundColor: '#ee4d2d', 
        padding: '16px 0',
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
      }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </a>
          <div style={{ flexGrow: 1 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Cari produk di Paperlisens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{ width: '100%', padding: '10px 16px', paddingRight: '48px', borderRadius: '3px', border: 'none', fontSize: '14px' }}
              />
              <button style={{ 
                position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '40px',
                backgroundColor: '#ee4d2d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <Icon icon="material-symbols:search" style={{ fontSize: '20px', color: 'white' }} />
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: 'white' }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '0', right: '0', backgroundColor: 'white', color: '#ee4d2d',
                fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT (with inline styles for centering) ===== */}
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* --- Banners (Unified Container) --- */}
        <div className="hero-banner-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div className="main-banner-area" style={{ height: '240px', borderRadius: '6px', backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
            <BannerSlider images={mainBanners} />
          </div>
          <div className="side-banners-area" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '12px', height: '240px' }}>
            <div className="side-banner-item" style={{ backgroundColor: '#e0e0e0', borderRadius: '6px', overflow: 'hidden', height: '100%' }}>
              <img src="/side_banner_1.png" alt="Side Banner 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="side-banner-item" style={{ backgroundColor: '#e0e0e0', borderRadius: '6px', overflow: 'hidden', height: '100%' }}>
              <img src="/side_banner_2.png" alt="Side Banner 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* --- Category Cards --- */}
        <h2 className="section-title" style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>OUR CATEGORIES</h2>
        <div className="category-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
            <CategoryCard title="Paper Tray" image="/paperlisens%20papertray.png" slug="paper-tray" />
            <CategoryCard title="Box Take away" image="/paperlisens%20box%20takeaway.png" slug="box-take-away" />
            <CategoryCard title="Tempat Pensil" image="/paperlisens%20tempat%20pensil.png" slug="tempat-pensil" />
            <CategoryCard title="Box Cupcake" image="/paperlisens%20cupcake.png" slug="box-cupcake" />
        </div>

        {/* --- Products Section --- */}
        <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '4px solid #ee4d2d' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#ee4d2d' }}>REKOMENDASI</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p>Produk tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}