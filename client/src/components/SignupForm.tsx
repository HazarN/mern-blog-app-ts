import { Box, Button, TextField, SxProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const handleSigninClick = () => {
    navigate('/login');
  };

  return (
    <Box component='form' noValidate autoComplete='off' sx={{ marginTop: 1 }}>
      {/* Full Name Input */}
      <TextField
        fullWidth
        label='Full Name'
        type='text'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
      />

      {/* Email Input */}
      <TextField
        fullWidth
        label='Email'
        type='email'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
      />

      {/* Password Input */}
      <TextField
        fullWidth
        label='Password'
        type='password'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
      />

      {/* Confirm Password Input */}
      <TextField
        fullWidth
        label='Confirm Password'
        type='password'
        margin='normal'
        variant='outlined'
        required
        sx={inputBlueHover}
      />

      {/* Sign Up Button */}
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
