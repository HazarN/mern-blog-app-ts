import { useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { axiosPrivate } from '../api/axios';

import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserIcon(): JSX.Element | null {
  const navigate = useNavigate();
  const { userCredentials, username, setUsername, logout } = useAuthContext();

  function handleLogout() {
    logout();
    navigate('/');
  }

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
      } catch {
        return;
      }
    }

    getUserById();

    return () => controller.abort();
  }, [userCredentials, setUsername]);

  return (
    <>
      {username}
      <AccountBoxIcon fontSize='large' />
      <Button
        sx={{ color: 'white', borderColor: 'white' }}
        variant='outlined'
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}

export default UserIcon;
