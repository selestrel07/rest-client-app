'use client';

import { useTranslations } from 'next-intl';

export function SignInForm() {
  const t = useTranslations('SignInPage');

  return <div>{t('text')}</div>;
}
