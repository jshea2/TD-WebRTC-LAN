import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const details of iface || []) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIP = getLocalIP();

export default defineConfig({
  plugins: [react()],
  base: './', // 👈 THIS is the fix for blank pages when using file://
  server: {
    host: '0.0.0.0',
    port: 5757
  },
  define: {
    'import.meta.env.VITE_LOCAL_IP': JSON.stringify(localIP)
  }
});

