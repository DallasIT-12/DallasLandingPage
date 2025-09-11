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
    // No longer fetching from database - show WhatsApp redirect message
    setLoading(false);
  }, []);

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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>
        {/* WhatsApp Management Message */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>📱</div>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '16px', 
            color: '#1f2937' 
          }}>
            Manajemen Pesanan via WhatsApp
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280', 
            marginBottom: '32px', 
            lineHeight: '1.6' 
          }}>
            Sistem telah diperbarui untuk mengelola semua pesanan melalui WhatsApp. 
            Semua order dari website akan langsung dikirim ke WhatsApp untuk diproses.
          </p>
          
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #22c55e',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '12px', 
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✅ Keunggulan Sistem Baru:
            </h3>
            <ul style={{ 
              color: '#15803d', 
              lineHeight: '1.8',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li>Tidak perlu database - lebih stabil dan cepat</li>
              <li>Pelanggan tetap bisa isi form lengkap di website</li>
              <li>Pesan otomatis dibuat dengan format rapi</li>
              <li>Komunikasi langsung dengan pelanggan via WhatsApp</li>
              <li>Tidak ada masalah deployment atau koneksi database</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fef3f2',
            border: '1px solid #f97316',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '32px'
          }}>
            <div style={{ 
              fontSize: '14px', 
              color: '#ea580c', 
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              📞 Nomor WhatsApp Admin:
            </div>
            <div style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#dc2626',
              fontFamily: 'monospace'
            }}>
              081260001487
            </div>
          </div>

          <a
            href="https://wa.me/6281260001487?text=Halo admin, saya ingin mengecek pesanan terbaru."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#25d366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#1db954'}
            onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#25d366'}
          >
            💬 Buka WhatsApp Admin
          </a>
        </div>
      </div>

    </div>
  );
}