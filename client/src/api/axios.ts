import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosPrivate.defaults.withCredentials = true;

export { axiosPrivate };
