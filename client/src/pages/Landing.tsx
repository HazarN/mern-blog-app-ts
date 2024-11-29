import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Layout from './Layout';

import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Features from '../components/Features';

function Landing(): JSX.Element {
  return (
    <Layout>
      <Navbar>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          component={Link}
          to='login'
        >
          Login
        </Button>
      </Navbar>

      <Hero />

      <Features />
    </Layout>
  );
}

// FIXME: will be refactored

// FIXME: implementation of the sticky footer and navbar

export default Landing;
