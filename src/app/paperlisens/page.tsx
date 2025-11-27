'use client';

import { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { Icon } from '@iconify/react';
import ProductDetail from '../../components/product/ProductDetail';

// --- Banner Slider Component ---
const BannerSlider = ({ images, interval = 5000 }: { images: string[], interval?: number }) => { // Changed default interval to 5000
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
      .banners-grid {
        display: block !important; /* Use block for robust stacking */
        height: auto !important;
      }
       .banners-grid > div {
        height: 120px !important;
      }
      .banners-grid > div:first-child {
        margin-bottom: 16px; /* Add space between stacked banners */
      }
      .category-icons-container {
        margin-top: 16px; /* Add space to prevent collision */
        overflow-x: auto;
        padding-bottom: 16px;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .category-icons-container::-webkit-scrollbar {
        display: none;
      }
      .category-icons-inner {
        justify-content: flex-start !important;
        gap: 16px;
        padding: 0 8px;
      }
      .icon-component {
        flex-shrink: 0;
      }
      .product-grid-item {
        width: 50% !important;
      }
    }
  `}</style>
);


// --- Helper Component for Category Icons (using Iconify) ---
const IconComponent = ({ icon, text }: { icon: string; text:string; }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className="icon-component" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center', 
    fontSize: '12px', 
    color: '#4a4a4a',
    textDecoration: 'none',
    width: '80px'
  }}>
    <div style={{ 
      width: '48px', 
      height: '48px', 
      marginBottom: '8px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#fafafa',
      borderRadius: '12px'
    }}>
      <Icon icon={icon} style={{ fontSize: '28px', color: '#ee4d2d' }} />
    </div>
    <span>{text}</span>
  </a>
);

// --- Self-Contained Product Card using Inline Styles ---
const ProductCard = ({ product, onClick }: { product: any, onClick: () => void }) => {
  const discount = Math.round(((product.price + 5000) - product.price) / (product.price + 5000) * 100);

  return (
    <div 
      style={{
        border: '1px solid #f0f0f0',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <div style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#fafafa' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{
            position: 'absolute', top: '0px', right: '0px', backgroundColor: 'rgba(255, 212, 36, 0.9)',
            padding: '2px 4px', textAlign: 'center', lineHeight: '1',
          }}>
            <div style={{ color: '#ee4d2d', fontSize: '12px', fontWeight: 'bold' }}>{discount}%</div>
            <div style={{ color: 'white', fontSize: '9px', fontWeight: 'bold' }}>diskon</div>
          </div>
        </div>
        <div style={{ padding: '8px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.8)', lineHeight: '1.4', height: '34px', overflow: 'hidden', marginBottom: '8px' }}>
            {product.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '16px', fontWeight: '500', color: '#ee4d2d', margin: 0 }}>
              <span style={{ fontSize: '12px' }}>Rp</span>
              {product.price.toLocaleString('id-ID')}
            </p>
            <p style={{ fontSize: '11px', color: '#757575', margin: 0 }}>
              {product.sold > 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold} terjual
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function PaperlisensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const localImages = ['/Cup A.png', '/Cup-Toast.png', '/Toast-es.png'];
  const dummyProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Contoh Produk ${i + 1}`,
    price: 25000 + (i * 1000),
    sold: 100 + (i * 50),
    image: localImages[i % localImages.length],
  }));
  dummyProducts[0].name = 'Nama Produk Ini Sangat Panjang Sekali untuk Menguji Tampilan Teks Dua Baris';

  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

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
                display: 'flex', alignItems: 'center', justifyContent: 'center' // Added for centering Icon
              }}>
                <Icon icon="material-symbols:search" style={{ fontSize: '20px', color: 'white' }} />
              </button>
            </div>
          </div>
          <a href='#' onClick={(e) => e.preventDefault()} style={{ position: 'relative', padding: '8px', display: 'flex', alignItems: 'center' }}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: 'white' }} />
          </a>
        </div>
      </header>

      {/* ===== MAIN CONTENT (with inline styles for centering) ===== */}
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBack} />
        ) : (
          <>
            {/* --- Banners (with corrected height and inline grid) --- */}
            <div className="banners-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ height: '192px', borderRadius: '6px', backgroundColor: '#e0e0e0' }}>
                <BannerSlider images={mainBanners} />
              </div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '6px' }}><img src="/side_banner_1.png" alt="Side Banner 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} /></div>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '6px' }}><img src="/side_banner_2.png" alt="Side Banner 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} /></div>
              </div>
            </div>

            {/* --- Category Icons --- */}
            <div className="category-icons-container" style={{ backgroundColor: 'white', padding: '16px 0', borderRadius: '6px', marginBottom: '24px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
              <div className="category-icons-inner" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                <IconComponent icon="mdi:tray-full" text="Paper Tray" />
                <IconComponent icon="carbon:delivery-parcel" text="Box Take away" />
                <IconComponent icon="mdi:pencil-box-outline" text="Tempat Pensil" />
                <IconComponent icon="mdi:cupcake" text="Box Cupcake" />
              </div>
            </div>

            {/* --- Products Section (with manual flexbox grid) --- */}
            <div style={{ backgroundColor: 'white' }}>
              <div style={{ padding: '16px', borderBottom: '4px solid #ee4d2d' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#ee4d2d' }}>REKOMENDASI</h2>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-5px' }}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-grid-item" style={{ padding: '5px', width: '16.666%', boxSizing: 'border-box' }}>
                      <ProductCard product={product} onClick={() => handleProductClick(product)} />
                    </div>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p>Produk tidak ditemukan.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
