import { useState, createContext } from 'react';
import axios from 'axios';

import { useLoginContext } from '../hooks/useLoginContext';

export interface User {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;

  login: (email: string, password: string) => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const { dispatch } = useLoginContext();

  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    dispatch({ type: 'SET_LOADING', payload: true });

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        switch (res.status) {
          case 200:
            setUser((user) => {
              return {
                ...user,
                email,
                password,
              };
            });

            dispatch({
              type: 'SET_MESSAGE',
              payload: 'Successfully logged in!',
            });
            dispatch({ type: 'SET_SEVERITY', payload: 'success' });
            break;
        }
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: 'SET_MESSAGE',
          payload: 'Invalid email or password',
        });
        dispatch({ type: 'SET_SEVERITY', payload: 'error' });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
