import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// base is set to '/CampusHub/' for GitHub Pages deployment
// The site is hosted at: https://santhosh-0301.github.io/CampusHub/
export default defineConfig({
  plugins: [react()],
  base: '/CampusHub-2.0/',
});
