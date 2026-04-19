import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8000';
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Support client-side routing (SPA fallback)
      server: {
        proxy: {
          '/api': {
            target: proxyTarget,
            changeOrigin: true,
            rewrite: (apiPath) => apiPath.replace(/^\/api/, ''),
          },
        },
      },
      preview: {
        port: 4173,
      },
    };
});
