'use client';

import { useState, use } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { products } from '../../../../data/products'; // Import centralized products

// --- Responsive Styles & Navbar (Consistent with other pages) ---
const Styles = () => (
  <style>{`
    .gallery-container {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 16px;
    }
    .thumbnail-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .thumbnail {
      width: 80px;
      height: 80px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      cursor: pointer;
      object-fit: cover;
    }
    .thumbnail.active {
      border-color: #ee4d2d;
    }
    .main-image {
      width: 100%;
      height: 450px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }

    .tab-nav {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 24px;
    }
    .tab-item {
      padding: 12px 24px;
      cursor: pointer;
      font-weight: 500;
      color: #555;
      border-bottom: 2px solid transparent;
    }
    .tab-item.active {
      color: #ee4d2d;
      border-bottom-color: #ee4d2d;
    }

    @media (max-width: 768px) {
      .gallery-container {
        grid-template-columns: 1fr;
      }
      .thumbnail-list {
        flex-direction: row;
        order: 2;
      }
      .main-image-wrapper {
        order: 1;
      }
      .main-image {
        height: 300px;
      }
      .top-bar-text, .top-bar-separator {
         display: none;
      }
      .header-container {
         gap: 16px !important;
      }
      .header-logo {
         height: 32px !important;
      }
    }
  `}</style>
);

// --- Recommendation Card ---
const ProductCard = ({ product }: { product: any }) => (
  <Link href={`/paperlisens/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{ border: '1px solid #f0f0f0', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', height: '100%', cursor: 'pointer', transition: 'transform 0.2s' }}>
      <div style={{ height: '180px', backgroundColor: '#f9f9f9' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '12px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{product.name}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#ee4d2d', fontWeight: 'bold' }}>Rp {product.price.toLocaleString('id-ID')}</span>
          <span style={{ fontSize: '11px', color: '#888' }}>{product.sold} terjual</span>
        </div>
      </div>
    </div>
  </Link>
);

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find the product from centralized data
  const product = products.find(p => String(p.id) === slug);

  // Fallback if product not found (e.g., 404 page or redirect)
  if (!product) {
    return <div>Product not found!</div>; // TODO: Implement a proper 404 page or redirect
  }
  
  // Adjusted related and other products to use centralized data
  const filteredProducts = products.filter(p => p.id !== product.id);

  const relatedProducts = filteredProducts.slice(0, 4).map(p => ({
    ...p,
    id: p.id // Ensure ID is used
  }));

  const otherProducts = filteredProducts.slice(4, 8).map(p => ({
    ...p,
    id: p.id // Ensure ID is used
  }));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo Paperlisens, saya ingin memesan:
*Produk:* ${product.name}
*Jumlah:* ${quantity}
*Total Harga:* Rp ${(product.price * quantity).toLocaleString('id-ID')}

Mohon info ketersediaan stok. Terima kasih.`;
    
    window.open(`https://wa.me/6281260001487?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Styles />
      
      {/* ===== TOP BAR (Consistent) ===== */}
      <div style={{ backgroundColor: '#ee4d2d', color: 'white', fontSize: '12px', padding: '6px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/paperlisens" className="top-bar-text" style={{ color: 'white', textDecoration: 'none' }}>&larr; Kembali ke Paperlisens</Link>
            <span className="top-bar-separator" style={{ borderLeft: '1px solid rgba(255,255,255,0.5)', height: '12px' }}></span>
            <span className="top-bar-text">Download App</span>
          </div>
          <div>paperlisens22</div>
        </div>
      </div>

      {/* ===== HEADER (Consistent) ===== */}
      <header style={{ backgroundColor: '#ee4d2d', padding: '16px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="header-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/paperlisens">
            <img src="/logo-paperlisens.png" alt="Paperlisens" className="header-logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <div style={{ flexGrow: 1 }}>
             <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', color: '#888', fontSize: '14px' }}>
               Cari produk...
             </div>
          </div>
          
          {/* Cart Icon with Count */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <Icon icon="material-symbols:shopping-cart-outline" style={{ fontSize: '24px', color: 'white' }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'white', color: '#ee4d2d',
                fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        
        {/* BREADCRUMB */}
        <div style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
          <Link href="/paperlisens" style={{ textDecoration: 'none', color: '#ee4d2d' }}>Home</Link> &gt; <span>Product</span> &gt; {slug}
        </div>

        {/* PRODUCT MAIN SECTION */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* LEFT: GALLERY */}
            <div className="gallery-container">
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                    alt={`Thumb ${idx}`}
                  />
                ))}
              </div>
              <div className="main-image-wrapper">
                <img src={product.images[selectedImage]} className="main-image" alt={product.name} />
              </div>
            </div>

            {/* RIGHT: INFO & ACTIONS */}
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '500', color: '#333', lineHeight: '1.4', marginBottom: '12px' }}>{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ee4d2d', borderBottom: '1px solid #ee4d2d', paddingBottom: '1px' }}>
                  <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{product.rating}</span>
                  <Icon icon="material-symbols:star" />
                </div>
                <div style={{ height: '20px', width: '1px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ fontSize: '14px', color: '#757575' }}>{product.reviewCount} Penilaian</div>
                <div style={{ height: '20px', width: '1px', backgroundColor: '#e0e0e0' }}></div>
                <div style={{ fontSize: '14px', color: '#757575' }}>{product.sold} Terjual</div>
              </div>

              <div style={{ backgroundColor: '#fafafa', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
                 <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px', marginBottom: '4px' }}>Rp {product.originalPrice.toLocaleString('id-ID')}</div>
                 <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ee4d2d' }}>Rp {product.price.toLocaleString('id-ID')}</div>
              </div>

              <div style={{ marginBottom: '24px', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                {product.description}
              </div>

              {/* QUANTITY */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span style={{ color: '#757575', fontSize: '14px' }}>Kuantitas</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }}>-</button>
                  <input type="text" value={quantity} readOnly style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none' }} />
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ color: '#757575', fontSize: '12px' }}>Tersedia {product.stock} buah</span>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleAddToCart}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    backgroundColor: 'rgba(238, 77, 45, 0.1)', 
                    color: '#ee4d2d', 
                    border: '1px solid #ee4d2d', 
                    borderRadius: '4px', 
                    fontWeight: '500', 
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  <Icon icon="material-symbols:add-shopping-cart" /> Masukkan Keranjang
                </button>
                
                <button 
                  onClick={handleWhatsAppOrder}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    backgroundColor: '#ee4d2d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    fontWeight: '500', 
                    cursor: 'pointer' 
                  }}
                >
                  Pesan Sekarang
                </button>

                <button style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0', borderRadius: '4px', background: 'white', cursor: 'pointer' }} title="Bandingkan">
                   <Icon icon="material-symbols:compare-arrows" style={{ fontSize: '20px', color: '#555' }} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)', marginBottom: '24px' }}>
           <div className="tab-nav">
             {['deskripsi', 'info', 'review', 'pengiriman'].map(tab => (
               <div 
                 key={tab} 
                 className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                 onClick={() => setActiveTab(tab)}
               >
                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
               </div>
             ))}
           </div>
           
           <div style={{ padding: '0 12px', lineHeight: '1.6', color: '#333' }}>
              {activeTab === 'deskripsi' && (
                <div>
                  <p>{product.description}</p>
                  <p style={{ marginTop: '12px' }}>Keunggulan Produk:</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>Bahan Food Grade, aman untuk makanan panas/berminyak.</li>
                    <li>Ramah lingkungan (Eco Friendly).</li>
                    <li>Desain praktis dan mudah dirakit.</li>
                    <li>Cocok untuk branding usaha kuliner Anda.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'info' && (
                <div>
                  <p><strong>Berat:</strong> {product.weight}</p>
                  <p><strong>Kategori:</strong> {product.id.split('-')[0] || 'General'}</p>
                  <p><strong>Etalase:</strong> Paperlisens Premium</p>
                </div>
              )}
              {activeTab === 'review' && (
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                     <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>4.9</div>
                     <div>
                       <div style={{ color: '#ee4d2d' }}>★★★★★</div>
                       <div style={{ fontSize: '12px', color: '#757575' }}>dari 128 ulasan</div>
                     </div>
                   </div>
                   {/* Dummy Reviews */}
                   {[1, 2].map(i => (
                     <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
                       <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>User {i}</div>
                       <div style={{ color: '#ee4d2d', fontSize: '10px', marginBottom: '8px' }}>★★★★★</div>
                       <p style={{ fontSize: '13px', color: '#555' }}>Barang bagus, sesuai deskripsi. Pengiriman cepat.</p>
                     </div>
                   ))}
                 </div>
              )}
              {activeTab === 'pengiriman' && (
                <div>
                  <p>Pengiriman dilakukan dari Kota Kediri.</p>
                  <p>Kurir tersedia: JNE, J&T, SiCepat.</p>
                  <p>Pesanan sebelum jam 14.00 dikirim di hari yang sama.</p>
                </div>
              )}
           </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div style={{ marginBottom: '40px' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', marginBottom: '16px' }}>PRODUK LAIN DARI TOKO INI</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', marginBottom: '16px' }}>KAMU MUNGKIN JUGA SUKA</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {otherProducts.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
        </div>

      </main>
    </div>
  );
}
