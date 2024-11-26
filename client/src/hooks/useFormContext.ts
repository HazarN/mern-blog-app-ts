import { useContext } from 'react';

import { FormContext } from '../contexts/FormContext';

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
}
