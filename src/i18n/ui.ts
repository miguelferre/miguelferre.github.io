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
        { etiqueta: '2018 · Biología', texto: 'Desde el principio me interesó mucho la naturaleza, en todas sus vertientes [[mariposa]], y por eso estudié Biología en la Universidade de Santiago de Compostela. Allí aprendí de muchísimas disciplinas y temas que me han servido después. Seguí con el máster en Bioingeniería del IQS, en Barcelona, que fue mi paso del laboratorio al ordenador. Una prueba es mi trabajo final, EASiMap, que dibuja las proteínas como mapas estelares para ver en dos dimensiones cómo cambia la orientación entre familias [[easimap]].' },
        { etiqueta: '2021 · Datos de salud', texto: 'Entré en GMV como analista de datos de salud, juntando lo que traía de la biología y de la informática. Empecé en proyectos europeos de espacios de datos sanitarios, como HARMONY [[harmony]]. En paralelo seguí formándome con el máster en Bioinformática y Bioestadística de la UOC, donde aprendí los fundamentos del machine learning y los apliqué, por ejemplo, a analizar la salud mental en redes sociales durante la pandemia [[tuits]].' },
        { etiqueta: '2022 · Producto', texto: 'Según avancé en GMV pasé a trabajar en productos y plataformas de datos, como eTRANSAFE, donde trece farmacéuticas juntaron sus datos preclínicos y clínicos (salió en Nature Reviews Drug Discovery, y estoy entre los autores), o ProReg, el registro de cáncer de próstata de la European Association of Urology. Me sirvió para aprender mucho de cómo funcionan por dentro estos espacios y plataformas, y de las dinámicas que llevan.' },
        { etiqueta: '2026 · Gobernanza de IA', texto: 'Con la llegada de los modelos de IA a la sanidad pasé a su gobernanza, a vigilar modelos de inteligencia artificial (así empezó Blade Runner) [[gobernanza]]. Me he familiarizado con herramientas comerciales como IBM watsonx.governance, y de lo que he visto ahí sale lo que intento desarrollar ahora, medir la capa humana, el efecto que tienen estos modelos en los profesionales que los usan [[capahumana]]. Para eso construyo también herramientas propias, con las que cubro esos huecos y sigo aprendiendo.' },
        { etiqueta: 'Por mi cuenta', texto: 'Durante todo este tiempo he seguido con la afición por la naturaleza [[montana]] y con proyectos propios, además de los que aparecen más arriba. Por ejemplo WikiNatu, una guía de campo de especies adaptada a rutas de senderismo [[wikinatu]], o mapas, unos cartográficos [[ria]] y otros más estéticos [[lindis]].' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Retrato de Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Mariposa chupaleches posada en un tojo' },
        easimap: { src: '/sobre-mi/easimap.webp', alt: 'EASiMap, mapa estelar del hemisferio norte de la familia de enzimas GH1, con zoom en la posición 333: el triptófano se orienta distinto en eucariotas que en bacterias y arqueas' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Web pública de ProReg, el registro de cáncer de próstata de la EAU' },
        tuits: { src: '/sobre-mi/tuits-covid.webp', alt: 'Tuits con sentimiento negativo en España: la mediana anual sube a 2,56 % en 2020, y un zoom de 2020 a 2022 con la media semanal y las olas de COVID-19' },
        harmony: { src: '/sobre-mi/harmony.webp', alt: 'Viaje de los datos en HARMONY: de los hospitales al repositorio armonizado en OMOP y a los equipos de análisis' },
        capahumana: { src: '/sobre-mi/capa-humana.webp', alt: 'Vigía, capa humana con datos sintéticos: cuánto se apoya el profesional en el modelo y cuántas veces lo rescata' },
        gobernanza: { src: '/sobre-mi/gobernanza.webp', alt: 'Un modelo de IA pasa por un arco de validación antes de llegar a los servicios del hospital' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu en la ruta de O Pindo: 83 especies de iNaturalist sobre el mapa y cinco fichas con foto' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel en un valle nevado de montaña' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valle con un río y montañas nevadas' },
        ria: { src: '/sobre-mi/mapa-ria.webp', alt: 'Mapa de relieve de una ría gallega sobre una carta náutica antigua' },
        lindis: { src: '/sobre-mi/lindis.webp', alt: 'Modelo de elevación relativa del río Lindis, en Nueva Zelanda, en amarillo, granate y azul' },
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
        { etiqueta: '2018 · Biology', texto: 'From the start I was very interested in nature, in all its forms [[mariposa]], and that is why I studied Biology at the University of Santiago de Compostela. There I learned about many disciplines and topics that have served me since. I went on to the MSc in Bioengineering at IQS, in Barcelona, which was my move from the lab to the computer. One proof is my thesis, EASiMap, which draws proteins as star maps to show in two dimensions how orientation changes between families [[easimap]].' },
        { etiqueta: '2021 · Health data', texto: 'I joined GMV as a health data analyst, bringing together what I knew from biology and from computing. I started on European health data space projects such as HARMONY [[harmony]]. At the same time I kept studying with the MSc in Bioinformatics and Biostatistics at UOC, where I learned the basics of machine learning and applied them, for example, to analysing mental health on social media during the pandemic [[tuits]].' },
        { etiqueta: '2022 · Product', texto: 'As I moved forward at GMV I started working on data products and platforms, such as eTRANSAFE, where thirteen pharmaceutical companies pooled their preclinical and clinical data (it was published in Nature Reviews Drug Discovery, and I am among the authors), or ProReg, the prostate cancer registry of the European Association of Urology. It taught me a lot about how these spaces and platforms work inside, and about the dynamics they bring.' },
        { etiqueta: '2026 · AI governance', texto: 'When AI models arrived in healthcare I moved to their governance, to monitoring artificial intelligence models (that is how Blade Runner started) [[gobernanza]]. I have become familiar with commercial tools such as IBM watsonx.governance, and what I have seen there led to what I am trying to build now, measuring the human layer, the effect these models have on the professionals who use them [[capahumana]]. For that I also build my own tools, which cover those gaps and keep me learning.' },
        { etiqueta: 'On my own', texto: 'All this time I have kept up my love of nature [[montana]] and my own projects, on top of the ones above. For example WikiNatu, a field guide of species adapted to hiking routes [[wikinatu]], or maps, some cartographic [[ria]] and some more aesthetic [[lindis]].' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Portrait of Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Scarce swallowtail butterfly on gorse' },
        easimap: { src: '/sobre-mi/easimap.webp', alt: 'EASiMap, star map of the northern hemisphere of the GH1 enzyme family, zooming into position 333: the tryptophan points differently in eukaryotes than in bacteria and archaea' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Public website of ProReg, the EAU prostate cancer registry' },
        tuits: { src: '/sobre-mi/tuits-covid.webp', alt: 'Negative-sentiment tweets in Spain: the yearly median peaks at 2.56 % in 2020, plus a 2020-2022 zoom with the weekly mean and COVID-19 waves' },
        harmony: { src: '/sobre-mi/harmony.webp', alt: 'HARMONY data journey: from hospitals to the harmonised OMOP repository and the analysis teams' },
        capahumana: { src: '/sobre-mi/capa-humana.webp', alt: 'Vigía human layer with synthetic data: how much professionals rely on the model and how often they rescue it' },
        gobernanza: { src: '/sobre-mi/gobernanza.webp', alt: 'An AI model passes through a validation arch before reaching the hospital services' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu on the O Pindo route: 83 iNaturalist species on the map and five species cards' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel in a snowy mountain valley' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valley with a river and snowy mountains' },
        ria: { src: '/sobre-mi/mapa-ria.webp', alt: 'Relief map of a Galician estuary over an old nautical chart' },
        lindis: { src: '/sobre-mi/lindis.webp', alt: 'Relative elevation model of the Lindis River, New Zealand, in yellow, maroon and blue' },
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
