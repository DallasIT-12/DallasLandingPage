'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function MaintenancePage() {
  const t = useTranslations('Maintenance');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#001D39',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10, 65, 116, 0.2) 0%, rgba(0, 29, 57, 0) 70%)',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214, 189, 152, 0.05) 0%, rgba(0, 29, 57, 0) 70%)',
        zIndex: 0
      }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
          style={{
            marginBottom: '40px',
            display: 'inline-block'
          }}
        >
          <Icon 
            icon="mdi:tools" 
            style={{ fontSize: '120px', color: '#D6BD98' }} 
          />
        </motion.div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #D6BD98 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('title')}
        </h1>

        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          color: '#BDD8E9',
          marginBottom: '40px'
        }}>
          {t('description')}
        </p>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <Icon icon="mdi:clock-outline" style={{ fontSize: '24px', color: '#D6BD98' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff' }}>
              {t('estimatedTime')}
            </span>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D6BD98' }}>
            1 - 2 {t('hours')}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/6281260001487"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Icon icon="mdi:whatsapp" style={{ fontSize: '24px' }} />
            {t('contactWa')}
          </a>
          
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            {t('refresh')}
          </Link>
        </div>

        <div style={{ marginTop: '64px', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Percetakan Offset Dallas. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
}
