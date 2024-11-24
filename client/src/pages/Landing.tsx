import { Box, Button, Container, Typography } from '@mui/material';

import theme from '../styles/theme';
import Navbar from '../components/Navbar';

function Landing(): JSX.Element {
  return (
    <Box>
      <Navbar>
        <Button variant='contained' color='secondary' size='large'>
          Login
        </Button>
      </Navbar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: '#fff',
          padding: '6rem 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant='h3' gutterBottom>
            Welcome to MERN Blog
          </Typography>
          <Typography variant='h5' paragraph>
            Discover the latest web development trends, tutorials, and best
            practices in our blog.
          </Typography>
          <Typography variant='body1' paragraph>
            Our blog is dedicated to providing you with the best content on the
            MERN stack, frontend frameworks, and more! Whether you're a beginner
            or an experienced developer, there's something for everyone.
          </Typography>
          <Button variant='contained' color='secondary' size='large'>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: '4rem 0', backgroundColor: '#FDF0D5' }}>
        <Container>
          <Typography variant='h4' align='center' gutterBottom>
            Why Choose Our Blog?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>High-Quality Content</Typography>
              <Typography variant='body2' color='textSecondary' paragraph>
                We provide well-researched articles that will help you improve
                your development skills.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Beginner-Friendly</Typography>
              <Typography variant='body2' color='textSecondary' paragraph>
                Our content is accessible to developers of all levels, with
                clear explanations and examples.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Up-to-Date Trends</Typography>
              <Typography variant='body2' color='textSecondary' paragraph>
                Stay up-to-date with the latest developments in the MERN stack
                and frontend technologies.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ padding: '4rem 0', textAlign: 'center' }}>
        <Container>
          <Typography variant='h4' gutterBottom>
            Ready to Learn?
          </Typography>
          <Typography variant='h6' paragraph>
            Join us today and start exploring the world of web development with
            our comprehensive blog articles!
          </Typography>
          <Button variant='contained' color='secondary' size='large'>
            Explore Blog
          </Button>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: '#C1121F',
          color: '#fff',
          padding: '.75rem 0',
          textAlign: 'center',
        }}
      >
        <Typography variant='body2' color='inherit'>
          © 2024 MERN Blog. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Landing;
