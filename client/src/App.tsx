import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Login from './pages/Login';
import Landing from './pages/Landing';
import AppLayout from './pages/AppLayout';
import NotFound from './pages/NotFound';
import theme from './styles/theme';
import Signup from './pages/SignUp';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />

          <Route path='login' element={<Login />} />

          <Route path='signup' element={<Signup />} />

          <Route path='blog' element={<AppLayout />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
