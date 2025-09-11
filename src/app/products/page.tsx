'use client';

import { useState, useEffect } from 'react';

// 3D Floating Box Component
const FloatingCigaretteBox = ({ product, delay = 0 }: { product: Product, delay?: number }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        perspective: '1000px',
        animation: `float ${3 + delay * 0.5}s ease-in-out infinite`,
        animationDelay: `${delay * 0.3}s`
      }}
    >
      <div
        style={{
          width: '120px',
          height: '160px',
          margin: '20px auto',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-15deg) rotateX(5deg)',
          transition: 'all 0.3s ease'
        }}
        className="cigarette-box-3d"
      >
        {/* Front Face */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '160px',
            background: getBoxGradient(product.category),
            border: '2px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '8px',
            transform: 'translateZ(30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '8px',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}>
            {product.name}
          </div>
          <div style={{
            width: '80px',
            height: '20px',
            background: 'linear-gradient(90deg, #d97706, #f59e0b)',
            borderRadius: '4px',
            marginBottom: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}></div>
          <div style={{
            fontSize: '8px',
            color: '#e5e7eb',
            textAlign: 'center'
          }}>
            {product.subcategory}
          </div>
        </div>

        {/* Right Face */}
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '160px',
            background: getDarkerGradient(product.category),
            border: '2px solid rgba(217, 119, 6, 0.2)',
            borderRadius: '8px',
            transform: 'rotateY(90deg) translateZ(30px)',
            boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.2)'
          }}
        ></div>

        {/* Top Face */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '60px',
            background: getLighterGradient(product.category),
            border: '2px solid rgba(217, 119, 6, 0.1)',
            borderRadius: '8px',
            transform: 'rotateX(90deg) translateZ(80px)',
            boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.1)'
          }}
        ></div>
      </div>
    </div>
  );
};

// Helper functions for box gradients
const getBoxGradient = (category: string) => {
  switch (category) {
    case 'Premium':
      return 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)';
    case 'Standard':
      return 'linear-gradient(135deg, #374151 0%, #4b5563 50%, #374151 100%)';
    case 'Eco':
      return 'linear-gradient(135deg, #065f46 0%, #047857 50%, #065f46 100%)';
    default:
      return 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)';
  }
};

const getDarkerGradient = (category: string) => {
  switch (category) {
    case 'Premium':
      return 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)';
    case 'Standard':
      return 'linear-gradient(135deg, #1f2937 0%, #374151 100%)';
    case 'Eco':
      return 'linear-gradient(135deg, #042f2e 0%, #065f46 100%)';
    default:
      return 'linear-gradient(135deg, #111827 0%, #1f2937 100%)';
  }
};

const getLighterGradient = (category: string) => {
  switch (category) {
    case 'Premium':
      return 'linear-gradient(135deg, #2d2d2d 0%, #404040 100%)';
    case 'Standard':
      return 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)';
    case 'Eco':
      return 'linear-gradient(135deg, #047857 0%, #059669 100%)';
    default:
      return 'linear-gradient(135deg, #374151 0%, #4b5563 100%)';
  }
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  nicotineLevel: string;
  tarLevel: string;
  flavor: string;
  packSize: string;
}

const customBoxProducts: Product[] = [
  {
    id: '1',
    name: 'Custom Box Premium Gold',
    description: 'Kotak rokok custom dengan finishing gold foil dan emboss texture premium',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Luxury',
    brand: 'Dallas Custom',
    nicotineLevel: 'Foil Emas',
    tarLevel: 'Emboss',
    flavor: 'Magnetic Close',
    packSize: '1000 pcs'
  },
  {
    id: '2',
    name: 'Custom Box Matte Black',
    description: 'Desain minimalis dengan finishing matte black dan UV spot varnish',
    price: 720000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Modern',
    brand: 'Dallas Custom',
    nicotineLevel: 'Matte Finish',
    tarLevel: 'UV Spot',
    flavor: 'Sleek Design',
    packSize: '1000 pcs'
  },
  {
    id: '3',
    name: 'Custom Box Vintage Classic',
    description: 'Gaya vintage dengan tipografi klasik dan texture kertas premium',
    price: 680000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Vintage',
    brand: 'Dallas Custom',
    nicotineLevel: 'Texture Paper',
    tarLevel: 'Classic Font',
    flavor: 'Vintage Style',
    packSize: '1000 pcs'
  },
  {
    id: '4',
    name: 'Custom Box Eco Friendly',
    description: 'Ramah lingkungan dengan bahan recycled dan tinta soy-based',
    price: 590000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Eco',
    subcategory: 'Green',
    brand: 'Dallas Custom',
    nicotineLevel: 'Recycled',
    tarLevel: 'Soy Ink',
    flavor: 'Eco Design',
    packSize: '1000 pcs'
  },
  {
    id: '5',
    name: 'Custom Box Holographic',
    description: 'Efek holographic rainbow dengan lamination khusus anti pemalsuan',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Special Effect',
    brand: 'Dallas Custom',
    nicotineLevel: 'Holographic',
    tarLevel: 'Security',
    flavor: 'Rainbow Effect',
    packSize: '1000 pcs'
  },
  {
    id: '6',
    name: 'Custom Box Soft Touch',
    description: 'Tekstur soft touch dengan lamination khusus untuk sensasi premium',
    price: 780000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Texture',
    brand: 'Dallas Custom',
    nicotineLevel: 'Soft Touch',
    tarLevel: 'Premium Feel',
    flavor: 'Luxury Texture',
    packSize: '1000 pcs'
  },
  {
    id: '7',
    name: 'Custom Box Window Cut',
    description: 'Desain dengan jendela transparan untuk preview produk dalam kemasan',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Window',
    brand: 'Dallas Custom',
    nicotineLevel: 'Clear Window',
    tarLevel: 'Preview',
    flavor: 'Transparent',
    packSize: '1000 pcs'
  },
  {
    id: '8',
    name: 'Custom Box Gradient Color',
    description: 'Efek gradasi warna modern dengan teknologi printing terbaru',
    price: 710000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Gradient',
    brand: 'Dallas Custom',
    nicotineLevel: 'Gradient Print',
    tarLevel: 'Modern Tech',
    flavor: 'Color Blend',
    packSize: '1000 pcs'
  }
];

export default function ProductsPage() {
  // Add CSS keyframes for floating animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateY(-15deg) rotateX(5deg); }
        50% { transform: translateY(-10px) rotateY(-15deg) rotateX(5deg); }
      }
      
      .cigarette-box-3d:hover {
        transform: rotateY(15deg) rotateX(-5deg) scale(1.1) !important;
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3); }
        50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6), 0 0 60px rgba(217, 119, 6, 0.3); }
      }
      
      .product-card-hover {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(customBoxProducts);

  const categories = ['All', 'Premium', 'Standard', 'Eco'];
  const productsPerSlide = 4;
  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(customBoxProducts);
    } else {
      setFilteredProducts(customBoxProducts.filter(product => product.category === selectedCategory));
    }
    setCurrentSlide(0);
  }, [selectedCategory]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideProducts = () => {
    const start = currentSlide * productsPerSlide;
    return filteredProducts.slice(start, start + productsPerSlide);
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
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
            <a href="/" style={{fontSize: '20px', fontWeight: '600', color: '#ffffff', textDecoration: 'none'}}>
              Percetakan Dallas
            </a>
            <div style={{display: 'flex', gap: '32px'}}>
              <a href="/" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Home
              </a>
              <a href="/products" 
                 style={{color: '#ffffff', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#d1d5db'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Custom Box Rokok
              </a>
              <a href="/#cigarettes" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Portfolio
              </a>
              <a href="/paperlisens" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Paperlisens
              </a>
              <a href="/#contact" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.transform = 'translateY(0)'}}>
                Kontak
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #1f2937 100%)'
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '300',
            marginBottom: '16px',
            background: 'linear-gradient(to right, #ffffff, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Custom Box Rokok
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#9ca3af',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Layanan percetakan kotak rokok custom dengan berbagai pilihan finishing premium
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{padding: '0 24px', marginBottom: '40px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: selectedCategory === category ? '2px solid #d97706' : '2px solid transparent',
                  backgroundColor: selectedCategory === category ? '#d97706' : 'rgba(55,65,81,0.3)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(55,65,81,0.5)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(55,65,81,0.3)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section style={{padding: '0 24px', marginBottom: '80px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', position: 'relative'}}>
          
          {/* Carousel Navigation */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px'}}>
            <button
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid #374151',
                backgroundColor: 'transparent',
                color: '#ffffff',
                cursor: totalSlides <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: totalSlides <= 1 ? 0.3 : 1
              }}
              onMouseOver={(e) => {
                if (totalSlides > 1) {
                  (e.target as HTMLElement).style.borderColor = '#d97706';
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(217, 119, 6, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (totalSlides > 1) {
                  (e.target as HTMLElement).style.borderColor = '#374151';
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              ←
            </button>

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              width: '100%',
              maxWidth: '1000px'
            }}>
              {getCurrentSlideProducts().map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    backgroundColor: '#1f2937',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    border: '2px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(217, 119, 6, 0.6), 0 0 0 1px rgba(217, 119, 6, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = '#f59e0b';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, #1f2937 50%, rgba(217, 119, 6, 0.05) 100%)';
                    
                    // Add glowing effect to 3D box
                    const box3D = e.currentTarget.querySelector('.cigarette-box-3d') as HTMLElement;
                    if (box3D) {
                      box3D.style.transform = 'rotateY(15deg) rotateX(-5deg) scale(1.1)';
                      box3D.style.filter = 'drop-shadow(0 10px 20px rgba(217, 119, 6, 0.4))';
                    }
                    
                    // Add glow to entire card
                    e.currentTarget.classList.add('product-card-hover');
                    
                    // Trigger shine effect
                    const shineEffect = e.currentTarget.querySelector('.shine-effect') as HTMLElement;
                    if (shineEffect) {
                      shineEffect.style.transform = 'translateX(100%)';
                    }
                    
                    // Glow effect on category badge
                    const categoryBadge = e.currentTarget.querySelector('div[style*="backgroundColor: #d97706"]') as HTMLElement;
                    if (categoryBadge) {
                      categoryBadge.style.boxShadow = '0 4px 20px rgba(217, 119, 6, 0.6), 0 0 20px rgba(217, 119, 6, 0.3)';
                      categoryBadge.style.transform = 'scale(1.1)';
                    }
                    
                    // Glow effect on product title
                    const productTitle = e.currentTarget.querySelector('.product-title') as HTMLElement;
                    if (productTitle) {
                      productTitle.style.textShadow = '0 0 20px rgba(217, 119, 6, 0.5)';
                      productTitle.style.color = '#f59e0b';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = '#1f2937';
                    
                    // Reset 3D box
                    const box3D = e.currentTarget.querySelector('.cigarette-box-3d') as HTMLElement;
                    if (box3D) {
                      box3D.style.transform = 'rotateY(-15deg) rotateX(5deg) scale(1)';
                      box3D.style.filter = 'none';
                    }
                    
                    // Remove glow from card
                    e.currentTarget.classList.remove('product-card-hover');
                    
                    // Reset shine effect
                    const shineEffect = e.currentTarget.querySelector('.shine-effect') as HTMLElement;
                    if (shineEffect) {
                      shineEffect.style.transform = 'translateX(-100%)';
                    }
                    
                    // Reset category badge
                    const categoryBadge = e.currentTarget.querySelector('div[style*="backgroundColor: #d97706"]') as HTMLElement;
                    if (categoryBadge) {
                      categoryBadge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                      categoryBadge.style.transform = 'scale(1)';
                    }
                    
                    // Reset product title
                    const productTitle = e.currentTarget.querySelector('.product-title') as HTMLElement;
                    if (productTitle) {
                      productTitle.style.textShadow = 'none';
                      productTitle.style.color = '#ffffff';
                    }
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: 'transparent',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.3s ease'
                  }}>
                    <FloatingCigaretteBox product={product} delay={getCurrentSlideProducts().indexOf(product)} />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(217, 119, 6, 0.1) 50%, transparent 70%)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                      pointerEvents: 'none'
                    }} className="shine-effect"></div>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#d97706',
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      zIndex: 10
                    }}>
                      {product.category}
                    </div>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }} className="product-title">
                    {product.name}
                  </h3>
                  
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#d97706'
                    }}>
                      Rp {product.price.toLocaleString()}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>
                      {product.packSize}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '11px',
                    color: '#9ca3af'
                  }}>
                    <div>Finishing: {product.nicotineLevel}</div>
                    <div>Teknik: {product.tarLevel}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px solid #374151',
                backgroundColor: 'transparent',
                color: '#ffffff',
                cursor: totalSlides <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: totalSlides <= 1 ? 0.3 : 1
              }}
              onMouseOver={(e) => {
                if (totalSlides > 1) {
                  (e.target as HTMLElement).style.borderColor = '#d97706';
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(217, 119, 6, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (totalSlides > 1) {
                  (e.target as HTMLElement).style.borderColor = '#374151';
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              →
            </button>
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '32px'
            }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: currentSlide === index ? '#d97706' : '#374151',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '24px'
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
              <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', margin: 0}}>
                {selectedProduct.name}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              width: '100%',
              height: '250px',
              backgroundColor: 'transparent',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ transform: 'scale(1.5)' }}>
                <FloatingCigaretteBox product={selectedProduct} delay={0} />
              </div>
            </div>

            <p style={{color: '#9ca3af', marginBottom: '20px', lineHeight: '1.6'}}>
              {selectedProduct.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Kategori</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.category}</div>
              </div>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Layanan</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.brand}</div>
              </div>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Finishing</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.nicotineLevel}</div>
              </div>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Teknik</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.tarLevel}</div>
              </div>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Spesial</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.flavor}</div>
              </div>
              <div>
                <span style={{color: '#9ca3af', fontSize: '14px'}}>Min. Order</span>
                <div style={{color: '#ffffff', fontWeight: '500'}}>{selectedProduct.packSize}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderTop: '1px solid #374151'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#d97706'
              }}>
                Rp {selectedProduct.price.toLocaleString()}
              </span>
              <button
                style={{
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = '#b45309'}
                onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = '#d97706'}
              >
                Konsultasi & Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}