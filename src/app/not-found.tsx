import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.25rem', margin: '1rem 0' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '0.25rem',
        textDecoration: 'none',
        fontSize: '1rem'
      }}>
        Go back home
      </Link>
    </div>
  );
}
