import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import './global.css';
import { Footer } from '@components';
import { Header } from '@components';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Page Not Found',
};

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  const locale = useLocale() as 'en' | 'ru';
  return (
    <html>
      <body>
        <Header locale={locale} />
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-36px)] bg-violet-50">
          {t('text')}
        </div>
        <Footer />
      </body>
    </html>
  );
}
