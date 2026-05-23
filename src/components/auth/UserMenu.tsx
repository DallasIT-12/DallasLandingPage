'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';
import LoginModal from './LoginModal';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return (
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        backgroundColor: 'rgba(214,189,152,0.2)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
    );
  }

  // Not logged in
  if (!session?.user) {
    return (
      <>
        <button onClick={() => setIsLoginOpen(true)} style={{
          background: 'none', border: '1px solid rgba(214,189,152,0.5)',
          borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
          color: '#d6bd98', fontSize: '12px', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(214,189,152,0.15)'; e.currentTarget.style.borderColor = '#d6bd98'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(214,189,152,0.5)'; }}
        >
          <Icon icon="mdi:account-circle-outline" width="18" />
          Masuk
        </button>
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </>
    );
  }

  // Logged in
  const userName = session.user.name || 'User';
  const userImage = session.user.image;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '4px', borderRadius: '8px', transition: 'all 0.2s',
      }}>
        {userImage ? (
          <img src={userImage} alt={userName} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '2px solid #d6bd98', objectFit: 'cover',
          }} />
        ) : (
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: '#d6bd98', color: '#1a3636',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '700', fontSize: '14px',
          }}>
            {userInitial}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          backgroundColor: '#fff', borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb',
          minWidth: '220px', zIndex: 2000, overflow: 'hidden',
          animation: 'menuFadeIn 0.2s ease-out',
        }}>
          {/* User Info */}
          <div style={{
            padding: '16px', borderBottom: '1px solid #f0f0f0',
            background: 'linear-gradient(135deg, #f8faf9 0%, #fff 100%)',
          }}>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1a3636' }}>
              {userName}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {session.user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '8px' }}>
            <MenuItem icon="mdi:package-variant" label="Pesanan Saya" href="/paperlisens/orders" onClick={() => setIsMenuOpen(false)} />
            <MenuItem icon="mdi:map-marker" label="Alamat Saya" href="/paperlisens/account" onClick={() => setIsMenuOpen(false)} />
            <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '4px 0' }} />
            <MenuItem
              icon="mdi:logout"
              label="Keluar"
              onClick={() => { signOut({ callbackUrl: window.location.href }); setIsMenuOpen(false); }}
              danger
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes menuFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function MenuItem({ icon, label, href, onClick, danger }: {
  icon: string; label: string; href?: string; onClick?: () => void; danger?: boolean;
}) {
  const content = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
      color: danger ? '#dc2626' : '#374151', fontSize: '13px', fontWeight: '500',
      transition: 'background-color 0.15s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = danger ? '#fef2f2' : '#f3f4f6'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      onClick={onClick}
    >
      <Icon icon={icon} width="18" style={{ color: danger ? '#dc2626' : '#6b7280' }} />
      {label}
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: 'none' }}>{content}</a>;
  }
  return content;
}
