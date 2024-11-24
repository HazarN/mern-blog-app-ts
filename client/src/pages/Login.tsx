import { Box, Typography, Paper } from '@mui/material';

import LoginForm from '../components/LoginForm';

import Navbar from '../components/Navbar';
import Layout from './Layout';

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
  return (
    <Layout>
      <Navbar />

      <Box sx={centeredBox}>
        <Paper elevation={3} sx={paperStyle}>
          <Typography variant='h4' gutterBottom>
            Sign In
          </Typography>

          <Typography variant='body1' gutterBottom color='textSecondary'>
            Enter your email and password to access your account.
          </Typography>

          <LoginForm />
        </Paper>
      </Box>
    </Layout>
  );
}

export default Login;
