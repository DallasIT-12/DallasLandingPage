'use client';

import { useState, useRef } from 'react';
import { generatePaymentToken, BANK_ACCOUNTS, generateOrderId, copyToClipboard } from '../../lib/payment';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Paperlisens() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState('bca');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const cartIconRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: '🏪' },
    { id: 'cup-a', name: 'Cup A', icon: '🥤' },
    { id: 'cup-b', name: 'Cup B', icon: '☕' },
    { id: 'cup-c', name: 'Cup C', icon: '🧋' },
    { id: 'cup-d', name: 'Cup D', icon: '🥛' },
    { id: 'cup-toast', name: 'Cup Toast', icon: '🍞' },
    { id: 'cup-toast-es', name: 'Cup Toast Es', icon: '🧊' }
  ];

  const products = [
    { 
      id: 1, 
      name: 'Cup A Premium - Paper Cup 8oz Putih', 
      price: 85000, 
      originalPrice: 95000, 
      discount: 11, 
      rating: 4.8, 
      sold: 3200, 
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop',
      category: 'cup-a',
      location: 'Jakarta Pusat',
      stock: 125,
      unit: 'per 1000 pcs'
    },
    { 
      id: 2, 
      name: 'Cup B Standard - Paper Cup 12oz Coklat', 
      price: 120000, 
      originalPrice: 135000, 
      discount: 11, 
      rating: 4.7, 
      sold: 2800, 
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop',
      category: 'cup-b',
      location: 'Bandung',
      stock: 95,
      unit: 'per 1000 pcs'
    },
    { 
      id: 3, 
      name: 'Cup C Large - Paper Cup 16oz Premium', 
      price: 155000, 
      originalPrice: 175000, 
      discount: 11, 
      rating: 4.9, 
      sold: 1950, 
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop',
      category: 'cup-c',
      location: 'Surabaya',
      stock: 75,
      unit: 'per 1000 pcs'
    },
    { 
      id: 4, 
      name: 'Cup D Extra Large - Paper Cup 22oz Jumbo', 
      price: 185000, 
      originalPrice: 210000, 
      discount: 12, 
      rating: 4.6, 
      sold: 1200, 
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop',
      category: 'cup-d',
      location: 'Yogyakarta',
      stock: 60,
      unit: 'per 1000 pcs'
    },
    { 
      id: 5, 
      name: 'Cup Toast - Food Container Persegi Kecil', 
      price: 95000, 
      originalPrice: 110000, 
      discount: 14, 
      rating: 4.5, 
      sold: 2670, 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      category: 'cup-toast',
      location: 'Malang',
      stock: 85,
      unit: 'per 500 pcs'
    },
    { 
      id: 6, 
      name: 'Cup Toast Es - Food Container dengan Tutup', 
      price: 125000, 
      originalPrice: 145000, 
      discount: 14, 
      rating: 4.7, 
      sold: 1850, 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      category: 'cup-toast-es',
      location: 'Semarang',
      stock: 70,
      unit: 'per 500 pcs'
    },
    { 
      id: 7, 
      name: 'Cup A Mini - Paper Cup 4oz untuk Espresso', 
      price: 65000, 
      originalPrice: 75000, 
      discount: 13, 
      rating: 4.4, 
      sold: 1950, 
      image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop',
      category: 'cup-a',
      location: 'Jakarta Selatan',
      stock: 150,
      unit: 'per 1000 pcs'
    },
    { 
      id: 8, 
      name: 'Cup Toast Es Premium - Leak Proof Container', 
      price: 165000, 
      originalPrice: 185000, 
      discount: 11, 
      rating: 4.8, 
      sold: 890, 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      category: 'cup-toast-es',
      location: 'Denpasar',
      stock: 45,
      unit: 'per 500 pcs'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }

    // Animation feedback
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    if (button && cartIconRef.current) {
      const buttonRect = button.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();
      
      // Create flying animation element
      const flyingItem = document.createElement('div');
      flyingItem.innerHTML = '🛒';
      flyingItem.style.cssText = `
        position: fixed;
        left: ${buttonRect.left}px;
        top: ${buttonRect.top}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
      document.body.appendChild(flyingItem);
      
      // Animate to cart
      setTimeout(() => {
        flyingItem.style.left = `${cartRect.left}px`;
        flyingItem.style.top = `${cartRect.top}px`;
        flyingItem.style.transform = 'scale(0.5)';
        flyingItem.style.opacity = '0';
      }, 50);
      
      // Remove element after animation
      setTimeout(() => {
        if (document.body.contains(flyingItem)) {
          document.body.removeChild(flyingItem);
        }
      }, 850);
      
      // Button feedback
      (button as HTMLElement).innerHTML = 'Ditambahkan! ✓';
      (button as HTMLElement).style.backgroundColor = '#10b981';
      setTimeout(() => {
        (button as HTMLElement).innerHTML = '+ Keranjang';
        (button as HTMLElement).style.backgroundColor = '#f97316';
      }, 1000);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    }}>
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .bounce { animation: bounce 0.5s ease; }
      `}</style>

      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px'}}>
          <div style={{display: 'flex', alignItems: 'center', height: '70px', gap: '24px'}}>
            {/* Logo */}
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f97316',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>📦</div>
              <h1 style={{fontSize: '24px', fontWeight: '700', color: '#f97316', margin: 0}}>Paperlisens</h1>
            </div>

            {/* Search Bar */}
            <div style={{flex: 1, maxWidth: '600px', position: 'relative'}}>
              <input
                type="text"
                placeholder="Cari cup, wadah makanan, atau toko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#f97316'}
                onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#e5e7eb'}
              />
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                fontSize: '18px'
              }}>🔍</div>
            </div>

            {/* Cart & User */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div 
                ref={cartIconRef}
                onClick={() => setIsCartOpen(true)}
                style={{position: 'relative', cursor: 'pointer', padding: '8px'}}
              >
                <span style={{fontSize: '24px'}}>🛒</span>
                {getTotalItems() > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{getTotalItems()}</div>
                )}
              </div>
              <div 
                onClick={() => setIsLoginOpen(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f97316',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#ea580c'}
                onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#f97316'}
              >
                Masuk
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={{
        backgroundColor: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px', margin: '0 0 16px 0'}}>
            Selamat Datang di Paperlisens! 🎉
          </h2>
          <p style={{fontSize: '1.25rem', opacity: 0.9, margin: 0}}>
            Marketplace terpercaya untuk wadah makanan & cup berkualitas tinggi
          </p>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px 16px'}}>
        {/* Categories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>Kategori</h3>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: selectedCategory === category.id ? '#f97316' : '#f3f4f6',
                  color: selectedCategory === category.id ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category.id) {
                    (e.target as HTMLElement).style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category.id) {
                    (e.target as HTMLElement).style.backgroundColor = '#f3f4f6';
                  }
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}>
              <div style={{position: 'relative'}}>
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                {product.discount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {product.discount}% OFF
                  </div>
                )}
                {product.stock < 20 && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Stok {product.stock}
                  </div>
                )}
              </div>
              
              <div style={{padding: '16px'}}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  lineHeight: '1.4',
                  color: '#1f2937',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.name}
                </h4>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <span style={{color: '#fbbf24', fontSize: '14px'}}>★</span>
                    <span style={{fontSize: '13px', color: '#6b7280'}}>{product.rating}</span>
                  </div>
                  <span style={{fontSize: '13px', color: '#d1d5db'}}>|</span>
                  <span style={{fontSize: '13px', color: '#6b7280'}}>{product.sold > 1000 ? `${(product.sold/1000).toFixed(1)}k` : product.sold} terjual</span>
                </div>

                <div style={{display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px'}}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#f97316'
                  }}>
                    Rp{product.price.toLocaleString()}
                  </span>
                  <div style={{fontSize: '12px', color: '#6b7280'}}>
                    {product.unit}
                  </div>
                  {product.originalPrice > product.price && (
                    <span style={{
                      fontSize: '14px',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      Rp{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📍 {product.location}
                </div>

                <button
                  data-product-id={product.id}
                  onClick={() => addToCart(product.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#ea580c'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#f97316'}
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            marginTop: '20px'
          }}>
            <div style={{fontSize: '60px', marginBottom: '16px'}}>🔍</div>
            <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#1f2937'}}>
              Produk tidak ditemukan
            </h3>
            <p style={{color: '#6b7280', margin: 0}}>
              Coba kata kunci lain atau ubah filter kategori
            </p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end'
        }} onClick={() => setIsCartOpen(false)}>
          <div style={{
            width: '400px',
            height: '100%',
            backgroundColor: 'white',
            padding: '20px',
            overflowY: 'auto',
            boxShadow: '-4px 0 8px rgba(0,0,0,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{fontSize: '20px', fontWeight: '600', margin: 0}}>Keranjang ({getTotalItems()})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >×</button>
            </div>

            {cartItems.length === 0 ? (
              <div style={{textAlign: 'center', padding: '40px 0'}}>
                <div style={{fontSize: '60px', marginBottom: '16px'}}>🛒</div>
                <p style={{color: '#6b7280'}}>Keranjang kosong</p>
              </div>
            ) : (
              <>
                <div style={{marginBottom: '20px'}}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderBottom: '1px solid #e5e7eb',
                      alignItems: 'center'
                    }}>
                      <img src={item.image} alt={item.name} style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }} />
                      <div style={{flex: 1}}>
                        <h4 style={{fontSize: '14px', fontWeight: '500', marginBottom: '4px', lineHeight: '1.3'}}>{item.name}</h4>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#f97316'}}>
                          Rp{item.price.toLocaleString()}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px'}}>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >-</button>
                          <span style={{fontSize: '14px', minWidth: '20px', textAlign: 'center'}}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '4px',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >+</button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              marginLeft: 'auto',
                              background: 'none',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                          >🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{borderTop: '2px solid #e5e7eb', paddingTop: '16px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <span style={{fontSize: '18px', fontWeight: '600'}}>Total:</span>
                    <span style={{fontSize: '18px', fontWeight: '700', color: '#f97316'}}>
                      Rp{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#ea580c'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#f97316'}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
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
          alignItems: 'center'
        }} onClick={() => setIsLoginOpen(false)}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            width: '400px',
            maxWidth: '90%'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '20px', textAlign: 'center'}}>Masuk ke Paperlisens</h3>
            <form>
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500'}}>Email</label>
                <input type="email" style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} />
              </div>
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500'}}>Password</label>
                <input type="password" style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} />
              </div>
              <button type="submit" style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '16px'
              }}>
                Masuk
              </button>
              <div style={{textAlign: 'center'}}>
                <a href="#" style={{color: '#f97316', fontSize: '14px', textDecoration: 'none'}}>
                  Belum punya akun? Daftar
                </a>
              </div>
            </form>
            <button 
              onClick={() => setIsLoginOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >×</button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
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
        }} onClick={() => setIsCheckoutOpen(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '800px',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{padding: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h3 style={{fontSize: '24px', fontWeight: '600', margin: 0}}>Checkout</h3>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '5px'
                  }}
                >×</button>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
                {/* Left Column - Shipping & Payment */}
                <div>
                  {/* Shipping Information */}
                  <div style={{marginBottom: '32px'}}>
                    <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>Informasi Pengiriman</h4>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      <div>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Nama Lengkap</label>
                        <input 
                          type="text"
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Nomor Telepon</label>
                        <input 
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                      <div>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Alamat Lengkap</label>
                        <textarea 
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            minHeight: '80px',
                            resize: 'vertical'
                          }}
                          placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                        />
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px'}}>
                        <div>
                          <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Kota</label>
                          <input 
                            type="text"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                            placeholder="Jakarta"
                          />
                        </div>
                        <div>
                          <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Kode Pos</label>
                          <input 
                            type="text"
                            value={shippingInfo.postalCode}
                            onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Catatan (Opsional)</label>
                        <textarea 
                          value={shippingInfo.notes}
                          onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            minHeight: '60px',
                            resize: 'vertical'
                          }}
                          placeholder="Catatan untuk kurir atau penjual"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>Metode Pembayaran</h4>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      {[
                        { id: 'cod', name: 'Bayar di Tempat (COD)', icon: '💰', desc: 'Bayar saat barang sampai' },
                        { id: 'transfer', name: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
                        { id: 'ewallet', name: 'E-Wallet', icon: '📱', desc: 'GoPay, OVO, DANA, ShopeePay' }
                      ].map(method => (
                        <div 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          style={{
                            padding: '16px',
                            border: `2px solid ${paymentMethod === method.id ? '#f97316' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: paymentMethod === method.id ? '#fef3f2' : 'white'
                          }}
                        >
                          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                            <span style={{fontSize: '20px'}}>{method.icon}</span>
                            <div style={{flex: 1}}>
                              <div style={{fontSize: '14px', fontWeight: '500', color: '#1f2937'}}>{method.name}</div>
                              <div style={{fontSize: '12px', color: '#6b7280'}}>{method.desc}</div>
                              {method.id === 'transfer' && paymentMethod === 'transfer' && (
                                <div style={{marginTop: '8px'}}>
                                  <select 
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    style={{
                                      padding: '4px 8px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '4px',
                                      fontSize: '12px'
                                    }}
                                  >
                                    {Object.entries(BANK_ACCOUNTS).map(([key, bank]) => (
                                      <option key={key} value={key}>{bank.name}</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: `2px solid ${paymentMethod === method.id ? '#f97316' : '#d1d5db'}`,
                              backgroundColor: paymentMethod === method.id ? '#f97316' : 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {paymentMethod === method.id && <div style={{width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%'}} />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div>
                  <div style={{
                    backgroundColor: '#f9fafb',
                    padding: '20px',
                    borderRadius: '8px',
                    position: 'sticky',
                    top: '20px'
                  }}>
                    <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937'}}>Ringkasan Pesanan</h4>
                    
                    <div style={{marginBottom: '16px'}}>
                      {cartItems.map(item => (
                        <div key={item.id} style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '8px 0',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          <img src={item.image} alt={item.name} style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '6px',
                            objectFit: 'cover'
                          }} />
                          <div style={{flex: 1}}>
                            <div style={{fontSize: '13px', fontWeight: '500', marginBottom: '2px', lineHeight: '1.3'}}>{item.name}</div>
                            <div style={{fontSize: '12px', color: '#6b7280'}}>Qty: {item.quantity}</div>
                            <div style={{fontSize: '13px', fontWeight: '600', color: '#f97316'}}>Rp{(item.price * item.quantity).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{borderTop: '2px solid #e5e7eb', paddingTop: '16px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <span style={{fontSize: '14px', color: '#6b7280'}}>Subtotal:</span>
                        <span style={{fontSize: '14px', fontWeight: '500'}}>Rp{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <span style={{fontSize: '14px', color: '#6b7280'}}>Ongkir:</span>
                        <span style={{fontSize: '14px', fontWeight: '500'}}>Rp15.000</span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingTop: '8px', borderTop: '1px solid #e5e7eb'}}>
                        <span style={{fontSize: '16px', fontWeight: '600'}}>Total:</span>
                        <span style={{fontSize: '18px', fontWeight: '700', color: '#f97316'}}>Rp{(getTotalPrice() + 15000).toLocaleString()}</span>
                      </div>
                      
                      <button 
                        onClick={async () => {
                          if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
                            alert('Mohon lengkapi informasi pengiriman!');
                            return;
                          }

                          setPaymentLoading(true);
                          const orderId = generateOrderId();
                          setCurrentOrderId(orderId);

                          try {
                            if (paymentMethod === 'transfer' || paymentMethod === 'ewallet') {
                              // Generate payment token for non-COD payments
                              const paymentData = {
                                orderId,
                                amount: getTotalPrice() + 15000,
                                customerDetails: {
                                  first_name: shippingInfo.name,
                                  phone: shippingInfo.phone,
                                  email: 'customer@email.com',
                                  billing_address: {
                                    address: shippingInfo.address,
                                    city: shippingInfo.city,
                                    postal_code: shippingInfo.postalCode
                                  }
                                },
                                itemDetails: cartItems.map(item => ({
                                  id: item.id.toString(),
                                  price: item.price,
                                  quantity: item.quantity,
                                  name: item.name
                                }))
                              };

                              const paymentResult = await generatePaymentToken(paymentData);
                              setPaymentDetails(paymentResult.data);
                            }

                            setOrderConfirmed(true);
                            setIsCheckoutOpen(false);
                            if (paymentMethod === 'cod') {
                              setCartItems([]);
                            }
                          } catch (error) {
                            console.error('Payment error:', error);
                            alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
                          } finally {
                            setPaymentLoading(false);
                          }
                        }}
                        disabled={paymentLoading}
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: paymentLoading ? '#9ca3af' : '#f97316',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: paymentLoading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => !paymentLoading && ((e.target as HTMLElement).style.backgroundColor = '#ea580c')}
                        onMouseOut={(e) => !paymentLoading && ((e.target as HTMLElement).style.backgroundColor = '#f97316')}
                      >
                        {paymentLoading ? 'Memproses...' : 'Konfirmasi Pesanan'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
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
        }} onClick={() => setOrderConfirmed(false)}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            width: paymentMethod === 'cod' ? '500px' : '600px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            
            {paymentMethod === 'cod' ? (
              // COD Success Message
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '60px', marginBottom: '20px'}}>✅</div>
                <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#059669'}}>Pesanan Berhasil!</h3>
                <p style={{color: '#6b7280', marginBottom: '20px', lineHeight: '1.5'}}>
                  Terima kasih! Pesanan Anda telah diterima dan akan segera diproses. 
                  Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
                </p>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}>
                  <div style={{fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#059669'}}>ID Pesanan: #{currentOrderId}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Total: Rp{(getTotalPrice() + 15000).toLocaleString()}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Pembayaran: Bayar di Tempat (COD)</div>
                </div>
                <div style={{display: 'flex', gap: '12px'}}>
                  <button 
                    onClick={() => {setOrderConfirmed(false); setCartItems([]);}}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Tutup
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://wa.me/6281234567890?text=Halo, saya sudah melakukan order dengan ID: ${currentOrderId}`, '_blank');
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#25d366',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    💬 Chat WhatsApp
                  </button>
                </div>
              </div>
            ) : paymentMethod === 'transfer' ? (
              // Bank Transfer Payment Details
              <div>
                <div style={{textAlign: 'center', marginBottom: '24px'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>🏦</div>
                  <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px'}}>Transfer Bank</h3>
                  <p style={{color: '#6b7280', fontSize: '14px'}}>Silakan transfer ke rekening berikut</p>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                    <h4 style={{fontSize: '16px', fontWeight: '600', margin: 0}}>{BANK_ACCOUNTS[selectedBank as keyof typeof BANK_ACCOUNTS].name}</h4>
                    <span style={{fontSize: '20px'}}>{BANK_ACCOUNTS[selectedBank as keyof typeof BANK_ACCOUNTS].logo}</span>
                  </div>
                  
                  <div style={{marginBottom: '12px'}}>
                    <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Nomor Rekening</div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '18px', fontWeight: '600', fontFamily: 'monospace'}}>
                        {BANK_ACCOUNTS[selectedBank as keyof typeof BANK_ACCOUNTS].accountNumber}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(BANK_ACCOUNTS[selectedBank as keyof typeof BANK_ACCOUNTS].accountNumber)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#f97316',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div style={{marginBottom: '12px'}}>
                    <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Atas Nama</div>
                    <div style={{fontSize: '16px', fontWeight: '500'}}>
                      {BANK_ACCOUNTS[selectedBank as keyof typeof BANK_ACCOUNTS].accountName}
                    </div>
                  </div>

                  <div>
                    <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Jumlah Transfer</div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>
                        Rp{(getTotalPrice() + 15000).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => copyToClipboard((getTotalPrice() + 15000).toString())}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#f97316',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fef3f2',
                  border: '1px solid #f97316',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{fontSize: '13px', color: '#ea580c', fontWeight: '500', marginBottom: '4px'}}>Penting:</div>
                  <div style={{fontSize: '12px', color: '#6b7280', lineHeight: '1.4'}}>
                    • Transfer sesuai nominal yang tertera<br/>
                    • Konfirmasi pembayaran via WhatsApp<br/>
                    • Batas waktu transfer: 24 jam<br/>
                    • Order ID: #{currentOrderId}
                  </div>
                </div>

                <div style={{display: 'flex', gap: '12px'}}>
                  <button 
                    onClick={() => {setOrderConfirmed(false); setCartItems([]);}}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Tutup
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://wa.me/6281234567890?text=Halo, saya sudah transfer untuk order ID: ${currentOrderId}. Mohon dikonfirmasi.`, '_blank');
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#25d366',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Konfirmasi Transfer
                  </button>
                </div>
              </div>
            ) : (
              // E-Wallet Payment
              <div>
                <div style={{textAlign: 'center', marginBottom: '24px'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>📱</div>
                  <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px'}}>Pembayaran E-Wallet</h3>
                  <p style={{color: '#6b7280', fontSize: '14px'}}>Scan QR Code atau gunakan link pembayaran</p>
                </div>

                {paymentDetails && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontSize: '96px', marginBottom: '16px'}}>📋</div>
                    <p style={{fontSize: '14px', color: '#6b7280', marginBottom: '16px'}}>Scan QR Code dengan aplikasi e-wallet Anda</p>
                    
                    <div style={{marginBottom: '16px'}}>
                      <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Atau gunakan link pembayaran:</div>
                      <a 
                        href={paymentDetails.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          backgroundColor: '#f97316',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        Bayar Sekarang
                      </a>
                    </div>

                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '12px'
                    }}>
                      Order ID: #{currentOrderId}<br/>
                      Total: Rp{(getTotalPrice() + 15000).toLocaleString()}
                    </div>
                  </div>
                )}

                <div style={{display: 'flex', gap: '12px'}}>
                  <button 
                    onClick={() => {setOrderConfirmed(false); setCartItems([]);}}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Tutup
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://wa.me/6281234567890?text=Halo, saya memerlukan bantuan untuk pembayaran order ID: ${currentOrderId}`, '_blank');
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#25d366',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Bantuan WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '40px 0 20px',
        marginTop: '60px'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#f97316',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>📦</div>
                <h3 style={{fontSize: '20px', fontWeight: '700', margin: 0}}>Paperlisens</h3>
              </div>
              <p style={{color: '#9ca3af', lineHeight: '1.6', margin: 0}}>
                Marketplace terpercaya untuk wadah makanan dan cup berkualitas tinggi.
                Berbelanja aman, nyaman, dan terpercaya untuk kebutuhan bisnis F&B Anda.
              </p>
            </div>
            <div>
              <h4 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0'}}>Layanan</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Bantuan</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Cara Berbelanja</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Pengiriman</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Pembayaran</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0'}}>Tentang</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Tentang Kami</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Karir</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Blog</a>
                <a href="#" style={{color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s ease'}}>Kebijakan Privasi</a>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            <p style={{margin: 0}}>&copy; 2024 Paperlisens. All rights reserved. | 
              <a href="/" style={{color: '#f97316', textDecoration: 'none', marginLeft: '8px'}}>
                Kembali ke Dallas Company
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}