import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const containerWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
};

function NotFound(): JSX.Element {
  return (
    <Container sx={containerWrapper}>
      <Typography variant='h3' gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant='h6' paragraph>
        Sorry, the page you are looking for doesn't exist.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        component={Link}
        to='/'
        sx={{ marginTop: 2 }}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFound;
