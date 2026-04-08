import KarirClient from '@/components/page/KarirClient';
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Career' });
    const homeT = await getTranslations({ locale, namespace: 'Home' });

    return {
        title: `${t('title')} | ${homeT('mainH1')}`,
        description: t('subtitle'),
        alternates: {
            canonical: 'https://dallas-printingid.com/id/karir',
            languages: {
                'id': 'https://dallas-printingid.com/id/karir',
                'en': 'https://dallas-printingid.com/en/karir',
                'zh': 'https://dallas-printingid.com/zh/karir',
                'x-default': 'https://dallas-printingid.com/id/karir',
            },
        },
    };
}

export default function KarirPage() {
    return <KarirClient />;
}
