import { products } from '@/data/products';
import ProductDetailPage from './product-detail-page';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the product from centralized data using productSlug instead of ID
  // Update: Try finding by productSlug first, fallback to finding by ID
  const initialProduct = products.find(p => p.productSlug === slug) || products.find(p => p.id === slug);

  if (!initialProduct) {
    return <div>Product not found</div>;
  }

  // --- Recommendation Logic ---
  // 1. Filter out the current product itself
  // 2. Filter out products without images
  // 3. Deduplicate by Name (treat same-name items as variants)
  const uniqueProducts = products
    .filter(p => p.id !== initialProduct.id && p.image && p.image !== '/placeholder.png')
    .filter((p, index, self) =>
      index === self.findIndex(t => t.name === p.name)
    );

  // 4. Shuffle to show variety (Fisher-Yates shuffle)
  const shuffled = [...uniqueProducts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const relatedProducts = shuffled.slice(0, 8);
  const otherProducts = shuffled.slice(8, 16);

  return <ProductDetailPage initialProduct={initialProduct} relatedProducts={relatedProducts} otherProducts={otherProducts} />;
}