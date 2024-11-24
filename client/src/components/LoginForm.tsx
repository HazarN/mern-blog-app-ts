import { Box, Button, TextField, SxProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <Box component='form' noValidate autoComplete='off' sx={{ marginTop: 3 }}>
      <TextField
        fullWidth
        label='Email'
        type='email'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
      />

      <TextField
        fullWidth
        label='Password'
        type='password'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
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
    </Box>
  );
}

export default LoginForm;
