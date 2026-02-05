'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { useTranslations, useLocale } from 'next-intl';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

// --- Improved Banner Slider Component ---
const BannerSlider = ({ items, interval = 5000, imageFit = 'cover' }: { items: { image: string, link?: string }[], interval?: number, imageFit?: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const minSwipeDistance = 50;
  const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

  useEffect(() => {
    resetTimeout();
    if (items.length > 0) {
      timeoutRef.current = setTimeout(() => goToNextSlide(), interval);
    }
    return () => resetTimeout();
  }, [currentIndex, items.length, interval]);

  const goToSlide = (idx: number) => setCurrentIndex(idx);
  const goToPrevSlide = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const goToNextSlide = () => setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    resetTimeout();
  };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNextSlide();
    else if (distance < -minSwipeDistance) goToPrevSlide();
  };

  if (items.length === 0) return null;

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div style={{ display: 'flex', height: '100%', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} style={{ width: '100%', height: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            {item.link ? (
              <Link href={item.link} style={{ display: 'block', width: '100%', height: '100%' }}>
                <img src={item.image} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: imageFit }} loading="lazy" />
              </Link>
            ) : (
              <img src={item.image} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: imageFit }} loading="lazy" />
            )}
          </div>
        ))}
      </div>
      <button onClick={goToPrevSlide} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>&#10094;</button>
      <button onClick={goToNextSlide} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>&#10095;</button>
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => goToSlide(i)} style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: currentIndex === i ? '#40534c' : 'rgba(64, 83, 76, 0.3)', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
};

// --- Desktop Banner Slider Component ---
const DesktopBannerSlider = ({ items }: { items: { image: string, link?: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pt = useTranslations('Paperlisens');
  const visibleCount = 3;
  const maxIndex = Math.max(0, items.length - visibleCount);

  const next = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  if (items.length < visibleCount) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px' }}>
      <div 
        style={{ 
          display: 'flex', 
          height: '100%', 
          transition: 'transform 0.5s ease-in-out', 
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
          width: `${(items.length / visibleCount) * 100}%` 
        }}
      >
        {items.map((item, index) => (
          <div key={index} style={{ width: `${100 / items.length}%`, height: '100%', padding: '0 8px', boxSizing: 'border-box' }}>
             <div className="banner-grid-item" style={{ width: '100%', height: '100%' }}>
              <Link href={item.link || '#'}>
                <img src={item.image} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="banner-grid-overlay">
                  <span className="banner-grid-tag">{pt('featuredTag')}</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button onClick={prev} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#1a3636', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Icon icon="mdi:chevron-left" style={{ fontSize: '24px' }} />
      </button>
      <button onClick={next} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#1a3636', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Icon icon="mdi:chevron-right" style={{ fontSize: '24px' }} />
      </button>
    </div>
  );
};

// --- Responsive Styles ---
const ResponsiveStyles = () => (
  <style>{`
    .product-card { position: relative; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; transition: box-shadow 0.3s ease; height: 100%; display: flex; flex-direction: column; }
    .product-card:hover { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
    .card-image-wrapper { position: relative; width: 100%; padding-top: 100%; background-color: #f9fafb; overflow: hidden; }
    .card-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
    .card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.95); opacity: 0; transition: opacity 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 16px; text-align: center; z-index: 10; }
    .product-card:hover .card-overlay { opacity: 1; }
    .card-info { padding: 12px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; color: #1a3636; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; width: 100%; }
    
    .banner-grid-item { position: relative; overflow: hidden; border-radius: 8px; background-color: #fff; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; }
    .banner-grid-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .banner-grid-item:hover img { transform: scale(1.05); }
    .banner-grid-overlay { position: absolute; bottom: 12px; left: 12px; z-index: 2; }
    .banner-grid-tag { background: #40534c; color: #d6bd98; padding: 2px 8px; border-radius: 3px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
    .gallery-image { transition: transform 0.3s ease; }
    .gallery-image:hover { transform: scale(1.05); }
    
    @media (max-width: 768px) {
      .top-bar-address, .top-bar-separator { display: none !important; }
      .back-text-full { display: none; }
      .back-text-short { display: inline !important; }
      .header-container { gap: 12px !important; padding: 0 12px !important; }
      .header-logo { height: 32px !important; }
      .search-input { font-size: 12px !important; padding: 8px 12px !important; }
      .category-grid { display: flex !important; overflow-x: auto !important; gap: 12px !important; padding-bottom: 8px !important; scrollbar-width: none; }
      .category-grid::-webkit-scrollbar { display: none; }
      .category-card-wrapper { min-width: 140px !important; flex-shrink: 0 !important; }
      .category-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: #ffffff; border: 1px solid #e5e7eb; border-radius: 50%; width: 30px; height: 30px; display: flex !important; align-items: center; justify-content: center; z-index: 10; color: #1a3636; }
      .category-nav-btn.left { left: -5px; }
      .category-nav-btn.right { right: -5px; }
      .hero-banner-container { display: block !important; height: 100vw !important; margin-bottom: 16px !important; width: 100vw !important; margin-left: -16px !important; }
      .main-banner-area { width: 100% !important; height: 100% !important; border-radius: 0 !important; }
      .side-banners-area { display: none !important; }
      .product-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
    }
  `}</style>
);

// --- Category Card Component ---
const CategoryCard = ({ title, image, slug }: { title: string; image: string; slug: string }) => (
  <Link href={`/paperlisens/category/${slug}`} style={{ textDecoration: 'none' }}>
    <div className="category-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '180px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '12px', background: 'linear-gradient(to top, rgba(26, 54, 54, 0.8), transparent)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '60%' }}>
        <span style={{ color: '#d6bd98', fontWeight: '600', textAlign: 'center' }}>{title}</span>
      </div>
    </div>
  </Link>
);

// --- ProductCard Component ---
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const pt = useTranslations('Paperlisens');
  const locale = useLocale();

  // Helper to get localized field
  const getLocalized = (field: string) => {
    // @ts-ignore
    return product[`${field}_${locale}`] || product[field];
  };

  const productName = getLocalized('name');
  const productVariant = getLocalized('variant');

  const { discountPercent, markupPrice } = useMemo(() => {
    let hash = 0;
    const idStr = product.id || product.name || '';
    for (let i = 0; i < idStr.length; i++) { hash = idStr.charCodeAt(i) + ((hash << 5) - hash); }
    const discounts = [10, 15, 20, 25, 30];
    return { discountPercent: discounts[Math.abs(hash) % discounts.length], markupPrice: Math.ceil(product.price / (1 - (discounts[Math.abs(hash) % discounts.length] / 100))) };
  }, [product.id, product.name, product.price]);

  return (
    <div className="product-card">
      <Link href={`/paperlisens/product/${product.productSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card-image-wrapper">
          <img src={product.image} alt={productName} className="card-image" loading="lazy" />
          <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#d6bd98', padding: '4px 8px', textAlign: 'center', zIndex: 2 }}>
            <div style={{ color: '#1a3636', fontSize: '12px', fontWeight: 'bold' }}>{discountPercent}%</div>
            <div style={{ color: '#40534c', fontSize: '10px', fontWeight: 'bold' }}>OFF</div>
          </div>
          <div className="card-overlay">
            <button onClick={(e) => { e.preventDefault(); addToCart(product, 1); }} style={{ backgroundColor: '#40534c', color: '#d6bd98', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginBottom: '8px', fontSize: '12px' }}>{pt('addToCart')}</button>
            <button onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/6281260001487?text=Halo%20Paperlisens,%20saya%20mau%20pesan%20${productName}`, '_blank'); }} style={{ backgroundColor: '#1a3636', color: '#d6bd98', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '12px' }}>{pt('orderWa')}</button>
          </div>
        </div>
        <div className="card-info">
          <div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <div style={{ fontSize: '10px', color: '#40534c', border: '1px solid #40534c', display: 'inline-block', padding: '1px 4px', borderRadius: '2px', fontWeight: 'bold' }}>{product.category || 'Paperlisens'}</div>
              {productVariant && (
                <div style={{ fontSize: '10px', color: '#677d6a', backgroundColor: '#f3f4f6', display: 'inline-block', padding: '1px 4px', borderRadius: '2px' }}>{productVariant}</div>
              )}
            </div>
            <h3 style={{ fontSize: '14px', lineHeight: '1.4', height: '40px', overflow: 'hidden', marginBottom: '8px', fontWeight: '500' }}>{productName}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
               <span style={{ fontSize: '10px', textDecoration: 'line-through', color: '#9ca3af', display: 'block' }}>Rp {markupPrice.toLocaleString('id-ID')}</span>
               <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#40534c' }}>Rp {product.price.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#677d6a', display: 'flex', alignItems: 'center' }}>
               <Icon icon="material-symbols:star" style={{ color: '#d6bd98', fontSize: '12px', marginRight: '2px' }} />
               {product.sold} {pt('sold')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// --- Gallery Images ---
const galleryImages = [
  '/foto (412).jpg',
  '/foto (264).jpg',
  '/foto (120).jpg',
  '/foto (176).jpg',
  '/foto (310).jpg',
  '/foto (154).jpg',
  '/foto (431).jpg',
  '/foto (436).jpg',
  '/foto (96).jpg',
  '/foto (435).jpg',
  '/foto (69).jpg',
  '/foto (612).jpg',
  '/foto (517).jpg',
  '/foto (510).jpg',
  '/foto (127).jpg',
  '/foto (365).jpg',
  '/foto (185).jpg',
  '/foto (84).jpg',
  '/foto (187).jpg',
  '/foto (151).jpg',
  '/foto (432).jpg',
  '/foto (165).jpg',
  '/foto (159).jpg',
  '/foto (172).jpg',
];

export default function PaperlisensPage() {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [bannerItems, setBannerItems] = useState<{ image: string; link?: string }[]>([]);

  useEffect(() => {
    const checkScreenSize = () => { setIsLargeMobile(window.innerWidth < 768); };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Select 12 random products for the desktop banner to provide more variety
    const validProducts = products.filter(p => p.image && p.image !== '/placeholder.png' && !p.image.includes('placeholder'));
    const shuffled = [...validProducts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12).map(p => ({
      image: p.image,
      link: `/paperlisens/product/${p.productSlug}`
    }));
    setBannerItems(selected);
  }, []);

  const scrollCategories = (dir: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const { scrollLeft, clientWidth } = categoryScrollRef.current;
      const scrollTo = dir === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      categoryScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.image && p.image !== '/placeholder.png');

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      if (lowerQuery) {
        const queryTokens = lowerQuery.split(/\s+/);
        
        result = result.filter(p => {
          const productName = p.name.toLowerCase();
          // Check if EVERY query token matches SOME word in the product name (fuzzy or exact)
          return queryTokens.every(qToken => {
            // 1. Exact substring match
            if (productName.includes(qToken)) return true;
            
            // 2. Fuzzy match (Levenshtein distance)
            const productWords = productName.split(/\s+/);
            return productWords.some(pWord => {
              // Calculate Levenshtein distance for typo tolerance
              const lenDiff = Math.abs(pWord.length - qToken.length);
              if (lenDiff > 2) return false; // Optimization: length diff too big
              
              const matrix = [];
              for (let i = 0; i <= pWord.length; i++) matrix[i] = [i];
              for (let j = 0; j <= qToken.length; j++) matrix[0][j] = j;
              
              for (let i = 1; i <= pWord.length; i++) {
                for (let j = 1; j <= qToken.length; j++) {
                  if (pWord[i - 1] === qToken[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                  } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                  }
                }
              }
              
              const distance = matrix[pWord.length][qToken.length];
              // Allow 1 typo for words > 3 chars, 2 for > 6 chars
              if (qToken.length > 6) return distance <= 2;
              if (qToken.length > 3) return distance <= 1;
              return false;
            });
          });
        });
      }
    }
    
    const seen = new Set();
    result = result.filter(p => { const duplicate = seen.has(p.name); seen.add(p.name); return !duplicate; });
    return result;
  }, [searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  useEffect(() => { setVisibleCount(24); }, [searchQuery]);
  const loadMore = () => { setVisibleCount(prev => prev + 24); };

  const mobileBanners = [
    { image: '/paperlisens-banner-1.jpeg' },
    { image: '/paperlisens-banner-2.jpeg' },
    { image: '/paperlisens-banner-3.jpeg' },
    { image: '/paperlisens-banner-4.jpeg' },
    { image: '/paperlisens-banner-5.jpeg' },
    { image: '/paperlisens-banner-6.jpeg' },
    { image: '/paperlisens-banner-7.jpeg' },
    { image: '/paperlisens-banner-8.jpeg' },
    { image: '/paperlisens-banner-9.jpeg' },
    { image: '/paperlisens-banner-10.jpeg' },
    { image: '/paperlisens-banner-11.jpeg' }
  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <ResponsiveStyles />
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
      <header style={{ backgroundColor: '#40534c', padding: '16px 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens"><img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} /></Link>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input type="text" placeholder={pt('searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" style={{ width: '100%', padding: '10px 16px', borderRadius: '3px', border: 'none', fontSize: '14px', backgroundColor: 'white', color: '#1a3636', outline: 'none' }} />
            <button style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '40px', backgroundColor: '#1a3636', color: '#d6bd98', border: 'none', borderRadius: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon="material-symbols:search" style={{ fontSize: '20px', color: '#d6bd98' }} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher light />
            <div onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer', color: '#d6bd98' }}>
              <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: '#d6bd98' }} />
              {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#d6bd98', color: '#40534c', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        <div className="hero-banner-container" style={{ marginBottom: '24px' }}>
          <div className="main-banner-area" style={{ height: isLargeMobile ? '240px' : '400px', borderRadius: '6px', backgroundColor: isLargeMobile ? '#e0e0e0' : 'transparent', overflow: isLargeMobile ? 'hidden' : 'visible', border: isLargeMobile ? 'none' : 'none' }}>
             {isLargeMobile ? (
               <BannerSlider items={mobileBanners} imageFit="cover" />
             ) : (
               <DesktopBannerSlider items={bannerItems} />
             )}
          </div>
        </div>
        <h2 className="section-title" style={{ fontSize: '20px', fontWeight: 'bold', color: '#40534c', marginBottom: '20px', textAlign: 'center' }}>{pt('ourCategories')}</h2>
        <div style={{ position: 'relative' }}>
            <button className="category-nav-btn left" onClick={() => scrollCategories('left')} style={{ display: 'none' }}><Icon icon="mdi:chevron-left" width="20" /></button>
            <div className="category-grid" ref={categoryScrollRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div className="category-card-wrapper"><CategoryCard title={pt('categories.paperTray')} image="/paperlisens%20papertray.png" slug="paper-tray" /></div>
                <div className="category-card-wrapper"><CategoryCard title={pt('categories.boxTakeaway')} image="/paperlisens%20box%20takeaway.png" slug="box-take-away" /></div>
                <div className="category-card-wrapper"><CategoryCard title={pt('categories.tempatPensil')} image="/paperlisens%20tempat%20pensil.png" slug="tempat-pensil" /></div>
                <div className="category-card-wrapper"><CategoryCard title={pt('categories.boxCupcake')} image="/paperlisens%20cupcake.png" slug="box-cupcake" /></div>
                <div className="category-card-wrapper"><CategoryCard title={pt('categories.lainLain')} image="/angpao%20karakter.jpeg" slug="lain-lain" /></div>
            </div>
            <button className="category-nav-btn right" onClick={() => scrollCategories('right')} style={{ display: 'none' }}><Icon icon="mdi:chevron-right" width="20" /></button>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <div style={{ padding: '16px', borderBottom: '4px solid #40534c' }}><h2 style={{ fontSize: '18px', fontWeight: '500', color: '#40534c' }}>{searchQuery ? pt('searchResults') : pt('recommendation')}</h2></div>
          <div style={{ padding: '20px' }}>
            {displayedProducts.length > 0 ? (
              <div className="product-grid">{displayedProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <Icon icon="mdi:emoticon-sad-outline" style={{ fontSize: '48px', marginBottom: '16px', color: '#999' }} />
                <p>{pt('noProductsFound')}</p>
              </div>
            )}
            {filteredProducts.length > visibleCount && <div style={{ textAlign: 'center', marginTop: '32px' }}><button onClick={loadMore} style={{ padding: '12px 32px', backgroundColor: '#40534c', color: '#d6bd98', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>{pt('loadMore')}</button></div>}
          </div>
        </div>

        {/* Gallery Section - Hidden when searching */}
        {!searchQuery && (
        <div style={{ marginTop: '40px', backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <div style={{ padding: '16px', borderBottom: '4px solid #40534c' }}><h2 style={{ fontSize: '18px', fontWeight: '500', color: '#40534c' }}>{pt('galleryTitle')}</h2></div>
          <div style={{ padding: '20px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: '12px',
              gridAutoRows: '150px' 
            }}>
              {galleryImages.map((img, index) => (
                <div key={index} style={{ 
                  position: 'relative', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  gridRow: index % 3 === 0 ? 'span 2' : 'span 1', // Simple masonry effect
                  backgroundColor: '#f9fafb'
                }}>
                  <Image 
                    src={img} 
                    alt={`Gallery ${index + 1}`} 
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    style={{ objectFit: 'cover' }}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

      </main>
      <Footer />
    </div>
  );
}