import { useTranslations } from 'next-intl';

export default function RestClientPage() {
  const t = useTranslations('RestClientPage');
  return <div>{t('text')}</div>;
}
