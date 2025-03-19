import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set your desired port
    host: '0.0.0.0', // Ensures accessibility from external networks
  }
});
