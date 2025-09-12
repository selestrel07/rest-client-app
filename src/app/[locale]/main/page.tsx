import { useTranslations } from 'next-intl';

export default function Main() {
  const t = useTranslations('MainPage');
  return <div>{t('text')}</div>;
}
