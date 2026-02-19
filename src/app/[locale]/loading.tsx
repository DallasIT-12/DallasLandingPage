'use client';

export default function Loading() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            gap: '24px'
        }}>
            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

            {/* Spinner */}
            <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid #e5e7eb',
                borderTopColor: '#0A4174',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />

            {/* Brand text */}
            <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#9ca3af',
                letterSpacing: '0.05em',
                animation: 'pulse 1.5s ease-in-out infinite'
            }}>
                DALLAS
            </div>
        </div>
    );
}
