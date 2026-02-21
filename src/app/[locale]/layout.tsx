import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/app/globals.css';
import { CartProvider } from '@/context/CartContext';
import CartModal from '@/components/cart/CartModal';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import type { Metadata } from 'next';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dallas-printingid.com'),
  title: {
    default: 'Percetakan Offset Dallas Kediri - Cetak Kemasan & Box Custom',
    template: '%s | Percetakan Dallas'
  },
  description: 'Solusi cetak kemasan dan box custom berkualitas di Kediri, Nganjuk, & Surabaya. Percetakan Offset Dallas melayani segala kebutuhan packaging makanan, produk, dan promosi dengan harga terbaik dan hasil premium.',
  keywords: ['percetakan offset', 'cetak kemasan', 'custom box', 'packaging makanan', 'kardus hampers', 'cetak dus', 'percetakan kediri', 'percetakan surabaya', 'dallas printing'],
  authors: [{ name: 'Dallas Printing' }],
  creator: 'Dallas Printing',
  publisher: 'Dallas Printing',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dallas-printingid.com',
    siteName: 'Percetakan Dallas',
    title: 'Percetakan Offset Dallas Kediri - Cetak Kemasan & Box Custom',
    description: 'Solusi cetak kemasan dan box custom berkualitas di Kediri & Surabaya.',
    images: [
      {
        url: '/opengraph-image.png', // We should ensure this exists, or use a default one
        width: 1200,
        height: 630,
        alt: 'Percetakan Dallas - Custom Packaging Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percetakan Dallas - Solusi Kemasan Premium',
    description: 'Cetak kemasan dan box custom berkualitas tinggi. Hubungi kami untuk penawaran terbaik.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/logo tab.png',
    apple: '/logo tab.png',
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
    <html lang={locale} className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to Iconify API to fix Critical Request Chains */}
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.simplesvg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.unisvg.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans">
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