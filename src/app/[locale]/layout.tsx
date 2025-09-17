import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@components';
import { Header } from '@components';
import { ErrorBoundary } from '@components';
import { FallbackUI } from '@components';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'use-intl';
import { routing } from '@i18n/routing';
import { notFound } from 'next/navigation';
import { ReduxProvider } from 'store/Providers';
import '../global.css';

export const metadata: Metadata = {
  title: 'Yagni Rest Client App',
  description:
    'Rest Client App (Next.js) is an application developed in scope of RS School 2025 Q3 React Course',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-violet-50">
        <ErrorBoundary fallback={<FallbackUI />}>
          <ReduxProvider>
            <NextIntlClientProvider>
              <Header />
              <div
                id="root"
                className="flex items-center justify-center w-screen min-h-[calc(100vh-36px)]"
              >
                {children}
              </div>
              <Footer />
            </NextIntlClientProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
