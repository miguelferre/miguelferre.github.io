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
      lema: 'Gobernando sistemas de inteligencia artificial.',
      subtitulo: 'Biólogo de formación, pasé por el mundo de los datos y hoy trabajo en la vigilancia y supervisión de modelos de inteligencia artificial. Mi objetivo es contribuir a que la inteligencia artificial siga al servicio de las personas. Por mi cuenta exploro otros temas y construyo herramientas: explóralas tú mismo.',
      herramientasEntradilla: 'Herramientas',
      herramientasTitulo: 'Herramientas para gobernar y vigilar modelos de IA.',
      descargar: 'Descargar',
      abrirCurso: 'Abrir el curso',
      proximamente: 'Se publica pronto.',
      repo: 'Repo',
      marcos: 'Marcos de referencia',
      exploracionesEntradilla: 'Exploraciones geoespaciales',
      exploracionesTitulo: 'Proyectos con datos abiertos.',
      exploracionesTexto: 'Cada uno empezó con una pregunta.',
      sobreMiEntradilla: 'Sobre mí',
      sobreMiTitulo: 'Biología → datos → IA.',
      // Ficha de «Sobre mí»: filas clave-valor
      ficha: [
        { clave: 'Rol', valor: 'AI Governance Specialist en GMV, desde 2026. Gobernanza y validación de modelos de IA en dos sistemas autonómicos de salud: Madrid y Comunitat Valenciana.' },
        { clave: 'Qué hago', valor: 'Diseño escenarios de validación clínica (doble ciego, ground truth, detección de sesgo) y llevo el ciclo de vida de los modelos con IBM watsonx.governance: inventarios, flujos de aprobación y métricas de calidad, equidad, deriva y explicabilidad.' },
        { clave: 'Antes', valor: 'Product Owner en GMV (2022-2025): diseñé el flujo de datos de ProReg, la plataforma europea de la European Association of Urology, con modelo OMOP y validación automática de datos clínicos; desbloqueé un proyecto europeo a dos meses de la entrega. Antes, Health Data Analyst (2021-2022) con datasets clínicos europeos.' },
        { clave: 'Formación', valor: 'Grado en Biología (USC) · Máster en Bioinformática y Bioestadística (UOC) · Máster en Bioingeniería (IQS)' },
        { clave: 'Certificaciones', valor: 'ISO/IEC 42001 AI Management System (BSI, 2025) · GIS Programming for Environmental Research (ISGlobal, 2025) · PMI-ACP (PMI, 2024) · Data Management Fundamentals (DAMA, 2023)' },
        { clave: 'Base', valor: 'Santiago de Compostela' },
        { clave: 'Lo que me gusta', valor: 'Traducir un problema real en algo que la IA pueda abordar, y llevarlo al uso.' },
      ],
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
      lema: 'Governing artificial intelligence systems.',
      subtitulo: 'A biologist by training, I moved through the world of data and today I work on monitoring and overseeing AI models. My goal is to help keep artificial intelligence at the service of people. On my own, I explore other topics and build tools: explore them yourself.',
      herramientasEntradilla: 'Tools',
      herramientasTitulo: 'Tools to govern and monitor AI models.',
      descargar: 'Download',
      abrirCurso: 'Open the course',
      proximamente: 'Coming soon.',
      repo: 'Repo',
      marcos: 'Reference frameworks',
      exploracionesEntradilla: 'Geospatial explorations',
      exploracionesTitulo: 'Open-data projects.',
      exploracionesTexto: 'Each one started with a question.',
      sobreMiEntradilla: 'About',
      sobreMiTitulo: 'Biology → data → AI.',
      ficha: [
        { clave: 'Role', valor: 'AI Governance Specialist at GMV since 2026. Governance and validation of AI models in two regional health systems: Madrid and Valencia.' },
        { clave: 'What I do', valor: 'I design clinical validation scenarios (double-blind, ground truth, bias detection) and run the model lifecycle with IBM watsonx.governance: inventories, approval workflows, and quality, fairness, drift and explainability metrics.' },
        { clave: 'Before', valor: 'Product Owner at GMV (2022-2025): I designed the data flow of ProReg, the European Association of Urology platform, on an OMOP model with automated clinical-data validation; I unblocked a European project two months before delivery. Before that, Health Data Analyst (2021-2022) on European clinical datasets.' },
        { clave: 'Education', valor: 'BSc in Biology (USC) · MSc in Bioinformatics and Biostatistics (UOC) · MSc in Bioengineering (IQS)' },
        { clave: 'Certifications', valor: 'ISO/IEC 42001 AI Management System (BSI, 2025) · GIS Programming for Environmental Research (ISGlobal, 2025) · PMI-ACP (PMI, 2024) · Data Management Fundamentals (DAMA, 2023)' },
        { clave: 'Based in', valor: 'Santiago de Compostela, Spain' },
        { clave: 'What I enjoy', valor: 'Turning a real problem into something AI can tackle, and taking it into use.' },
      ],
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
