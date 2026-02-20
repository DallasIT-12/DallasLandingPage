import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import CartModal from '@/components/cart/CartModal';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PERCETAKAN OFFSET DALLAS KEDIRI - DALLAS PRINTING',
  description: 'Jl. Kilisuci No.71, Setono Pande, Kec. Kota, Kota Kediri, Jawa Timur 64132. Email: mail.dallas-printingid.com, Telp: (+62) 812-6000-1487.',
  icons: {
    icon: '/logo tab.png',
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15+ if needed, but in 14 it's sync. 
  // However, it's safer to treat it as potentially async or just access it.
  const { locale } = await params;

  if (!['en', 'id', 'zh'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
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