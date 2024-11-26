import { useState, createContext } from 'react';
import axios from 'axios';

import { useFormContext } from '../hooks/useFormContext';

export interface User {
  // email: string; email can be stored as well, but i don't need it for now. will use id
  id: number;
  isAdmin: boolean;

  accessToken?: string;
  refreshToken?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuth: boolean;

  setUser?: (user: User | null) => void;
  setIsAuth?: (isAuth: boolean) => void;

  login: (email: string, password: string) => void;
  //logout: () => void; FIXME: implement logout
}
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const { dispatch } = useFormContext();

  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

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
              const resUser: User = res.data.payload;

              setIsAuth(true);

              return {
                ...user,
                id: resUser.id,
                isAdmin: resUser.isAdmin,
                accessToken: resUser.accessToken,
                refreshToken: resUser.refreshToken,
                //email, mail can be stored as well, but i don't need it for now. will use id
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
    <AuthContext.Provider value={{ user, isAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
