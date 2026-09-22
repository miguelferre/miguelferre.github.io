// @ts-check
import { defineConfig } from 'astro/config';

// User site de GitHub Pages: se sirve en la raíz, sin `base`.
export default defineConfig({
  site: 'https://miguelferre.github.io',
  trailingSlash: 'always',
});
