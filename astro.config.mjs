// @ts-check
import { defineConfig } from 'astro/config';

// User site de GitHub Pages: se sirve en la raíz, sin `base`.
// ES en la raíz, EN bajo /en/. Las rutas se declaran a mano en src/i18n/ui.ts.
export default defineConfig({
  site: 'https://miguelferre.github.io',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
