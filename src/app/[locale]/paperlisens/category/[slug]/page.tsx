'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useRouter } from '@/i18n/routing';
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
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
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
      background-color: #f9fafb;
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
      color: #1a3636;
    }

    /* Desktop Sidebar */
    .desktop-sidebar {
      display: block;
      width: 250px;
      flex-shrink: 0;
    }

    /* Mobile Sidebar */
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
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      width: 100%;
    }

    @media (max-width: 768px) {
      .top-bar-address, .top-bar-separator { display: none !important; }
      .back-text-full { display: none; }
      .back-text-short { display: inline !important; }
      .header-container { gap: 12px !important; padding: 0 12px !important; }
      .header-logo { height: 32px !important; }
      .search-input { font-size: 12px !important; padding: 8px 12px !important; }
      .main-content { padding: 16px 8px !important; }

      /* Mobile Grid Layout */
      .product-grid {
        grid-template-columns: repeat(1, 1fr) !important; /* 1 Column on Mobile for Big Cards */
        gap: 24px !important;
      }
      
      .desktop-sidebar {
        display: none;
      }

      /* Hide Overlay on Mobile like Main Page */
      .product-card .card-overlay {
        display: none !important;
      }

      .card-info {
        padding: 8px !important;
      }
      
      .card-info h3 {
        font-size: 14px !important;
        line-height: 1.4 !important;
        margin-bottom: 4px !important;
      }

      .mobile-sidebar {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 80%;
        background: #ffffff;
        z-index: 2000;
        padding: 20px;
        box-shadow: 4px 0 15px rgba(0,0,0,0.1);
        overflow-y: auto;
        color: #1a3636;
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
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        padding: 8px 16px;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 500;
        color: #1a3636;
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
  const pt = useTranslations('Paperlisens');
  
  const { discountPercent, markupPrice } = useMemo(() => {
    let hash = 0;
    const idStr = product.id || product.name || '';
    for (let i = 0; i < idStr.length; i++) { hash = idStr.charCodeAt(i) + ((hash << 5) - hash); }
    const discounts = [10, 15, 20, 25, 30];
    const percent = discounts[Math.abs(hash) % discounts.length];
    return {
        discountPercent: percent,
        markupPrice: Math.ceil(product.price / (1 - (percent / 100)))
    };
  }, [product.id, product.name, product.price]);

  return (
    <div className="product-card">
      <Link href={`/paperlisens/product/${product.productSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        
        <div className="card-image-wrapper">
          <img src={product.image} alt={product.name} className="card-image" loading="lazy" />
          <div style={{
            position: 'absolute', top: '0px', right: '0px', backgroundColor: '#d6bd98',
            padding: '4px 8px', textAlign: 'center', lineHeight: '1', zIndex: 2
          }}>
            <div style={{ color: '#1a3636', fontSize: '12px', fontWeight: 'bold' }}>{discountPercent}%</div>
            <div style={{ color: '#40534c', fontSize: '10px', fontWeight: 'bold' }}>OFF</div>
          </div>

          <div className="card-overlay">
            <button onClick={(e) => { e.preventDefault(); addToCart(product, 1); }} style={{ backgroundColor: '#40534c', color: '#d6bd98', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginBottom: '8px', fontSize: '12px' }}>Add to Cart</button>
            <button onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/6281260001487?text=Halo%20Paperlisens,%20saya%20mau%20pesan%20${product.name}`, '_blank'); }} style={{ backgroundColor: '#1a3636', color: '#d6bd98', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '12px' }}>Order WA</button>
          </div>
        </div>

        <div className="card-info">
          <div>
            <div style={{ fontSize: '10px', color: '#40534c', border: '1px solid #40534c', display: 'inline-block', padding: '1px 4px', borderRadius: '2px', marginBottom: '4px', fontWeight: 'bold' }}>
              {product.category || 'Paperlisens'}
            </div>
            <h3 style={{ fontSize: '14px', color: '#1a3636', lineHeight: '1.4', height: '40px', overflow: 'hidden', marginBottom: '8px', fontWeight: '500' }}>{product.name}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
               <span style={{ fontSize: '10px', textDecoration: 'line-through', color: '#9ca3af', display: 'block' }}>Rp {markupPrice.toLocaleString('id-ID')}</span>
               <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#40534c' }}>Rp {product.price.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#677d6a', display: 'flex', alignItems: 'center' }}>
               <Icon icon="material-symbols:star" style={{ color: '#d6bd98', fontSize: '12px', marginRight: '2px' }} />
               {product.sold} terjual
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// --- Sidebar Filter Component ---
const SidebarFilter = ({ closeSidebar, minPrice, setMinPrice, maxPrice, setMaxPrice, sortBy, setSortBy }: any) => {
  const pt = useTranslations('Paperlisens');
  return (
    <div className="sidebar-content" style={{ color: '#1a3636' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3636', margin: 0 }}> <Icon icon="material-symbols:filter-alt-outline" style={{ verticalAlign: 'middle' }} /> {pt('filter')}</h3>
        {closeSidebar && (
          <button onClick={closeSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a3636' }}>
            <Icon icon="mdi:close" width="24" />
          </button>
        )}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#40534c' }}>{pt('priceRange')}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input type="number" placeholder={pt('minPrice')} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f9fafb' }} />
          <span style={{ color: '#1a3636' }}>-</span>
          <input type="number" placeholder={pt('maxPrice')} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#f9fafb' }} />
        </div>
        <button onClick={() => { if (closeSidebar) closeSidebar(); }} style={{ width: '100%', backgroundColor: '#40534c', color: '#d6bd98', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{pt('apply')}</button>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#40534c' }}>{pt('sortBy')}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['sales', 'price_asc', 'price_desc'].map(opt => (
            <div key={opt} onClick={() => setSortBy(opt)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: sortBy === opt ? '#40534c' : '#677d6a', fontWeight: sortBy === opt ? '600' : 'normal' }}>
              <Icon icon={sortBy === opt ? "mdi:radiobox-marked" : "mdi:radiobox-blank"} style={{ fontSize: '20px', color: sortBy === opt ? '#40534c' : '#999' }} />
              <span>{pt(opt === 'sales' ? 'bestSeller' : opt === 'price_asc' ? 'priceLowHigh' : 'priceHighLow')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const router = useRouter(); // Initialize router
  const { slug } = use(params);
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('sales');
  const [visibleCount, setVisibleCount] = useState(24);

  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryProducts = getProductsByCategory(slug);

  const filteredCategoryProducts = useMemo(() => {
    let result = categoryProducts.filter(p => p.image && p.image !== '/placeholder.png');
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (minPrice || maxPrice) {
        const min = minPrice ? parseInt(minPrice) : 0;
        const max = maxPrice ? parseInt(maxPrice) : Infinity;
        result = result.filter(p => p.price >= min && p.price <= max);
    }
    const seen = new Set();
    result = result.filter(p => {
        const duplicate = seen.has(p.name);
        seen.add(p.name);
        return !duplicate;
    });
    result.sort((a, b) => {
      if (sortBy === 'sales') return b.sold - a.sold;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });
    return result;
  }, [categoryProducts, searchQuery, minPrice, maxPrice, sortBy]);

  const displayedProducts = filteredCategoryProducts.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(prev => prev + 24);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/paperlisens?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filterProps = { minPrice, setMinPrice, maxPrice, setMaxPrice, sortBy, setSortBy };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <ResponsiveStyles />
      <div style={{ backgroundColor: '#ffffff', color: '#1a3636', fontSize: '12px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ color: '#40534c', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:arrow-left" />
              <span className="back-text-full">{pt('backToDallas')}</span>
              <span className="back-text-short" style={{ display: 'none' }}>Kembali</span>
            </Link>
            <span className="top-bar-separator" style={{ borderLeft: '1px solid #ddd', height: '12px' }}></span>
            <span className="top-bar-address" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icon icon="mdi:map-marker" style={{ fontSize: '14px', color: '#40534c' }} /> {t('TopBar.address')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icon icon="mdi:phone" style={{ fontSize: '14px', color: '#40534c' }} /> 081260001487</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="https://www.instagram.com/paperlisens22" target="_blank" style={{color: '#1a3636'}}><Icon icon="mdi:instagram" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" style={{color: '#1a3636'}}><Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" style={{color: '#1a3636'}}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" style={{color: '#1a3636'}}><Icon icon="mdi:facebook" style={{ fontSize: '18px' }} /></a>
          </div>
        </div>
      </div>
      <header style={{ backgroundColor: '#40534c', padding: '16px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens"><img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} /></Link>
          <div style={{ flexGrow: 1 }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <input type="text" placeholder={pt('searchInCategory', { category: categoryName })} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" style={{ width: '100%', padding: '10px 16px', borderRadius: '3px', border: 'none', fontSize: '14px', backgroundColor: 'white', color: '#1a3636', outline: 'none' }} />
              <button type="submit" style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '40px', backgroundColor: '#1a3636', color: '#d6bd98', border: 'none', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon="material-symbols:search" style={{ fontSize: '20px', color: '#d6bd98' }} />
              </button>
            </form>
          </div>
          <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer', color: '#d6bd98' }}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: '#d6bd98' }} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#d6bd98', color: '#40534c', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </div>
        </div>
      </header>
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#677d6a' }}>
             <Link href="/paperlisens" style={{ textDecoration: 'none', color: '#40534c' }}>{pt('home')}</Link> 
             <span>/</span> <span>{pt('category')}</span> <span>/</span> <span style={{ fontWeight: 'bold', color: '#1a3636' }}>{categoryName}</span>
        </div>
        <div className="mobile-filter-toggle" onClick={() => setIsMobileFilterOpen(true)}><Icon icon="material-symbols:filter-list" width="20" style={{ color: '#1a3636' }} /><span>Filter & Sort</span></div>
        <div className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)} />
        <div className={`mobile-sidebar ${isMobileFilterOpen ? 'open' : ''}`}><SidebarFilter closeSidebar={() => setIsMobileFilterOpen(false)} {...filterProps} /></div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
           <div className="desktop-sidebar"><SidebarFilter {...filterProps} /></div>
           <div style={{ flexGrow: 1 }}>
              <div style={{ backgroundColor: 'white', borderRadius: '4px', padding: '24px', border: '1px solid #e5e7eb' }}>
                 <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a3636', marginBottom: '24px', borderLeft: '4px solid #40534c', paddingLeft: '12px' }}>{categoryName}</h1>
                 <div className="product-grid">{displayedProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
                 {filteredCategoryProducts.length > visibleCount && <div style={{ textAlign: 'center', marginTop: '32px' }}><button onClick={loadMore} style={{ padding: '12px 32px', backgroundColor: '#40534c', color: '#d6bd98', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Muat Lebih Banyak</button></div>}
              </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}