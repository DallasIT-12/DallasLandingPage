import { redirect } from 'next/navigation';

export default async function ProductsRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/produk/rokok`);
}