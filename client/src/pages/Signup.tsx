import { Box, Typography, Paper } from '@mui/material';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

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

function Signup(): JSX.Element {
  return (
    <Layout>
      <Navbar />

      <Box sx={centeredBox}>
        <Paper elevation={3} sx={paperStyle}>
          <Typography variant='h4' gutterBottom>
            Sign Up
          </Typography>

          <Typography variant='body1' gutterBottom color='textSecondary'>
            Create an account to get started.
          </Typography>

          <SignupForm />
        </Paper>
      </Box>
    </Layout>
  );
}

export default Signup;
