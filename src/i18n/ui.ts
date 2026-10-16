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
        { etiqueta: 'Hoy', texto: 'Soy Miguel [[retrato]]. Trabajo en la vigilancia y supervisión de modelos de inteligencia artificial en sanidad, desde Santiago de Compostela.' },
        { etiqueta: '2018 · Biología', texto: 'Estudié Biología en la Universidade de Santiago de Compostela, y la naturaleza [[mariposa]] sigue siendo mi primer interés. El máster en Bioingeniería del IQS fue mi paso del laboratorio al ordenador. Mi trabajo final fue EASiMap, una especie de mapa estelar de proteínas que sitúa las familias de enzimas a partir de sus estructuras [[easimap]].' },
        { etiqueta: '2021 · Datos de salud', texto: 'Entré en GMV como analista de datos de salud, trabajando con datasets clínicos europeos y su calidad. En paralelo seguí formándome con el máster en Bioinformática y Bioestadística de la UOC, donde aprendí machine learning y lo apliqué a datos de salud.' },
        { etiqueta: '2022 · Producto', texto: 'Pasé a gestionar productos de datos. Diseñé el flujo de datos de plataformas europeas como ProReg, el registro de cáncer de próstata de la European Association of Urology, con el modelo OMOP en la base, procesos ETL con controles de calidad e iteraciones con urólogos de varios países.' },
        { etiqueta: '2026 · Gobernanza de IA', texto: 'Hoy diseño cómo se valida un modelo de IA antes de que llegue a la práctica clínica y cómo se vigila cuando ya está en uso (así empezó Blade Runner), desde su calidad, equidad y deriva hasta la forma en que lo usan los profesionales. Lo hago con IBM watsonx.governance en dos sistemas autonómicos de salud, y lo presento ante sistemas sanitarios. Mi objetivo es contribuir a que la IA siga al servicio de las personas.' },
        { etiqueta: 'Por mi cuenta', texto: 'Todo lo que he ido aprendiendo, en la formación y en el trabajo, lo sigo usando por mi cuenta para construir herramientas. Hay mapas con datos abiertos, Vigía, un curso de seguridad de la IA y WikiNatu [[wikinatu]], que junta dos cosas que me gustan, las rutas de montaña y la biodiversidad que hay en ellas. La naturaleza sigue muy presente [[montana]], y también me interesa la fotografía [[paisaje]], sin considerarme fotógrafo.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Retrato de Miguel Ferreiro' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Mariposa chupaleches posada en un tojo' },
        easimap: { src: '/sobre-mi/easimap.webp', alt: 'EASiMap, mapa estelar del hemisferio norte de la familia de enzimas GH1, con zoom en la posición 333: el triptófano se orienta distinto en eucariotas que en bacterias y arqueas' },
        tuits: { src: '/sobre-mi/tuits-covid.webp', alt: 'Gráfico de tuits con sentimiento negativo frente a casos de COVID-19 en España' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Web pública de ProReg, el registro de cáncer de próstata de la EAU' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu en la ruta de O Pindo: 83 especies de iNaturalist sobre el mapa y cinco fichas con foto' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel en un valle nevado de montaña' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valle con un río y montañas nevadas' },
      },
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
        { etiqueta: 'Today', texto: 'I am Miguel [[retrato]]. I work on monitoring and overseeing artificial intelligence models in healthcare, from Santiago de Compostela, Spain.' },
        { etiqueta: '2018 · Biology', texto: 'I studied Biology at the University of Santiago de Compostela, and nature [[mariposa]] is still my first interest. The MSc in Bioengineering at IQS was my move from the lab to the computer. My thesis was EASiMap, a kind of star map of proteins that places enzyme families from their structures [[easimap]].' },
        { etiqueta: '2021 · Health data', texto: 'I joined GMV as a health data analyst, working with European clinical datasets and their quality. At the same time I kept studying with the MSc in Bioinformatics and Biostatistics at UOC, where I learned machine learning and applied it to health data.' },
        { etiqueta: '2022 · Product', texto: 'I moved on to managing data products. I designed the data flow of European platforms such as ProReg, the prostate cancer registry of the European Association of Urology, with the OMOP model underneath, ETL processes with quality checks, and iterations with urologists from several countries.' },
        { etiqueta: '2026 · AI governance', texto: 'Today I design how an AI model is validated before it reaches clinical practice and how it is monitored once in use (that is how Blade Runner started), from its quality, fairness and drift to the way professionals use it. I do it with IBM watsonx.governance in two regional health systems, and I present it to health systems. My goal is to help keep AI at the service of people.' },
        { etiqueta: 'On my own', texto: 'Everything I have learned, in my studies and at work, I keep using on my own to build tools. There are open-data maps, Vigía, an AI safety course and WikiNatu [[wikinatu]], which brings together two things I like, mountain routes and the biodiversity along them. Nature is still very present [[montana]], and I am also into photography [[paisaje]], without calling myself a photographer.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Portrait of Miguel Ferreiro' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Scarce swallowtail butterfly on gorse' },
        easimap: { src: '/sobre-mi/easimap.webp', alt: 'EASiMap, star map of the northern hemisphere of the GH1 enzyme family, zooming into position 333: the tryptophan points differently in eukaryotes than in bacteria and archaea' },
        tuits: { src: '/sobre-mi/tuits-covid.webp', alt: 'Chart of negative-sentiment tweets against COVID-19 cases in Spain' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Public website of ProReg, the EAU prostate cancer registry' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu on the O Pindo route: 83 iNaturalist species on the map and five species cards' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel in a snowy mountain valley' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valley with a river and snowy mountains' },
      },
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
