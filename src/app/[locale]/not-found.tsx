import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div>
      <div className="flex items-center justify-center w-screen min-h-[calc(100vh-36px)]">
        {t('text')}
      </div>
    </div>
  );
}
