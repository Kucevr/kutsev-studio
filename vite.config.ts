import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 5173,
        strictPort: true,
        host: true,
      },
      plugins: [
        tailwindcss(),
        react(),
        compression({
          algorithm: 'gzip',
          ext: '.gz',
        }),
        compression({
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
      ],
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info'],
            passes: 2,
          },
          mangle: {
            safari10: true,
          },
        },
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Vendor chunks
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'vendor-react';
                }
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
                if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
                  return 'vendor-analytics';
                }
                if (id.includes('lottie') || id.includes('rive')) {
                  return 'vendor-animations';
                }
                return 'vendor-other';
              }
              // Component chunks
              if (id.includes('/components/')) {
                if (id.includes('DesignCanvas') || id.includes('Animations')) {
                  return 'heavy-components';
                }
                if (id.includes('ProjectDetail') || id.includes('AllProjects')) {
                  return 'modal-components';
                }
              }
            },
          },
        },
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        sourcemap: false,
        reportCompressedSize: false,
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
