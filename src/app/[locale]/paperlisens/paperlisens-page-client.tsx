'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { useCart } from '@/context/CartContext';
import { useTranslations, useLocale } from 'next-intl';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { getSmartTranslation } from '@/utils/productTranslations';

// --- Desktop Banner Slider Component ---
const DesktopBannerSlider = ({ items }: { items: { image: string, link?: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const pt = useTranslations('Paperlisens');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => { setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1)); }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const next = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) next();
    else if (distance < -minSwipeDistance) prev();
  };

  if (items.length === 0) return null;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
      {items.length > visibleCount && (
        <>
          <button onClick={prev} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#1a3636', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Icon icon="mdi:chevron-left" style={{ fontSize: '24px' }} />
          </button>
          <button onClick={next} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#1a3636', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Icon icon="mdi:chevron-right" style={{ fontSize: '24px' }} />
          </button>
        </>
      )}
      {/* Dot indicators */}
      {items.length > visibleCount && (
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: currentIndex === i ? '20px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: currentIndex === i ? '#d6bd98' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Responsive Styles ---
const ResponsiveStyles = () => (
  <style>{`
    @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    .product-card { position: relative; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); height: 100%; display: flex; flex-direction: column; animation: fadeInUp 0.5s ease forwards; }
    .product-card:hover { box-shadow: 0 16px 40px -8px rgba(64, 83, 76, 0.2); transform: translateY(-4px); border-color: #d6bd98; }
    .card-image-wrapper { position: relative; width: 100%; padding-top: 100%; background-color: #f9fafb; overflow: hidden; }
    .card-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .product-card:hover .card-image { transform: scale(1.06); }
    .card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(26,54,54,0.9) 0%, rgba(26,54,54,0.4) 50%, transparent 100%); opacity: 0; transition: opacity 0.35s ease; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding: 16px; text-align: center; z-index: 10; }
    .product-card:hover .card-overlay { opacity: 1; }
    .card-info { padding: 14px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; color: #1a3636; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; width: 100%; }

    .skeleton-card { border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid #e5e7eb; }
    .skeleton-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.5s infinite linear; }
    .skeleton-line { height: 14px; border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.5s infinite linear; margin-bottom: 8px; }

    .banner-grid-item { position: relative; overflow: hidden; border-radius: 12px; background-color: #fff; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; }
    .banner-grid-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .banner-grid-item:hover img { transform: scale(1.05); }
    .banner-grid-overlay { position: absolute; bottom: 12px; left: 12px; z-index: 2; }
    .banner-grid-tag { background: rgba(26,54,54,0.85); backdrop-filter: blur(8px); color: #d6bd98; padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
    .gallery-image { transition: transform 0.4s ease; border-radius: 10px; }
    .gallery-image:hover { transform: scale(1.05); }

    .category-card { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
    .category-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -8px rgba(0,0,0,0.2); }
    .category-card:hover img { transform: scale(1.08); }
    .category-card img { transition: transform 0.5s ease; }

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
      .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
      .card-overlay { opacity: 0 !important; }
    }
  `}</style>
);

// --- Category Card Component ---
const CategoryCard = ({ title, image, slug }: { title: string; image: string; slug: string }) => (
  <Link href={`/paperlisens/category/${slug}`} style={{ textDecoration: 'none' }}>
    <div className="category-card" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px 16px', background: 'linear-gradient(to top, rgba(26, 54, 54, 0.9) 0%, rgba(26,54,54,0.4) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '70%' }}>
        <span style={{ color: '#d6bd98', fontWeight: '700', textAlign: 'center', fontSize: '15px', letterSpacing: '0.3px' }}>{title}</span>
        <span style={{ color: 'rgba(214,189,152,0.6)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lihat →</span>
      </div>
    </div>
  </Link>
);

// --- ProductCard Component ---
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const pt = useTranslations('Paperlisens');
  const locale = useLocale();

  // Helper to get localized field with fallback
  const getLocalized = (field: string) => {
    // @ts-ignore
    const specificTranslation = product[`${field}_${locale}`];
    if (specificTranslation) return specificTranslation;
    return getSmartTranslation(product[field], locale);
  };

  const productName = getLocalized('name');
  const productVariant = getLocalized('variant');
  const displayImage = (product.image && product.image !== '/placeholder.png' && !product.image.includes('placeholder'))
    ? product.image
    : (product.images?.[0] || product.image || '/placeholder.png');

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
          <Image
            src={displayImage}
            alt={productName}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="card-image"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
          <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#d6bd98', padding: '4px 8px', textAlign: 'center', zIndex: 2 }}>
            <div style={{ color: '#1a3636', fontSize: '12px', fontWeight: 'bold' }}>{discountPercent}%</div>
            <div style={{ color: '#40534c', fontSize: '10px', fontWeight: 'bold' }}>OFF</div>
          </div>
          <div className="card-overlay">
            <button onClick={(e) => { e.preventDefault(); addToCart(product, 1); }} style={{ backgroundColor: 'rgba(214,189,152,0.95)', color: '#1a3636', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', width: '100%', marginBottom: '8px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.3px' }}>{pt('addToCart')}</button>
            <button onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/6281260001487?text=Halo%20Paperlisens,%20saya%20mau%20pesan%20${productName}`, '_blank'); }} style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '12px', fontWeight: '600' }}>{pt('orderWa')}</button>
          </div>
        </div>
        <div className="card-info">
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <div style={{ fontSize: '10px', color: '#40534c', border: '1px solid #40534c', display: 'inline-block', padding: '1px 4px', borderRadius: '4px', fontWeight: 'bold' }}>{product.category || 'Paperlisens'}</div>
              {productVariant && (
                <div style={{ fontSize: '10px', color: '#677d6a', backgroundColor: '#f3f4f6', display: 'inline-block', padding: '1px 4px', borderRadius: '4px' }}>{productVariant}</div>
              )}
            </div>
            <h3 style={{ fontSize: '14px', lineHeight: '1.4', height: '40px', overflow: 'hidden', marginBottom: '8px', fontWeight: '500', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{productName}</h3>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ minWidth: 0, flexShrink: 0 }}>
              <span style={{ fontSize: '10px', textDecoration: 'line-through', color: '#9ca3af', display: 'block' }}>Rp {markupPrice.toLocaleString('id-ID')}</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#40534c' }}>Rp {product.price.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#677d6a', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 1, minWidth: 0, overflow: 'hidden' }}>
              <Icon icon="material-symbols:star" style={{ color: '#d6bd98', fontSize: '12px', marginRight: '2px', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.sold} {pt('sold')}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};



export default function PaperlisensPageClient() {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [bannerItems, setBannerItems] = useState<{ image: string; link?: string }[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/paperlisens/products')
      .then(res => res.ok ? res.json() : [])
      .then(data => { setProducts(Array.isArray(data) ? data : []); })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  useEffect(() => {
    const checkScreenSize = () => { setIsLargeMobile(window.innerWidth < 768); };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const validProducts = products.filter(p => p && (p.image || p.images?.[0]));
    const seenNames = new Set();
    const uniqueProducts = validProducts.filter(p => {
      const isDuplicate = seenNames.has(p.name);
      seenNames.add(p.name);
      return !isDuplicate;
    });
    const shuffled = [...uniqueProducts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12).map(p => {
      const img = (p.image && p.image !== '/placeholder.png') ? p.image : (p.images?.[0] || p.image);
      return { image: img, link: `/paperlisens/product/${p.productSlug}` };
    });
    setBannerItems(selected);
  }, [products]);

  const scrollCategories = (dir: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const { scrollLeft, clientWidth } = categoryScrollRef.current;
      const scrollTo = dir === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      categoryScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    // Include all products (even with placeholder) so recommendation is never empty
    let result = products.filter(p => p && (p.image || (p.images && p.images?.length > 0)));

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
            return productWords.some((pWord: string) => {
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
  }, [searchQuery, products]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  useEffect(() => { setVisibleCount(24); }, [searchQuery]);
  const loadMore = () => { setVisibleCount(prev => prev + 24); };

  if (productsLoading) {
    return (
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <ResponsiveStyles />
        <div style={{ backgroundColor: '#40534c', padding: '16px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ width: '100px', height: '40px', borderRadius: '8px' }} className="skeleton-line" />
            <div style={{ flex: 1, height: '40px', borderRadius: '8px' }} className="skeleton-line" />
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
          <div style={{ height: '300px', borderRadius: '12px', marginBottom: '32px' }} className="skeleton-img" />
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div style={{ padding: '14px' }}>
                  <div className="skeleton-line" style={{ width: '60%' }} />
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line" style={{ width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <a href="https://www.instagram.com/paperlisens22" target="_blank" style={{ color: '#1a3636' }}><Icon icon="mdi:instagram" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" style={{ color: '#1a3636' }}><Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} /></a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" style={{ color: '#1a3636' }}><Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} /></a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" style={{ color: '#1a3636' }}><Icon icon="mdi:facebook" style={{ fontSize: '18px' }} /></a>
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
          <div className="main-banner-area" style={{ height: isLargeMobile ? '240px' : '400px', borderRadius: '6px', backgroundColor: 'transparent', overflow: 'visible', border: 'none' }}>
            <DesktopBannerSlider items={bannerItems} />
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



      </main>
      <Footer />
    </div>
  );
}
