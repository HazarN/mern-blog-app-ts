import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useAxiosPrivate } from '../hooks/useAxiosPrivate';
import { useAuthContext } from '../hooks/useAuthContext';

import { User } from '../contexts/AuthContext';

import Layout from './Layout';

import Navbar from '../components/Navbar';

function AppLayout(): JSX.Element {
  const { setUser, setIsAuth } = useAuthContext();

  const axiosPrivate = useAxiosPrivate();

  /* useEffect(() => {
    const controller = new AbortController();

    // check if there is a refresh token, if not, redirect to login
    async function onRefresh() {
      try {
        const res = await axiosPrivate.get('/auth/user', {
          signal: controller.signal,
          withCredentials: true,
        });

        console.log(res.data);

        setUser((user: User) => {
          if (!user) return null;

          return {
            ...user,
            ...res.data.payload,
          };
        });
        setIsAuth(true);
      } catch (err) {
        console.error(err);
      }
    }

    onRefresh();

    return () => controller.abort();
  }, [axiosPrivate, setUser, setIsAuth]); */

  return (
    <Layout>
      <Navbar />

      <Typography variant='h4'>App Layout</Typography>
    </Layout>
  );
}

export default AppLayout;
