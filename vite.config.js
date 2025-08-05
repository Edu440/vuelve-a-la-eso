import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        participante: resolve(__dirname, 'participante.html')
      }
    }
  },
  server: {
    host: true,      
    port: 5173        
  }
});
