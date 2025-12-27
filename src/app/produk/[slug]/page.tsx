'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Footer from '@/components/layout/Footer';

// This data should eventually be moved to a separate file, e.g., src/data/dallas-categories.ts
const dallasCategories = [
    { title: "Kotak Hampers", slug: "kotak-hampers", img: "/kotak hampers.jpg", desc: "Kemasan cetak premium dengan detail presisi, warna memukau, dan finishing elegan.", tags: ["Estetika", "Mewah"], gallery: ["/kotak hampers.jpg"] },
    { title: "Kotak Bakery", slug: "kotak-bakery", img: "/kotak cake.jpg", desc: "Kemasan elegan dan fungsional untuk melindungi dan mempercantik produk bakery Anda.", tags: ["Elegan", "Food-Grade"], gallery: ["/kotak cake.jpg"] },
    { title: "Rokok", slug: "rokok", img: "/custom rokok 3.jpg", desc: "Cetak box rokok dengan detail grafis tajam dan material berkualitas tinggi.", tags: ["Tajam", "Konsisten"], gallery: ["/custom rokok.jpg", "/custom rokok 1.jpg", "/custom rokok 2.jpg", "/custom rokok 3.jpg", "/custom rokok 4.jpg", "/custom rokok (1).jpg", "/custom rokok (2).jpg", "/custom rokok (3).jpg", "/custom rokok (4).jpg", "/custom rokok (5).jpg", "/custom rokok (6).jpg", "/custom rokok (7).jpg", "/custom rokok (8).jpg", "/custom rokok (9).jpg", "/custom rokok (10).jpg", "/custom rokok (11).jpg", "/custom rokok (12).jpg", "/custom rokok (13).jpg", "/custom rokok (14).jpg", "/custom rokok (15).jpg", "/custom rokok (16).jpg", "/custom rokok (17).jpg", "/custom rokok (18).jpg", "/custom rokok (19).jpg", "/custom rokok (20).jpg", "/custom rokok (21).jpg", "/custom rokok (22).jpg", "/custom rokok (23).jpg", "/custom rokok (24).jpg"] },
    { title: "Kotak Nasi", slug: "kotak-nasi", img: "/mobile_banner_2.jpg", desc: "Kotak nasi praktis dan higienis untuk berbagai acara dan kebutuhan katering.", tags: ["Praktis", "Higienis"], gallery: ["/mobile_banner_2.jpg"] },
    { title: "Buku", slug: "buku", img: "/buku (6).jpg", desc: "Teks jelas, gambar tajam, binding kuat untuk pengalaman membaca terbaik.", tags: ["Binding Kuat"], gallery: ["/buku (1).jpg", "/buku (2).jpg", "/buku (3).jpg", "/buku (4).jpg", "/buku (5).jpg", "/buku (6).jpg", "/buku (7).jpg", "/buku (8).jpg", "/buku (9).jpg"] },
    { title: "Kalender", slug: "kalender", img: "/foto kalender.png", desc: "Desain menarik dan material terbaik, alat promosi fungsional.", tags: ["Fungsional"], gallery: ["/foto kalender.png"] },
    { title: "Paperbag", slug: "paperbag", img: "/paperbag.jpg", desc: "Paperbag kuat, stylish, dan mencerminkan identitas brand.", tags: ["Premium", "Kuat"], gallery: ["/paperbag.jpg", "/paperbag (2).jpg", "/paperbag (3).jpg"] },
    { title: "Map", slug: "map", img: "/map.jpg", desc: "Cetak map custom untuk kebutuhan kantor, seminar, atau acara. Profesional dan fungsional.", tags: ["Profesional", "Fungsional"], gallery: ["/map.jpg", "/map (1).jpg", "/map (2).jpg", "/map (3).jpg", "/map (4).jpg", "/map (5).jpg", "/map (6).jpg", "/map (7).jpg", "/map (8).jpg", "/map (9).jpg", "/map (10).jpg", "/map (11).jpg"] },
    { title: "Brosur", slug: "brosur", img: "/foto brosur.png", desc: "Informasi jelas, gambar memukau, dan lipatan presisi.", tags: ["Informatif"], gallery: ["/foto brosur.png"] },
    // Materials added as categories
    { title: "ART PAPER", slug: "art-paper", img: "/BAHAN-AP.jpg", desc: "Kertas dengan permukaan licin, halus, dan mengkilap (glossy) di kedua sisinya. Jenis ini tidak terlalu tebal namun menghasilkan warna cetak yang sangat tajam dan cerah.", tags: [], gallery: ["/BAHAN-AP.jpg"] },
    { title: "IVORY PAPER", slug: "ivory-paper", img: "/BAHAN-IVORY.jpg", desc: "Kertas tebal standar food grade (aman untuk makanan) yang memiliki dua sisi berbeda. Satu sisi putih mulus (sedikit licin), sedangkan sisi lainnya sedikit kesat (doff). Memberikan kesan bersih, premium, dan eksklusif.", tags: [], gallery: ["/BAHAN-IVORY.jpg"] },
    { title: "Tipping", slug: "bahan-tipping", img: "/BAHAN-TIPPING.jpg", desc: "Memiliki lapisan khusus agar tidak lengket di bibir (lip-release), tahan air, dan food grade.", tags: [], gallery: ["/BAHAN-TIPPING.jpg"] },
    { title: "Duplex", slug: "duplex", img: "/BAHAN-DC.jpg", desc: "Jenis kertas karton yang paling ekonomis. Memiliki sisi depan berwarna putih (untuk dicetak) dan sisi belakang berwarna abu-abu gelap. Teksturnya kaku dan kokoh.", tags: [], gallery: ["/BAHAN-DC.jpg"] }
];

export default function ProductCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [isLargeMobile, setIsLargeMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const category = dallasCategories.find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', color: '#111827', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon icon="mdi:arrow-left" />
                Kembali
            </button>
        </header>
        <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', color: '#1f2937' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Kategori Tidak Ditemukan</h1>
            <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>Maaf, kami tidak dapat menemukan produk untuk kategori ini.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#111827' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'saturate(180%) blur(20px)',
        padding: isLargeMobile ? '1rem 1.5rem' : '1rem 2rem', 
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none', color: '#1f2937', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                <Icon icon="mdi:arrow-left" style={{ fontSize: '1.5rem' }} />
                {!isLargeMobile && <span>Kembali</span>}
            </button>
            <h1 style={{ fontSize: isLargeMobile ? '1.125rem' : '1.5rem', fontWeight: '600', textAlign: 'center' }}>
              {category.title}
            </h1>
            <div style={{width: isLargeMobile ? '24px' : '80px'}}></div> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: isLargeMobile ? '1.5rem' : '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: isLargeMobile ? '2rem' : '3rem', fontSize: isLargeMobile ? '1rem' : '1.125rem', color: '#4b5563', textAlign: 'center', maxWidth: '720px', margin: '0 auto 2rem' }}>
          {category.desc}
        </p>

        {/* Gallery Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isLargeMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: isLargeMobile ? '1rem' : '1.5rem' 
        }}>
          {category.gallery.map((imageSrc, index) => (
            <div key={index} style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%', // 1:1 Aspect Ratio
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <Image
                src={imageSrc}
                alt={`${category.title} - Gambar ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {category.gallery.length <= 1 && (
            <div style={{textAlign: 'center', padding: '3rem', marginTop: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                <p style={{color: '#6b7280'}}>Lebih banyak contoh gambar untuk kategori ini akan segera ditambahkan.</p>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
