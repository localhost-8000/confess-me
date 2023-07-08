import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['confess-me-logo.png'],
  manifest: {
    name: 'Secret confession application',
    short_name: 'secret confession',
    description:
      'Share your secret crush or love anonymously on Secret Confession, the safe and supportive platform for sharing your deepest feelings.',
    icons: [
      {
        src: './assets/confess-me-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './assets/confess-me-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: './assets/confess-me-logo.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    orientation: 'portrait',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    theme_color: '#333346',
    background_color: '#6d6d86',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(manifestForPlugin)],
});
