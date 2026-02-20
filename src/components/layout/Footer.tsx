import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer id="contact" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #BDD8E9 100%)',
      padding: '48px 0',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src="/logo1.webp" alt="Percetakan Dallas" style={{ height: '40px', width: 'auto', filter: 'invert(1)' }} />
            </div>
            <p style={{ color: '#4b5563' }}>
              {t('description')}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px', color: '#111827' }}>{t('products')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/KATALOG DALLAS.pdf"
                download="KATALOG DALLAS.pdf"
                style={{ color: '#4b5563', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseOver={(e) => { (e.target as HTMLElement).style.color = '#000000'; (e.target as HTMLElement).style.paddingLeft = '8px' }}
                onMouseOut={(e) => { (e.target as HTMLElement).style.color = '#4b5563'; (e.target as HTMLElement).style.paddingLeft = '0px' }}>
                {t('catalog')}
              </a>
              <Link href="/paperlisens"
                style={{ color: '#4b5563', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseOver={(e) => { (e.target as HTMLElement).style.color = '#000000'; (e.target as HTMLElement).style.paddingLeft = '8px' }}
                onMouseOut={(e) => { (e.target as HTMLElement).style.color = '#4b5563'; (e.target as HTMLElement).style.paddingLeft = '0px' }}>
                {t('paperlisens')}
              </Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px', color: '#111827' }}>{t('contact')}</h4>
            <div style={{ color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p>{t('email')}: <a href="mailto:percetakandallas@gmail.com" style={{ color: '#4b5563', textDecoration: 'underline' }}>percetakandallas@gmail.com</a></p>
              <p>{t('phone')}: <a href="https://wa.me/6281260001487" target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563', textDecoration: 'underline' }}>(+62) 812-6000-1487</a></p>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #e5e7eb',
          marginTop: '32px',
          paddingTop: '32px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;