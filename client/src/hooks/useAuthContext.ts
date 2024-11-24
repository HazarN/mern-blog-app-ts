import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}