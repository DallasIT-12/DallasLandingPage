'use client';

export default function Home() {
  const smoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buttonStyle = {
    padding: '12px 32px',
    borderRadius: '50px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-block',
    cursor: 'pointer',
    transform: 'scale(1)'
  };

  const primaryButton = {
    ...buttonStyle,
    backgroundColor: '#ffffff',
    color: '#000000'
  };

  const secondaryButton = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff'
  };

  const productImageStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '12px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)'
  };

  return (
    <div style={{
      backgroundColor: '#000000', 
      color: '#ffffff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(55,65,81,0.3)',
        padding: '16px 0'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <a href="/" style={{textDecoration: 'none'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '36px', width: 'auto'}} />
            </a>
            <div style={{display: 'flex', gap: '32px'}}>
              <a href="/" 
                 style={{color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#d1d5db'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Home
              </a>
              <a href="/products" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Custom Box Rokok
              </a>
              <a href="/KATALOG DALLAS.pdf" 
                 download="KATALOG DALLAS.pdf"
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Katalog
              </a>
              <a href="/paperlisens" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Paperlisens
              </a>
              <a href="#contact" 
                 onClick={(e) => smoothScroll(e, '#contact')}
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Kontak
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #1f2937 100%)',
        padding: '80px 16px 40px'
      }}>
        <div style={{
          textAlign: 'center', 
          maxWidth: '1024px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: typeof window !== 'undefined' ? (window.innerWidth < 640 ? '2.5rem' : window.innerWidth < 768 ? '3rem' : '4rem') : '4rem', 
            fontWeight: '300', 
            marginBottom: typeof window !== 'undefined' && window.innerWidth < 640 ? '16px' : '24px', 
            lineHeight: '1.1'
          }}>
            Premium Quality<br/>
            <span style={{
              fontWeight: '600',
              background: 'linear-gradient(to right, #ffffff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Products
            </span>
          </h1>
          <p style={{
            fontSize: typeof window !== 'undefined' ? (window.innerWidth < 640 ? '1rem' : window.innerWidth < 768 ? '1.25rem' : '1.5rem') : '1.5rem', 
            color: '#9ca3af', 
            fontWeight: '300',
            maxWidth: '600px',
            margin: '0 auto',
            marginBottom: typeof window !== 'undefined' && window.innerWidth < 640 ? '32px' : '48px'
          }}>
            Discover our exceptional range of cigarette and non-cigarette products
          </p>
          <div style={{
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            flexDirection: typeof window !== 'undefined' && window.innerWidth < 480 ? 'column' : 'row',
            alignItems: 'center'
          }}>
            <a href="/KATALOG DALLAS.pdf" 
               download="KATALOG DALLAS.pdf"
               style={{
                 ...primaryButton,
                 padding: typeof window !== 'undefined' && window.innerWidth < 640 ? '10px 24px' : '12px 32px',
                 fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? '14px' : '16px',
                 width: typeof window !== 'undefined' && window.innerWidth < 480 ? '100%' : 'auto',
                 maxWidth: typeof window !== 'undefined' && window.innerWidth < 480 ? '280px' : 'none'
               }}
               onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#f3f4f6'}}
               onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'}}
               onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
               onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
              Download Katalog
            </a>
            <a href="#non-cigarettes" 
               onClick={(e) => smoothScroll(e, '#non-cigarettes')}
               style={{
                 ...secondaryButton,
                 padding: typeof window !== 'undefined' && window.innerWidth < 640 ? '10px 24px' : '12px 32px',
                 fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? '14px' : '16px',
                 width: typeof window !== 'undefined' && window.innerWidth < 480 ? '100%' : 'auto',
                 maxWidth: typeof window !== 'undefined' && window.innerWidth < 480 ? '280px' : 'none'
               }}
               onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'; (e.target as HTMLElement).style.color = '#000000'}}
               onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#ffffff'}}
               onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
               onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
              Non-Cigarette Products
            </a>
          </div>
        </div>
      </section>

      {/* Cigarette Products Section */}
      <section id="cigarettes" style={{
        padding: '80px 0', 
        backgroundColor: '#111827'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
            <h2 style={{fontSize: '3rem', fontWeight: '300', marginBottom: '24px'}}>Custom Cigarette Boxes</h2>
            <p style={{fontSize: '1.25rem', color: '#9ca3af', maxWidth: '512px', margin: '0 auto'}}>
              Premium custom packaging solutions for cigarette brands
            </p>
          </div>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: typeof window !== 'undefined' && window.innerWidth < 768 ? '32px' : '48px', 
            alignItems: 'center'
          }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <h3 style={{fontSize: '2rem', fontWeight: '300'}}>Custom Box Design</h3>
              <p style={{color: '#9ca3af', fontSize: '1.125rem', lineHeight: '1.7'}}>
                Create stunning custom cigarette boxes with our professional design and manufacturing services. 
                We specialize in premium packaging solutions that enhance your brand identity and product presentation.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>Custom design & branding</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>High-quality materials</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>Professional finishing</span>
                </div>
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #374151 0%, #111827 100%)', 
              borderRadius: '24px', 
              padding: '48px', 
              textAlign: 'center'
            }}>
              <div style={{
                width: '128px', 
                height: '128px', 
                margin: '0 auto 24px', 
                background: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <span style={{fontSize: '3rem'}}>🚬</span>
              </div>
              <h4 style={{fontSize: '1.5rem', fontWeight: '500', marginBottom: '8px'}}>Percetakan Dallas</h4>
              <p style={{color: '#9ca3af'}}>Custom cigarette box solutions</p>
            </div>
          </div>
          
          {/* Custom Box Portfolio */}
          <div style={{marginTop: '80px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Our Custom Box Portfolio</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: typeof window !== 'undefined' ? (window.innerWidth < 480 ? '1fr' : window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))') : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : '24px'
            }}>
              {[
                { name: 'IVORY PAPER', description: 'Kertas ini memiliki permukaan halus dan mengkilap, sehingga hasil cetak nya tajam dan berwarna cerah.', image: 'BAHAN-AP.jpg' },
                { name: 'Minimalist Design', description: 'Clean modern aesthetic with matte black finish', image: '' },
                { name: 'Vintage Classic', description: 'Traditional design with vintage typography', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop' },
                { name: 'Bold & Modern', description: 'Contemporary design with vibrant colors', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop' }
              ].map((product, index) => (
                <div key={index} 
                     style={{
                       backgroundColor: '#1f2937',
                       borderRadius: '16px',
                       padding: '16px',
                       cursor: 'pointer',
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                       transform: 'translateY(0)'
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = 'translateY(-8px)';
                       e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                     onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(0.98)'}
                     onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1)'}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      marginBottom: '12px'
                    }}
                  />
                  <h4 style={{fontSize: '1.25rem', fontWeight: '500', marginBottom: '4px'}}>{product.name}</h4>
                  <p style={{color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.5'}}>{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Non-Cigarette Products Section */}
      <section id="non-cigarettes" style={{
        padding: '80px 0', 
        backgroundColor: '#000000'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
            <h2 style={{fontSize: '3rem', fontWeight: '300', marginBottom: '24px'}}>Paperlisens Marketplace</h2>
            <p style={{fontSize: '1.25rem', color: '#9ca3af', maxWidth: '512px', margin: '0 auto'}}>
              Wadah makanan & cup berkualitas tinggi untuk bisnis F&B Anda
            </p>
          </div>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: typeof window !== 'undefined' && window.innerWidth < 768 ? '32px' : '48px', 
            alignItems: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1f2937 0%, #000000 100%)', 
              borderRadius: '24px', 
              padding: '48px', 
              textAlign: 'center'
            }}>
              <div style={{
                width: '128px', 
                height: '128px', 
                margin: '0 auto 24px', 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <span style={{fontSize: '3rem'}}>🥤</span>
              </div>
              <img src="/logo-paperlisens.png" alt="Paperlisens" style={{height: '32px', width: 'auto', marginBottom: '8px'}} />
              <p style={{color: '#9ca3af'}}>Food containers & cups marketplace</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <h3 style={{fontSize: '2rem', fontWeight: '300'}}>Shop on Paperlisens</h3>
              <p style={{color: '#9ca3af', fontSize: '1.125rem', lineHeight: '1.7'}}>
                Browse and purchase premium food containers and cups on our Paperlisens marketplace. 
                Perfect for restaurants, cafes, and food businesses with competitive prices and fast delivery.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>Bulk pricing available</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>Fast delivery service</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%'}}></div>
                  <span>Food-grade materials</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Paperlisens Product Gallery */}
          <div style={{marginTop: '80px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Featured Products on Paperlisens</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: typeof window !== 'undefined' ? (window.innerWidth < 480 ? '1fr' : window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))') : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : '24px'
            }}>
              {[
                { name: 'Cup A Premium - Paper Cup 8oz', price: 'Rp 85.000', originalPrice: 'Rp 95.000', discount: '11%', rating: '4.8', sold: '3.2k', image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop', unit: '/1000 pcs' },
                { name: 'Cup Toast - Food Container', price: 'Rp 95.000', originalPrice: 'Rp 110.000', discount: '14%', rating: '4.5', sold: '2.7k', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop', unit: '/500 pcs' },
                { name: 'Cup C Large - Paper Cup 16oz', price: 'Rp 155.000', originalPrice: 'Rp 175.000', discount: '11%', rating: '4.9', sold: '1.9k', image: 'https://images.unsplash.com/photo-1577303935007-0d306ee134d2?w=300&h=200&fit=crop', unit: '/1000 pcs' },
                { name: 'Cup Toast Es - Container + Tutup', price: 'Rp 125.000', originalPrice: 'Rp 145.000', discount: '14%', rating: '4.7', sold: '1.8k', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop', unit: '/500 pcs' }
              ].map((product, index) => (
                <div key={index} 
                     onClick={() => window.open('/paperlisens', '_blank')}
                     style={{
                       backgroundColor: '#ffffff',
                       color: '#000000',
                       borderRadius: '16px',
                       padding: '0',
                       cursor: 'pointer',
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                       transform: 'translateY(0)',
                       border: '1px solid #e5e7eb',
                       overflow: 'hidden'
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.transform = 'translateY(-4px)';
                       e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                     onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(0.98)'}
                     onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1)'}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{padding: '16px'}}>
                    <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4'}}>{product.name}</h4>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <span style={{color: '#fbbf24', fontSize: '14px'}}>★</span>
                        <span style={{fontSize: '14px', color: '#6b7280'}}>{product.rating}</span>
                      </div>
                      <span style={{fontSize: '14px', color: '#6b7280'}}>|</span>
                      <span style={{fontSize: '14px', color: '#6b7280'}}>{product.sold} terjual</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                      <span style={{fontSize: '1.25rem', fontWeight: '600', color: '#dc2626'}}>{product.price}</span>
                      <span style={{fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through'}}>{product.originalPrice}</span>
                      <span style={{fontSize: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', fontWeight: '500'}}>{product.discount} OFF</span>
                    </div>
                    <div style={{
                      backgroundColor: '#059669',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginTop: '12px'
                    }}>
                      Beli di Paperlisens
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Products Button */}
            <div style={{textAlign: 'center', marginTop: '48px'}}>
              <button
                onClick={() => window.open('/paperlisens', '_blank')}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#047857'}}
                onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = '#059669'}}
                onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                Lihat Semua Produk di Paperlisens
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{
        backgroundColor: '#111827', 
        padding: '48px 0'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px'
          }}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '40px', width: 'auto'}} />
              </div>
              <p style={{color: '#9ca3af'}}>
                Premium quality products for discerning customers.
              </p>
            </div>
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px'}}>Products</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <a href="/KATALOG DALLAS.pdf" 
                   download="KATALOG DALLAS.pdf"
                   style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                   onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.paddingLeft = '8px'}}
                   onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.paddingLeft = '0px'}}>
                  Katalog
                </a>
                <a href="/paperlisens" 
                   style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                   onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.paddingLeft = '8px'}}
                   onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.paddingLeft = '0px'}}>
                  Paperlisens
                </a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px'}}>Contact</h4>
              <div style={{color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <p>Email: info@dallascompany.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #374151', 
            marginTop: '32px', 
            paddingTop: '32px', 
            textAlign: 'center', 
            color: '#9ca3af'
          }}>
            <p>&copy; 2024 Percetakan Dallas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}