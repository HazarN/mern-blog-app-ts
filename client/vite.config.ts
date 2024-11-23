import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT: number = parseInt(env.VITE_PORT as string) || 5000;

  return {
    plugins: [react()],
    server: {
      port: PORT,
    },
  };
});
