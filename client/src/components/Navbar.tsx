import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const spaceBetween: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};
const wrap: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  textDecoration: 'none',
  color: 'white',
};

interface NavbarProps {
  children?: React.ReactNode;
}
function Navbar({ children }: NavbarProps): JSX.Element {
  return (
    <AppBar color='primary' position='sticky'>
      <Toolbar sx={spaceBetween}>
        <Box sx={wrap} component={Link} to='/'>
          <ForumIcon fontSize='large' />
          <Typography variant='h6'>MERN | Blog App</Typography>
        </Box>

        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
