import { Typography } from '@mui/material';

import Layout from './Layout';

import Navbar from '../components/Navbar';

function AppLayout(): JSX.Element {
  return (
    <Layout>
      <Navbar />

      <Typography variant='h4'>App Layout</Typography>
    </Layout>
  );
}

export default AppLayout;
