import { useTranslations } from 'next-intl';
import { redirectIfAuthenticated } from '@utils';

export default async function SignInPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  await redirectIfAuthenticated(locale);
  const t = useTranslations('SignInPage');

  return <div>{t('text')}</div>;
}