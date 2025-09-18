'use client';

import { Provider } from 'react-redux';
import { ReactNode, useMemo } from 'react';
import { createStore } from '@store/store';

interface ReduxProviderProps {
  children: ReactNode;
  preloadedState?: Parameters<typeof createStore>[0];
}

export function ReduxProvider({
  children,
  preloadedState,
}: ReduxProviderProps) {
  const store = useMemo(() => createStore(preloadedState), []);
  return <Provider store={store}>{children}</Provider>;
}
