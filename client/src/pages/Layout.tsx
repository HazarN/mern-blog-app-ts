import { Box } from '@mui/material';

import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      {children}

      <Footer />
    </Box>
  );
}

export default Layout;
