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
    portada: {
      descripcion: 'Gobernanza y validación de IA en sanidad. Por mi cuenta, productos de datos geoespaciales. Portfolio de proyectos.',
      subtitulo: 'Trabajo en la frontera entre un modelo y las personas que tienen que usarlo. Gobernanza y validación de IA en sanidad. Por mi cuenta, productos de datos geoespaciales.',
      herramientasEntradilla: 'Herramientas',
      herramientasTitulo: 'Una herramienta de monitorización de modelos y un curso.',
      descargar: 'Descargar',
      abrirCurso: 'Abrir el curso',
      proximamente: 'Se publica pronto.',
      repo: 'Repo',
      marcos: 'Marcos de referencia',
      exploracionesEntradilla: 'Exploraciones geoespaciales',
      exploracionesTitulo: 'Proyectos con datos abiertos, hechos por curiosidad.',
      exploracionesTexto: 'Cada uno empezó con una pregunta.',
      privadoEntradilla: 'Trabajo privado con salida pública',
      privado: [
        { meta: 'Artículo · septiembre de 2026', titulo: 'Gobernanza de IA en Sanidad', texto: 'Revista médica española. Enlace cuando se publique.' },
        { meta: 'Ponente · mayo de 2026', titulo: 'Demo de watsonx.governance con IBM', texto: 'Gobernanza de modelos ante sistemas de salud.' },
        { meta: 'Privado · bajo demanda', titulo: 'Pipeline agéntico de búsqueda de empleo', texto: 'Recogida multifuente, scoring con LLM, digest diario. Se enseña en conversación.' },
      ],
      sobreMiEntradilla: 'Sobre mí',
      sobreMiTitulo: 'Biólogo de formación, análisis de datos y producto después, gobernanza de IA ahora.',
      sobreMiTexto: 'Trabajo en GMV como AI Governance Specialist: validación clínica y ciclo de vida de modelos de IA con IBM watsonx.governance en dos sistemas autonómicos de salud. Antes, Product Owner de plataformas europeas de datos clínicos y analista de datos de salud. Máster en Bioinformática y Bioestadística (UOC) y en Bioingeniería (IQS); grado en Biología (USC). Certificado en ISO/IEC 42001 por BSI. Santiago de Compostela.',
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
    portada: {
      descripcion: 'AI governance and validation in healthcare. On my own time, geospatial data products. Project portfolio.',
      subtitulo: 'I work at the boundary between a model and the people who have to use it. AI governance and validation in healthcare. On my own time, geospatial data products.',
      herramientasEntradilla: 'Tools',
      herramientasTitulo: 'A model-monitoring tool and a course.',
      descargar: 'Download',
      abrirCurso: 'Open the course',
      proximamente: 'Coming soon.',
      repo: 'Repo',
      marcos: 'Reference frameworks',
      exploracionesEntradilla: 'Geospatial explorations',
      exploracionesTitulo: 'Open-data projects, built out of curiosity.',
      exploracionesTexto: 'Each one started with a question.',
      privadoEntradilla: 'Private work with public output',
      privado: [
        { meta: 'Article · September 2026', titulo: 'AI Governance in Healthcare', texto: 'Spanish medical journal. Link when published.' },
        { meta: 'Speaker · May 2026', titulo: 'watsonx.governance demo with IBM', texto: 'Model governance for health systems.' },
        { meta: 'Private · on request', titulo: 'Agentic job-search pipeline', texto: 'Multi-source harvesting, LLM scoring, daily digest. Shown in conversation.' },
      ],
      sobreMiEntradilla: 'About',
      sobreMiTitulo: 'Biologist by training, then data analysis and product, AI governance now.',
      sobreMiTexto: 'I work at GMV as an AI Governance Specialist: clinical validation and AI model lifecycle with IBM watsonx.governance across two regional health systems. Before that, Product Owner of European clinical-data platforms and health data analyst. MSc in Bioinformatics and Biostatistics (UOC) and in Bioengineering (IQS); BSc in Biology (USC). ISO/IEC 42001 certified by BSI. Based in Santiago de Compostela, Spain.',
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

export function t(lang: Lang) {
  return ui[lang];
}
