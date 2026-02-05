'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const LanguageSwitcher = ({ light = false }: { light?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';

  const languages = [
    { code: 'id', label: 'ID', fullLabel: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'EN', fullLabel: 'English', flag: '🇺🇸' },
    { code: 'zh', label: 'ZH', fullLabel: '中文 (Mandarin)', flag: '🇨🇳' },
  ];

  const segments = pathname.split('/');
  const currentLocaleCode = ['en', 'id', 'zh'].includes(segments[1]) ? segments[1] : 'id';
  const currentLocale = languages.find(l => l.code === currentLocaleCode) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    const newSegments = [...segments];
    if (['en', 'id', 'zh'].includes(newSegments[1])) {
      newSegments[1] = locale;
    } else {
      newSegments.splice(1, 0, locale);
    }
    setIsOpen(false);
    router.push(newSegments.join('/') || '/');
  };

  return (
    <div className="relative" ref={dropdownRef} style={{ fontFamily: fontStack }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: light ? '4px' : '50px',
            border: light ? '1px solid rgba(214, 189, 152, 0.3)' : '1px solid rgba(0,0,0,0.1)',
            backgroundColor: 'transparent',
            color: light ? '#d6bd98' : '#4b5563',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: '500'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.color = light ? '#ffffff' : '#000000';
            e.currentTarget.style.borderColor = light ? '#d6bd98' : '#000000';
        }}
        onMouseOut={(e) => {
            if (!isOpen) {
                e.currentTarget.style.color = light ? '#d6bd98' : '#4b5563';
                e.currentTarget.style.borderColor = light ? 'rgba(214, 189, 152, 0.3)' : 'rgba(0,0,0,0.1)';
            }
        }}
      >
        <span>{currentLocale.flag}</span>
        <span style={{ letterSpacing: '0.025em' }}>{currentLocale.label}</span>
        <Icon 
          icon="mdi:chevron-down" 
          style={{ 
            fontSize: '16px',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }} 
        />
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '8px',
            width: '180px',
            backgroundColor: light ? '#1a3636' : '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            border: light ? '1px solid #40534c' : '1px solid #e5e7eb',
            padding: '8px 0',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                color: light ? (currentLocaleCode === lang.code ? '#d6bd98' : '#9ca3af') : (currentLocaleCode === lang.code ? '#000000' : '#4b5563'),
                fontWeight: currentLocaleCode === lang.code ? '600' : '400',
                fontSize: '14px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = light ? '#40534c' : '#f3f4f6';
                e.currentTarget.style.color = light ? '#ffffff' : '#000000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = light ? (currentLocaleCode === lang.code ? '#d6bd98' : '#9ca3af') : (currentLocaleCode === lang.code ? '#000000' : '#4b5563');
              }}
            >
              <span style={{ fontSize: '18px' }}>{lang.flag}</span>
              <span style={{ flexGrow: 1 }}>{lang.fullLabel}</span>
              {currentLocaleCode === lang.code && (
                <Icon icon="mdi:check" style={{ fontSize: '16px' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;