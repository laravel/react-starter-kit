import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    return {
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // tailwindcss(tailwindConfig),
        // tailwindcss({
        //     config:'tailwind.config.js',
        // }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
	        '@': resolve(__dirname, 'resources/js'),
            '@assets': resolve(__dirname, './resources/assets'),
          '@bs': resolve(__dirname, 'node_modules/bootstrap/scss'),
        },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        less: {
          charset: false,
        },
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    }
});
