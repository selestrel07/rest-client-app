import { Fragment, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { methods } from '@data/supported-methods';
import { redirectIfNotAuthenticated } from '@utils/redirects';

export default async function RestClientLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; method: string; requestpart?: string[] }>;
}) {
  const { locale, method, requestpart } = await params;
  await redirectIfNotAuthenticated(locale);

  if (
    (requestpart && requestpart.length > 2) ||
    !Object.keys(methods).includes(method)
  ) {
    notFound();
  }

  return <Fragment>{children}</Fragment>;
}
