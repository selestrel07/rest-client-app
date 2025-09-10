import { useTranslations } from 'next-intl';

export default function SignUpPage() {
  const t = useTranslations('SignUpPage');
  return <div>{t('text')}</div>;
}