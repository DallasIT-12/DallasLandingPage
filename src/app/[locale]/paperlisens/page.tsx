import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PaperlisensPageClient from './paperlisens-page-client';

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
