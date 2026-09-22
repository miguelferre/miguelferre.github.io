# miguelferre.github.io

Portfolio de proyectos personales. Sitio estático con Astro, servido en https://miguelferre.github.io/.

## Estructura

- `src/data/proyectos.yaml`: los proyectos. Es el único fichero que hay que tocar para añadir o cambiar uno.
- `src/pages/index.astro`: portada.
- `src/pages/revisor.astro`: ficha de la herramienta (Human-AI Interaction Layer Reviewer).
- `src/pages/exploraciones/[id].astro`: una ficha por exploración, generada desde el YAML.
- `public/capturas/`: capturas de los proyectos live. Se regeneran con `npm run capturas` (Playwright con Brave).
- `public/informes/`: informe de ejemplo del revisor (copia del `docs/demo` del repo `human-ai-governance`).

## Desarrollo

```bash
npm install
npm run dev
```

El despliegue lo hace GitHub Actions en cada push a `main` (`.github/workflows/deploy.yml`).
