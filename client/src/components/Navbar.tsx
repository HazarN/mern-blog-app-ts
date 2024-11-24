import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const spaceBetween = {
  display: 'flex',
  justifyContent: 'space-between',
};

function Navbar(): JSX.Element {
  return (
    <AppBar color='primary' position='static'>
      <Toolbar sx={spaceBetween}>
        <Typography variant='h6'>Logo</Typography>

        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
