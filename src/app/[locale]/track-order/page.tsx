'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: 'rgba(251,191,36,0.1)', text: '#d97706', label: 'Menunggu Pembayaran' },
  paid: { bg: 'rgba(16,185,129,0.1)', text: '#059669', label: 'Sudah Dibayar' },
  processing: { bg: 'rgba(59,130,246,0.1)', text: '#2563eb', label: 'Diproses' },
  shipped: { bg: 'rgba(139,92,246,0.1)', text: '#7c3aed', label: 'Dikirim' },
  completed: { bg: 'rgba(16,185,129,0.1)', text: '#059669', label: 'Selesai' },
  cancelled: { bg: 'rgba(239,68,68,0.1)', text: '#dc2626', label: 'Dibatalkan' },
  expired: { bg: 'rgba(107,114,128,0.1)', text: '#4b5563', label: 'Expired' },
};

const ORDER_STEPS = [
  { status: 'pending_payment', label: 'Diterima' },
  { status: 'paid', label: 'Dibayar' },
  { status: 'processing', label: 'Diproses' },
  { status: 'shipped', label: 'Dikirim' },
  { status: 'completed', label: 'Selesai' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryLoadingId, setRetryLoadingId] = useState<string | null>(null);

  // Snap URL based on environment
  const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' || process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const snapJsUrl = isProduction
    ? 'https://app.midtrans.com/snap/snap.js'
    : 'https://app.sandbox.midtrans.com/snap/snap.js';

  // Load Snap JS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = snapJsUrl;
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '');
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [snapJsUrl]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/track?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.data) {
        setOrders(data.data);
        if (data.data.length === 0) setError('Pesanan tidak ditemukan');
      } else {
        throw new Error(data.error || 'Gagal mencari pesanan');
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Auto-search if q parameter exists
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      performSearch(q);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleRetryPayment = async (order: any) => {
    setRetryLoadingId(order.id);
    try {
      const res = await fetch('/api/orders/retry-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyiapkan pembayaran');

      if (data.data?.snapToken) {
        (window as any).snap.pay(data.data.snapToken, {
          onSuccess: () => { window.location.reload(); },
          onPending: () => { window.location.reload(); },
          onClose: () => { setRetryLoadingId(null); }
        });
      }
    } catch (err: any) {
      alert(err.message);
      setRetryLoadingId(null);
    }
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const fmtRp = (n: number) => `Rp ${(n || 0).toLocaleString('id-ID')}`;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#1a3636', fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Lacak Pesanan</h1>
        <p style={{ color: '#6b7280', fontSize: '15px' }}>Masukkan nomor pesanan atau nomor telepon Anda untuk melihat status terbaru.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="track-form" style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon icon="lucide:search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '20px' }} />
          <input
            type="text"
            placeholder="Nomor Pesanan atau HP..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px',
              border: '2px solid #e5e7eb', outline: 'none', fontSize: '16px',
              boxSizing: 'border-box', transition: 'border-color 0.2s',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#40534c'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#40534c', color: '#d6bd98', border: 'none',
            padding: '0 32px', borderRadius: '16px', fontWeight: '800',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '16px', transition: 'transform 0.1s active'
          }}
        >
          {loading ? <Icon icon="lucide:loader-2" style={{ animation: 'spin 1s linear infinite' }} /> : <Icon icon="lucide:map-pin" />}
          Lacak
        </button>
      </form>

      {error && <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px', borderRadius: '16px', marginBottom: '24px', fontSize: '15px', textAlign: 'center', fontWeight: '600' }}>{error}</div>}

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {orders.map(order => {
          const st = STATUS_COLORS[order.status] || { bg: 'rgba(107,114,128,0.1)', text: '#4b5563', label: order.status };
          const currentStep = ORDER_STEPS.findIndex(s => s.status === order.status);

          return (
            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f0f4f2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#1a3636', fontSize: '18px', marginBottom: '4px' }}>#{order.order_number}</div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>{fmtDate(order.created_at)}</div>
                </div>
                <span style={{
                  backgroundColor: st.bg, color: st.text, fontSize: '11px',
                  fontWeight: '800', textTransform: 'uppercase', padding: '6px 14px',
                  borderRadius: '20px', letterSpacing: '0.05em'
                }}>
                  {st.label}
                </span>
              </div>

              {/* Visual Stepper */}
              {order.status !== 'cancelled' && order.status !== 'expired' && (
                <div style={{ marginBottom: '32px', padding: '0 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '8px' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '0', right: '0', height: '2px', backgroundColor: '#f1f5f9', zIndex: 0 }} />
                    <div style={{
                      position: 'absolute', top: '10px', left: '0',
                      width: `${(currentStep / (ORDER_STEPS.length - 1)) * 100}%`,
                      height: '2px', backgroundColor: '#40534c', zIndex: 1,
                      transition: 'width 0.5s ease'
                    }} />

                    {ORDER_STEPS.map((step, idx) => {
                      const isActive = idx <= currentStep;
                      return (
                        <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            backgroundColor: isActive ? '#40534c' : '#fff',
                            border: `2px solid ${isActive ? '#40534c' : '#e2e8f0'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.3s'
                          }}>
                            {isActive && <Icon icon="lucide:check" style={{ fontSize: '12px', color: '#d6bd98' }} />}
                          </div>
                          <span className="stepper-label" style={{ fontSize: '10px', fontWeight: '800', color: isActive ? '#1a3636' : '#9ca3af', marginTop: '8px', textAlign: 'center' }}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f8faf9', borderRadius: '16px', border: '1px solid #edf2f0' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '800', marginBottom: '12px', letterSpacing: '0.05em' }}>DETAIL PENGIRIMAN</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#1a3636', fontWeight: '700' }}>{order.shipping_courier?.toUpperCase()} {order.shipping_service}</div>
                    {order.waybill_id && <div style={{ fontSize: '15px', color: '#40534c', fontWeight: '800', marginTop: '4px' }}>{order.waybill_id}</div>}
                  </div>
                  {order.waybill_id && (
                    <a
                      href={`https://biteship.com/id/tracking/${order.biteship_tracking_id || order.waybill_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#fff', color: '#40534c', border: '1px solid #40534c',
                        padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '700',
                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
                      }}
                    >
                      Lacak <Icon icon="lucide:external-link" />
                    </a>
                  )}
                </div>
              </div>

              {/* Items Preview */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '800', marginBottom: '12px', letterSpacing: '0.05em' }}>PRODUK</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                        <img src={item.image || '/LOGO 1.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#374151' }}>{item.product_name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.quantity} x {fmtRp(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px dashed #e5e7eb' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>Total Pembayaran</div>
                  <div style={{ fontSize: '22px', fontWeight: '900', color: '#40534c' }}>{fmtRp(order.total)}</div>
                </div>

                {order.status === 'pending_payment' && order.payment_status !== 'paid' && order.payment_method === 'qris' && (
                  <button
                    onClick={() => handleRetryPayment(order)}
                    disabled={retryLoadingId === order.id}
                    style={{
                      backgroundColor: '#40534c', color: '#d6bd98', border: 'none',
                      padding: '14px 24px', borderRadius: '14px', fontWeight: '800',
                      fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: '0 4px 15px rgba(64,83,76,0.2)'
                    }}
                  >
                    {retryLoadingId === order.id ? <Icon icon="lucide:loader-2" style={{ animation: 'spin 1s linear infinite' }} /> : <Icon icon="lucide:qr-code" />}
                    Bayar Sekarang
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Link */}
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link href="/paperlisens" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Icon icon="lucide:arrow-left" /> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8faf9', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Memuat...</div>}>
        <TrackOrderContent />
      </Suspense>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @media (max-width: 600px) {
          .track-form {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .track-form button {
            padding: 16px !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .stepper-label {
            font-size: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
