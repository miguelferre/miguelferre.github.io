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
      // Descripción de la portada: una idea por línea
      subtitulo: [
        'Biólogo de formación. Comencé en el mundo de los datos y hoy vigilo y superviso modelos de IA.',
        'Mi objetivo: que la IA siga al servicio de las personas.',
        'Por mi cuenta exploro y construyo herramientas. Explóralas tú mismo.',
      ],
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
      // El camino de «Sobre mí»: [[id]] inserta la miniatura de fotos[id]
      camino: [
        { etiqueta: 'Hoy', texto: 'Soy Miguel [[retrato]], vivo en Santiago de Compostela y trabajo en la vigilancia y supervisión de modelos de inteligencia artificial.' },
        { etiqueta: '2018 · Biología', texto: 'Empecé por la Biología en la USC [[paisaje]], y la naturaleza sigue siendo lo que más me tira fuera del trabajo. Después hice el máster en Bioingeniería en el IQS, y ahí mi trabajo final ya fue más de ordenador que de laboratorio, un mapa de familias de proteínas a partir de sus estructuras [[proteinas]].' },
        { etiqueta: '2021 · Datos de salud', texto: 'Entré en GMV como analista de datos de salud, con datasets clínicos europeos, y hasta escribí en la revista de la empresa sobre el exposoma, todo lo que no viene en los genes y aun así afecta a nuestra salud [[exposoma]]. A la vez hice el máster en Bioinformática y Bioestadística de la UOC, donde aprendí machine learning, y en el trabajo final analicé tuits para ver qué le pasó a la salud mental en España durante la pandemia [[twitter]].' },
        { etiqueta: '2022 · Producto', texto: 'Después pasé a producto. Gestioné productos de datos de principio a fin y diseñé el flujo de datos de plataformas europeas como ProReg, iterando con urólogos de varios países y peleándome con el modelo OMOP y los procesos ETL.' },
        { etiqueta: '2026 · Gobernanza de IA', texto: 'Ahora diseño cómo se valida un modelo de IA antes de que llegue al hospital y cómo se vigila cuando ya está en uso, y lo explico ante sistemas de salud. Mi objetivo es contribuir a que la IA siga al servicio de las personas.' },
        { etiqueta: 'Por mi cuenta', texto: 'Exploro otros temas y construyo herramientas. Algunas son mapas, como el de los incendios de Galicia [[incendios]] o el de los barrios de Madrid [[madrid]], y otras son de lo mío, como Vigía [[vigia]] o el curso de seguridad de la IA [[curso]]. También me gusta la fotografía, y la foto del paisaje es mía.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Retrato de Miguel Ferreiro' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valle con un río y montañas nevadas' },
        proteinas: { src: '/sobre-mi/proteinas.webp', alt: 'Mapa circular de familias de proteínas, del trabajo final del máster en Bioingeniería' },
        exposoma: { src: '/sobre-mi/exposoma.webp', alt: 'Artículo «¿Cómo afecta el exposoma de las personas a su salud?» en la revista GMV News' },
        twitter: { src: '/sobre-mi/twitter-salud-mental.webp', alt: 'Nube de palabras sobre depresión en tuits, con la forma de España' },
        incendios: { src: '/capturas/storymap-incendios.webp', alt: 'Storymap de los incendios de Galicia en 2025' },
        madrid: { src: '/capturas/madrid-hli.webp', alt: 'Dashboard del índice de vida saludable de Madrid' },
        vigia: { src: '/capturas/vigia.webp', alt: 'Cuadro de mando de Vigía con datos sintéticos' },
        curso: { src: '/capturas/curso.webp', alt: 'Portada del curso de seguridad y gobernanza de la IA' },
      },
      enDetalle: 'En detalle',
      // Ficha de «Sobre mí»: filas clave-valor
      ficha: [
        { clave: 'Rol', valor: 'AI Governance Specialist en GMV' },
        { clave: 'Qué hago', valor: [
          'Diseño escenarios de validación clínica: doble ciego, ground truth y detección de sesgo.',
          'Llevo el ciclo de vida de los modelos con IBM watsonx.governance: inventarios, flujos de aprobación y métricas de calidad, equidad, deriva y explicabilidad.',
          'Entiendo el contexto en el que trabaja cada modelo para aplicarle bien la gobernanza: hago de puente entre la parte funcional y la técnica.',
          'Presento y vendo estas soluciones: demos de gobernanza de IA ante sistemas de salud, junto a IBM.',
        ] },
        { clave: 'Antes', valor: [
          'Gestioné productos de datos de principio a fin, iterando con profesionales clínicos de varios países.',
          'Diseñé el flujo de datos de plataformas europeas como ProReg, de la European Association of Urology.',
          'Trabajé con el modelo común de datos OMOP para reutilizar datos clínicos entre centros.',
          'Analicé datos clínicos y construí procesos ETL con controles de calidad automáticos.',
        ] },
        { clave: 'Formación', valor: 'Grado en Biología (USC) · Máster en Bioinformática y Bioestadística (UOC) · Máster en Bioingeniería (IQS)' },
        { clave: 'Certificaciones', valor: [
          'ISO/IEC 42001 AI Management System · BSI, 2025',
          'GIS Programming for Environmental Research · ISGlobal, 2025',
          'PMI Agile Certified Practitioner (PMI-ACP) · PMI, 2024',
          'Data Management Fundamentals · DAMA, 2023',
        ] },
        { clave: 'Localización', valor: 'Santiago de Compostela' },
        { clave: 'Lo que me mueve', valor: 'Traducir un problema real en algo que la IA pueda abordar, y llevarlo al uso.' },
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
      subtitulo: [
        'A biologist by training. I started out in data, and today I monitor and oversee AI models.',
        'My goal: to keep AI at the service of people.',
        'On my own, I explore and build tools. Explore them yourself.',
      ],
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
      camino: [
        { etiqueta: 'Today', texto: 'I am Miguel [[retrato]], I live in Santiago de Compostela, Spain, and I work on monitoring and overseeing artificial intelligence models.' },
        { etiqueta: '2018 · Biology', texto: 'I started with Biology at USC [[paisaje]], and nature is still what pulls me most outside work. Then I did an MSc in Bioengineering at IQS, and my final project there was already more computer than lab, a map of protein families built from their structures [[proteinas]].' },
        { etiqueta: '2021 · Health data', texto: 'I joined GMV as a health data analyst, working with European clinical datasets, and I even wrote in the company magazine about the exposome, everything that does not come from our genes and still affects our health [[exposoma]]. At the same time I did the MSc in Bioinformatics and Biostatistics at UOC, where I learned machine learning, and for my thesis I analysed tweets to see what happened to mental health in Spain during the pandemic [[twitter]].' },
        { etiqueta: '2022 · Product', texto: 'Then I moved to product. I managed data products end to end and designed the data flow of European platforms such as ProReg, iterating with urologists from several countries and wrestling with the OMOP model and ETL processes.' },
        { etiqueta: '2026 · AI governance', texto: 'Now I design how an AI model is validated before it reaches the hospital and how it is monitored once it is in use, and I explain it to health systems. My goal is to help keep AI at the service of people.' },
        { etiqueta: 'On my own', texto: 'I explore other topics and build tools. Some are maps, like the one about the Galicia wildfires [[incendios]] or the one about Madrid neighbourhoods [[madrid]], and others are closer to my field, like Vigía [[vigia]] or the AI safety course [[curso]]. I also enjoy photography, and the landscape photo is mine.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Portrait of Miguel Ferreiro' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valley with a river and snowy mountains' },
        proteinas: { src: '/sobre-mi/proteinas.webp', alt: 'Circular map of protein families, from the Bioengineering MSc thesis' },
        exposoma: { src: '/sobre-mi/exposoma.webp', alt: 'Article on the exposome in the GMV News magazine' },
        twitter: { src: '/sobre-mi/twitter-salud-mental.webp', alt: 'Word cloud of depression-related tweets shaped like Spain' },
        incendios: { src: '/capturas/storymap-incendios.webp', alt: 'Storymap of the 2025 Galicia wildfires' },
        madrid: { src: '/capturas/madrid-hli.webp', alt: 'Madrid healthy-living index dashboard' },
        vigia: { src: '/capturas/vigia.webp', alt: 'Vigía dashboard with synthetic data' },
        curso: { src: '/capturas/curso.webp', alt: 'Home page of the AI safety and governance course' },
      },
      enDetalle: 'In detail',
      ficha: [
        { clave: 'Role', valor: 'AI Governance Specialist at GMV' },
        { clave: 'What I do', valor: [
          'I design clinical validation scenarios: double-blind, ground truth and bias detection.',
          'I run the model lifecycle with IBM watsonx.governance: inventories, approval workflows, and quality, fairness, drift and explainability metrics.',
          'I understand the context each model works in so that governance fits it: I bridge the functional and the technical side.',
          'I present and sell these solutions: AI governance demos for health systems, together with IBM.',
        ] },
        { clave: 'Before', valor: [
          'I managed data products end to end, iterating with clinicians from several countries.',
          'I designed the data flow of European platforms such as ProReg, for the European Association of Urology.',
          'I worked with the OMOP common data model to reuse clinical data across sites.',
          'I analysed clinical data and built ETL processes with automated quality checks.',
        ] },
        { clave: 'Education', valor: 'BSc in Biology (USC) · MSc in Bioinformatics and Biostatistics (UOC) · MSc in Bioengineering (IQS)' },
        { clave: 'Certifications', valor: [
          'ISO/IEC 42001 AI Management System · BSI, 2025',
          'GIS Programming for Environmental Research · ISGlobal, 2025',
          'PMI Agile Certified Practitioner (PMI-ACP) · PMI, 2024',
          'Data Management Fundamentals · DAMA, 2023',
        ] },
        { clave: 'Location', valor: 'Santiago de Compostela, Spain' },
        { clave: 'What drives me', valor: 'Turning a real problem into something AI can tackle, and taking it into use.' },
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
