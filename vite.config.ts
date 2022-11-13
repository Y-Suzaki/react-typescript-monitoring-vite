import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  define: {
    global: {},
    'process.env': process.env,
  },
  plugins: [react()],
});
