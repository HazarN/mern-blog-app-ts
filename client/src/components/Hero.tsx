import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const boxStyles: React.CSSProperties = {
  backgroundColor: 'background.default',
  padding: '6rem 0',
  textAlign: 'center',
};

function Hero(): JSX.Element {
  return (
    <Box sx={boxStyles}>
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

        <Button
          variant='contained'
          color='secondary'
          size='large'
          component={Link}
          to='blog'
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;
