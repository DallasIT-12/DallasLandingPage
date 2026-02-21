'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useTranslations } from 'next-intl';

// --- Banner Slider Component ---
const BannerSlider = ({ images, interval = 10000, transitionType = 'fade' }: { images: string[], interval?: number, transitionType?: 'fade' | 'slide' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      {images.map((src, index) => (
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
      ))}
      <button onClick={goToPrevSlide} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}>&#10094;</button>
      <button onClick={goToNextSlide} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}>&#10095;</button>
    </div>
  );
};

export default function AboutPage() {
  const t = useTranslations();
  const router = useRouter();
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMediumMobile, setIsMediumMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [screenReady, setScreenReady] = useState(false);

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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMediumMobile(window.innerWidth < 640);
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    setScreenReady(true);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



  if (!screenReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,29,57,0.1)', borderTopColor: '#001D39', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1f2937', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}>

      <Navbar />

      {/* Hero Header */}
      <header style={{
        paddingTop: isLargeMobile ? '180px' : '220px',
        paddingBottom: isLargeMobile ? '100px' : '140px',
        backgroundImage: 'linear-gradient(rgba(0, 29, 57, 0.65), rgba(0, 29, 57, 0.65)), url("/about_us.webp")',
        backgroundSize: 'cover',
        backgroundPosition: isLargeMobile ? 'center 20%' : 'center',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: isLargeMobile ? '350px' : '480px'
      }}>
        <h1 style={{
          fontSize: isSmallMobile ? '1.85rem' : (isMediumMobile ? '2.25rem' : '4.5rem'),
          fontWeight: '700',
          lineHeight: '1.2',
          padding: '0 20px'
        }}>
          {t('Navbar.about')}
        </h1>
        <p style={{
          color: '#BDD8E9',
          marginTop: '20px',
          fontSize: isSmallMobile ? '1rem' : '1.25rem',
          padding: '0 20px',
          maxWidth: '800px'
        }}>
          Percetakan Offset Dallas Kediri
        </p>
      </header>

      {/* 1. Company Profile Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMediumMobile ? '1.75rem' : '2.5rem', fontWeight: '600', marginBottom: '24px' }}>
            {t('CompanyProfile.title')}
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
            {t('CompanyProfile.description')}
          </p>
        </div>
      </section>

      {/* 2. Modern Technology Section (Exactly like Home) */}
      <section style={{
        padding: isMediumMobile ? '64px 24px' : '100px 24px',
        backgroundColor: '#0A4174',
        color: '#ffffff',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr',
          gap: isLargeMobile ? '48px' : '64px',
          alignItems: 'center'
        }}>
          <div style={{ order: isLargeMobile ? 2 : 1 }}>
            <h2 style={{
              fontSize: isMediumMobile ? '2rem' : '2.25rem',
              fontWeight: '600',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              {t('AboutUs.title')}
            </h2>
            <p style={{
              fontSize: isMediumMobile ? '1rem' : '1.125rem',
              color: '#e5e7eb',
              lineHeight: '1.75',
              marginBottom: '16px'
            }}>
              {t('AboutUs.description')}
            </p>
          </div>
          <div style={{
            order: isLargeMobile ? 1 : 2,
            height: isSmallMobile ? '280px' : (isLargeMobile ? '350px' : '450px'),
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
          }}>
            <BannerSlider images={machineImages} interval={4000} />
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMediumMobile ? '1.75rem' : '2.5rem', fontWeight: '700', marginBottom: '60px', textAlign: 'center' }}>
            {t('WhyChoose.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isSmallMobile ? '1fr' : (isMediumMobile ? '1fr 1fr' : 'repeat(4, 1fr)'), gap: '32px' }}>
            {[
              { icon: "mdi:shield-check", title: t('WhyChoose.points.experience.title'), desc: t('WhyChoose.points.experience.desc') },
              { icon: "mdi:crosshairs-gps", title: t('WhyChoose.points.quality.title'), desc: t('WhyChoose.points.quality.desc') },
              { icon: "mdi:lightbulb-on-outline", title: t('WhyChoose.points.consultation.title'), desc: t('WhyChoose.points.consultation.desc') },
              { icon: "mdi:clock-check-outline", title: t('WhyChoose.points.punctuality.title'), desc: t('WhyChoose.points.punctuality.desc') }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(73, 118, 159, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon icon={item.icon} style={{ fontSize: '40px', color: '#f97316' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}