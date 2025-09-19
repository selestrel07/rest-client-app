'use client';

import { FC, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppStore';
import { saveVariables } from '@services/local-storage.service';

export const Variables: FC = () => {
  const variables = useAppSelector((state) => state.variables.value);
  const user = useAppSelector((state) => state.ui.user);

  useEffect(() => {
    if (user) {
      saveVariables(user, variables);
    }
  }, [variables]);

  return <h1>Variables</h1>;
};
