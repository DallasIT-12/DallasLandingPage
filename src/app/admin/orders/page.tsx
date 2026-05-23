'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

const STATUS_TABS = [
  { key: 'all', label: 'Semua', icon: 'lucide:list' },
  { key: 'pending_payment', label: 'Menunggu Bayar', icon: 'lucide:clock' },
  { key: 'paid', label: 'Dibayar', icon: 'lucide:check-circle' },
  { key: 'processing', label: 'Diproses', icon: 'lucide:package' },
  { key: 'shipped', label: 'Dikirim', icon: 'lucide:truck' },
  { key: 'completed', label: 'Selesai', icon: 'lucide:check-check' },
  { key: 'cancelled', label: 'Batal', icon: 'lucide:x-circle' },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending_payment: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Menunggu Bayar' },
  paid: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Dibayar' },
  processing: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Diproses' },
  shipped: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Dikirim' },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Selesai' },
  cancelled: { bg: 'bg-rose-500/10', text: 'text-rose-400', label: 'Dibatalkan' },
  expired: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Expired' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Edit states
  const [editingResi, setEditingResi] = useState<{ id: string; value: string } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (activeTab !== 'all') params.set('status', activeTab);
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(data.data || []);
      setTotal(data.total || 0);
    } catch { setOrders([]); }
    setLoading(false);
  }, [activeTab, search, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateOrder = async (orderId: string, updates: any) => {
    setUpdatingId(orderId);
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, ...updates }),
      });
      await fetchOrders();
    } catch (e) { alert('Gagal update'); }
    setUpdatingId(null);
  };

  const getStatusInfo = (s: string) => STATUS_COLORS[s] || { bg: 'bg-slate-500/10', text: 'text-slate-400', label: s };
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const fmtRp = (n: number) => `Rp ${(n || 0).toLocaleString('id-ID')}`;

  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#1e293b] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-6 bg-[#d6bd98] rounded-full" />
            <h1 className="text-3xl font-black text-white tracking-tight">Pesanan Masuk</h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Pantau dan kelola semua pesanan <span className="text-[#d6bd98] font-bold">Paperlisens</span> &bull; {total} Total
          </p>
        </div>
        <button onClick={fetchOrders} className="flex items-center gap-2 px-6 py-4 bg-white/5 text-white rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
          <Icon icon="lucide:refresh-cw" className="text-lg" /> Refresh
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STATUS_TABS.map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key); setPage(1); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-[#d6bd98] text-[#111827] shadow-lg' : 'bg-[#1e293b] text-slate-400 hover:text-white border border-white/5'}`}>
            <Icon icon={tab.icon} className="text-sm" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative group">
        <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#d6bd98] transition-colors text-xl" />
        <input type="text" placeholder="Cari order number, nama, atau telepon..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-16 pr-6 py-5 bg-[#1e293b] border border-white/5 rounded-3xl outline-none focus:ring-2 focus:ring-[#d6bd98] text-slate-200 placeholder:text-slate-600 transition-all shadow-xl" />
      </div>

      {/* Orders Table */}
      <div className="bg-[#1e293b] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="py-40 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-[#d6bd98]/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-[#d6bd98] rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">Memuat pesanan...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-40 text-center">
            <Icon icon="lucide:inbox" className="text-6xl text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-lg">Belum ada pesanan</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.map(order => {
              const st = getStatusInfo(order.status);
              const isExpanded = expandedId === order.id;
              const addr = order.shipping_address || {};
              return (
                <div key={order.id}>
                  {/* Order Row */}
                  <div className="px-8 py-6 flex items-center gap-6 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => setExpandedId(isExpanded ? null : order.id)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-black text-white text-sm">#{order.order_number}</span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${st.bg} ${st.text}`}>
                          {st.label}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs font-medium">{addr.name || order.guest_name || '-'} &bull; {fmtDate(order.created_at)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-black text-lg">{fmtRp(order.total)}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {order.payment_method === 'cod' ? '💵 COD' : order.shipping_courier === 'local' ? '🏍️ Lokal Kediri' : order.shipping_courier ? `${order.shipping_courier} ${order.shipping_service || ''}`.trim() : '-'}
                      </p>
                    </div>
                    <Icon icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="text-slate-500 text-xl flex-shrink-0" />
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="px-8 pb-8 space-y-4 bg-white/[0.01] border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        {/* Address */}
                        <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/5">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Alamat Pengiriman</p>
                          <p className="text-white font-bold text-sm">{addr.name || '-'}</p>
                          <p className="text-slate-400 text-xs mt-1">{addr.phone || order.guest_phone || '-'}</p>
                          <p className="text-slate-400 text-xs mt-1">{addr.address || '-'}, {addr.district || ''} {addr.city || ''} {addr.province || ''} {addr.postal_code || ''}</p>
                        </div>
                        {/* Payment */}
                        <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/5">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Pembayaran</p>
                          <p className="text-white font-bold text-sm">{order.payment_method === 'cod' ? 'Bayar di Tempat (COD)' : 'QRIS'}</p>
                          {order.midtrans_order_id && <p className="text-slate-400 text-xs mt-1">ID: {order.midtrans_order_id}</p>}
                          <p className="text-xs mt-1">
                            <span className={`font-bold ${
                              order.payment_status === 'paid' ? 'text-emerald-400' :
                              order.payment_status === 'cod' ? 'text-blue-400' :
                              order.payment_status === 'expired' ? 'text-rose-400' :
                              'text-amber-400'
                            }`}>
                              {order.payment_status === 'cod' ? 'COD — Bayar saat terima' :
                               order.payment_status === 'paid' ? 'Sudah Dibayar' :
                               order.payment_status === 'expired' ? 'Expired' :
                               'Menunggu Pembayaran'}
                            </span>
                          </p>
                        </div>
                        {/* Resi */}
                        <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/5">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">No. Resi</p>
                          {editingResi?.id === order.id ? (
                            <div className="flex gap-2">
                              <input value={editingResi!.value} onChange={e => setEditingResi({ ...editingResi!, value: e.target.value })} className="flex-1 p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:ring-1 focus:ring-[#d6bd98]" placeholder="Masukkan no. resi" />
                              <button onClick={() => { updateOrder(order.id, { trackingNumber: editingResi!.value, status: 'shipped' }); setEditingResi(null); }} className="px-3 py-2 bg-[#d6bd98] text-[#111827] rounded-lg text-xs font-black">
                                {updatingId === order.id ? '...' : 'Simpan'}
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <p className="text-white font-bold text-sm">{order.tracking_number || '-'}</p>
                              <button onClick={() => setEditingResi({ id: order.id, value: order.tracking_number || '' })} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                                <Icon icon="lucide:edit-3" className="text-xs text-slate-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/5">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Produk ({(order.order_items || []).length})</p>
                        <div className="space-y-3">
                          {(order.order_items || []).map((item: any) => (
                            <div key={item.id} className="flex items-center gap-3">
                              {item.image && <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />}
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{item.product_name}</p>
                                {item.variant_name && <p className="text-slate-500 text-xs">{item.variant_name}</p>}
                              </div>
                              <p className="text-slate-400 text-xs">{item.quantity}x</p>
                              <p className="text-white font-bold text-sm">{fmtRp(item.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-white/5 mt-4 pt-3 flex justify-between text-sm">
                          <span className="text-slate-400">Subtotal</span><span className="text-white font-bold">{fmtRp(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-400">Ongkir</span><span className="text-white font-bold">{fmtRp(order.shipping_cost)}</span>
                        </div>
                        <div className="border-t border-[#d6bd98]/20 mt-2 pt-2 flex justify-between text-base">
                          <span className="text-[#d6bd98] font-black">Total</span><span className="text-[#d6bd98] font-black">{fmtRp(order.total)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      {order.notes && (
                        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4">
                          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Catatan</p>
                          <p className="text-slate-300 text-sm">{order.notes}</p>
                        </div>
                      )}
                      <div className="flex gap-3 flex-wrap">
                        {order.status === 'paid' && (
                          <button onClick={() => updateOrder(order.id, { status: 'processing' })} disabled={updatingId === order.id}
                            className="px-5 py-3 bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50">
                            <Icon icon="lucide:package" className="inline mr-2" /> Proses Pesanan
                          </button>
                        )}
                        {order.status === 'processing' && (
                          <button onClick={() => setEditingResi({ id: order.id, value: order.tracking_number || '' })}
                            className="px-5 py-3 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-600 transition-all">
                            <Icon icon="lucide:truck" className="inline mr-2" /> Input Resi & Kirim
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button onClick={() => updateOrder(order.id, { status: 'completed' })} disabled={updatingId === order.id}
                            className="px-5 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50">
                            <Icon icon="lucide:check-check" className="inline mr-2" /> Tandai Selesai
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-3">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-5 py-3 bg-[#1e293b] text-slate-400 rounded-2xl text-xs font-bold border border-white/5 disabled:opacity-30">
            ← Prev
          </button>
          <span className="px-5 py-3 text-slate-500 text-xs font-bold">Hal {page} / {Math.ceil(total / 20)}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 20)}
            className="px-5 py-3 bg-[#1e293b] text-slate-400 rounded-2xl text-xs font-bold border border-white/5 disabled:opacity-30">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
