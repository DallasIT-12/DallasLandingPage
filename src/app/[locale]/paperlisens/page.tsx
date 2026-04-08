import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PaperlisensPageClient from './paperlisens-page-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paperlisens - Marketplace Kemasan & Paper Tray Berkualitas',
  description: 'Belanja kemasan premium, paper tray, box takeaway, dan produk kemasan berkualitas di Paperlisens. Solusi kemasan higienis dan ramah lingkungan untuk bisnis F&B Anda.',
  keywords: ['paperlisens', 'beli paper tray', 'marketplace kemasan', 'box takeaway', 'kemasan food grade', 'tempat makan kertas'],
  alternates: {
    canonical: 'https://dallas-printingid.com/id/paperlisens',
    languages: {
      'id': 'https://dallas-printingid.com/id/paperlisens',
      'en': 'https://dallas-printingid.com/en/paperlisens',
      'zh': 'https://dallas-printingid.com/zh/paperlisens',
      'x-default': 'https://dallas-printingid.com/id/paperlisens',
    },
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale = 'id' } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <PaperlisensPageClient />
    </NextIntlClientProvider>
  );
}
