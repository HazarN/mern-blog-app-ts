import { createContext, useReducer } from 'react';

interface FormContextValue {
  // Validation concerns
  emailInput: string;
  passwordInput: string;
  passwordConfirmInput: string;
  emailError: string;
  passwordError: string;

  // After validation concerns
  message: string;
  loading: boolean;
  severity: 'success' | 'error';

  dispatch: React.Dispatch<FormAction>;

  loginFormValidation: (email: string, password: string) => boolean;
  signUpFormValidation?: (
    email: string,
    password1: string,
    password2: string
  ) => boolean;
}
interface FormAction {
  type: string;
  payload?: string | boolean;
}

const initialState: FormContextValue = {
  // Validation concerns
  emailInput: '',
  passwordInput: '',
  passwordConfirmInput: '',
  emailError: '',
  passwordError: '',

  // After validation concerns
  message: '',
  loading: false,
  severity: 'success',

  dispatch: () => {},

  loginFormValidation: () => {
    throw new Error('Function became undefined');
  },
  signUpFormValidation: () => {
    throw new Error('Function became undefined');
  },
};

function reducer(state: FormContextValue, action: FormAction) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, emailInput: action.payload as string };
    case 'SET_PASSWORD':
      return { ...state, passwordInput: action.payload as string };
    case 'SET_PASSWORD_CONFIRM':
      return { ...state, passwordConfirmInput: action.payload as string };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload as string };
    case 'SET_LOADING':
      return { ...state, loading: action.payload as boolean };
    case 'SET_SEVERITY':
      return {
        ...state,
        severity: action.payload as 'success' | 'error',
      };
    case 'RESET_VALIDATION':
      return { ...state, emailError: '', passwordError: '' };
    case 'SEND_ERROR_EMAIL':
      return { ...state, emailError: action.payload as string };
    case 'SEND_ERROR_PASSWORD':
      return { ...state, passwordError: action.payload as string };
    default:
      console.error('Invalid action type');
      return state;
  }
}

const FormContext = createContext<FormContextValue | null>(null);

interface FormProviderProps {
  children: React.ReactNode;
}
function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function loginFormValidation(email: string, password: string): boolean {
    let isValid = true;
    dispatch({ type: 'RESET_VALIDATION' });

    // Checking the email:
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email.trim()) {
      dispatch({ type: 'SEND_ERROR_EMAIL', payload: 'Email is required' });
      isValid = false;
    } else if (!emailRegex.test(email)) {
      dispatch({ type: 'SEND_ERROR_EMAIL', payload: 'Invalid email' });
      isValid = false;
    }

    // Checking the password:
    if (!password.trim()) {
      dispatch({
        type: 'SEND_ERROR_PASSWORD',
        payload: 'Password is required',
      });
      isValid = false;
    }

    return isValid;
  }

  return (
    <FormContext.Provider value={{ ...state, dispatch, loginFormValidation }}>
      {children}
    </FormContext.Provider>
  );
}

export { FormContext, FormProvider };
