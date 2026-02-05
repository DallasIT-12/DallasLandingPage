'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

export default function SelectLanguagePage() {
  const router = useRouter();
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLanguageSelect = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${locale}`);
  };

  const languages = [
    { code: 'id', label: 'Bahasa Indonesia', subLabel: 'Indonesian', flag: '🇮🇩' },
    { code: 'en', label: 'English', subLabel: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文 (Mandarin)', subLabel: 'Chinese', flag: '🇨🇳' },
  ];

  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BDD8E9', // Light Blue (Dallas 7)
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#001D39', // Dark Blue (Dallas 1)
        position: 'relative',
        overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeInZoom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-entrance {
          animation: fadeInZoom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; 
        }
        .bg-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.4;
        }
      `}</style>
      
      {/* Background Decor */}
      <div className="bg-blob" style={{ top: '-10%', left: '-10%', width: '60vw', height: '60vw', backgroundColor: '#7BBDE8' }}></div>
      <div className="bg-blob" style={{ bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', backgroundColor: '#49769F' }}></div>

      <div 
        className={mounted ? "animate-entrance" : ""}
        style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? '20px' : '24px',
            padding: isMobile ? '24px 20px' : '40px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 29, 57, 0.15)',
            position: 'relative',
            zIndex: 10
        }}
      >
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '20px' : '24px' }}>
             <Image 
                src="/logo1.png" 
                alt="Dallas Logo" 
                width={isMobile ? 140 : 180} 
                height={60} 
                style={{ height: 'auto', filter: 'brightness(0)' }}
                priority
             />
          </div>
          <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '600', marginBottom: '8px', color: '#001D39' }}>Select Language</h1>
          <p style={{ color: '#49769F', fontSize: isMobile ? '13px' : '14px' }}>Please choose your preferred language to continue</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              onMouseEnter={() => setHoveredLang(lang.code)}
              onMouseLeave={() => setHoveredLang(null)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isMobile ? '14px 16px' : '16px 20px',
                borderRadius: '16px',
                border: hoveredLang === lang.code ? '1px solid #001D39' : '1px solid rgba(0, 29, 57, 0.1)',
                backgroundColor: hoveredLang === lang.code ? '#001D39' : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                transform: hoveredLang === lang.code ? 'scale(1.02)' : 'scale(1)',
                boxShadow: hoveredLang === lang.code ? '0 10px 20px rgba(0, 29, 57, 0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
                <span style={{ fontSize: isMobile ? '28px' : '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{lang.flag}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ 
                      fontSize: isMobile ? '15px' : '16px', 
                      fontWeight: '600', 
                      color: hoveredLang === lang.code ? '#ffffff' : '#001D39',
                      transition: 'color 0.3s'
                  }}>
                    {lang.label}
                  </span>
                  <span style={{ 
                      fontSize: isMobile ? '12px' : '13px', 
                      color: hoveredLang === lang.code ? '#BDD8E9' : '#49769F',
                      transition: 'color 0.3s'
                  }}>
                    {lang.subLabel}
                  </span>
                </div>
              </div>
              
              <Icon 
                icon="mdi:chevron-right" 
                style={{ 
                    fontSize: isMobile ? '20px' : '24px', 
                    color: hoveredLang === lang.code ? '#ffffff' : '#49769F',
                    transform: hoveredLang === lang.code ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.3s'
                }} 
              />
            </button>
          ))}
        </div>

        <div style={{ marginTop: isMobile ? '24px' : '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#49769F' }}>
                You can change this later in the settings.
            </p>
        </div>
      </div>
      
      <div style={{ marginTop: isMobile ? '24px' : '32px', textAlign: 'center', color: '#0A4174', fontSize: '12px', position: 'relative', zIndex: 10, opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} Dallas Offset Printing. All rights reserved.
      </div>
    </div>
  );
}
