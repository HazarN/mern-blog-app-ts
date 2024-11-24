import { Box, Typography } from '@mui/material';

const footerStyles = {
  backgroundColor: 'secondary.main',
  color: '#fff',
  padding: '.75rem 0',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

function Footer(): JSX.Element {
  return (
    <Box sx={footerStyles}>
      <Typography variant='body2' color='inherit'>
        © 2024 MERN Blog. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
