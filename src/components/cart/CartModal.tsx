'use client';

import { useCart } from '../../context/CartContext';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

export default function CartModal() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();

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
    const itemsList = cartItems.map((item, index) => 
      `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('\n');

    const message = `Halo Paperlisens, saya ingin memesan:\n\n${itemsList}\n\n*Total Belanja:* Rp ${cartTotal.toLocaleString('id-ID')}\n\nMohon info ketersediaan stok dan total ongkir. Terima kasih.`;
    
    window.open(`https://wa.me/6281260001487?text=${encodeURIComponent(message)}`, '_blank');
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
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      {/* Overlay Click to Close */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Modal Content (Right Drawer) */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        height: '100%',
        position: 'relative',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Keranjang Belanja</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
              <Icon icon="material-symbols:shopping-cart-off-outline" width="48" style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>Keranjang Anda kosong.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                  <div style={{ width: '60px', height: '60px', flexShrink: 0, backgroundColor: '#f9f9f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '500', lineHeight: '1.4', maxHeight: '36px', overflow: 'hidden' }}>{item.name}</h4>
                    <div style={{ color: '#ee4d2d', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ width: '32px', textAlign: 'center', fontSize: '13px' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                      >
                        <Icon icon="mdi:trash-can-outline" width="18" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9f9f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span style={{ color: '#ee4d2d' }}>Rp {cartTotal.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={handleCheckout}
              style={{ 
                width: '100%', 
                backgroundColor: '#ee4d2d', 
                color: 'white', 
                border: 'none', 
                padding: '12px', 
                borderRadius: '4px', 
                fontSize: '16px', 
                fontWeight: '600', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Icon icon="mdi:whatsapp" width="20" /> Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
