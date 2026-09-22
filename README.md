# miguelferre.github.io

Portfolio de proyectos personales. Sitio estático con Astro, servido en https://miguelferre.github.io/. Bilingüe: español en la raíz, inglés bajo `/en/`.

## Estructura

- `src/data/proyectos.yaml`: los proyectos, con cada texto en `{ es, en }`. Es el único fichero que hay que tocar para añadir o cambiar uno.
- `src/i18n/ui.ts`: textos de la interfaz y de las páginas fijas en los dos idiomas, y las rutas de cada página por idioma.
- `src/components/vistas/`: las tres vistas (portada, ficha del revisor, ficha de exploración). Las páginas de `src/pages/` y `src/pages/en/` solo las envuelven con el idioma.
- `public/capturas/`: capturas de los proyectos live. Se regeneran con `npm run capturas` (Playwright con Brave).
- `public/informes/`: informe de ejemplo del revisor (copia del `docs/demo` del repo `human-ai-governance`).
- `public/cv/`: CV en PDF (ES y EN), versión web sin teléfono. Se generan fuera de este repo (`cv/build_cv.py` con las variantes `web_es` y `web_en`) y se copian aquí.

## Desarrollo

```bash
npm install
npm run dev
```

El despliegue lo hace GitHub Actions en cada push a `main` (`.github/workflows/deploy.yml`).
