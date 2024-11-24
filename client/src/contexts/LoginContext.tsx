import { createContext, useReducer } from 'react';

interface LoginContextValue {
  emailInput: string;
  passwordInput: string;
  message: string;
  loading: boolean;
  severity: 'success' | 'error';

  dispatch: React.Dispatch<LoginAction>;
}
interface LoginAction {
  type: string;
  payload: string | boolean;
}

const initialState: LoginContextValue = {
  emailInput: '',
  passwordInput: '',
  message: '',
  loading: false,
  severity: 'success',

  dispatch: () => {},
};

function reducer(state: LoginContextValue, action: LoginAction) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, emailInput: action.payload as string };
    case 'SET_PASSWORD':
      return { ...state, passwordInput: action.payload as string };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload as string };
    case 'SET_LOADING':
      return { ...state, loading: action.payload as boolean };
    case 'SET_SEVERITY':
      return {
        ...state,
        severity: action.payload as 'success' | 'error',
      };
    default:
      console.error('Invalid action type');
      return state;
  }
}

const LoginContext = createContext<LoginContextValue | null>(null);

interface LoginProviderProps {
  children: React.ReactNode;
}
function LoginProvider({ children }: LoginProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
