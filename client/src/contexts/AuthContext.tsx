import { useState, createContext } from 'react';

import axios, { axiosPrivate } from '../api/axios';

import { useFormContext } from '../hooks/useFormContext';

export interface UserCredentials {
  id: number;
  isAdmin: boolean;

  accessToken?: string;
}

interface AuthContextValue {
  userCredentials: UserCredentials | null;
  username?: string;
  isAuth: boolean;

  setUserCredentials?: (userCredentials: UserCredentials | null) => void;
  setUsername: (username: string) => void;
  setIsAuth?: (isAuth: boolean) => void;

  login: (email: string, password: string) => Promise<number>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<number>;
  refresh: () => Promise<string | undefined>;
  //logout: () => void; FIXME: implement logout
}
const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const { dispatch: formDispatch } = useFormContext();

  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  async function login(email: string, password: string): Promise<number> {
    formDispatch({ type: 'SET_LOADING', payload: true });

    return axios
      .post(
        `/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          setUserCredentials((userCredentials) => {
            const resUser: UserCredentials = res.data.payload;

            return {
              ...userCredentials,
              id: resUser.id,
              isAdmin: resUser.isAdmin,
              accessToken: resUser.accessToken,
            };
          });
          setIsAuth(true);

          formDispatch({
            type: 'SET_MESSAGE',
            payload: 'Successfully logged in!',
          });
          formDispatch({ type: 'SET_SEVERITY', payload: 'success' });

          return res.status;
        }
      })
      .catch((err) => {
        const message = err.response.data.message;

        console.error(message);
        formDispatch({
          type: 'SET_MESSAGE',
          payload: message,
        });
        formDispatch({ type: 'SET_SEVERITY', payload: 'error' });

        return err.response.status;
      })
      .finally(() => formDispatch({ type: 'SET_LOADING', payload: false }));
  }

  async function register(
    fullName: string,
    email: string,
    password: string
  ): Promise<number> {
    formDispatch({ type: 'SET_LOADING', payload: true });

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
      .finally(() => formDispatch({ type: 'SET_LOADING', payload: false }));
  }

  async function refresh(): Promise<string | undefined> {
    return axiosPrivate
      .get(`/auth/refresh`)
      .then((res) => {
        console.log(res.data);

        const resUser: UserCredentials = res.data.payload;

        setUserCredentials((userCredentials) => {
          if (!userCredentials) return null;

          return {
            ...userCredentials,
            accessToken: resUser.accessToken,
          };
        });

        setIsAuth(true);
        return resUser.accessToken;
      })
      .catch((err) => {
        console.error(err.response.data.message);
        setIsAuth(false);
        return undefined;
      });
  }

  return (
    <AuthContext.Provider
      value={{
        userCredentials,
        username,
        isAuth,
        setUserCredentials,
        setUsername,
        setIsAuth,
        login,
        register,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
