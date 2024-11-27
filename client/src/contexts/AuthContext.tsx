import { useState, createContext } from 'react';

import axios from '../api/axios';

import { useFormContext } from '../hooks/useFormContext';

export interface User {
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

  login: (email: string, password: string) => Promise<number>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<number>;
  refresh: () => void;
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

  async function login(email: string, password: string): Promise<number> {
    dispatch({ type: 'SET_LOADING', payload: true });

    return axios
      .post(`/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          setUser((user) => {
            const resUser: User = res.data.payload;

            return {
              ...user,
              id: resUser.id,
              isAdmin: resUser.isAdmin,
              accessToken: resUser.accessToken,
              refreshToken: resUser.refreshToken,
            };
          });
          setIsAuth(true);

          dispatch({
            type: 'SET_MESSAGE',
            payload: 'Successfully logged in!',
          });
          dispatch({ type: 'SET_SEVERITY', payload: 'success' });

          return res.status;
        }
      })
      .catch((err) => {
        const message = err.response.data.message;

        console.error(message);
        dispatch({
          type: 'SET_MESSAGE',
          payload: message,
        });
        dispatch({ type: 'SET_SEVERITY', payload: 'error' });

        return err.response.status;
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }

  async function register(
    fullName: string,
    email: string,
    password: string
  ): Promise<number> {
    dispatch({ type: 'SET_LOADING', payload: true });

    return axios
      .post(`/auth/register`, {
        name: fullName,
        email: email,
        password: password,
        isAdmin: false,
      })
      .then((res) => {
        console.log(res.data);
        return res.status;
      })
      .catch((err) => {
        console.error(err.response.data.message);
        return err.response.status;
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }

  async function refresh() {
    axios
      .post(`/auth/refresh`, {
        refreshToken: user?.refreshToken,
      })
      .then((res) => {
        console.log(res.data);

        setUser((user) => {
          if (!user) return null;

          const resUser: User = res.data.payload;

          return {
            ...user,
            accessToken: resUser.accessToken,
            refreshToken: resUser.refreshToken,
          };
        });
        setIsAuth(true);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, register, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
