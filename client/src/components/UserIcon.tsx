import { useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { axiosPrivate } from '../api/axios';

import { useAuthContext } from '../hooks/useAuthContext';

function UserIcon(): JSX.Element | null {
  const { userCredentials, username, setUsername } = useAuthContext();

  useEffect(() => {
    const controller = new AbortController();

    async function getUserById() {
      try {
        if (!userCredentials) return;

        const res = await axiosPrivate.get(`/users/${userCredentials.id}`, {
          signal: controller.signal,
          headers: {
            authorization: `Bearer ${userCredentials.accessToken}`,
          },
        });

        setUsername(res.data.name);
      } catch (err) {
        console.error(err);
      }
    }

    getUserById();

    return () => controller.abort();
  }, [userCredentials, setUsername]);

  return (
    <>
      {username}
      <AccountBoxIcon fontSize='large' />
    </>
  );
}

export default UserIcon;
