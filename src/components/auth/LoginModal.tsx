'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Icon } from '@iconify/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const switchMode = (newMode: 'login' | 'register') => {
    resetForm();
    setMode(newMode);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn('google', { callbackUrl: window.location.href });
    } catch {
      setError('Gagal login dengan Google. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email atau password salah.');
      } else {
        onSuccess?.();
        onClose();
        window.location.reload();
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Gagal mendaftar.');
        return;
      }

      setSuccess('Registrasi berhasil! Silakan login.');
      setTimeout(() => switchMode('login'), 1500);
    } catch {
      setError('Terjadi kesalahan server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
    }}>
      {/* Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onClick={onClose} />

      {/* Modal */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: '420px', margin: '16px',
        backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        animation: 'modalSlideUp 0.3s ease-out',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #40534c 0%, #1a3636 100%)',
          padding: '28px 24px 24px', color: 'white', position: 'relative',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.15)',
            border: 'none', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
          }}>
            <Icon icon="mdi:close" width="18" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Icon icon="mdi:account-circle" width="36" style={{ color: '#d6bd98' }} />
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
                {mode === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.8 }}>
                {mode === 'login' ? 'Untuk melanjutkan belanja di Paperlisens' : 'Buat akun untuk pengalaman belanja lebih baik'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Error/Success Messages */}
          {error && (
            <div style={{
              backgroundColor: '#fef2f2', color: '#dc2626', padding: '10px 14px',
              borderRadius: '8px', fontSize: '13px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px',
              border: '1px solid #fecaca',
            }}>
              <Icon icon="mdi:alert-circle" width="18" />
              {error}
            </div>
          )}
          {success && (
            <div style={{
              backgroundColor: '#f0fdf4', color: '#16a34a', padding: '10px 14px',
              borderRadius: '8px', fontSize: '13px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '8px',
              border: '1px solid #bbf7d0',
            }}>
              <Icon icon="mdi:check-circle" width="18" />
              {success}
            </div>
          )}

          {/* Google Login Button */}
          <button onClick={handleGoogleLogin} disabled={isLoading} style={{
            width: '100%', padding: '12px', border: '1px solid #e0e0e0',
            borderRadius: '10px', backgroundColor: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontSize: '14px', fontWeight: '600', color: '#333',
            transition: 'all 0.2s', marginBottom: '20px',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#40534c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
          >
            <Icon icon="flat-color-icons:google" width="20" />
            {mode === 'login' ? 'Masuk dengan Google' : 'Daftar dengan Google'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>atau</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
          </div>

          {/* Credential Form */}
          <form onSubmit={mode === 'login' ? handleCredentialLogin : handleRegister}>
            {mode === 'register' && (
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Nama Lengkap
                </label>
                <div style={{ position: 'relative' }}>
                  <Icon icon="mdi:account" width="18" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required
                    placeholder="Masukkan nama lengkap"
                    style={{
                      width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #d1d5db',
                      borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#40534c'}
                    onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Icon icon="mdi:email" width="18" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="contoh@email.com"
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #d1d5db',
                    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#40534c'}
                  onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Icon icon="mdi:lock" width="18" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} required
                  placeholder={mode === 'register' ? 'Minimal 6 karakter' : 'Masukkan password'}
                  minLength={mode === 'register' ? 6 : undefined}
                  style={{
                    width: '100%', padding: '10px 40px 10px 38px', border: '1px solid #d1d5db',
                    borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#40534c'}
                  onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px',
                }}>
                  <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width="18" />
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  No. Telepon <span style={{ color: '#9ca3af', fontWeight: '400' }}>(opsional)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Icon icon="mdi:phone" width="18" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    style={{
                      width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #d1d5db',
                      borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#40534c'}
                    onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={isLoading} style={{
              width: '100%', padding: '12px', backgroundColor: '#40534c', color: '#d6bd98',
              border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '4px',
              opacity: isLoading ? 0.7 : 1, transition: 'all 0.2s',
              letterSpacing: '0.3px',
            }}>
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icon icon="mdi:loading" width="18" style={{ animation: 'spin 1s linear infinite' }} />
                  Loading...
                </span>
              ) : mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Switch Mode */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6b7280' }}>
            {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} style={{
              background: 'none', border: 'none', color: '#40534c', fontWeight: '700',
              cursor: 'pointer', textDecoration: 'underline', fontSize: '13px',
            }}>
              {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
