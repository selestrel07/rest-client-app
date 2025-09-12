import { useTranslations } from 'next-intl';
import { Header } from '@components';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-screen min-h-[calc(100vh-36px)]">
        {t('text')}
      </div>
    </div>
  );
}
