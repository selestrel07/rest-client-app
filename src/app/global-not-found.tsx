import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import './global.css';
import { Footer } from '@components';
import { Header } from '@components';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Page Not Found',
};

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <html>
      <body>
        <Header />
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-36px)] bg-violet-50">
          {t('text')}
        </div>
        <Footer />
      </body>
    </html>
  );
}
