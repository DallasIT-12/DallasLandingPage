'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { getSmartTranslation } from '@/utils/productTranslations';

interface ProductQuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const locale = useLocale();
  const pt = useTranslations('Paperlisens');
  
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(null);
      setQuantity(1);
      setCurrentImageIndex(0);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }
  }, [product]);

  // Must be above early return — Rules of Hooks
  const variants = product?.variants || [];

  const allImages = useMemo(() => {
    if (!product) return [];
    const list = [product.image];
    if (Array.isArray(product.images)) {
      product.images.forEach((img: string) => {
        if (img && img !== product.image) list.push(img);
      });
    }
    variants.forEach((v: any) => {
      if (v.image && !list.includes(v.image) && !v.image.includes('placeholder')) {
        list.push(v.image);
      }
    });
    return list.filter(img => img && !img.includes('placeholder'));
  }, [product, variants]);

  if (!product || !isOpen) return null;

  const getLocalized = (item: any, field: string) => {
    // @ts-ignore
    const specificTranslation = item[`${field}_${locale}`];
    if (specificTranslation) return specificTranslation;
    return getSmartTranslation(item[field], locale);
  };

  const name = getLocalized(product, 'name');
  
  // Use variant price/image if selected, else base product
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayImage = selectedVariant?.image || product.image;

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      setCurrentImageIndex(index);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, true); // true to clear cart or just add
    router.push('/paperlisens/checkout');
    onClose();
  };

  const discountPercent = 10; // Placeholder or calculate
  const markupPrice = Math.ceil(displayPrice / (1 - (discountPercent / 100)));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 4000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
    }}>
      {/* Overlay Click to Close */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
        onClick={onClose}
      />

      {/* Modal Content (Bottom Sheet) */}
      <div style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        backgroundColor: 'white',
        maxHeight: '90vh',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px 24px 0 0',
        animation: 'slideInUp 0.4s cubic-bezier(0, 0.55, 0.45, 1)',
        overflow: 'hidden'
      }}>
        {/* Drag Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }} />
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>
          
          {/* Close Button */}
          <button onClick={onClose} style={{ position: 'absolute', right: '16px', top: '16px', background: '#f3f4f6', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', zIndex: 10 }}>
            <Icon icon="mdi:close" width="20" />
          </button>

          {/* Image Swiper */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                borderRadius: '16px',
                aspectRatio: '1/1',
                backgroundColor: '#f9fafb'
              }}
            >
              {allImages.map((img, idx) => (
                <div key={idx} style={{ minWidth: '100%', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
            
            {/* Dots */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
                {allImages.map((_, idx) => (
                  <div key={idx} style={{ width: currentImageIndex === idx ? '16px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: currentImageIndex === idx ? '#40534c' : '#d1d5db', transition: 'all 0.3s' }} />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1a3636', marginBottom: '8px', lineHeight: '1.4' }}>{name}</h2>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '24px', fontWeight: '900', color: '#40534c' }}>Rp {displayPrice.toLocaleString('id-ID')}</span>
            <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#9ca3af' }}>Rp {markupPrice.toLocaleString('id-ID')}</span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#d6bd98', backgroundColor: '#40534c', padding: '2px 6px', borderRadius: '4px' }}>{discountPercent}% OFF</span>
          </div>

          {/* Variants */}
          {variants.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: '800', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pilih Varian:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: selectedVariant?.id === v.id ? '2px solid #40534c' : '1px solid #e5e7eb',
                      backgroundColor: selectedVariant?.id === v.id ? '#f0fdf4' : 'white',
                      color: selectedVariant?.id === v.id ? '#40534c' : '#374151',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {getLocalized(v, 'variant_name') || v.variant_name || 'Standard'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', fontWeight: '800', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jumlah:</p>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '12px', width: 'fit-content', overflow: 'hidden' }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px', color: '#1a3636' }}
              >
                -
              </button>
              <span style={{ width: '50px', textAlign: 'center', fontSize: '16px', fontWeight: '800', color: '#1a3636' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px', color: '#1a3636' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Full Link */}
          <Link 
            href={`/paperlisens/product/${product.productSlug}`}
            onClick={onClose}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              color: '#40534c', textDecoration: 'none', fontSize: '14px', fontWeight: '700',
              padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', marginBottom: '20px'
            }}
          >
            Lihat Detail Lengkap <Icon icon="mdi:chevron-right" width="18" />
          </Link>
        </div>

        {/* Footer Actions */}
        <div style={{ 
          position: 'absolute', bottom: 0, left: 0, width: '100%', 
          padding: '16px 20px 24px', backgroundColor: 'white', 
          borderTop: '1px solid #f3f4f6', display: 'flex', gap: '12px',
          boxShadow: '0 -10px 20px rgba(0,0,0,0.02)'
        }}>
          <button 
            onClick={handleAddToCart}
            style={{ 
              flex: 1, backgroundColor: 'white', color: '#40534c', 
              border: '2px solid #40534c', padding: '16px', borderRadius: '16px', 
              fontSize: '15px', fontWeight: '800', cursor: 'pointer'
            }}
          >
            + Keranjang
          </button>
          <button 
            onClick={handleBuyNow}
            style={{ 
              flex: 1.5, backgroundColor: '#40534c', color: '#d6bd98', 
              border: 'none', padding: '16px', borderRadius: '16px', 
              fontSize: '15px', fontWeight: '800', cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(64,83,76,0.2)'
            }}
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
