import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('SignInPage');

  return <div>{t('text')}</div>;
}
