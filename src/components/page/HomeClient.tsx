'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Link, useRouter } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

const PromoBanner = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations('Promo');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            left: '24px',
            maxWidth: '480px',
            marginLeft: 'auto',
            zIndex: 9999,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 160, 23, 0.1)'
          }}
        >
          {/* Compact Banner (always visible) */}
          <div
            onClick={(e) => {
              // Ignore clicks on the close button to prevent expanding when trying to close
              if ((e.target as HTMLElement).closest('button')) {
                return;
              }
              setIsExpanded(!isExpanded);
            }}
            style={{
              background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative glow */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 160, 23, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #D4A017, #B8860B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(212, 160, 23, 0.3)'
            }}>
              <Icon icon="mdi:gift-outline" style={{ fontSize: '24px', color: '#fff' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', margin: 0, lineHeight: 1.3 }}>
                {t('title')}
              </h4>
              <p style={{ color: '#BDD8E9', fontSize: '0.8rem', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t('subtitle')}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <Icon
                icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'}
                style={{ fontSize: '20px', color: '#BDD8E9', transition: 'transform 0.3s' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                <Icon icon="mdi:close" style={{ fontSize: '16px', color: '#BDD8E9' }} />
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ backgroundColor: '#ffffff', padding: '24px' }}>
                  <p
                    style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}
                    dangerouslySetInnerHTML={{ __html: t.raw('description') }}
                  />

                  <ul style={{ color: '#374151', fontSize: '0.85rem', listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '16px', flexShrink: 0 }} />
                      {t('point1')}
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                      <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '16px', flexShrink: 0 }} />
                      {t('point2')}
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon="mdi:check-circle" style={{ color: '#059669', marginRight: '8px', fontSize: '16px', flexShrink: 0 }} />
                      {t('point3')}
                    </li>
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/6281260001487?text=${encodeURIComponent(t('whatsappMessage'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '14px',
                      borderRadius: '14px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#20bd5a')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                  >
                    <Icon icon="mdi:whatsapp" style={{ fontSize: '22px' }} />
                    {t('cta')}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ClassicProductCardGrid = () => {
  const t = useTranslations('Categories');
  const tFeatured = useTranslations('FeaturedProducts');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = [
    {
      title: t('hampers.title'),
      slug: "kotak-hampers",
      img: "/kotak%20hampers.webp",
      desc: t('hampers.desc'),
      tags: [t('hampers.tags.tag1'), t('hampers.tags.tag2')],
      images: [
        "/box hampers kraft (1).webp", "/box hampers kraft (2).webp", "/box hampers kraft (3).webp",
        "/box hampers natal (1).webp", "/box hampers natal (2).webp", "/box hampers natal (3).webp",
        "/gable box (1).webp", "/gable box (10).webp", "/gable box (11).webp", "/gable box (12).webp",
        "/gable box (13).webp", "/gable box (14).webp", "/gable box (15).webp", "/gable box (16).webp",
        "/gable box (17).webp", "/gable box (18).webp", "/gable box (19).webp", "/gable box (2).webp",
        "/gable box (20).webp", "/gable box (3).webp", "/gable box (4).webp", "/gable box (5).webp",
        "/gable box (6).webp", "/gable box (7).webp", "/gable box (8).webp", "/gable box (9).webp",
        "/gable box idul fitri (1).webp", "/gable box idul fitri (2).webp", "/gable box idul fitri (3).webp",
        "/gable box idul fitri (4).webp", "/gable box idul fitri (5).webp", "/gable box idul fitri (6).webp",
        "/gable box idul fitri (7).webp", "/gable box idul fitri (8).webp", "/hardbox (1).webp",
        "/hardbox (2).webp", "/hardbox (3).webp", "/kotak hampers.webp"
      ]
    },
    {
      title: t('bakery.title'),
      slug: "kotak-bakery",
      img: "/kotak%20cake.webp",
      desc: t('bakery.desc'),
      tags: [t('bakery.tags.tag1'), t('bakery.tags.tag2')],
      images: [
        "/box donat motif (1).webp", "/box donat motif (1).webp", "/box donat motif (2).webp",
        "/box donat motif (2).webp", "/box donat motif (3).webp", "/box donat motif (3).webp",
        "/box donat motif (4).webp", "/box donat motif (4).webp", "/box donat motif (5).webp",
        "/box donat motif (6).webp", "/box donat motif.webp", "/box roti bakar (1).webp",
        "/box roti bakar (2).webp", "/box roti bakar (3).webp", "/box slice cake-1.webp",
        "/box slice cake-2.webp", "/box slice cake.webp", "/box tart handle (1).webp",
        "/box tart handle (2).webp", "/box tart handle (3).webp", "/box tart handle (4).webp",
        "/box tart handle (5).webp", "/box tart handle (6).webp", "/cheese cake (1).webp",
        "/cheese cake (2).webp", "/cheese cake (3).webp", "/cheese cake (4).webp",
        "/cupcake isi 12 (1).webp", "/cupcake isi 12 (2).webp", "/cupcake isi 12 (3).webp",
        "/cupcake isi 12 (4).webp", "/cupcake isi 12 (5).webp", "/cupcake isi 12 (6).webp",
        "/cupcake isi 16 (1).webp", "/cupcake isi 16 (2).webp", "/cupcake isi 16 (3).webp",
        "/cupcake isi 16 (4).webp", "/cupcake isi 16 (5).webp", "/cupcake isi 4 (1).webp",
        "/cupcake isi 4 (2).webp", "/cupcake isi 4 (3).webp", "/cupcake isi 4 (4).webp",
        "/cupcake isi 4 motif (1).webp", "/cupcake isi 4 motif (2).webp", "/cupcake isi 4 motif (3).webp",
        "/cupcake isi 4 motif (4).webp", "/cupcake isi 4 motif (5).webp", "/cupcake isi 6 (1).webp",
        "/cupcake isi 6 (2).webp", "/cupcake isi 6 (3).webp", "/cupcake isi 9 (1).webp",
        "/cupcake isi 9 (2).webp", "/cupcake isi 9 (3).webp", "/cupcake isi 9 (4).webp",
        "/cupcake isi 9 (5).webp", "/cupcake isi 9 (6).webp", "/cupcake isi 9 (7).webp",
        "/cupcake isi 9 (8).webp", "/cupcake isi 9 (9).webp", "/dallas donat isi 3.webp",
        "/dallas donat isi 6.webp", "/donat isi 1(1).webp", "/donat isi 1(2).webp", "/donat isi 1.webp",
        "/kotak cake.webp", "/kotak cupcake isi 4 (1).webp", "/kotak cupcake isi 4 (2).webp",
        "/kotak cupcake isi 4 (3).webp", "/kotak cupcake isi 4 (4).webp", "/kotak cupcake isi 4 (5).webp",
        "/kotak cupcake isi 4 (6).webp", "/kotak cupcake isi 4 (7).webp", "/kotak cupcake isi 6 (1).webp",
        "/kotak cupcake isi 6 (2).webp", "/kotak cupcake isi 6 (3).webp", "/kotak cupcake isi 6 (4).webp",
        "/kotak cupcake motif isi 1 (1).webp", "/kotak cupcake motif isi 1 (2).webp",
        "/kotak rollcake (1).webp", "/kotak rollcake (2).webp", "/kotak rollcake (3).webp",
        "/kotak rollcake (4).webp", "/kotak rollcake (5).webp", "/kotak rollcake (6).webp",
        "/kotak rollcake (7).webp", "/kotak rollcake (8).webp", "/kotak rollcake (9).webp",
        "/kotak rollcake mika (1).webp", "/kotak rollcake mika (2).webp", "/kotak rollcake mika (3).webp",
        "/kotak rollcake mika (4).webp", "/paperlisens cupcake.webp", "/tenteng cupcake isi 6 (1).webp",
        "/tenteng cupcake isi 6 (2).webp", "/tenteng cupcake isi 6 (3).webp", "/tenteng cupcake isi 6 (4).webp",
        "/tusuk roti (1).webp", "/tusuk roti (2).webp"
      ]
    },
    {
      title: t('rokok.title'),
      slug: "rokok",
      img: "/custom%20rokok%203.webp",
      desc: t('rokok.desc'),
      tags: [t('rokok.tags.tag1'), t('rokok.tags.tag2')],
      images: [
        "/custom rokok (1).webp", "/custom rokok (10).webp", "/custom rokok (11).webp",
        "/custom rokok (12).webp", "/custom rokok (13).webp", "/custom rokok (14).webp",
        "/custom rokok (15).webp", "/custom rokok (16).webp", "/custom rokok (17).webp",
        "/custom rokok (18).webp", "/custom rokok (19).webp", "/custom rokok (2).webp",
        "/custom rokok (20).webp", "/custom rokok (21).webp", "/custom rokok (22).webp",
        "/custom rokok (23).webp", "/custom rokok (24).webp", "/custom rokok (3).webp",
        "/custom rokok (4).webp", "/custom rokok (5).webp", "/custom rokok (6).webp",
        "/custom rokok (7).webp", "/custom rokok (8).webp", "/custom rokok (9).webp",
        "/custom rokok 1.webp", "/custom rokok 2.webp", "/custom rokok 3.webp",
        "/custom rokok 4.webp", "/custom rokok.webp", "/foto rokok 1.webp",
        "/foto rokok.webp", "/kotak rokok 1.webp"
      ]
    },
    {
      title: t('nasi.title'),
      slug: "kotak-nasi",
      img: "/kotak%20nasi%20(1).webp",
      desc: t('nasi.desc'),
      tags: [t('nasi.tags.tag1'), t('nasi.tags.tag2')],
      images: [
        "/kotak nasi (1).webp", "/kotak nasi (2).webp", "/kotak nasi (3).webp",
        "/kotak nasi (4).webp", "/kotak nasi (5).webp", "/kotak nasi (6).webp",
        "/kotak nasi (7).webp", "/kotak nasi (8).webp", "/kotak nasi (9).webp"
      ]
    },
    {
      title: t('buku.title'),
      slug: "buku",
      img: "/buku%20(6).webp",
      desc: t('buku.desc'),
      tags: [t('buku.tags.tag1')],
      images: [
        "/buku (1).webp", "/buku (2).webp", "/buku (3).webp",
        "/buku (4).webp", "/buku (5).webp", "/buku (6).webp",
        "/buku (7).webp", "/buku (8).webp", "/buku (9).webp", "/foto buku.webp"
      ]
    },
    {
      title: t('kalender.title'),
      slug: "kalender",
      img: "/foto%20kalender.webp",
      desc: t('kalender.desc'),
      tags: [t('kalender.tags.tag1')],
      images: [
        "/foto kalender.webp", "/kalender (1).webp", "/kalender (2).webp",
        "/kalender (3).webp", "/kalender (4).webp", "/kalender.webp"
      ]
    },
    {
      title: t('paperbag.title'),
      slug: "paperbag",
      img: "/paperbag.webp",
      desc: t('paperbag.desc'),
      tags: [t('paperbag.tags.tag1'), t('paperbag.tags.tag2')],
      images: [
        "/foto paperbag.webp", "/paperbag (1).webp", "/paperbag (2).webp",
        "/paperbag (3).webp", "/paperbag (4).webp", "/paperbag (5).webp",
        "/paperbag (6).webp", "/paperbag (7).webp", "/paperbag (8).webp", "/paperbag.webp"
      ]
    },
    {
      title: t('map.title'),
      slug: "map",
      img: "/map.webp",
      desc: t('map.desc'),
      tags: [t('map.tags.tag1'), t('map.tags.tag2')],
      images: [
        "/map (1).webp", "/map (10).webp", "/map (11).webp", "/map (2).webp",
        "/map (3).webp", "/map (4).webp", "/map (5).webp", "/map (6).webp",
        "/map (7).webp", "/map (8).webp", "/map (9).webp", "/map.webp"
      ]
    },
    {
      title: t('brosur.title'),
      slug: "brosur",
      img: "/foto%20brosur.webp",
      desc: t('brosur.desc'),
      tags: [t('brosur.tags.tag1')],
      images: ["/foto brosur.webp"]
    }
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
            key={category.slug}
            onClick={() => setSelectedId(category.slug)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: 'linear-gradient(145deg, #0A4174 0%, #001D39 100%)',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              border: '1px solid rgba(10, 65, 116, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 29, 57, 0.15)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            whileHover={{ scale: 1.02, y: -8, boxShadow: '0 20px 50px -10px rgba(0, 29, 57, 0.35), 0 0 30px rgba(212, 160, 23, 0.1)' }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = '1px solid rgba(212, 160, 23, 0.4)';
              const img = e.currentTarget.querySelector('.portfolio-card-img') as HTMLElement;
              if (img) img.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = '1px solid rgba(10, 65, 116, 0.2)';
              const img = e.currentTarget.querySelector('.portfolio-card-img') as HTMLElement;
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden' }}>
              <Image
                src={category.img}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="portfolio-card-img"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(0,15,30,0.7), transparent)',
                pointerEvents: 'none'
              }} />
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <motion.h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px', color: '#ffffff' }}>{category.title}</motion.h4>
              <motion.p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '16px', flexGrow: 1 }}>{category.desc}</motion.p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {category.tags.map(tag => (
                  <span key={tag} style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#d1d5db',
                    fontSize: '0.75rem',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D4A017', fontSize: '13px', fontWeight: '600' }}>
                <span>{tFeatured('viewDetails')}</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px'
            }}
          >
            {categories.map(category => {
              if (category.slug !== selectedId) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  key={selectedId}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'linear-gradient(145deg, #1a1d23 0%, #13161b 50%, #0d0f13 100%)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '800px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(212, 160, 23, 0.2)',
                    boxShadow: '0 0 60px rgba(0,0,0,0.5), 0 0 30px rgba(212, 160, 23, 0.05)'
                  }}
                >
                  <motion.div style={{ position: 'relative', height: '350px' }}>
                    <Image
                      src={category.img}
                      alt={category.title}
                      fill
                      sizes="800px"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                    {/* Gradient overlay on image */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '150px',
                      background: 'linear-gradient(to top, #13161b, transparent)',
                      pointerEvents: 'none'
                    }} />
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedId(null)}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        color: '#D4A017',
                        border: '1px solid rgba(212, 160, 23, 0.3)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Icon icon="mdi:close" style={{ fontSize: '20px' }} />
                    </button>
                  </motion.div>

                  <div style={{ padding: '32px 32px 36px' }}>
                    {/* Decorator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
                      <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#D4A017', textTransform: 'uppercase' }}>PORTFOLIO</span>
                      <span style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
                    </div>

                    <motion.h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>{category.title}</motion.h2>
                    <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #D4A017, #B8860B)', borderRadius: '2px', marginBottom: '20px' }} />

                    <motion.div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                      {category.tags.map(tag => (
                        <span key={tag} style={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#d1d5db',
                          fontSize: '0.875rem',
                          padding: '6px 14px',
                          borderRadius: '10px',
                          fontWeight: '500'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#9ca3af', marginBottom: '32px' }}>
                      {category.desc}
                    </motion.p>

                    {/* Image Gallery */}
                    {/* @ts-ignore */}
                    {category.images && category.images.length > 0 && (
                      <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#D4A017', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Product Gallery
                        </h3>
                        {/* Define state for showing more images inside the mapping if possible, or use a simpler approach since we can't easily add state inside map.
                            Actually, we can't add state inside this map callback.
                            Alternative: We will just show a fixed reasonable amount (e.g., 12) to ensure performance, 
                            and the "View Details" button encourages users to see the full list on the product page.
                        */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                          gap: '12px'
                        }}>
                          {/* @ts-ignore */}
                          {category.images.slice(0, 12).map((img, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              viewport={{ once: true }}
                              style={{
                                position: 'relative',
                                aspectRatio: '1',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                              }}
                              whileHover={{ scale: 1.05, zIndex: 10, borderColor: 'rgba(212, 160, 23, 0.5)' }}
                            >
                              <Image
                                src={img}
                                alt={`${category.title} ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 33vw, 150px"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                              />
                            </motion.div>
                          ))}
                        </div>
                        {/* @ts-ignore */}
                        {category.images.length > 12 && (
                          <div style={{ marginTop: '12px', textAlign: 'center' }}>
                            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>+ {category.images.length - 12} more images available locally</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                      <Link href={`/produk/${category.slug}`}
                        style={{
                          padding: '14px 32px',
                          background: 'linear-gradient(135deg, #D4A017, #B8860B)',
                          color: 'white',
                          borderRadius: '14px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.95rem',
                          boxShadow: '0 4px 15px rgba(212, 160, 23, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {tFeatured('viewDetails')} →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const t = useTranslations();
  const tPricing = useTranslations('Pricing');
  const router = useRouter();
  const [showPromo, setShowPromo] = useState(false);

  // Smart promo: IntersectionObserver to trigger when scrolled down 20-30%
  useEffect(() => {
    const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
    const lastDismissed = localStorage.getItem('promo_dismissed_at');

    // Skip if dismissed within cooldown period
    if (lastDismissed && Date.now() - Number(lastDismissed) < COOLDOWN_MS) {
      return;
    }

    const timer = setTimeout(() => {
      // Create a dummy element or observe an existing lower section
      // In this case, observing the "Premium Quality" section or something similar
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShowPromo(true);
            observer.disconnect();
          }
        },
        { rootMargin: '0px', threshold: 0.1 }
      );

      // Find an element that is roughly 30% down the page. 
      // The Trusted By (Marquee) or Price Promotion Section works well.
      const target = document.querySelector('#pricing-section') || document.querySelector('section:nth-of-type(3)');
      if (target) {
        observer.observe(target);
      } else {
        // Fallback if elements not found: simple timeout
        setTimeout(() => setShowPromo(true), 5000);
      }

      return () => observer.disconnect();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePromo = () => {
    setShowPromo(false);
    localStorage.setItem('promo_dismissed_at', String(Date.now()));
  };

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
  const BannerSlider = ({ images, interval = 10000, transitionType = 'fade' }: { images: string[], interval?: number, transitionType?: 'fade' | 'slide' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const minSwipeDistance = 50;

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    useEffect(() => {
      resetTimer();
      timerRef.current = setTimeout(() => {
        goToNextSlide();
      }, interval);

      return () => {
        resetTimer();
      };
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

    const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null); // Reset touch end on new touch
      setTouchStart(e.targetTouches[0].clientX);
      resetTimer(); // Pause timer on user interaction
    };

    const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;

      if (distance > minSwipeDistance) {
        goToNextSlide();
      } else if (distance < -minSwipeDistance) {
        goToPrevSlide();
      }
      // The useEffect will restart the timer automatically when currentIndex changes
    };

    return (
      <div
        style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {transitionType === 'slide' ? (
          <div style={{
            display: 'flex',
            height: '100%',
            transition: 'transform 0.7s ease-in-out',
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
            {images.map((src) => (
              <div key={src} style={{ position: 'relative', width: '100%', height: '100%', flexShrink: 0 }}>
                <Image
                  src={src}
                  alt={`Banner`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  priority={images.indexOf(src) === 0}
                />
              </div>
            ))}
          </div>
        ) : (
          // Default fade transition
          images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 80vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                opacity: currentIndex === index ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
              }}
            />
          ))
        )}

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

  const desktopBanners = ['/main banner dallas.webp', '/main banner dallas 2.webp', '/main banner dallas 3.webp', '/main banner dallas 4.webp'];
  const mobileBanners = [
    '/mobile_banner_1.webp',
    '/mobile_banner_2.webp',
    '/mobile_banner_3.webp',
    '/mobile_banner_4.webp',
    '/mobile_banner_5.webp',
    '/mobile_banner_6.webp',
    '/mobile_banner_7.webp',
    '/mobile_banner_8.webp',
    '/mobile_banner_9.webp'
  ];

  const machineImages = [
    '/foto mesin.webp',
    '/foto mesin (1).webp',
    '/foto mesin (2).webp',
    '/foto mesin (3).webp',
    '/foto mesin (4).webp',
    '/foto mesin (5).webp',
    '/foto mesin (6).webp',
    '/foto mesin (7).webp'
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('Navbar.home') },
    { href: '/about', label: t('Navbar.about') },
    { href: '/products', label: t('Navbar.products') },
    { href: '/KATALOG DALLAS.pdf', label: t('Navbar.catalog'), download: true },
    { href: '/paperlisens', label: t('Navbar.paperlisens') },
    { href: '/articles', label: t('Navbar.articles') },
    { href: '#contact', label: t('Navbar.contact'), isScroll: true },
  ];

  const renderNavLinks = () => navLinks.map(link => {
    const isHome = link.href === '/';
    const baseClasses = "py-4 md:py-0 text-center md:text-left border-b border-gray-200/50 md:border-none w-full md:w-auto font-medium transition-all duration-300 hover:text-black md:hover:-translate-y-[2px] cursor-pointer no-underline";
    const textColor = isHome ? "text-black" : "text-gray-600";

    if (link.isScroll) {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            smoothScroll(e, link.href);
            setIsMenuOpen(false);
          }}
          className={`${baseClasses} text-gray-600`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.href}
        download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
        onClick={() => setIsMenuOpen(false)}
        className={`${baseClasses} ${textColor}`}
      >
        {link.label}
      </Link>
    )
  });

  return (
    <div style={{
      backgroundColor: '#001D39',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }}>
      <PromoBanner isOpen={showPromo} onClose={handleClosePromo} />

      {/* Hidden H1 for SEO */}
      <h1 style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0'
      }}>
        {t('Home.mainH1')}
      </h1>

      {/* Top Bar Contact Info & Social Media */}
      <div className="bg-white text-black text-xs py-2 md:py-1 fixed top-0 left-0 w-full z-[100] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-center md:justify-between items-center flex-wrap md:flex-nowrap gap-2 md:gap-0">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="hidden md:flex items-center gap-1">
              <Icon icon="mdi:map-marker" className="text-[14px]" />
              {t('TopBar.address')}
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:phone" className="text-[14px]" />
              <span className="inline md:hidden">081260001487</span>
              <span className="hidden md:inline">081260001487 | 085946896488 | 085235531946</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" className="text-black" title="Instagram">
              <Icon icon="mdi:instagram" className="text-[18px]" />
            </a>
            <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" className="text-black" title="TikTok">
              <Icon icon="ic:baseline-tiktok" className="text-[18px]" />
            </a>
            <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" className="text-black" title="Shopee Paperlisens">
              <Icon icon="ic:baseline-shopping-bag" className="text-[18px]" />
            </a>
            <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" className="text-black" title="Shopee Tray&me">
              <Icon icon="ic:baseline-shopping-bag" className="text-[18px]" />
            </a>
            <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" className="text-black" title="Facebook">
              <Icon icon="mdi:facebook" className="text-[18px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-[36px] w-full z-50 bg-white/95 backdrop-blur-[20px] saturate-[180%] border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <div className="flex justify-between items-center py-4">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image src="/logo1.webp" alt="Percetakan Dallas" width={360} height={108} style={{ height: '36px', width: 'auto', filter: 'invert(1)' }} priority />
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden bg-transparent border-none text-black text-2xl">
              <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
            </button>
            <div className="hidden md:flex gap-8 items-center">
              {renderNavLinks()}
              <LanguageSwitcher />
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white/98 flex flex-col items-center px-6 pb-4 border-b border-gray-200/50 shadow-md">
              {renderNavLinks()}
              <div className="mt-4 pt-4 border-t border-gray-200/50 w-full flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Premium Quality Section with Video Background */}
      <section className="relative flex items-center justify-center text-center overflow-hidden text-white mt-[88px] h-[100vw] md:h-[calc(100vh-88px)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
        >
          <source src="/vidio.webm" type="video/webm" />
        </video>

        {/* Overlay to ensure text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[2]"></div>

        <div className="relative z-[3] px-6">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-light mb-4 md:mb-6 leading-tight text-white">
            {t('PremiumQuality.title')}<br />
            <span className="font-semibold text-white">
              {t('PremiumQuality.titleSpan')}
            </span>
          </h2>
          <p className="text-[1rem] md:text-[1.25rem] lg:text-[1.5rem] text-gray-200 font-light max-w-[600px] mx-auto mb-8 md:mb-12">
            {t('PremiumQuality.description')}
          </p>
          <div className="flex gap-3 justify-center flex-wrap flex-col sm:flex-row items-center">
            <a href="/KATALOG DALLAS.pdf"
              download="KATALOG DALLAS.pdf"
              className="bg-white text-black py-2.5 px-6 md:py-3 md:px-8 text-[14px] md:text-[16px] w-full sm:w-auto max-w-[280px] sm:max-w-none rounded-[30px] font-medium transition-transform hover:scale-105 hover:bg-gray-100 active:scale-95 inline-block"
            >
              {t('PremiumQuality.btnDownload')}
            </a>
            <a href="https://wa.me/6281260001487?text=Halo%20kak%2C%20saya%20ingin%20tanya%20produk%20percetakan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white py-2.5 px-6 md:py-3 md:px-8 text-[14px] md:text-[16px] w-full sm:w-auto max-w-[280px] sm:max-w-none rounded-[30px] font-medium flex items-center justify-center gap-2 transition-transform hover:scale-105 hover:bg-white hover:text-black active:scale-95"
            >
              <Icon icon="mdi:whatsapp" className="text-[20px]" />
              {t('Paperlisens.orderWa')}
            </a>
          </div>
        </div>
      </section>

      {/* Price Promotion Section */}
      <section className="py-20 md:py-[120px] px-6 bg-slate-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 65, 116, 0.03) 0%, rgba(255, 255, 255, 0) 70%)',
          zIndex: 0
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[2.25rem] md:text-[3rem] font-extrabold text-[#001D39] mb-5 tracking-tight">
              {tPricing('title')} <span className="text-[#0A4174]">{tPricing('titleSpan')}</span>
            </h2>
            <div className="w-20 h-1 bg-[#0A4174] mx-auto mb-6 rounded-sm"></div>
            <p className="text-gray-600 text-[1.1rem] md:text-[1.25rem] max-w-[700px] mx-auto">
              {tPricing('subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: tPricing('cards.packaging.title'),
                price: tPricing('cards.packaging.price'),
                desc: tPricing('cards.packaging.desc'),
                icon: 'mdi:package-variant-closed',
                color: '#0A4174',
                delay: 0.1
              },
              {
                title: tPricing('cards.culinary.title'),
                price: tPricing('cards.culinary.price'),
                desc: tPricing('cards.culinary.desc'),
                icon: 'mdi:food-takeout-box',
                color: '#059669',
                delay: 0.2
              },
              {
                title: tPricing('cards.publications.title'),
                price: tPricing('cards.publications.price'),
                desc: tPricing('cards.publications.desc'),
                icon: 'mdi:book-open-page-variant',
                color: '#f97316',
                delay: 0.3
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{
                  y: -12,
                  boxShadow: '0 25px 50px -12px rgba(10, 65, 116, 0.15)',
                  borderColor: item.color
                }}
                style={{
                  padding: '48px 32px',
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '2px solid transparent',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'default'
                }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    backgroundColor: `${item.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon icon={item.icon} style={{ fontSize: '40px', color: item.color }} />
                </motion.div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#111827' }}>{item.title}</h3>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: item.color,
                  marginBottom: '8px',
                  display: 'inline-block',
                  padding: '4px 16px',
                  backgroundColor: `${item.color}08`,
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, verticalAlign: 'middle', marginRight: '4px' }}>{tPricing('startFrom')}</span>
                  {item.price}{(item.price.includes('Rp') || item.price.includes('印尼盾')) ? <span style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.7 }}> {tPricing('perPcs')}</span> : ''}
                </div>
                <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                  {item.desc}
                </p>
                <a
                  href={`https://wa.me/6281260001487?text=${encodeURIComponent(tPricing('whatsappMessage', { productName: item.title }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: item.color,
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Icon icon="mdi:whatsapp" style={{ fontSize: '20px' }} />
                  {tPricing('consultation')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section (Marquee) */}
      <section style={{
        padding: '60px 0',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('TrustedBy.title')}
          </h3>
        </div>

        <div style={{ display: 'flex', overflow: 'hidden', width: '100%', position: 'relative' }}>
          {/* Marquee Group 1 */}
          <div className="animate-marquee" style={{ display: 'flex', gap: '80px', paddingRight: '80px', minWidth: '100%', flexShrink: 0, alignItems: 'center' }}>
            {Array.from({ length: 25 }, (_, i) => `/logo brand (${i + 1}).webp`).map((src, idx) => (
              <div key={`logo-1-${idx}`} style={{ position: 'relative', width: '220px', height: '140px', flexShrink: 0 }}>
                <Image
                  src={src}
                  alt={`Brand Partner ${idx + 1}`}
                  fill
                  sizes="220px"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Marquee Group 2 (Duplicate) */}
          <div className="animate-marquee" style={{ display: 'flex', gap: '80px', paddingRight: '80px', minWidth: '100%', flexShrink: 0, alignItems: 'center' }}>
            {Array.from({ length: 25 }, (_, i) => `/logo brand (${i + 1}).webp`).map((src, idx) => (
              <div key={`logo-2-${idx}`} style={{ position: 'relative', width: '220px', height: '140px', flexShrink: 0 }}>
                <Image
                  src={src}
                  alt={`Brand Partner ${idx + 1}`}
                  fill
                  sizes="220px"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Dallas Section */}
      <section className="py-16 md:py-[100px] px-6 text-center bg-[#0A4174] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold mb-4 text-white">
              {t('WhyChoose.title')}
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] text-gray-400 font-normal">
              {t('WhyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* POIN 1: PENGALAMAN (LEGACY) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icon icon="mdi:shield-check" width="40" height="40" color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t('WhyChoose.points.experience.title')}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('WhyChoose.points.experience.desc')}
              </p>
            </div>

            {/* POIN 2: KUALITAS (PRECISION) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icon icon="mdi:crosshairs-gps" width="40" height="40" color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t('WhyChoose.points.quality.title')}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('WhyChoose.points.quality.desc')}
              </p>
            </div>

            {/* POIN 3: KONSULTASI (SOLUTION) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icon icon="mdi:lightbulb-on-outline" width="40" height="40" color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t('WhyChoose.points.consultation.title')}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('WhyChoose.points.consultation.desc')}
              </p>
            </div>

            {/* POIN 4: WAKTU (PUNCTUALITY) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(73, 118, 159, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icon icon="mdi:clock-check-outline" width="40" height="40" color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t('WhyChoose.points.punctuality.title')}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {t('WhyChoose.points.punctuality.desc')}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '40px',
            marginTop: '20px'
          }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '24px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
              {t('WhyChoose.cta')}
            </h4>
          </div>
        </div>
      </section>

      {/* Classic Product Card Grid Section */}
      <section id="classic-products" style={{ backgroundColor: '#ffffff', padding: '100px 0' }} className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4A017' }}>EXCLUSIVE</span>
            <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light leading-tight" style={{ color: '#001D39' }}>
            {t('FeaturedProducts.title')}
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #D4A017, #B8860B)', margin: '20px auto 0', borderRadius: '2px' }} />
          <p className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl font-light mb-20" style={{ marginTop: '20px', color: '#4b5563' }}>
            {t('FeaturedProducts.subtitle')}<br /><br />
          </p>
        </div>
        <ClassicProductCardGrid />
      </section>

      {/* Restored Materials Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginTop: '0' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '300', textAlign: 'center', marginBottom: '48px', color: '#111827' }}>{t('Materials.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:gap-6">
              {[
                { name: t('Materials.artPaper.name'), slug: 'art-paper', description: t('Materials.artPaper.desc'), image: '/BAHAN-AP.webp' },
                { name: t('Materials.ivoryPaper.name'), slug: 'ivory-paper', description: t('Materials.ivoryPaper.desc'), image: '/BAHAN-IVORY.webp' },
                { name: t('Materials.tipping.name'), slug: 'bahan-tipping', description: t('Materials.tipping.desc'), image: '/BAHAN-TIPPING.webp' },
                { name: t('Materials.duplex.name'), slug: 'duplex', description: t('Materials.duplex.desc'), image: '/BAHAN-DC.webp' }
              ].map((product, index) => (
                <Link key={product.slug} href={`/produk/${product.slug}`} style={{ textDecoration: 'none', height: '100%' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      backgroundColor: '#BDD8E9',
                      borderRadius: '16px',
                      padding: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 2, 1)',
                      transform: 'translateY(0)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1)'}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '4px', color: '#111827' }}>{product.name}</h4>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5', flexGrow: 1 }}>{product.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Non-Cigarette Products Section */}
      <section id="non-cigarettes" style={{
        padding: '80px 0',
        backgroundColor: '#001D39'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '24px' }}>{t('NonCigarette.title')}</h2>
            <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto' }}>
              {t('NonCigarette.description')}
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginTop: '64px'
          }}>
            {[
              { src: "/mesin potong.webp", alt: "Mesin Potong Canggih" },
              { src: "/foto%20(9).webp", alt: "Proses Produksi Berkualitas" }
            ].map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                height: '350px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    cursor: 'pointer'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <br /><br />
          {/* Portfolio Title */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4A017' }}>EXCLUSIVE</span>
              <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
            </div>
            <h3 className="text-[1.75rem] md:text-[2.25rem] font-light tracking-[2px]">{t('NonCigarette.productsTitle')}</h3>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #D4A017, #B8860B)', margin: '16px auto 0', borderRadius: '2px' }} />
          </div>

          {/* Portfolio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {[
              { image: '/paperlisens%20produk%20unggulan%20(1).webp', alt: 'Solusi Cup Serbaguna & Trendi', titleKey: 'card1.title', descKey: 'card1.desc' },
              { image: '/paperlisens%20produk%20unggulan%20(2).webp', alt: 'Kotak Donat Berbagai Ukuran', titleKey: 'card2.title', descKey: 'card2.desc' }
            ].map((card, idx) => (
              <div key={idx} style={{
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212, 160, 23, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(0,0,0,0.5), 0 0 30px rgba(212, 160, 23, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  const img = e.currentTarget.querySelector('.portfolio-img') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('.portfolio-img') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div className="relative w-full overflow-hidden h-[280px] md:h-[360px]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="portfolio-img"
                    style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    loading="lazy"
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(to top, rgba(0,29,57,0.8), transparent)',
                    pointerEvents: 'none'
                  }} />
                  {/* Featured badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'linear-gradient(135deg, #D4A017, #B8860B)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(212, 160, 23, 0.3)'
                  }}>
                    ★ FEATURED
                  </div>
                </div>
                <div style={{ padding: '28px 28px 32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '14px', color: '#ffffff', lineHeight: '1.3' }}>
                    {t(`NonCigarette.${card.titleKey}`)}
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.7', flexGrow: 1 }}>
                    {t(`NonCigarette.${card.descKey}`)}
                  </p>
                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A017', fontSize: '14px', fontWeight: '600' }}>
                    <span>{t('NonCigarette.btnBuy')}</span>
                    <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Gallery - Premium Masonry */}
          <div style={{ marginTop: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4A017', display: 'block', marginBottom: '12px' }}>GALLERY</span>
              <h3 style={{ fontSize: '2.25rem', fontWeight: '300', color: '#ffffff', lineHeight: '1.3' }}>{t('NonCigarette.galleryTitle')}</h3>
              <div style={{ width: '60px', height: '2px', backgroundColor: '#D4A017', margin: '16px auto 0' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[180px]">
              {[
                '/foto (412).webp', '/foto (264).webp', '/foto (120).webp', '/foto (176).webp',
                '/foto (310).webp', '/foto (154).webp', '/foto (431).webp', '/foto (436).webp',
                '/foto (96).webp', '/foto (435).webp', '/foto (69).webp', '/foto (612).webp',
                '/foto (517).webp', '/foto (510).webp', '/foto (127).webp', '/foto (365).webp',
                '/foto (185).webp', '/foto (84).webp', '/foto (187).webp', '/foto (151).webp',
                '/foto (432).webp', '/foto (165).webp', '/foto (159).webp', '/foto (172).webp'
              ].map((img, index) => (
                <div key={index} style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  gridRow: index % 5 === 0 ? 'span 2' : 'span 1',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                }}>
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    loading="lazy"
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,29,57,0.6) 0%, transparent 50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                    className="gallery-hover-overlay"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* View All Products Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => router.push('/paperlisens')}
              style={{
                background: 'linear-gradient(135deg, #D4A017, #B8860B)',
                color: '#ffffff',
                padding: '16px 40px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 24px rgba(212, 160, 23, 0.3)'
              }}
              onMouseOver={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.05)'; (e.target as HTMLElement).style.boxShadow = '0 12px 32px rgba(212, 160, 23, 0.4)' }}
              onMouseOut={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(212, 160, 23, 0.3)' }}>
              {t('NonCigarette.btnViewAll')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}