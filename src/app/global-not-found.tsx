import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Footer } from '@components';
import { Header } from '@components';
import { ReduxProvider } from '@store/Providers';
import { isAuthenticated } from '@actions/auth-actions';
import './global.css';
import { NotFound } from '../components/NotFound/NotFound';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Page Not Found',
};

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const userLoggedIn = await isAuthenticated();
  const { locale } = await params;
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          <ReduxProvider
            preloadedState={{
              ui: {
                locale: locale as 'en' | 'ru',
                isAuthenticated: userLoggedIn,
                user: '',
              },
            }}
          >
            <Header locale={locale as 'en' | 'ru'} />
            <NotFound />
            <Footer />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
