import { useEffect } from 'react';

import { axiosPrivate } from '../api/axios';

import { useAuthContext } from './useAuthContext';

export function useAxiosPrivate() {
  const { user, refresh } = useAuthContext();

  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log('config', config);

        if (!config.headers['authorization']) {
          // then it's the first request

          config.headers['authorization'] = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err?.config;

        console.log(err?.response?.status === 403);
        console.log(!originalRequest?.sent);

        if (err?.response?.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;

          try {
            console.log('Original request:', originalRequest);
            const newAccessToken = await refresh(); // Refresh token logic
            console.log('New access token:', newAccessToken);

            originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
            return axiosPrivate(originalRequest); // Retry original request
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    };
  }, [user, refresh]);

  return axiosPrivate;
}
