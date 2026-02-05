'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Link, useRouter } from '@/i18n/routing';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { useTranslations, useLocale } from 'next-intl';
import Footer from '@/components/layout/Footer';

// --- Responsive Styles ---
const Styles = () => (
  <style>{`
    .gallery-container { display: flex; flex-direction: column; gap: 16px; }
    .thumbnail-list { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; justify-content: center; }
    .thumbnail-list::-webkit-scrollbar { display: none; }
    .thumbnail { width: 80px; height: 80px; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; object-fit: cover; flex-shrink: 0; }
    .thumbnail.active { border-color: #40534c; border-width: 2px; }
    .main-image { width: 100%; height: 450px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; display: block; margin: 0 auto; }
    .tab-nav { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 24px; overflow-x: auto; }
    .tab-item { padding: 12px 24px; cursor: pointer; color: #677d6a; border-bottom: 2px solid transparent; white-space: nowrap; }
    .tab-item.active { color: #40534c; border-bottom-color: #40534c; font-weight: bold; }
    
    @media (max-width: 768px) { 
      .main-image { height: 300px; } 
      .top-bar-address, .top-bar-separator { display: none !important; }
      .back-text-full { display: none; }
      .back-text-short { display: inline !important; }
      .header-container { gap: 12px !important; padding: 0 12px !important; }
      .header-logo { height: 32px !important; }
      .search-input { font-size: 12px !important; padding: 8px 12px !important; }
      
      /* Mobile Gallery Styles - FIXED CENTERING */
      .desktop-gallery { display: none; }
      .mobile-gallery {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 0 !important; /* Remove gap for perfect centering on swipe */
        padding-bottom: 8px;
        scrollbar-width: none;
      }
      .mobile-gallery::-webkit-scrollbar { display: none; }
      .mobile-gallery-item {
        min-width: 100%;
        width: 100%;
        flex-shrink: 0;
        scroll-snap-align: center;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        background-color: #f9fafb;
        height: 350px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .mobile-gallery-img { width: 100%; height: 100%; object-fit: contain; display: block; margin: 0 auto; }
    }
    @media (min-width: 769px) {
      .mobile-gallery { display: none; }
    }
  `}</style>
);

// --- Product Card Component ---
const ProductCard = ({ product }: { product: any }) => {
  const pt = useTranslations('Paperlisens');
  const locale = useLocale();

  const getLocalized = (item: any, field: string) => {
    // @ts-ignore
    return item[`${field}_${locale}`] || item[field];
  };

  const productName = getLocalized(product, 'name');

  const generateDiscount = (id: string) => {
    let hash = 0;
    const idStr = id || '';
    for (let i = 0; i < idStr.length; i++) { hash = idStr.charCodeAt(i) + ((hash << 5) - hash); }
    const discounts = [10, 15, 20, 25, 30];
    return discounts[Math.abs(hash) % discounts.length];
  };
  const discountPercent = generateDiscount(product.id || product.name);
  const markupPrice = Math.ceil(product.price / (1 - (discountPercent / 100)));

  return (
    <Link href={`/paperlisens/product/${product.productSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', minWidth: '200px' }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', height: '100%', transition: 'box-shadow 0.2s' }}>
        <div style={{ height: '180px', backgroundColor: '#f9fafb', position: 'relative' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#d6bd98', padding: '2px 6px', fontSize: '10px', color: '#1a3636', fontWeight: 'bold' }}>
            {discountPercent}% OFF
          </div>
        </div>
        <div style={{ padding: '12px' }}>
          <div style={{ fontSize: '10px', color: '#677d6a', border: '1px solid #677d6a', display: 'inline-block', padding: '1px 4px', borderRadius: '2px', marginBottom: '4px' }}>
            {product.category || 'Paperlisens'}
          </div>
          <h4 style={{ fontSize: '14px', color: '#1a3636', marginBottom: '8px', lineHeight: '1.4', height: '40px', overflow: 'hidden', fontWeight: '500' }}>{productName}</h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', textDecoration: 'line-through', color: '#9ca3af', display: 'block' }}>Rp {markupPrice.toLocaleString('id-ID')}</span>
              <span style={{ color: '#40534c', fontWeight: 'bold' }}>Rp {product.price.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#677d6a' }}>
              <Icon icon="material-symbols:star" style={{ color: '#d6bd98', fontSize: '12px', marginRight: '2px', verticalAlign: '-2px' }} />
              {product.sold} {pt('sold')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductSlider = ({ title, products }: { title: string, products: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    const checkScrollable = () => { if (scrollRef.current) setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth); };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [products]);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  return (
    <div style={{ marginBottom: '40px', position: 'relative' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3636', marginBottom: '16px', borderLeft: '4px solid #40534c', paddingLeft: '12px' }}>{title}</h3>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {isScrollable && (
          <>
            <button onClick={() => scroll('left')} style={{ position: 'absolute', left: '-15px', zIndex: 10, background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#40534c' }}><Icon icon="mdi:chevron-left" fontSize="24px" /></button>
            <button onClick={() => scroll('right')} style={{ position: 'absolute', right: '-15px', zIndex: 10, background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#40534c' }}><Icon icon="mdi:chevron-right" fontSize="24px" /></button>
          </>
        )}
        <div ref={scrollRef} className="no-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollBehavior: 'smooth', padding: '4px' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

const DescriptionFormatter = ({ text }: { text: string }) => {
  if (!text) return null;
  return (
    <div style={{ lineHeight: '1.8', color: '#1a3636' }}>
      {text.split('\n').map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={index} />;
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
           return <div key={index} style={{ display: 'flex', marginLeft: '8px' }}><span style={{ marginRight: '8px' }}>•</span><span>{trimmed.substring(2)}</span></div>;
        }
        return <p key={index} style={{ marginBottom: '8px' }}>{trimmed}</p>;
      })}
    </div>
  );
};

export default function ProductDetailPage({ initialProduct, relatedProducts, otherProducts }: any) {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const locale = useLocale();
  const router = useRouter();
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [hoveredVariant, setHoveredVariant] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getLocalized = (item: any, field: string) => {
    // @ts-ignore
    const specificTranslation = item[`${field}_${locale}`];
    if (specificTranslation) return specificTranslation;

    const originalValue = item[field];
    if (!originalValue || typeof originalValue !== 'string') return originalValue;

    // Smart Fallback Translation for common terms
    if (locale === 'en') {
      return originalValue
        .replace(/\bBox\b/g, 'Box')
        .replace(/\bKotak\b/g, 'Box')
        .replace(/\bIsi\b/gi, 'Count')
        .replace(/\bMotif\b/g, 'Patterned')
        .replace(/\bPutih\b/g, 'White')
        .replace(/\bHitam\b/g, 'Black')
        .replace(/\bMerah\b/g, 'Red')
        .replace(/\bBiru\b/g, 'Blue')
        .replace(/\bHijau\b/g, 'Green')
        .replace(/\bKuning\b/g, 'Yellow')
        .replace(/\bLaminasi\b/g, 'Laminated')
        .replace(/\bTanpa\b/g, 'Without')
        .replace(/\bPakai\b/g, 'With')
        .replace(/\bLobang\b/g, 'Hole');
    }

    if (locale === 'zh') {
      return originalValue
        .replace(/\bBox\b/g, '盒子')
        .replace(/\bKotak\b/g, '盒子')
        .replace(/\bIsi\b/gi, '装')
        .replace(/\bMotif\b/g, '图案')
        .replace(/\bPutih\b/g, '白色')
        .replace(/\bHitam\b/g, '黑色')
        .replace(/\bMerah\b/g, '红色')
        .replace(/\bBiru\b/g, '蓝色')
        .replace(/\bHijau\b/g, '绿色')
        .replace(/\bKuning\b/g, '黄色')
        .replace(/\bLaminasi\b/g, '层压')
        .replace(/\bTanpa\b/g, '无')
        .replace(/\bPakai\b/g, '带')
        .replace(/\bLobang\b/g, '孔');
    }

    return originalValue;
  };
  
  const variations = products.filter(p => p.name === initialProduct.name);
  const activeVisualVariant = hoveredVariant || selectedVariant;
  const displayProduct = activeVisualVariant || initialProduct;

  const generateDiscount = (id: string) => {
    let hash = 0;
    const idStr = id || '';
    for (let i = 0; i < idStr.length; i++) { hash = idStr.charCodeAt(i) + ((hash << 5) - hash); }
    const discounts = [10, 15, 20, 25, 30, 35, 40, 50];
    return discounts[Math.abs(hash) % discounts.length];
  };
  const discountPercent = generateDiscount(displayProduct.id || displayProduct.name);
  const originalPrice = Math.ceil(displayProduct.price / (1 - (discountPercent / 100)));

  const product = {
    ...displayProduct,
    localizedName: getLocalized(displayProduct, 'name'),
    localizedDescription: getLocalized(displayProduct, 'description'),
    images: (activeVisualVariant && activeVisualVariant.variantImage)
      ? [activeVisualVariant.variantImage, ...(displayProduct.images || [displayProduct.image])]
      : (displayProduct.images && displayProduct.images.length > 0 ? displayProduct.images : [displayProduct.image]),
    rating: 4.9,
    reviewCount: 128,
    originalPrice: originalPrice, 
    stock: 150,
    weight: '1000 gr',
  };

  const handleAddToCart = () => { addToCart(product, quantity); };
  const getVariantName = (p: any) => getLocalized(p, 'variant') || 'Standard';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/paperlisens?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Styles />
      
      {/* ===== TOP BAR ===== */}
      <div style={{ backgroundColor: '#ffffff', color: '#1a3636', fontSize: '12px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ color: '#40534c', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:arrow-left" /> 
              <span className="back-text-full">{pt('backToDallas')}</span>
              <span className="back-text-short" style={{ display: 'none' }}>{t('Common.back')}</span>
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

      {/* ===== HEADER ===== */}
      <header style={{ backgroundColor: '#40534c', padding: '16px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens"><img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} /></Link>
          <div style={{ flexGrow: 1 }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={pt('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{ width: '100%', padding: '10px 16px', paddingRight: '48px', borderRadius: '3px', border: 'none', fontSize: '14px', backgroundColor: 'white', color: '#1a3636', outline: 'none' }}
              />
              <button type="submit" style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '40px', backgroundColor: '#1a3636', color: '#d6bd98', border: 'none', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon="material-symbols:search" style={{ fontSize: '20px', color: '#d6bd98' }} />
              </button>
            </form>
          </div>
          <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', padding: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#d6bd98' }}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: '#d6bd98' }} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#d6bd98', color: '#40534c', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        {/* BREADCRUMB */}
        <div style={{ fontSize: '14px', color: '#677d6a', marginBottom: '16px', display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Link href="/paperlisens" style={{ textDecoration: 'none', color: '#40534c' }}>{pt('home')}</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <Link href={`/paperlisens/category/${product.slug}`} style={{ textDecoration: 'none', color: '#40534c' }}>{product.category}</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#1a3636', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.localizedName}</span>
        </div>

        {/* MAIN PRODUCT AREA */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* Gallery Section */}
            <div className="gallery-container">
              <div className="desktop-gallery">
                <img src={product.images[selectedImage]} className="main-image" alt={product.localizedName} />
                <div className="thumbnail-list">
                  {product.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} className={`thumbnail ${selectedImage === idx ? 'active' : ''}`} onClick={() => setSelectedImage(idx)} alt={`Thumb ${idx}`} />
                  ))}
                </div>
              </div>
              <div className="mobile-gallery">
                {product.images.map((img: string, idx: number) => (
                  <div key={idx} className="mobile-gallery-item">
                    <img src={img} className="mobile-gallery-img" alt={`Product ${idx}`} />
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '10px' }}>{idx + 1} / {product.images.length}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '12px', color: '#1a3636', lineHeight: '1.3' }}>{product.localizedName}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#40534c' }}>
                  <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{product.rating}</span>
                  <Icon icon="material-symbols:star" />
                </div>
                <div style={{ height: '16px', width: '1px', backgroundColor: '#ddd' }}></div>
                <div style={{ color: '#677d6a' }}>{product.reviewCount} {pt('rating')}</div>
                <div style={{ height: '16px', width: '1px', backgroundColor: '#ddd' }}></div>
                <div style={{ color: '#677d6a' }}>{product.sold} {pt('sold')}</div>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '14px' }}>Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                    <span style={{ backgroundColor: '#d6bd98', color: '#1a3636', fontSize: '10px', fontWeight: 'bold', padding: '2px 4px', borderRadius: '2px' }}>{discountPercent}% OFF</span>
                 </div>
                 <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#40534c' }}>Rp {product.price.toLocaleString('id-ID')}</div>
              </div>
              {variations.length > 1 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', color: '#677d6a', marginBottom: '8px' }}>{pt('selectVariant')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {variations.map((v) => (
                      <button key={v.id} onMouseEnter={() => setHoveredVariant(v)} onMouseLeave={() => setHoveredVariant(null)} onClick={() => { if(selectedVariant?.id === v.id) { setSelectedVariant(null); } else { setSelectedVariant(v); setSelectedImage(0); } }}
                        style={{ padding: '8px 16px', border: selectedVariant?.id === v.id ? '1px solid #40534c' : '1px solid #e5e7eb', backgroundColor: selectedVariant?.id === v.id ? '#40534c' : 'white', color: selectedVariant?.id === v.id ? '#d6bd98' : '#1a3636', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>{getVariantName(v)}</button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                 <span style={{ color: '#677d6a', fontSize: '14px' }}>{pt('quantity')}</span>
                 <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '4px 12px', borderRight: '1px solid #e5e7eb' }}>-</button>
                    <input type="text" value={quantity} readOnly style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none' }} />
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '4px 12px', borderLeft: '1px solid #e5e7eb' }}>+</button>
                 </div>
                 <span style={{ fontSize: '12px', color: '#9ca3af' }}>{pt('available', { count: product.stock })}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleAddToCart} style={{ flex: 1, padding: '12px', backgroundColor: 'rgba(64, 83, 76, 0.1)', color: '#40534c', border: '1px solid #40534c', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Icon icon="material-symbols:add-shopping-cart" /> {pt('addToCart')}</button>
                <button onClick={() => window.open(`https://wa.me/6281260001487?text=Halo%20Paperlisens,%20saya%20mau%20pesan%20${product.localizedName}`, '_blank')} style={{ flex: 1, padding: '12px', backgroundColor: '#40534c', color: '#d6bd98', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>{pt('orderNow')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <div className="tab-nav">
            {['deskripsi', 'info', 'review', 'pengiriman'].map(tab => (
              <div key={tab} className={`tab-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{pt(tab)}</div>
            ))}
          </div>
          <div style={{ padding: '0 12px' }}>
            {activeTab === 'deskripsi' && <DescriptionFormatter text={product.localizedDescription} />}
            {activeTab === 'info' && <div style={{color: '#1a3636'}}><p><strong>{pt('weight')}:</strong> {product.weight}</p><p><strong>{pt('category')}:</strong> {product.category}</p></div>}
            {activeTab === 'review' && <div style={{color: '#1a3636'}}><strong>4.9</strong> (128 Ulasan)</div>}
            {activeTab === 'pengiriman' && <div style={{color: '#1a3636'}}><p>{pt('shippingInfo.from')}</p></div>}
          </div>
        </div>

        <ProductSlider title={pt('relatedProducts')} products={relatedProducts} />
        <ProductSlider title={pt('youMayAlsoLike')} products={otherProducts} />
      </main>
      <Footer />
    </div>
  );
}
