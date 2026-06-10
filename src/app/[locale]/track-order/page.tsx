'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: 'bg-amber-500/10', text: 'text-amber-600', label: 'Menunggu Pembayaran' },
  paid: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', label: 'Sudah Dibayar' },
  processing: { bg: 'bg-blue-500/10', text: 'text-blue-600', label: 'Diproses' },
  shipped: { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'Dikirim' },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', label: 'Selesai' },
  cancelled: { bg: 'bg-rose-500/10', text: 'text-rose-600', label: 'Dibatalkan' },
  expired: { bg: 'bg-slate-500/10', text: 'text-slate-600', label: 'Expired' },
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryLoadingId, setRetryLoadingId] = useState<string | null>(null);

  // Snap URL based on environment
  const snapJsUrl = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: '#40534c', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Lacak Pesanan</h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Masukkan nomor pesanan atau nomor telepon Anda</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Contoh: 260520-XXXX atau 0812..." 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ backgroundColor: '#40534c', color: '#d6bd98', border: 'none', padding: '0 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {loading ? <Icon icon="mdi:loading" width="20" style={{ animation: 'spin 1s linear infinite' }} /> : <Icon icon="mdi:magnify" width="20" />}
          Cari
        </button>
      </form>

      {error && <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map(order => {
          const st = STATUS_COLORS[order.status] || { bg: 'bg-slate-500/10', text: 'text-slate-600', label: order.status };
          return (
            <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#1a3636', fontSize: '16px' }}>#{order.order_number}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{fmtDate(order.created_at)}</div>
                </div>
                <span className={`${st.bg} ${st.text}`} style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.05em' }}>
                  {st.label}
                </span>
              </div>

              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '4px' }}>PENGIRIMAN</div>
                <div style={{ fontSize: '13px', color: '#374151' }}>{order.shipping_courier?.toUpperCase()} {order.shipping_service}</div>
                {order.waybill_id && <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', marginTop: '4px' }}>Resi: {order.waybill_id}</div>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px dashed #e5e7eb' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Bayar</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#40534c' }}>{fmtRp(order.total)}</div>
                </div>
                
                {order.status === 'pending_payment' && order.payment_status !== 'paid' && order.payment_method === 'qris' && (
                  <button 
                    onClick={() => handleRetryPayment(order)}
                    disabled={retryLoadingId === order.id}
                    style={{ backgroundColor: '#40534c', color: '#d6bd98', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {retryLoadingId === order.id ? <Icon icon="mdi:loading" width="16" style={{ animation: 'spin 1s linear infinite' }} /> : <Icon icon="mdi:qrcode-scan" width="16" />}
                    Bayar Sekarang
                  </button>
                )}
                {order.waybill_id && (
                  <a 
                    href={`https://biteship.com/id/tracking/${order.biteship_tracking_id || order.waybill_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#40534c', textDecoration: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Lacak Paket <Icon icon="mdi:open-in-new" width="16" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Link */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <a href="/paperlisens" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Kembali ke Beranda</a>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 16px', fontFamily: 'sans-serif' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Memuat...</div>}>
        <TrackOrderContent />
      </Suspense>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
