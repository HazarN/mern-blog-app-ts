import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, SxProps, Alert } from '@mui/material';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFormContext } from '../hooks/useFormContext';

const inputBlueHover: SxProps = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#1976d2',
    },
  },
};

function LoginForm(): JSX.Element {
  const navigate = useNavigate();

  const { login } = useAuthContext();
  const {
    emailInput,
    passwordInput,
    message,
    severity,
    emailError,
    passwordError,
    dispatch,
    loginFormValidation,
  } = useFormContext();

  function handleSignUpClick() {
    navigate('/signup');
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const isValid = loginFormValidation(emailInput, passwordInput);

    if (!isValid) return;

    const status: number = await login(emailInput, passwordInput);

    if (status === 200) setTimeout(() => navigate('/blog'), 1_250);
  }

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={{ marginTop: 3 }}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        label='Email'
        type='email'
        margin='normal'
        variant='outlined'
        required
        error={!!emailError}
        helperText={emailError}
        sx={inputBlueHover}
        value={emailInput}
        onChange={(e) =>
          dispatch({ type: 'SET_EMAIL', payload: e.target.value })
        }
      />

      <TextField
        fullWidth
        label='Password'
        type='password'
        margin='normal'
        variant='outlined'
        required
        error={!!passwordError}
        helperText={passwordError}
        sx={inputBlueHover}
        value={passwordInput}
        onChange={(e) =>
          dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
        }
      />

      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        sx={{ marginTop: 3 }}
        type='submit'
      >
        Sign In
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        size='large'
        fullWidth
        sx={{
          marginTop: 2,
          ':hover': {
            backgroundColor: 'background.default',
            color: 'secondary.dark',
          },
        }}
        onClick={handleSignUpClick}
      >
        Don't have an account? Sign Up
      </Button>

      {message && (
        <Alert severity={severity} sx={{ marginTop: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
}

export default LoginForm;
