import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A /api/... kéréseket a Vite továbbítja a backendnek (json-server, 3001-es port).
// Élesben itt lenne pl. a Laravel szerver címe.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
