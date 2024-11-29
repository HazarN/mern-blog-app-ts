import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { FormProvider } from './contexts/FormContext';
import { ModalProvider } from './contexts/ModalContext';

import Post from './pages/Post';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import ProtectedRoute from './pages/_ProtectedRoute';

function App(): JSX.Element {
  return (
    <FormProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />

            <Route path='login' element={<Login />} />

            <Route path='signup' element={<Signup />} />

            <Route
              path='blog'
              element={
                <ProtectedRoute>
                  <PostProvider>
                    <AppLayout />
                  </PostProvider>
                </ProtectedRoute>
              }
            />

            <Route
              path='blog/:id'
              element={
                <ProtectedRoute>
                  <PostProvider>
                    <ModalProvider>
                      <Post />
                    </ModalProvider>
                  </PostProvider>
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </FormProvider>
  );
}

export default App;
