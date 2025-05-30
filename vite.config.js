import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Use Render's assigned port or fallback to 3000
    host: '0.0.0.0', // Ensure external access
    allowedHosts: [
      'medeazee.onrender.com', // Your Render host
      'localhost' // For local development
    ]
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'medeazee.onrender.com', // Your Render host
      'localhost' // For local development
    ]
  }
});