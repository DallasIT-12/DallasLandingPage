export const products = [
  // Kategori: Paper Tray
  {
    id: 'pt-001',
    name: 'Paper Tray Medium - Food Grade',
    category: 'Paper Tray',
    price: 25000,
    image: '/paperlisens papertray.png',
    sold: 1200,
    description: 'Paper tray ukuran medium cocok untuk sosis bakar, corn dog, dan snack.',
    slug: 'paper-tray' 
  },
  {
    id: 'pt-002',
    name: 'Paper Tray Large - Wadah Sosis',
    category: 'Paper Tray',
    price: 28000,
    image: '/paperlisens papertray.png',
    sold: 850,
    description: 'Ukuran lebih besar, muat lebih banyak topping.',
    slug: 'paper-tray'
  },

  // Kategori: Box Take Away
  {
    id: 'bta-001',
    name: 'Lunch Box Medium - Laminasi',
    category: 'Box Take away',
    price: 35000,
    image: '/paperlisens box takeaway.png',
    sold: 5000,
    description: 'Lunch box anti bocor, sudah dilaminasi dalam.',
    slug: 'box-take-away'
  },
  {
    id: 'bta-002',
    name: 'Lunch Box Large - Kraft Coklat',
    category: 'Box Take away',
    price: 40000,
    image: '/paperlisens box takeaway.png',
    sold: 3200,
    description: 'Bahan kraft coklat memberikan kesan eco-friendly premium.',
    slug: 'box-take-away'
  },

  // Kategori: Tempat Pensil (Dummy / Contoh Varian Lain)
  {
    id: 'tp-001',
    name: 'Kotak Pensil Custom Karakter',
    category: 'Tempat Pensil',
    price: 15000,
    image: '/paperlisens tempat pensil.png',
    sold: 150,
    description: 'Souvenir tempat pensil custom.',
    slug: 'tempat-pensil'
  },

  // Kategori: Box Cupcake
  {
    id: 'bc-001',
    name: 'Box Cupcake isi 1 - Jendela Mika',
    category: 'Box Cupcake',
    price: 4500,
    image: '/paperlisens cupcake.png',
    sold: 600,
    description: 'Box cantik dengan jendela mika transparan.',
    slug: 'box-cupcake'
  },
  {
    id: 'bc-002',
    name: 'Box Cupcake isi 4 - Handle',
    category: 'Box Cupcake',
    price: 8000,
    image: '/paperlisens cupcake.png',
    sold: 450,
    description: 'Mudah dibawa dengan handle yang kuat.',
    slug: 'box-cupcake'
  },

  // Produk Umum / Lainnya (Untuk Tampilan Home)
  {
    id: 'gen-001',
    name: 'Paper Cup 8oz Hot/Cold',
    category: 'Cup',
    price: 22000,
    image: '/Cup A.png',
    sold: 10000,
    description: 'Gelas kertas tahan panas dan dingin.',
    slug: 'cup'
  },
  {
    id: 'gen-002',
    name: 'Paper Cup Toast Varian',
    category: 'Cup',
    price: 24000,
    image: '/Cup-Toast.png',
    sold: 890,
    description: 'Desain unik untuk toast cup.',
    slug: 'cup'
  },
  {
    id: 'gen-003',
    name: 'Toast Box Slide',
    category: 'Box Take away',
    price: 18000,
    image: '/Toast-es.png',
    sold: 2100,
    description: 'Box model slide untuk roti bakar.',
    slug: 'box-take-away'
  }
];

// Helper function untuk mendapatkan produk berdasarkan kategori (slug URL)
export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => product.slug === categorySlug);
};

// Helper function untuk mencari produk (search bar)
export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.category.toLowerCase().includes(lowerQuery)
  );
};
