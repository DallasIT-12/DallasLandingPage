export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  nicotineLevel: string;
  tarLevel: string;
  flavor: string;
  packSize: string;
}

export const customBoxProducts: Product[] = [
  {
    id: '1',
    slug: 'custom-box-premium-gold',
    name: 'Custom Box Premium Gold',
    description: 'Kotak rokok custom dengan finishing gold foil dan emboss texture premium',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Luxury',
    brand: 'Dallas Custom',
    nicotineLevel: 'Foil Emas',
    tarLevel: 'Emboss',
    flavor: 'Magnetic Close',
    packSize: '1000 pcs'
  },
  {
    id: '2',
    slug: 'custom-box-matte-black',
    name: 'Custom Box Matte Black',
    description: 'Desain minimalis dengan finishing matte black dan UV spot varnish',
    price: 720000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Modern',
    brand: 'Dallas Custom',
    nicotineLevel: 'Matte Finish',
    tarLevel: 'UV Spot',
    flavor: 'Sleek Design',
    packSize: '1000 pcs'
  },
  {
    id: '3',
    slug: 'custom-box-vintage-classic',
    name: 'Custom Box Vintage Classic',
    description: 'Gaya vintage dengan tipografi klasik dan texture kertas premium',
    price: 680000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Vintage',
    brand: 'Dallas Custom',
    nicotineLevel: 'Texture Paper',
    tarLevel: 'Classic Font',
    flavor: 'Vintage Style',
    packSize: '1000 pcs'
  },
  {
    id: '4',
    slug: 'custom-box-eco-friendly',
    name: 'Custom Box Eco Friendly',
    description: 'Ramah lingkungan dengan bahan recycled dan tinta soy-based',
    price: 590000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Eco',
    subcategory: 'Green',
    brand: 'Dallas Custom',
    nicotineLevel: 'Recycled',
    tarLevel: 'Soy Ink',
    flavor: 'Eco Design',
    packSize: '1000 pcs'
  },
  {
    id: '5',
    slug: 'custom-box-holographic',
    name: 'Custom Box Holographic',
    description: 'Efek holographic rainbow dengan lamination khusus anti pemalsuan',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Special Effect',
    brand: 'Dallas Custom',
    nicotineLevel: 'Holographic',
    tarLevel: 'Security',
    flavor: 'Rainbow Effect',
    packSize: '1000 pcs'
  },
  {
    id: '6',
    slug: 'custom-box-soft-touch',
    name: 'Custom Box Soft Touch',
    description: 'Tekstur soft touch dengan lamination khusus untuk sensasi premium',
    price: 780000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Premium',
    subcategory: 'Texture',
    brand: 'Dallas Custom',
    nicotineLevel: 'Soft Touch',
    tarLevel: 'Premium Feel',
    flavor: 'Luxury Texture',
    packSize: '1000 pcs'
  },
  {
    id: '7',
    slug: 'custom-box-window-cut',
    name: 'Custom Box Window Cut',
    description: 'Desain dengan jendela transparan untuk preview produk dalam kemasan',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Window',
    brand: 'Dallas Custom',
    nicotineLevel: 'Clear Window',
    tarLevel: 'Preview',
    flavor: 'Transparent',
    packSize: '1000 pcs'
  },
  {
    id: '8',
    slug: 'custom-box-gradient-color',
    name: 'Custom Box Gradient Color',
    description: 'Efek gradasi warna modern dengan teknologi printing terbaru',
    price: 710000,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop',
    category: 'Standard',
    subcategory: 'Gradient',
    brand: 'Dallas Custom',
    nicotineLevel: 'Gradient Print',
    tarLevel: 'Modern Tech',
    flavor: 'Color Blend',
    packSize: '1000 pcs'
  }
];
