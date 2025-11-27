'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const ClassicProductCardGrid = () => {
  const categories = [
    { title: "Skincare", img: "/foto skincare.png", desc: "Kemasan cetak premium dengan detail presisi, warna memukau, dan finishing elegan.", tags: ["Estetika", "Mewah"] },
    { title: "Obat", img: "/foto obat.png", desc: "Solusi cetak kemasan farmasi standar regulasi, informasi jelas, dan presisi.", tags: ["Regulasi", "Aman"] },
    { title: "Rokok", img: "/foto rokok.png", desc: "Cetak box rokok dengan detail grafis tajam dan material berkualitas tinggi.", tags: ["Tajam", "Konsisten"] },
    { title: "Makanan", img: "/foto makanan.png", desc: "Warna cerah, desain menarik, dan material food-grade yang aman.", tags: ["Food-grade", "Menarik"] },
    { title: "Buku", img: "/foto buku.png", desc: "Teks jelas, gambar tajam, binding kuat untuk pengalaman membaca terbaik.", tags: ["Binding Kuat"] },
    { title: "Kalender", img: "/foto kalender.png", desc: "Desain menarik dan material terbaik, alat promosi fungsional.", tags: ["Fungsional"] },
    { title: "Paperbag", img: "/foto paperbag.png", desc: "Paperbag kuat, stylish, dan mencerminkan identitas brand.", tags: ["Premium", "Kuat"] },
    { title: "Stiker", img: "/foto sticker.png", desc: "Daya rekat optimal dan potongan presisi untuk branding.", tags: ["Presisi"] },
    { title: "Brosur", img: "/foto brosur.png", desc: "Informasi jelas, gambar memukau, dan lipatan presisi.", tags: ["Informatif"] }
  ];

  return (
    <div className="max-w-7xl mx-auto relative px-4 pb-10">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {categories.map((category, i) => (
          <motion.div
            key={`${category.title}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '16px',
              padding: '16px',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              transform: 'scale(1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={category.img}
              alt={category.title}
              style={{
                width: '100%',
                height: '250px',
                borderRadius: '12px',
                objectFit: 'cover',
                marginBottom: '16px'
              }}
            />
            <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '8px', color: 'white' }}>{category.title}</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '16px', flexGrow: 1 }}>{category.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
              {category.tags.map(tag => (
                <span key={tag} style={{ backgroundColor: '#374151', color: '#d1d5db', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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

// --- Banner Slider Component ---
const BannerSlider = ({ images, interval = 10000 }: { images: string[], interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [currentIndex, images.length, interval]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner ${index + 1}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center', // Explicitly center the image
            opacity: currentIndex === index ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      ))}

      {/* Previous Button */}
      <button
        onClick={goToPrevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          zIndex: 10,
        }}
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          zIndex: 10,
        }}
      >
        &#10095;
      </button>

      {/* Navigation Dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            style={{
              height: '8px',
              width: '8px',
              borderRadius: '50%',
              backgroundColor: currentIndex === slideIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

  const mainBanners = ['/main banner dallas.png', '/main banner dallas 2.png', '/main banner dallas 3.png', '/main banner dallas 4.png'];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false); // < 480px
  const [isMediumMobile, setIsMediumMobile] = useState(false); // < 640px
  const [isLargeMobile, setIsLargeMobile] = useState(false); // < 768px

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMediumMobile(window.innerWidth < 640);
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Custom Box Rokok' },
    { href: '/KATALOG DALLAS.pdf', label: 'Katalog', download: true },
    { href: '/paperlisens', label: 'Paperlisens' },
    { href: '#contact', label: 'Kontak', isScroll: true },
  ];

  const renderNavLinks = () => navLinks.map(link => (
    <a
      key={link.label}
      href={link.href}
      download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
      onClick={(e) => {
        if (link.isScroll) smoothScroll(e, link.href);
        setIsMenuOpen(false);
      }}
      style={{
        color: link.href === '/' ? '#ffffff' : '#9ca3af',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        padding: isLargeMobile ? '16px 0' : '0',
        textAlign: isLargeMobile ? 'center' : 'left',
        borderBottom: isLargeMobile ? '1px solid rgba(55,65,81,0.5)' : 'none',
        width: isLargeMobile ? '100%' : 'auto'
      }}
      onMouseOver={(e) => {
        if (!isLargeMobile) {
          (e.target as HTMLElement).style.color = '#ffffff';
          (e.target as HTMLElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseOut={(e) => {
        if (!isLargeMobile) {
          (e.target as HTMLElement).style.color = link.href === '/' ? '#ffffff' : '#9ca3af';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {link.label}
    </a>
  ));
  
  return (
    <div style={{
      backgroundColor: '#000000', 
      color: '#ffffff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* Top Bar Contact Info & Social Media */}
      <div style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '12px',
        padding: isLargeMobile ? '4px 0' : '8px 0', // Reduced vertical padding for mobile
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: isLargeMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexWrap: isLargeMobile ? 'wrap' : 'nowrap',
          gap: isLargeMobile ? '8px' : '0'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {!isLargeMobile && (
              <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <Icon icon="mdi:map-marker" style={{ fontSize: '14px' }} />
                Jl. Kilisuci no 71, Singonegaran, Kec. Kota, Kota Kediri.
              </span>
            )}
            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <Icon icon="mdi:phone" style={{ fontSize: '14px' }} />
              {isLargeMobile ? '081260001487' : '081260001487 | 085946896488 | 085235531946'} {/* Display only one number on mobile */}
            </span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Instagram">
              <Icon icon="mdi:instagram" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://vt.tiktok.com/ZSf8cvXGB/?page=Mall" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="TikTok">
              <Icon icon="ic:baseline-tiktok" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Shopee Paperlisens">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Shopee Tray&me">
              <Icon icon="ic:baseline-shopping-bag" style={{ fontSize: '18px' }} />
            </a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" style={{color: '#000000'}} title="Facebook">
              <Icon icon="mdi:facebook" style={{ fontSize: '18px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '36px',
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid rgba(55,65,81,0.3)',
      }}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0'}}>
            <a href="/" style={{textDecoration: 'none'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '36px', width: 'auto'}} />
            </a>

            {isLargeMobile ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{background: 'none', border: 'none', color: 'white', fontSize: '24px'}}>
                <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
              </button>
            ) : (
              <div style={{display: 'flex', gap: '32px'}}>
                {renderNavLinks()}
              </div>
            )}
          </div>

          {isLargeMobile && isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 24px 16px',
            }}>
              {renderNavLinks()}
            </div>
          )}
        </div>
      </nav>

            {/* Hero Section */}
            <section style={{
              height: isLargeMobile ? '60vw' : 'calc(100vh - 88px)',
              position: 'relative',
              marginTop: '88px'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <BannerSlider images={mainBanners} />
              </div>
            </section>

            {/* Company Profile Section */}
            <section style={{
              padding: isMediumMobile ? '64px 24px' : '128px 24px',
              textAlign: 'center',
              backgroundColor: '#1f2937',
              color: '#ffffff'
            }}>
                <div style={{maxWidth: '800px', margin: '0 auto'}}>
                    <h2 style={{
                      fontSize: isMediumMobile ? '2rem' : '2.5rem',
                      fontWeight: '600',
                      marginBottom: '16px',
                      lineHeight: '1.2'
                    }}>
                        Sejak 1983: Warisan Kepercayaan dan Kualitas Tak Tertandingi
                    </h2>
                    <p style={{
                      fontSize: isMediumMobile ? '1rem' : '1.125rem',
                      color: '#e5e7eb',
                      lineHeight: '1.75'
                    }}>
                        Percetakan Offset Dallas adalah pionir dan pemimpin dalam industri percetakan offset di Kediri, dengan rekam jejak yang tak terputus sejak didirikan pada tahun 1983. Dengan pengalaman yang kaya selama lebih dari empat dekade, kami telah menguasai seni dan teknologi cetak, selalu mengutamakan kualitas tinggi untuk memenuhi dan melampaui kebutuhan spesifik setiap pelanggan.
                        Komitmen kami dibuktikan dengan layanan kepada puluhan ribu klien dari berbagai skala industri, menegaskan konsistensi dan keandalan hasil cetak kami.
                    </p>
                </div>
            </section>

            {/* Premium Quality Section */}
            <section style={{
                padding: isMediumMobile ? '64px 24px' : '128px 24px',
                textAlign: 'center',
                backgroundColor: '#000000',
                color: '#ffffff'
            }}>
                <h1 style={{
                  fontSize: isMediumMobile ? '2.5rem' : (isLargeMobile ? '3rem' : '4rem'),
                  fontWeight: '300',
                  marginBottom: isMediumMobile ? '16px' : '24px',
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
                  fontSize: isMediumMobile ? '1rem' : (isLargeMobile ? '1.25rem' : '1.5rem'),
                  color: '#9ca3af',
                  fontWeight: '300',
                  maxWidth: '600px',
                  margin: '0 auto',
                  marginBottom: isMediumMobile ? '32px' : '48px'
                }}>
                  Discover our exceptional range of cigarette and non-cigarette products
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  flexDirection: isSmallMobile ? 'column' : 'row',
                  alignItems: 'center'
                }}>
                  <a href="/KATALOG DALLAS.pdf"
                     download="KATALOG DALLAS.pdf"
                     style={{
                       ...primaryButton,
                       padding: isMediumMobile ? '10px 24px' : '12px 32px',
                       fontSize: isMediumMobile ? '14px' : '16px',
                       width: isSmallMobile ? '100%' : 'auto',
                       maxWidth: isSmallMobile ? '280px' : 'none'
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
                       padding: isMediumMobile ? '10px 24px' : '12px 32px',
                       fontSize: isMediumMobile ? '14px' : '16px',
                       width: isSmallMobile ? '100%' : 'auto',
                       maxWidth: isSmallMobile ? '280px' : 'none'
                     }}
                     onMouseOver={(e) => {(e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.backgroundColor = '#ffffff'; (e.target as HTMLElement).style.color = '#000000'}}
                     onMouseOut={(e) => {(e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#ffffff'}}
                     onMouseDown={(e) => (e.target as HTMLElement).style.transform = 'scale(0.95)'}
                     onMouseUp={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}>
                    Non-Cigarette Products
                  </a>
                </div>
            </section>

      {/* Classic Product Card Grid Section */}
      <section id="classic-products" className="bg-slate-900 py-[100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight">
            Produk Unggulan Kami
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl font-light text-slate-400 mb-20">
            Temukan berbagai solusi cetak berkualitas tinggi untuk kebutuhan bisnis Anda.<br /><br />
          </p>
        </div>
        <ClassicProductCardGrid />
      </section>

      {/* Restored Materials Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#111827' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: '0' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px', color: 'white' }}>BEBERAPA BAHAN UNGGULAN KAMI</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isSmallMobile ? '1fr' : (isLargeMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))'),
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: 'ART PAPER', description: 'Kertas ini memiliki permukaan halus dan mengkilap, sehingga hasil cetak nya tajam dan berwarna cerah.', image: 'BAHAN-AP.jpg' },
                { name: 'IVORY PAPER', description: 'Jenis kertas kemasan glossy/doff yang memadukan art carton dan matte paper, elegan sekaligus kuat.', image: 'BAHAN-IVORY.JPG' },
                { name: 'Metalize', description: 'Kertas dengan lapisan logam tipis hasil proses metalisasi, tahan uap air dan cahaya.', image: 'BAHAN-METALIZE.JPG' },
                { name: 'Duplex', description: 'Kertas karton daur ulang berlapis white liner, dengan satu sisi putih dan satu sisi abu-abu.', image: 'BAHAN-DC.jpg' }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1)'}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '250px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      marginBottom: '12px'
                    }}
                  />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '4px', color: 'white' }}>{product.name}</h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.5' }}>{product.description}</p>
                </motion.div>
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
          <div style={{textAlign: 'center', marginBottom: '48px'}}>
            <h2 style={{fontSize: '3rem', fontWeight: '300', marginBottom: '24px'}}>Solusi Kemasan Berkualitas Sejak 2022</h2>
            <p style={{fontSize: '1.25rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto'}}>
              Paperlisens memahami bahwa kemasan adalah wajah brand kuliner Anda. Sejak 2022, kami berdedikasi menyediakan papertray dan box takeaway terbaik melalui layanan online yang mudah dan cepat. Kepercayaan ribuan pelanggan di berbagai marketplace membuktikan komitmen kami dalam membantu bisnis Anda tampil lebih profesional.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginTop: '48px' }}>
            <img src="/paperlisens%20banner%20(1).png" alt="Paperlisens Banner 1" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }} />
            <img src="/paperlisens%20banner%20(2).png" alt="Paperlisens Banner 2" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }} />
          </div>
          <br /><br />
          <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Produk Unggulan Kami</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}>
            {/* Card 1 */}
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="/paperlisens%20produk%20unggulan%20(1).png"
                alt="Solusi Cup Serbaguna & Trendi"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>Solusi Cup Serbaguna & Trendi</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  Bukan sekadar wadah, tapi panggung untuk sajian kuliner Anda. Mulai dari Cup Toast untuk roti panggang, hingga berbagai varian cup (Tipe A, B, Sakura, dan Es) yang dirancang presisi. Bentuk tray yang estetik ini sangat pas untuk menyajikan aneka finger food, gorengan, atau jajanan kekinian agar terlihat lebih penuh, menarik, dan pastinya Instagramable.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img
                src="/paperlisens%20produk%20unggulan%20(2).png"
                alt="Kotak Donat Berbagai Ukuran"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '16px', color: '#ffffff' }}>Kotak Donat Berbagai Ukuran</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6' }}>
                  Apapun kebutuhan porsi jualan Anda, kami punya kotaknya! Tersedia mulai dari ukuran personal (isi 1 & 2) hingga ukuran keluarga atau hampers (isi 3 & 6). Didesain dengan material yang kokoh untuk menjaga bentuk donat tetap sempurna dan cantik hingga ke tangan pelanggan.
                </p>
              </div>
            </div>
          </div>
          
          {/* Paperlisens Product Gallery */}
          <div style={{marginTop: '80px'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px'}}>Featured Products on Paperlisens</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isSmallMobile ? '1fr' : (isLargeMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))'),
              gap: isLargeMobile ? '16px' : '24px'
            }}>
              {[
                { name: 'Cup A', price: 'Rp 21.500', variant: 'Best Seller', rating: '4.9', sold: '15k+', image: '/dallas%20cup%20a.png' },
                { name: 'Cup B', price: 'Rp 23.210', variant: 'Ekonomis', rating: '4.6', sold: '3.2k', image: '/dallas%20cup%20b.png' },
                { name: 'Donat isi 3', price: 'Rp 37.770', variant: 'Premium', rating: '4.8', sold: '1.4k', image: '/dallas%20donat%20isi%203.png' },
                { name: 'Donat isi 6', price: 'Rp 42.865', variant: 'Wholesale', rating: '4.8', sold: '1.2k', image: '/dallas%20donat%20isi%206.png' }
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
                      <span style={{fontSize: '0.75rem', backgroundColor: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: '500'}}>{product.variant}</span>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281260001487?text=halo%20kak%20aku%20ingin%20tanya%20tanya"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 999,
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Chat via WhatsApp"
      >
        <Icon icon="mdi:whatsapp" style={{ fontSize: '32px' }} />
      </a>
    </div>
  );
}