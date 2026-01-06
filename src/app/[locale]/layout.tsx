import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import CartModal from '@/components/cart/CartModal';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dallas Company',
  description: 'Dallas Company Landing Page',
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await params in Next.js 15+ if needed, but in 14 it's sync. 
  // However, it's safer to treat it as potentially async or just access it.
  const { locale } = await params;

  if (!['en', 'id'].includes(locale)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {children}
            <CartModal />
            <FloatingWhatsApp />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}