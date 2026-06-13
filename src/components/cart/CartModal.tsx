'use client';

import { useCart } from '../../context/CartContext';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';

export default function CartModal() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const router = useRouter();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/paperlisens/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 3000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      {/* Overlay Click to Close */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Modal Content (Bottom Sheet) */}
      <div style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        backgroundColor: 'white',
        maxHeight: '85vh',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px 24px 0 0',
        animation: 'slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}>
        {/* Drag Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', backgroundColor: '#d1d5db' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '8px 24px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1a3636' }}>Keranjang Belanja</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            <Icon icon="mdi:close" width="20" />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#fff' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: '60px 0' }}>
              <div style={{ backgroundColor: '#f9fafb', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon icon="material-symbols:shopping-cart-off-outline" width="40" style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>Keranjang Anda kosong.</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>Ayo tambahkan produk menarik sekarang!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f9fafb', paddingBottom: '20px' }}>
                  <div style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: '#f9f9f9', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1a3636', lineHeight: '1.4', maxHeight: '40px', overflow: 'hidden' }}>{item.name}</h4>
                    {item.variantName && (
                      <div style={{ fontSize: '11px', color: '#40534c', marginBottom: '8px', backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', display: 'inline-block', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                        {item.variantName}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ color: '#40534c', fontWeight: '800', fontSize: '16px' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', height: '32px' }}>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{ width: '32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#1a3636' }}
                          >
                            -
                          </button>
                          <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontWeight: '700', borderLeft: '1.5px solid #e5e7eb', borderRight: '1.5px solid #e5e7eb', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ width: '32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#1a3636' }}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                        >
                          <Icon icon="mdi:trash-can-outline" width="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 -4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Total Pembayaran:</span>
              <span style={{ color: '#1a3636', fontSize: '24px', fontWeight: '900' }}>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            
            <div style={{ display: 'flex' }}>
              <button 
                onClick={handleCheckout}
                style={{ 
                  flex: 1, backgroundColor: '#40534c', color: '#d6bd98', 
                  border: 'none', padding: '16px', borderRadius: '16px', 
                  fontSize: '16px', fontWeight: '900', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '12px', transition: 'all 0.2s', textTransform: 'uppercase',
                  letterSpacing: '1px', boxShadow: '0 8px 24px rgba(64,83,76,0.25)'
                }}
              >
                Checkout <Icon icon="mdi:arrow-right" width="20" />
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slideInUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
