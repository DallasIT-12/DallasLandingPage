'use client';

import { useState, use, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/routing';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products'; // Import centralized products
import { useTranslations } from 'next-intl';
import Footer from '@/components/layout/Footer';

// --- Responsive Styles & Navbar (Consistent with other pages) ---
const Styles = () => (
  <style>{`
    .gallery-container {
      display: flex; /* Use flexbox for desktop */
      flex-direction: column; /* Stack main image and thumbnails */
      gap: 16px;
    }
    .thumbnail-list {
      display: flex;
      flex-direction: row; /* Always horizontal */
      gap: 12px;
      overflow-x: auto; /* Always horizontally scrollable */
      scrollbar-width: none; /* Hide scrollbar for Firefox */
      -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
      padding-bottom: 8px; /* Give some space for potential scrollbar */
      justify-content: center; /* Center thumbnails when not overflowing */
    }
    .thumbnail-list::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
    }
    .thumbnail {
      width: 80px;
      height: 80px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      cursor: pointer;
      object-fit: cover;
      flex-shrink: 0; /* Prevent thumbnails from shrinking */
    }
    .thumbnail.active {
      border-color: #ee4d2d;
    }
    .main-image {
      width: 100%;
      height: 450px;
      object-fit: contain; /* Changed to contain to show full image */
      object-position: center center; /* Centered */
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }
    .thumbnail.active {
      border-color: #ee4d2d;
    }
    .main-image {
      width: 100%;
      height: 450px;
      object-fit: contain; /* Changed to contain to show full image */
      object-position: center center; /* Centered */
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }

    .tab-nav {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 24px;
    }
    .tab-item {
      padding: 12px 24px;
      cursor: pointer;
      font-weight: 500;
      color: #555;
      border-bottom: 2px solid transparent;
    }
    .tab-item.active {
      color: #ee4d2d;
      border-bottom-color: #ee4d2d;
    }

    @media (max-width: 768px) {
      .gallery-container {
        grid-template-columns: 1fr;
      }
      .thumbnail-list {
        flex-direction: row;
        order: 2;
        justify-content: center; /* Center thumbnails on mobile */
      }
      .main-image-wrapper {
        order: 1;
      }
      .main-image {
        height: 300px;
        object-fit: contain; /* Changed to contain for mobile */
        object-position: center center; /* Centered for mobile */
      }
      .top-bar-text, .top-bar-separator {
         display: none;
      }
      .header-container {
         gap: 16px !important;
      }
      .header-logo {
         height: 32px !important;
      }
    }
  `}</style>
);

// --- Recommendation Card ---
const ProductCard = ({ product }: { product: any }) => {
  const pt = useTranslations('Paperlisens');
  return (
    <Link href={`/paperlisens/product/${product.productSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', minWidth: '200px' }}>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', height: '100%', cursor: 'pointer', transition: 'transform 0.2s' }}>
        <div style={{ height: '180px', backgroundColor: '#f9f9f9' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{product.name}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#ee4d2d', fontWeight: 'bold' }}>Rp {product.price.toLocaleString('id-ID')}</span>
            <span style={{ fontSize: '11px', color: '#888' }}>{product.sold} {pt('sold')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Product Slider Component ---
const ProductSlider = ({ title, products }: { title: string, products: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    // Check on mount and resize
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [products]); // Re-check if products change

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ marginBottom: '40px', position: 'relative' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', marginBottom: '16px' }}>{title}</h3>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Nav Buttons (conditionally rendered) */}
        {isScrollable && (
          <>
            <button 
              onClick={() => scroll('left')}
              style={{
                position: 'absolute', left: '-20px', zIndex: 10, background: 'white', border: '1px solid #ddd',
                borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Icon icon="mdi:chevron-left" fontSize="24px" />
            </button>

            <button 
              onClick={() => scroll('right')}
              style={{
                position: 'absolute', right: '-20px', zIndex: 10, background: 'white', border: '1px solid #ddd',
                borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Icon icon="mdi:chevron-right" fontSize="24px" />
            </button>
          </>
        )}

        <div 
          ref={scrollRef}
          className="no-scrollbar"
          style={{ 
            display: 'flex', gap: '16px', overflowX: 'auto', scrollBehavior: 'smooth',
            padding: '10px 4px', scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}
        >
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

// --- Description Formatter ---
const DescriptionFormatter = ({ text }: { text: string }) => {
  if (!text) return null;

  // Split by newlines
  const lines = text.split('\n');
  
  return (
    <div className="description-content" style={{ lineHeight: '1.8' }}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={index} />;
        
        // Check for list items (starting with - or • or number like "1.")
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
           return (
             <div key={index} style={{ display: 'flex', marginLeft: '8px' }}>
               <span style={{ marginRight: '8px' }}>•</span>
               <span>{trimmed.substring(2)}</span>
             </div>
           );
        }
        
        // Simple headers (all caps and short) could be bold
        if (trimmed === trimmed.toUpperCase() && trimmed.length < 50 && trimmed.length > 3) {
            return <p key={index} style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>{trimmed}</p>;
        }

        return <p key={index} style={{ marginBottom: '8px' }}>{trimmed}</p>;
      })}
    </div>
  );
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations();
  const pt = useTranslations('Paperlisens');
  const { slug } = use(params);
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find the product from centralized data using productSlug instead of ID
  // Update: Try finding by productSlug first, fallback to finding by ID
  const initialProduct = products.find(p => p.productSlug === slug) || products.find(p => p.id === slug);

  // State to track the currently selected variant (defaults to the one from the URL)
  const [selectedVariant, setSelectedVariant] = useState(initialProduct);
  
  // Fallback if product not found (e.g., 404 page or redirect)
  if (!selectedVariant) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>{pt('productNotFoundDetail')}</h2>
        <Link href="/paperlisens" style={{ color: '#ee4d2d', textDecoration: 'underline' }}>{pt('returnToShop')}</Link>
      </div>
    );
  }
  // VARIATION LOGIC: Find all siblings that share the same base ID prefix
  // e.g. 'pt-001-1' and 'pt-001-2' share base 'pt-001'
  const currentBaseId = selectedVariant.id.replace(/-\d+$/, '');
  const variations = products.filter(p => p.id.replace(/-\d+$/, '') === currentBaseId);

  // Normalize product data (add defaults for missing fields to match UI requirements)
  const product = {
    ...selectedVariant,
    // Use the 'images' array if available, otherwise wrap 'image' in an array as fallback
    images: selectedVariant.images && selectedVariant.images.length > 0 ? selectedVariant.images : [selectedVariant.image],
    rating: 4.9,
    reviewCount: 128,
    originalPrice: Math.ceil(selectedVariant.price * 1.15), // Mock original price (15% markup)
    stock: 150,
    weight: '1000 gr',
  };
  
  // --- Recommendation Logic ---
  // 1. Filter out the current product itself
  // 2. Filter out products without images
  // 3. Deduplicate by Name (treat same-name items as variants)
  const uniqueProducts = products
    .filter(p => p.id !== product.id && p.image && p.image !== '/placeholder.png')
    .filter((p, index, self) => 
      index === self.findIndex(t => t.name === p.name)
    );

  // 4. Shuffle to show variety (Fisher-Yates shuffle)
  const shuffled = [...uniqueProducts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const relatedProducts = shuffled.slice(0, 8).map(p => ({
    ...p,
    id: p.id // Ensure ID is used
  }));

  const otherProducts = shuffled.slice(8, 16).map(p => ({
    ...p,
    id: p.id // Ensure ID is used
  }));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo Paperlisens, saya ingin memesan:
*Produk:* ${product.name}
*Jumlah:* ${quantity}
*Total Harga:* Rp ${(product.price * quantity).toLocaleString('id-ID')}

Mohon info ketersediaan stok. Terima kasih.`;
    
    window.open(`https://wa.me/6281260001487?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Helper to extract clean variant name
  const getVariantName = (p: any) => {
      return p.variant || 'Standard';
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Styles />
      
      {/* ===== TOP BAR (Consistent) ===== */}
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

      {/* ===== HEADER (Consistent) ===== */}
      <header style={{ backgroundColor: '#ee4d2d', padding: '16px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens">
            <img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div style={{ flexGrow: 1 }}>
             <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', color: '#888', fontSize: '14px' }}>
               {pt('searchPlaceholder')}
             </div>
          </div>
          
          {/* Cart Icon with Count */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: 'white' }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'white', color: '#ee4d2d',
                fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        
        {/* BREADCRUMB */}
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '16px', display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Link href="/paperlisens" style={{ textDecoration: 'none', color: '#ee4d2d', flexShrink: 0 }}>{pt('home')}</Link>
          <span style={{ margin: '0 8px', flexShrink: 0 }}>&gt;</span>
          <Link href={`/paperlisens/category/${product.slug}`} style={{ textDecoration: 'none', color: '#ee4d2d', flexShrink: 0 }}>{product.category}</Link>
          <span style={{ margin: '0 8px', flexShrink: 0 }}>&gt;</span>
          <span style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '400px'
          }}>
            {product.name}
          </span>
        </div>

        {/* PRODUCT MAIN SECTION */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* LEFT: GALLERY */}
            <div className="gallery-container">
              <div className="main-image-wrapper">
                <img src={product.images[selectedImage]} className="main-image" alt={product.name} />
              </div>
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                    alt={`Thumb ${idx}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: INFO & ACTIONS */}
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '500', color: '#333', lineHeight: '1.4', marginBottom: '12px' }}>{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ee4d2d', borderBottom: '1px solid #ee4d2d', paddingBottom: '1px' }}>
                  <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{product.rating}</span>
                  <Icon icon="material-symbols:star" />
                </div>
                <div style={{ height: '20px', width: '1px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ fontSize: '14px', color: '#757575' }}>{product.reviewCount} {pt('rating')}</div>
                <div style={{ height: '20px', width: '1px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ fontSize: '14px', color: '#757575' }}>{product.sold} {pt('sold')}</div>
              </div>

              <div style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
                 <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px', marginBottom: '4px' }}>Rp {product.originalPrice.toLocaleString('id-ID')}</div>
                 <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ee4d2d' }}>Rp {product.price.toLocaleString('id-ID')}</div>
              </div>

              {/* VARIATION SELECTOR (Only if multiple variants exist) */}
              {variations.length > 1 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', color: '#757575', marginBottom: '8px' }}>{pt('selectVariant')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {variations.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                            setSelectedVariant(v);
                            setSelectedImage(0); // Reset gallery to first image of new variant
                        }}
                        style={{
                          padding: '8px 16px',
                          border: selectedVariant.id === v.id ? '1px solid #ee4d2d' : '1px solid #e0e0e0',
                          backgroundColor: selectedVariant.id === v.id ? '#fff' : '#fff',
                          color: selectedVariant.id === v.id ? '#ee4d2d' : '#333',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {getVariantName(v)}
                        {selectedVariant.id === v.id && (
                           <div style={{
                               position: 'absolute', bottom: 0, right: 0, width: 0, height: 0, 
                               borderStyle: 'solid', borderWidth: '0 0 10px 10px', 
                               borderColor: 'transparent transparent #ee4d2d transparent'
                           }}>
                               <Icon icon="material-symbols:check-small" style={{ color: 'white', position: 'absolute', bottom: '-11px', right: '-2px', fontSize: '10px' }} />
                           </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '24px', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                {/* Description moved to tab */}
              </div>

              {/* QUANTITY */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span style={{ color: '#757575', fontSize: '14px' }}>{pt('quantity')}</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }}>-</button>
                  <input type="text" value={quantity} readOnly style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none' }} />
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ color: '#757575', fontSize: '12px' }}>{pt('available', { count: product.stock })}</span>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleAddToCart}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    backgroundColor: 'rgba(238, 77, 45, 0.1)', 
                    color: '#ee4d2d', 
                    border: '1px solid #ee4d2d', 
                    borderRadius: '4px', 
                    fontWeight: '500', 
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  <Icon icon="material-symbols:add-shopping-cart" /> {pt('addToCart')}
                </button>
                
                <button 
                  onClick={handleWhatsAppOrder}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    backgroundColor: '#ee4d2d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontWeight: '500', 
                    cursor: 'pointer' 
                  }}
                >
                  {pt('orderNow')}
                </button>

                <button style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0', borderRadius: '4px', background: 'white', cursor: 'pointer' }} title="Bandingkan">
                   <Icon icon="material-symbols:compare-arrows" style={{ fontSize: '20px', color: '#555' }} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', marginBottom: '24px' }}>
           <div className="tab-nav" style={{ 
             display: 'flex', 
             borderBottom: '1px solid #e5e7eb', 
             marginBottom: '24px',
             overflowX: 'auto', /* Enable horizontal scrolling */
             WebkitOverflowScrolling: 'touch', /* Smooth scrolling on iOS */
             scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
             msOverflowStyle: 'none' /* Hide scrollbar for IE/Edge */
           }}>
             {['deskripsi', 'info', 'review', 'pengiriman'].map(tab => (
               <div 
                 key={tab} 
                 className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                 onClick={() => setActiveTab(tab)}
                 style={{flexShrink: 0}} /* Prevent items from shrinking */
               >
                 {pt(tab)}
               </div>
             ))}
           </div>
           
           <div style={{ padding: '0 12px', lineHeight: '1.6', color: '#333' }}>
              {activeTab === 'deskripsi' && (
                <div>
                  <DescriptionFormatter text={product.description} />
                </div>
              )}
              {activeTab === 'info' && (
                <div style={{color: '#555'}}>
                  <p><strong>{pt('weight')}:</strong> {product.weight}</p>
                  <p><strong>{pt('category')}:</strong> {product.category || 'General'}</p>
                  <p><strong>{pt('etalase')}:</strong> {pt('storefrontPremium')}</p>
                </div>
              )}
              {activeTab === 'review' && (
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                     <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{product.rating}</div>
                     <div>
                       <div style={{ color: '#ee4d2d' }}>★★★★★</div>
                       <div style={{ fontSize: '0.875rem', color: '#757575' }}>{pt('reviewsCount', {count: product.reviewCount})}</div>
                     </div>
                   </div>
                   {/* Dummy Reviews */}
                   {[1, 2].map(i => (
                     <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
                       <div style={{ fontWeight: '600', marginBottom: '4px' }}>User {i}</div>
                       <div style={{ color: '#ee4d2d', fontSize: '0.8rem', marginBottom: '8px' }}>★★★★★</div>
                       <p style={{ color: '#555' }}>{pt('dummyReview')}</p>
                     </div>
                   ))}
                 </div>
              )}
              {activeTab === 'pengiriman' && (
                <div style={{ color: '#555'}}>
                  <p>{pt('shippingInfo.from')}</p>
                  <p>{pt('shippingInfo.couriers')}</p>
                  <p>{pt('shippingInfo.deadline')}</p>
                </div>
              )}
           </div>
        </div>

        {/* RECOMMENDATIONS */}
        <ProductSlider title={pt('relatedProducts')} products={relatedProducts} />
        <ProductSlider title={pt('youMayAlsoLike')} products={otherProducts} />

      </main>
      <Footer />
    </div>
  );
}
