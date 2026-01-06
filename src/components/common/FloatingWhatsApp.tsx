'use client';

import React from 'react';
import { Icon } from '@iconify/react';

const FloatingWhatsApp = () => {
  return (
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
        textDecoration: 'none'
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      aria-label="Chat via WhatsApp"
    >
      <Icon icon="mdi:whatsapp" style={{ fontSize: '32px' }} />
    </a>
  );
};

export default FloatingWhatsApp;
