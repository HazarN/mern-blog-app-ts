import { Box, Typography, Paper } from '@mui/material';

import { useFormContext } from '../hooks/useFormContext';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import LoginForm from '../components/LoginForm';

const centeredBox: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'background.default',
  padding: 2,
};
const paperStyle: React.CSSProperties = {
  padding: 4,
  maxWidth: 400,
  width: '100%',
  textAlign: 'center',
};

function Login(): JSX.Element {
  const { loading } = useFormContext();

  return (
    <Layout>
      <Navbar />

      <Box sx={centeredBox}>
        <Paper elevation={3} sx={paperStyle}>
          <Typography variant='h4' gutterBottom>
            Sign In
          </Typography>

          {loading ? (
            <Spinner />
          ) : (
            <Typography variant='body1' gutterBottom color='textSecondary'>
              Enter your email and password to access your account.
            </Typography>
          )}

          <LoginForm />
        </Paper>
      </Box>
    </Layout>
  );
}

export default Login;
