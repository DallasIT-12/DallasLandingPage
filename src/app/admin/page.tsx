'use client';

import { useState, useEffect } from 'react';

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  customer: Customer;
  orderItems: OrderItem[];
}

const statusColors = {
  PENDING: '#fbbf24',
  CONFIRMED: '#3b82f6',
  PROCESSING: '#8b5cf6',
  SHIPPED: '#06b6d4',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444'
};

const statusLabels = {
  PENDING: 'Pending',
  CONFIRMED: 'Dikonfirmasi',
  PROCESSING: 'Diproses',
  SHIPPED: 'Dikirim',
  DELIVERED: 'Selesai',
  CANCELLED: 'Dibatalkan'
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders?limit=100');
      const result = await response.json();
      if (result.success) {
        setOrders(result.data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{fontSize: '18px', color: '#64748b'}}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '16px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#1f2937', 
              margin: 0 
            }}>
              📊 Admin Dashboard - Paperlisens
            </h1>
            <div style={{
              backgroundColor: '#f97316',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Total Pesanan: {orders.length}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Filter Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">Semua Status</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Cari Pesanan
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nomor pesanan, nama, atau telepon..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Pesanan
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Customer
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Total
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Status
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order.id} style={{
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
                  }}>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          #{order.orderNumber}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {formatDate(order.createdAt)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {order.paymentMethod === 'cod' ? 'COD' : 
                           order.paymentMethod === 'transfer' ? 'Transfer' : 'E-Wallet'}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontWeight: '500', color: '#1f2937', marginBottom: '2px' }}>
                          {order.customer.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {order.customer.phone}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {order.customer.city}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: '#f97316' }}>
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {order.orderItems.length} item
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          border: '1px solid #d1d5db',
                          backgroundColor: statusColors[order.status as keyof typeof statusColors] || '#6b7280',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value} style={{ color: 'black' }}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Detail
                        </button>
                        <a
                          href={`https://wa.me/${order.customer.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#25d366',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'inline-block'
                          }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <div>Tidak ada pesanan yang sesuai filter</div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }} onClick={() => setIsModalOpen(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '700px',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                  Detail Pesanan #{selectedOrder.orderNumber}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >×</button>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Customer Info */}
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
                    Informasi Customer
                  </h4>
                  <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                    <div><strong>Nama:</strong> {selectedOrder.customer.name}</div>
                    <div><strong>Telepon:</strong> {selectedOrder.customer.phone}</div>
                    {selectedOrder.customer.email && (
                      <div><strong>Email:</strong> {selectedOrder.customer.email}</div>
                    )}
                    <div><strong>Alamat:</strong> {selectedOrder.customer.address}</div>
                    <div><strong>Kota:</strong> {selectedOrder.customer.city}</div>
                    <div><strong>Kode Pos:</strong> {selectedOrder.customer.postalCode}</div>
                  </div>
                </div>

                {/* Order Info */}
                <div style={{ backgroundColor: '#fef3f2', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#dc2626' }}>
                    Informasi Pesanan
                  </h4>
                  <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                    <div><strong>Tanggal:</strong> {formatDate(selectedOrder.createdAt)}</div>
                    <div><strong>Status:</strong> {statusLabels[selectedOrder.status as keyof typeof statusLabels]}</div>
                    <div><strong>Pembayaran:</strong> {
                      selectedOrder.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' :
                      selectedOrder.paymentMethod === 'transfer' ? 'Transfer Bank' : 'E-Wallet'
                    }</div>
                    <div><strong>Total:</strong> <span style={{ color: '#f97316', fontWeight: '600' }}>{formatCurrency(selectedOrder.totalAmount)}</span></div>
                    {selectedOrder.notes && (
                      <div><strong>Catatan:</strong> {selectedOrder.notes}</div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
                    Item Pesanan
                  </h4>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc' }}>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Produk</th>
                          <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Qty</th>
                          <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Harga</th>
                          <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.orderItems.map((item, index) => (
                          <tr key={item.id} style={{ borderBottom: index < selectedOrder.orderItems.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                            <td style={{ padding: '12px', fontSize: '14px' }}>{item.product.name}</td>
                            <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right' }}>{formatCurrency(item.unitPrice)}</td>
                            <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: '600', color: '#f97316' }}>
                              {formatCurrency(item.totalPrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}