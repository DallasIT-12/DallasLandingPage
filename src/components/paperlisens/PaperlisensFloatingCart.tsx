'use client';

import { useCart } from '@/context/CartContext';
import { Icon } from '@iconify/react';
import ProductQuickView from '@/components/product/ProductQuickView';

interface PaperlisensFloatingCartProps {
  quickViewProduct?: any;
  setQuickViewProduct?: (p: any) => void;
}

export default function PaperlisensFloatingCart({
  quickViewProduct,
  setQuickViewProduct
}: PaperlisensFloatingCartProps) {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div onClick={() => setIsCartOpen(true)} style={{
          position: 'fixed', 
          bottom: '96px', 
          right: '24px',
          width: '56px', 
          height: '56px', 
          borderRadius: '50%',
          backgroundColor: '#40534c', 
          color: '#d6bd98',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(64,83,76,0.4)',
          cursor: 'pointer', 
          zIndex: 999,
          animation: 'bounceIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)'
        }}>
          <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px' }} />
          <span style={{
            position: 'absolute', 
            top: '-4px', 
            right: '-4px',
            backgroundColor: '#d6bd98', 
            color: '#40534c',
            fontSize: '10px', 
            fontWeight: '900', 
            borderRadius: '50%',
            width: '20px', 
            height: '20px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px solid white'
          }}>{cartCount}</span>
        </div>
      )}

      {/* Product Quick View */}
      {setQuickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct} 
          isOpen={!!quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}

      <style jsx global>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
