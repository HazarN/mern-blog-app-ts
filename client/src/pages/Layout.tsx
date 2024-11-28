import { Box } from '@mui/material';

import Footer from '../components/Footer';

interface LayoutProps {
  excludeFooter?: boolean | undefined;
  children: React.ReactNode;
}
function Layout({ excludeFooter, children }: LayoutProps): JSX.Element {
  return (
    <Box>
      {children}

      <Footer excludeFooter={excludeFooter} />
    </Box>
  );
}

export default Layout;
