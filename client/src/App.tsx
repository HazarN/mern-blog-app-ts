import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { LoginProvider } from './contexts/LoginContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';

function App(): JSX.Element {
  return (
    <LoginProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />

            <Route path='login' element={<Login />} />

            <Route path='signup' element={<Signup />} />

            <Route path='blog' element={<AppLayout />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoginProvider>
  );
}

export default App;
