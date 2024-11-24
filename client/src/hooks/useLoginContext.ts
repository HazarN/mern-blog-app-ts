import { useContext } from 'react';

import { LoginContext } from '../contexts/LoginContext';

export function useLoginContext() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
}
