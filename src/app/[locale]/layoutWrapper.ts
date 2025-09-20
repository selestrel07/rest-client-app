'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppStore';
import { setLocale, signIn, signOut } from '@states/uiSlice';

export function LayoutWrapper({
  locale,
  isAuthenticated,
  children,
  user,
}: {
  locale: string;
  isAuthenticated: boolean;
  children: ReactNode;
  user?: string;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocale(locale as 'en' | 'ru'));
    if (isAuthenticated && user) {
      dispatch(signIn(user));
    } else {
      dispatch(signOut());
    }
  });

  return children;
}
