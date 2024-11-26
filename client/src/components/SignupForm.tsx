import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, SxProps } from '@mui/material';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFormContext } from '../hooks/useFormContext';

const inputBlueHover: SxProps = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#1976d2', // Blue border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2', // Blue border on focus
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#1976d2', // Floating label color on focus
    },
  },
};

function SignupForm(): JSX.Element {
  const navigate = useNavigate();

  const { register } = useAuthContext();
  const {
    emailInput,
    passwordInput,
    fullName,
    emailError,
    passwordError,
    nameError,
    passwordConfirmInput,
    dispatch,
    signUpFormValidation,
  } = useFormContext();

  function handleSigninClick() {
    navigate('/login');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = signUpFormValidation(
      fullName,
      emailInput,
      passwordInput,
      passwordConfirmInput
    );

    if (!isValid) return;

    const status = await register(fullName, emailInput, passwordInput);
    if (status === 201) setTimeout(() => navigate('/login'), 1_250);
  }

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={{ marginTop: 1 }}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        label='Full Name'
        type='text'
        margin='normal'
        variant='outlined'
        required
        error={!!nameError}
        helperText={nameError}
        sx={inputBlueHover}
        value={fullName}
        onChange={(e) =>
          dispatch({ type: 'SET_NAME', payload: e.target.value })
        }
      />

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

      <TextField
        fullWidth
        label='Confirm Password'
        type='password'
        margin='normal'
        variant='outlined'
        required
        error={passwordInput !== passwordConfirmInput}
        helperText={
          passwordInput !== passwordConfirmInput ? 'Passwords do not match' : ''
        }
        sx={inputBlueHover}
        value={passwordConfirmInput}
        onChange={(e) =>
          dispatch({ type: 'SET_PASSWORD_CONFIRM', payload: e.target.value })
        }
      />

      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        sx={{ marginTop: 1 }}
        type='submit'
      >
        Sign Up
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        size='large'
        fullWidth
        sx={{
          marginTop: 1,
          ':hover': {
            backgroundColor: 'background.default',
            color: 'secondary.dark',
          },
        }}
        onClick={handleSigninClick}
      >
        Already have an account? Sign In
      </Button>
    </Box>
  );
}

export default SignupForm;
