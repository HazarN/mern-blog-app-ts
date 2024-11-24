import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const spaceBetween = {
  display: 'flex',
  justifyContent: 'space-between',
};
const wrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

interface NavbarProps {
  children: React.ReactNode;
}
function Navbar({ children }: NavbarProps): JSX.Element {
  return (
    <AppBar color='primary' position='static'>
      <Toolbar sx={spaceBetween}>
        <Box sx={wrap}>
          <ForumIcon fontSize='large' />
          <Typography variant='h6'>MERN | Blog App</Typography>
        </Box>

        <Box>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
