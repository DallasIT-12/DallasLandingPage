import { redirect } from 'next/navigation';

export default function ProductsRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/produk/rokok`);
  return null;
}