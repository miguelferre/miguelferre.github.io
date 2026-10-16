export type Lang = 'es' | 'en';
export const idiomas: Lang[] = ['es', 'en'];

// Rutas de cada página en cada idioma. La portada del ES es la raíz.
export const rutas = {
  inicio: { es: '/', en: '/en/' },
  herramientas: { es: '/#herramientas', en: '/en/#tools' },
  exploracion: { es: '/exploraciones/', en: '/en/explorations/' },
  exploraciones: { es: '/#exploraciones', en: '/en/#explorations' },
  sobreMi: { es: '/#sobre-mi', en: '/en/#about' },
} as const;

export function rutaExploracion(lang: Lang, id: string) {
  return `${rutas.exploracion[lang]}${id}/`;
}

export const ui = {
  es: {
    nav: { inicio: 'Inicio', herramientas: 'Herramientas', exploraciones: 'Exploraciones', sobreMi: 'Sobre mí' },
    cambiarIdioma: 'English',
    saltar: 'Saltar al contenido',
    etiqueta: { live: 'LIVE', repo: 'REPO', privado: 'PRIVADO' },
    leyenda: { live: 'enlaza al producto', repo: 'enlaza al código', privado: 'se enseña en conversación', titulo: 'Qué significa cada etiqueta' },
    cv: 'CV (PDF)',
    figurasCredito: 'Figuras con ISO-GLOW ↗',
    portada: {
      descripcion: 'Gobernanza y validación de IA en sanidad. Por mi cuenta, productos de datos geoespaciales. Portfolio de proyectos.',
      subtitulo: 'Trabajo en gobernanza y supervisión de IA en sanidad. Por mi cuenta construyo herramientas de IA y productos con datos abiertos.',
      herramientasEntradilla: 'Herramientas',
      herramientasTitulo: 'Una herramienta de monitorización de modelos y un curso.',
      descargar: 'Descargar',
      abrirCurso: 'Abrir el curso',
      proximamente: 'Se publica pronto.',
      repo: 'Repo',
      marcos: 'Marcos de referencia',
      exploracionesEntradilla: 'Exploraciones geoespaciales',
      exploracionesTitulo: 'Proyectos con datos abiertos.',
      exploracionesTexto: 'Cada uno empezó con una pregunta.',
      sobreMiEntradilla: 'Sobre mí',
      sobreMiTitulo: 'Biólogo de formación, análisis de datos y producto después, gobernanza de IA ahora.',
      // Ficha de «Sobre mí»: filas clave-valor e inventario de proyectos (sale de proyectos.yaml)
      ficha: [
        { clave: 'Rol', valor: 'AI Governance Specialist · GMV' },
        { clave: 'Qué hago', valor: 'Validación clínica y ciclo de vida de modelos de IA con IBM watsonx.governance, en dos sistemas autonómicos de salud.' },
        { clave: 'Antes', valor: 'Product Owner de plataformas europeas de datos clínicos; analista de datos de salud.' },
        { clave: 'Formación', valor: 'Grado en Biología (USC) · Máster en Bioinformática y Bioestadística (UOC) · Máster en Bioingeniería (IQS)' },
        { clave: 'Certificación', valor: 'ISO/IEC 42001, BSI' },
        { clave: 'Base', valor: 'Santiago de Compostela' },
        { clave: 'Lo que me gusta', valor: 'Traducir un problema real en algo que la IA pueda abordar, y llevarlo al uso.' },
      ],
      inventario: 'Inventario',
      perfilLinkedIn: 'Perfil completo en LinkedIn',
      // Fondo animado de la portada: se ven fragmentos de estas palabras
      claves: [
        'gobernanza', 'IA', 'sanidad', 'validación', 'datos', 'geoespacial',
        'bioinformática', 'bioestadística', 'biología', 'watsonx', 'ISO 42001',
        'EU AI Act', 'NIST AI RMF', 'automation bias', 'confianza', 'producto',
        'modelos', 'personas', 'Santiago',
      ],
    },
    exploracion: {
      entradilla: 'Exploración geoespacial',
      migas: 'Estás en',
      abrir: 'Abrir',
      repo: 'Repo',
      como: 'Cómo está hecho',
      aprendi: 'Lo que aprendí',
      sinDesplegar: 'Sin desplegar todavía. El código está en el repositorio.',
      sinDesplegarCorto: 'Sin desplegar todavía',
      captura: 'Captura de',
      todas: 'Todas las exploraciones',
      siguiente: 'Siguiente',
    },
  },
  en: {
    nav: { inicio: 'Home', herramientas: 'Tools', exploraciones: 'Explorations', sobreMi: 'About' },
    cambiarIdioma: 'Español',
    saltar: 'Skip to content',
    etiqueta: { live: 'LIVE', repo: 'REPO', privado: 'PRIVATE' },
    leyenda: { live: 'links to the product', repo: 'links to the code', privado: 'shown in conversation', titulo: 'What each label means' },
    cv: 'CV (PDF)',
    figurasCredito: 'Figures made with ISO-GLOW ↗',
    portada: {
      descripcion: 'AI governance and validation in healthcare. On my own time, geospatial data products. Project portfolio.',
      subtitulo: 'I work on AI governance and oversight in healthcare. On my own, I build AI tools and open-data products.',
      herramientasEntradilla: 'Tools',
      herramientasTitulo: 'A model-monitoring tool and a course.',
      descargar: 'Download',
      abrirCurso: 'Open the course',
      proximamente: 'Coming soon.',
      repo: 'Repo',
      marcos: 'Reference frameworks',
      exploracionesEntradilla: 'Geospatial explorations',
      exploracionesTitulo: 'Open-data projects.',
      exploracionesTexto: 'Each one started with a question.',
      sobreMiEntradilla: 'About',
      sobreMiTitulo: 'Biologist by training, then data analysis and product, AI governance now.',
      ficha: [
        { clave: 'Role', valor: 'AI Governance Specialist · GMV' },
        { clave: 'What I do', valor: 'Clinical validation and AI model lifecycle with IBM watsonx.governance, across two regional health systems.' },
        { clave: 'Before', valor: 'Product Owner of European clinical-data platforms; health data analyst.' },
        { clave: 'Education', valor: 'BSc in Biology (USC) · MSc in Bioinformatics and Biostatistics (UOC) · MSc in Bioengineering (IQS)' },
        { clave: 'Certification', valor: 'ISO/IEC 42001, BSI' },
        { clave: 'Based in', valor: 'Santiago de Compostela, Spain' },
        { clave: 'What I enjoy', valor: 'Turning a real problem into something AI can tackle, and taking it into use.' },
      ],
      inventario: 'Inventory',
      perfilLinkedIn: 'Full profile on LinkedIn',
      claves: [
        'governance', 'AI', 'healthcare', 'validation', 'data', 'geospatial',
        'bioinformatics', 'biostatistics', 'biology', 'watsonx', 'ISO 42001',
        'EU AI Act', 'NIST AI RMF', 'automation bias', 'trust', 'product',
        'models', 'people', 'Santiago',
      ],
    },
    exploracion: {
      entradilla: 'Geospatial exploration',
      migas: 'You are in',
      abrir: 'Open',
      repo: 'Repo',
      como: 'How it is built',
      aprendi: 'What I learned',
      sinDesplegar: 'Not deployed yet. The code is in the repository.',
      sinDesplegarCorto: 'Not deployed yet',
      captura: 'Screenshot of',
      todas: 'All explorations',
      siguiente: 'Next',
    },
  },
} as const;

// Las cifras se escriben en formato español en proyectos.yaml; en inglés cambian separadores
export function cifra(valor: string, lang: Lang) {
  if (lang === 'es') return valor;
  return valor.replace(/(\d)\.(\d{3})/g, '$1,$2').replace(/(\d),(\d{1,2})(?!\d)/g, '$1.$2').replace(/(\d) %/g, '$1%');
}

export function t(lang: Lang) {
  return ui[lang];
}
