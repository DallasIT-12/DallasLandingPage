'use client';

import { use, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/routing';
import { useCart } from '@/context/CartContext';
import { getProductsByCategory } from '@/data/products';
import { useTranslations } from 'next-intl';
import Footer from '@/components/layout/Footer';

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

    /* Desktop Sidebar */
    .desktop-sidebar {
      display: block;
      width: 250px;
      flex-shrink: 0;
    }

    /* Mobile Sidebar (Hidden on Desktop) */
    .mobile-sidebar {
      display: none;
    }

    .mobile-filter-toggle {
      display: none;
    }

    .mobile-filter-overlay {
      display: none;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
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

      /* Mobile Grid Layout */
      .product-grid {
        grid-template-columns: repeat(2, 1fr) !important; /* 2 Columns on Mobile */
        gap: 12px !important;
      }
      
      .desktop-sidebar {
        display: none;
      }

      /* Mobile Sidebar & Filter */
      .mobile-sidebar {
        display: none; /* Hidden by default on mobile */
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 80%;
        background: white;
        z-index: 2000;
        padding: 20px;
        box-shadow: 4px 0 15px rgba(0,0,0,0.1);
        overflow-y: auto;
      }

      .mobile-sidebar.open {
        display: block;
        animation: slideIn 0.3s forwards;
      }

      @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }

      .mobile-filter-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: white;
        border: 1px solid #e5e7eb;
        padding: 8px 16px;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        cursor: pointer;
        width: fit-content;
      }

      .mobile-filter-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1999;
      }

      .mobile-filter-overlay.open {
        display: block;
      }
    }
  `}</style>
);

// --- Fade Product Card Component ---
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((product.price + 5000) - product.price) / (product.price + 5000) * 100);

  return (
    <div className="product-card">
      <Link href={`/paperlisens/product/${product.productSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
               <div style={{ display: 'flex', color: '#ffc107' }}>
                 {[...Array(5)].map((_, i) => (
                   <Icon key={i} icon="material-symbols:star" width="12" />
                 ))}
               </div>
               <span style={{ fontSize: '11px', color: '#757575' }}>(4.9)</span>
            </div>
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

// --- Sidebar Filter Component ---
const SidebarFilter = ({ 
  closeSidebar, 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice, 
  sortBy, setSortBy 
}: { 
  closeSidebar?: () => void,
  minPrice: string, setMinPrice: (v: string) => void,
  maxPrice: string, setMaxPrice: (v: string) => void,
  sortBy: string, setSortBy: (v: string) => void
}) => {
  const pt = useTranslations('Paperlisens');
  
  return (
    <div className="sidebar-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', margin: 0 }}> <Icon icon="material-symbols:filter-alt-outline" style={{ verticalAlign: 'middle' }} /> {pt('filter')}</h3>
        {closeSidebar && (
          <button onClick={closeSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icon icon="mdi:close" width="24" />
          </button>
        )}
      </div>

      {/* Price Filter */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#555' }}>{pt('priceRange')}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input 
            type="number" 
            placeholder={pt('minPrice')}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: '100%', padding: '6px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px' }} 
          />
          <span style={{ color: '#999' }}>-</span>
          <input 
            type="number" 
            placeholder={pt('maxPrice')}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '100%', padding: '6px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px' }} 
          />
        </div>
        <button 
          onClick={() => {
            // Logic is reactive, but we can close sidebar on mobile
            if (closeSidebar) closeSidebar();
          }}
          style={{ width: '100%', backgroundColor: '#ee4d2d', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
        >
          {pt('apply')}
        </button>
      </div>

      {/* Sort Filter */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#555' }}>{pt('sortBy')}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div 
            onClick={() => setSortBy('sales')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px', 
              cursor: 'pointer',
              color: sortBy === 'sales' ? '#ee4d2d' : '#333',
              fontWeight: sortBy === 'sales' ? '600' : 'normal',
              transition: 'color 0.2s'
            }}
          >
            <Icon 
              icon={sortBy === 'sales' ? "mdi:radiobox-marked" : "mdi:radiobox-blank"} 
              style={{ 
                fontSize: '20px', 
                color: sortBy === 'sales' ? '#ee4d2d' : '#999' 
              }} 
            />
            <span>{pt('bestSeller')}</span>
          </div>

          <div 
            onClick={() => setSortBy('price_asc')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px', 
              cursor: 'pointer',
              color: sortBy === 'price_asc' ? '#ee4d2d' : '#333',
              fontWeight: sortBy === 'price_asc' ? '600' : 'normal',
              transition: 'color 0.2s'
            }}
          >
            <Icon 
              icon={sortBy === 'price_asc' ? "mdi:radiobox-marked" : "mdi:radiobox-blank"} 
              style={{ 
                fontSize: '20px', 
                color: sortBy === 'price_asc' ? '#ee4d2d' : '#999' 
              }} 
            />
            <span>{pt('priceLowHigh')}</span>
          </div>

          <div 
            onClick={() => setSortBy('price_desc')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px', 
              cursor: 'pointer',
              color: sortBy === 'price_desc' ? '#ee4d2d' : '#333',
              fontWeight: sortBy === 'price_desc' ? '600' : 'normal',
              transition: 'color 0.2s'
            }}
          >
             <Icon 
              icon={sortBy === 'price_desc' ? "mdi:radiobox-marked" : "mdi:radiobox-blank"} 
              style={{ 
                fontSize: '20px', 
                color: sortBy === 'price_desc' ? '#ee4d2d' : '#999' 
              }} 
            />
            <span>{pt('priceHighLow')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const { slug } = use(params);
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('sales');

  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Use centralized data filtered by category slug
  const categoryProducts = getProductsByCategory(slug);

  // Apply all filters and sorting
  const filteredCategoryProducts = categoryProducts
    // 1. Filter out products without valid images
    .filter(product => product.image && product.image !== '/placeholder.png')
    // 2. Filter by search query
    .filter(product => 
      !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // 3. Filter by Price Range
    .filter(product => {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      return product.price >= min && product.price <= max;
    })
    // 4. Deduplicate by Product Name (show only 1 card per product name)
    .filter((product, index, self) => {
      return index === self.findIndex(t => t.name === product.name);
    })
    // 5. Apply Sorting
    .sort((a, b) => {
      if (sortBy === 'sales') return b.sold - a.sold;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });

  const filterProps = {
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    sortBy, setSortBy
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <ResponsiveStyles />

      {/* ===== TOP BAR ===== */}
      <div style={{ backgroundColor: '#ffffff', color: '#333', fontSize: '12px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ color: '#ee4d2d', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:arrow-left" />
              Kembali ke Dallas
            </Link>
            <span style={{ borderLeft: '1px solid #ddd', height: '12px' }}></span>
            <Link href="/paperlisens" className="top-bar-text" style={{ color: '#ee4d2d', textDecoration: 'none', fontWeight: '500' }}>&larr; Paperlisens</Link>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:map-marker" style={{ fontSize: '14px', color: '#ee4d2d' }} />
              {t('TopBar.address')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:phone" style={{ fontSize: '14px', color: '#ee4d2d' }} />
              081260001487
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://www.instagram.com/paperlisens22" target="_blank" rel="noopener noreferrer" style={{color: '#333'}} title="Instagram">
              <Icon icon="mdi:instagram" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" style={{color: '#333'}} title="TikTok">
              <Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header style={{ 
        backgroundColor: '#ee4d2d', 
        padding: '16px 0',
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
      }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens">
            <img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div style={{ flexGrow: 1 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={pt('searchInCategory', { category: categoryName })}
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#555' }}>
             <Link href="/paperlisens" style={{ textDecoration: 'none', color: '#ee4d2d' }}>{pt('home')}</Link> 
             <span>/</span> 
             <span>{pt('category')}</span> 
             <span>/</span> 
             <span style={{ fontWeight: 'bold' }}>{categoryName}</span>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle" onClick={() => setIsMobileFilterOpen(true)}>
           <Icon icon="material-symbols:filter-list" width="20" />
           <span>Filter & Sort</span>
        </div>

        {/* Mobile Filter Overlay & Sidebar */}
        <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)} />
        <div className={`mobile-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
           <SidebarFilter closeSidebar={() => setIsMobileFilterOpen(false)} {...filterProps} />
        </div>

        {/* REAL LAYOUT STRUCTURE */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
           
           {/* DESKTOP SIDEBAR (Hidden on Mobile via CSS) */}
           <div className="desktop-sidebar">
              <SidebarFilter {...filterProps} />
           </div>

           {/* CONTENT AREA */}
           <div style={{ flexGrow: 1 }}>
              <div style={{ backgroundColor: 'white', borderRadius: '4px', padding: '24px' }}>
                 <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '24px', borderLeft: '4px solid #ee4d2d', paddingLeft: '12px' }}>
                   {categoryName}
                 </h1>

                 <div className="product-grid">
                   {filteredCategoryProducts.map(product => (
                     <ProductCard key={product.id} product={product} />
                   ))}
                 </div>
                 
                 {filteredCategoryProducts.length === 0 && (
                   <div style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                      {pt('noProductsFound')}
                   </div>
                 )}
              </div>
           </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}