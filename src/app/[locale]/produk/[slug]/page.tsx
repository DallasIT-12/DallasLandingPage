'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';

export default function ProductCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const t = useTranslations('Categories');
  const tMaterials = useTranslations('Materials');
  const tCommon = useTranslations('Common');

  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset zoom when image changes or closes
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedImage]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Construct categories dynamically from translations
  const dallasCategories = useMemo(() => [
    { title: t('hampers.title'), slug: "kotak-hampers", img: "/kotak hampers.jpg", desc: t('hampers.desc'), tags: [t('hampers.tags.tag1'), t('hampers.tags.tag2')], gallery: ["/kotak hampers.jpg"] },
    { title: t('bakery.title'), slug: "kotak-bakery", img: "/kotak cake.jpg", desc: t('bakery.desc'), tags: [t('bakery.tags.tag1'), t('bakery.tags.tag2')], gallery: ["/kotak cake.jpg"] },
    { title: t('rokok.title'), slug: "rokok", img: "/custom rokok 3.jpg", desc: t('rokok.desc'), tags: [t('rokok.tags.tag1'), t('rokok.tags.tag2')], gallery: ["/custom rokok.jpg", "/custom rokok 1.jpg", "/custom rokok 2.jpg", "/custom rokok 3.jpg", "/custom rokok 4.jpg", "/custom rokok (1).jpg", "/custom rokok (2).jpg", "/custom rokok (3).jpg", "/custom rokok (4).jpg", "/custom rokok (5).jpg", "/custom rokok (6).jpg", "/custom rokok (7).jpg", "/custom rokok (8).jpg", "/custom rokok (9).jpg", "/custom rokok (10).jpg", "/custom rokok (11).jpg", "/custom rokok (12).jpg", "/custom rokok (13).jpg", "/custom rokok (14).jpg", "/custom rokok (15).jpg", "/custom rokok (16).jpg", "/custom rokok (17).jpg", "/custom rokok (18).jpg", "/custom rokok (19).jpg", "/custom rokok (20).jpg", "/custom rokok (21).jpg", "/custom rokok (22).jpg", "/custom rokok (23).jpg", "/custom rokok (24).jpg"] },
    { title: t('nasi.title'), slug: "kotak-nasi", img: "/mobile_banner_2.jpg", desc: t('nasi.desc'), tags: [t('nasi.tags.tag1'), t('nasi.tags.tag2')], gallery: ["/mobile_banner_2.jpg"] },
    { title: t('buku.title'), slug: "buku", img: "/buku (6).jpg", desc: t('buku.desc'), tags: [t('buku.tags.tag1')], gallery: ["/buku (1).jpg", "/buku (2).jpg", "/buku (3).jpg", "/buku (4).jpg", "/buku (5).jpg", "/buku (6).jpg", "/buku (7).jpg", "/buku (8).jpg", "/buku (9).jpg"] },
    { title: t('kalender.title'), slug: "kalender", img: "/foto kalender.png", desc: t('kalender.desc'), tags: [t('kalender.tags.tag1')], gallery: ["/foto kalender.png"] },
    { title: t('paperbag.title'), slug: "paperbag", img: "/paperbag.jpg", desc: t('paperbag.desc'), tags: [t('paperbag.tags.tag1'), t('paperbag.tags.tag2')], gallery: ["/paperbag.jpg", "/paperbag (2).jpg", "/paperbag (3).jpg"] },
    { title: t('map.title'), slug: "map", img: "/map.jpg", desc: t('map.desc'), tags: [t('map.tags.tag1'), t('map.tags.tag2')], gallery: ["/map.jpg", "/map (1).jpg", "/map (2).jpg", "/map (3).jpg", "/map (4).jpg", "/map (5).jpg", "/map (6).jpg", "/map (7).jpg", "/map (8).jpg", "/map (9).jpg", "/map (10).jpg", "/map (11).jpg"] },
    { title: t('brosur.title'), slug: "brosur", img: "/foto brosur.png", desc: t('brosur.desc'), tags: [t('brosur.tags.tag1')], gallery: ["/foto brosur.png"] },
    
    // Materials
    { title: tMaterials('artPaper.name'), slug: "art-paper", img: "/BAHAN-AP.jpg", desc: tMaterials('artPaper.desc'), tags: [], gallery: ["/BAHAN-AP.jpg"] },
    { title: tMaterials('ivoryPaper.name'), slug: "ivory-paper", img: "/BAHAN-IVORY.jpg", desc: tMaterials('ivoryPaper.desc'), tags: [], gallery: ["/BAHAN-IVORY.jpg"] },
    { title: tMaterials('tipping.name'), slug: "bahan-tipping", img: "/BAHAN-TIPPING.jpg", desc: tMaterials('tipping.desc'), tags: [], gallery: ["/BAHAN-TIPPING.jpg"] },
    { title: tMaterials('duplex.name'), slug: "duplex", img: "/BAHAN-DC.jpg", desc: tMaterials('duplex.desc'), tags: [], gallery: ["/BAHAN-DC.jpg"] }
  ], [t, tMaterials]);

  const category = dallasCategories.find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', color: '#111827', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon icon="mdi:arrow-left" />
                {tCommon('back')}
            </button>
        </header>
        <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', color: '#1f2937' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>{tCommon('categoryNotFound')}</h1>
            <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>{tCommon('categoryNotFoundDesc')}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#111827' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'saturate(180%) blur(20px)',
        padding: isLargeMobile ? '1rem 1.5rem' : '1rem 2rem', 
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                <Icon icon="mdi:arrow-left" style={{ fontSize: '1.5rem' }} />
                {!isLargeMobile && <span>{tCommon('back')}</span>}
            </button>
            <h1 style={{ fontSize: isLargeMobile ? '1.125rem' : '1.5rem', fontWeight: '600', textAlign: 'center' }}>
              {category.title}
            </h1>
            <div style={{width: isLargeMobile ? '24px' : '80px'}}></div> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: isLargeMobile ? '1.5rem' : '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: isLargeMobile ? '2rem' : '3rem', fontSize: isLargeMobile ? '1rem' : '1.125rem', color: '#4b5563', textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem' }}>
          {category.desc}
        </p>

        {/* Gallery Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isLargeMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: isLargeMobile ? '1rem' : '1.5rem' 
        }}>
          {category.gallery.map((imageSrc, index) => (
            <div key={index} 
                 onClick={() => setSelectedImage(imageSrc)}
                 style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%', // 1:1 Aspect Ratio
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    cursor: 'pointer'
            }}>
              <Image
                src={imageSrc}
                alt={`${category.title} - ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                className="hover:scale-105"
              />
            </div>
          ))}
        </div>

        {category.gallery.length <= 1 && (
            <div style={{textAlign: 'center', padding: '3rem', marginTop: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                <p style={{color: '#6b7280'}}>{tCommon('moreExamplesComing')}</p>
            </div>
        )}
      </main>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            overflow: 'auto', // Enable native scrolling
            display: 'flex',
            // Only center when not zoomed (to avoid clipping when zoomed)
            alignItems: zoomLevel > 1 ? 'flex-start' : 'center', 
            justifyContent: zoomLevel > 1 ? 'flex-start' : 'center',
          }}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed', // Keep button fixed
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 110,
              color: 'white',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Icon icon="mdi:close" style={{ fontSize: '24px' }} />
          </button>

          <div 
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(prev => prev === 1 ? 2.5 : 1);
            }}
            style={{ 
              position: 'relative',
              // Zoom logic: width auto / height auto allows image to expand
              minWidth: zoomLevel > 1 ? '250vw' : 'auto', 
              minHeight: zoomLevel > 1 ? '250vh' : 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
              padding: '20px'
            }}
          >
             <img 
               src={selectedImage} 
               alt="Zoomed View" 
               style={{ 
                 maxWidth: zoomLevel > 1 ? 'none' : '100vw',
                 maxHeight: zoomLevel > 1 ? 'none' : '100vh',
                 width: zoomLevel > 1 ? 'auto' : '100%',
                 height: zoomLevel > 1 ? 'auto' : '100%',
                 objectFit: 'contain',
                 userSelect: 'none',
                 transform: zoomLevel > 1 ? 'scale(1)' : 'none', // Reset transform, use dimensions
               }} 
             />
          </div>
          
          {/* Zoom Hint */}
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '8px 16px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '14px',
            pointerEvents: 'none',
            backdropFilter: 'blur(4px)',
            zIndex: 110
          }}>
            {zoomLevel === 1 ? 'Click to Zoom' : 'Click/Scroll to Pan'}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}