import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" style={{
      backgroundColor: '#111827', 
      padding: '48px 0'
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px'
        }}>
          <div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
              <img src="/logo1.png" alt="Percetakan Dallas" style={{height: '40px', width: 'auto'}} />
            </div>
            <p style={{color: '#9ca3af'}}>
              Premium quality products for discerning customers.
            </p>
          </div>
          <div>
            <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px', color: 'white'}}>Products</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <a href="/KATALOG DALLAS.pdf" 
                 download="KATALOG DALLAS.pdf"
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.paddingLeft = '8px'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.paddingLeft = '0px'}}>
                Katalog
              </a>
              <a href="/paperlisens" 
                 style={{color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer'}}
                 onMouseOver={(e) => {(e.target as HTMLElement).style.color = '#ffffff'; (e.target as HTMLElement).style.paddingLeft = '8px'}}
                 onMouseOut={(e) => {(e.target as HTMLElement).style.color = '#9ca3af'; (e.target as HTMLElement).style.paddingLeft = '0px'}}>
                Paperlisens
              </a>
            </div>
          </div>
          <div>
            <h4 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '16px', color: 'white'}}>Contact</h4>
            <div style={{color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <p>Email: <a href="mailto:percetakandallas@gmail.com" style={{color: '#9ca3af', textDecoration: 'underline'}}>percetakandallas@gmail.com</a></p>
              <p>Phone: <a href="https://wa.me/6281260001487" target="_blank" rel="noopener noreferrer" style={{color: '#9ca3af', textDecoration: 'underline'}}>(+62) 812-6000-1487</a></p>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #374151', 
          marginTop: '32px', 
          paddingTop: '32px', 
          textAlign: 'center', 
          color: '#9ca3af'
        }}>
          <p>&copy; 2024 Percetakan Dallas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
