import { useTranslations } from 'next-intl';
import { redirectIfNotAuthenticated } from '@utils';

export default async function RestClientPage({ params }: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  await redirectIfNotAuthenticated(locale);
  const t = useTranslations('RestClientPage');

  return <div>{t('text')}</div>;
}