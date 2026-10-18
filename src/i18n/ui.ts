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
        { etiqueta: 'Me presento', texto: 'Soy Miguel [[retrato]]. Trabajo en la vigilancia y supervisión de modelos de inteligencia artificial en sanidad, desde Santiago de Compostela.' },
        { etiqueta: 'Entre la montaña y el ordenador', texto: 'Mis intereses siempre han estado muy ligados a la naturaleza, y disfrutaba mucho aprendiendo sobre ella [[mariposa]]. Eso me llevó a estudiar Biología, y fue ahí donde de verdad me enamoré de ese mundo, de las moléculas a los ecosistemas. Seguí formándome dentro de ese campo, y trabajando en bioingeniería me di cuenta de que mi sitio no estaba en el laboratorio, sino repartido entre la montaña y el ordenador.' },
        { etiqueta: 'Entender la sanidad desde la biología', texto: 'Con ese primer contacto con la informática seguí formándome en bioinformática y bioestadística, a mi ritmo y en un programa online, y a la vez empecé a trabajar. Crecí y aprendí mucho trabajando en proyectos de datos clínicos, y fui llevando a ese trabajo lo que traía de la biología. Así llegué a los datos espaciales y a One Health, buscando cómo integrar todo lo que nos rodea y cómo el entorno influye en nuestra salud, y ahí empezaron a tomar forma los proyectos que vinieron después.' },
        { etiqueta: 'Nuevas herramientas, nuevos proyectos', texto: 'En los años siguientes fui dando forma a esas ideas, a la vez que avanzaba en el trabajo y aprendía nuevas herramientas y formas de llevar proyectos. Empecé a analizar datos de ciudades y a trastear con el GIS y las tecnologías geoespaciales, y de ahí salieron mapas como el relieve de una ría gallega sobre una carta náutica antigua [[ria]] o el cauce del río Lindis, en Nueva Zelanda, dibujado con un modelo de elevación relativa [[lindis]].' },
        { etiqueta: 'Una puerta nueva', texto: 'Con la llegada de los modelos de IA cambió lo que podía hacer por mi cuenta. Me interesó desde el primer momento, porque ideas que antes se quedaban en el cajón, por falta de tiempo o porque no sabía por dónde empezar, pasaron a estar a mi alcance. De ahí salieron [las exploraciones con datos abiertos](#exploraciones) de esta página, y también WikiNatu, una aplicación que cruza mis rutas de senderismo con las observaciones de iNaturalist para saber qué especies me puedo encontrar [[wikinatu]].' },
        { etiqueta: 'IA al servicio de las personas', texto: 'En todo lo que hago busco que mi trabajo tenga impacto y aporte un beneficio. Con la IA, la gobernanza es la forma de conseguirlo, que esta herramienta siga al servicio de la gente y no se use de forma equivocada. Valido y vigilo modelos de IA en sanidad, en distintos sistemas y organizaciones, y me encargo de conocer el contexto de cada modelo y a las personas que lo van a usar, para diseñar la estrategia de gobernanza que mejor le encaja. Ahí vi un hueco que el mercado no cubría, medir la capa humana. Un modelo no es un sistema aislado. Lo usa una persona que se ve influida por él, y para que la gobernanza sea completa también hay que medir esa interacción entre el usuario y el modelo. De esa idea salió [Vigía](#herramientas).' },
        { etiqueta: 'Hablemos', texto: 'A día de hoy sigo saliendo a la montaña [[montana]] y viajando siempre que puedo [[paisaje]], y sigo aprendiendo y creando proyectos con estas herramientas. Si te interesa algo de lo que cuento aquí, escríbeme por [LinkedIn](https://www.linkedin.com/in/miguel-ferreiro-garcia) o por [correo](correo:) y estaré encantado de conectar.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Retrato de Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Mariposa chupaleches posada en un tojo' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Web pública de ProReg, el registro de cáncer de próstata de la EAU' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu en la ruta de O Pindo: 83 especies de iNaturalist avistadas cerca de la ruta, y cinco fichas con cuántas veces se vio cada una y cuándo por última vez' },
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
        { etiqueta: 'Introducing myself', texto: 'I am Miguel [[retrato]]. I work on monitoring and overseeing artificial intelligence models in healthcare, from Santiago de Compostela, Spain.' },
        { etiqueta: 'Between the mountains and the computer', texto: 'My interests have always been closely tied to nature, and I really enjoyed learning about it [[mariposa]]. That led me to study Biology, and that is where I truly fell in love with that world, from molecules to ecosystems. I kept studying within that field, and while working in bioengineering I realised my place was not in the lab, but split between the mountains and the computer.' },
        { etiqueta: 'Understanding healthcare through biology', texto: 'With that first contact with computing I kept studying bioinformatics and biostatistics, at my own pace in an online programme, and at the same time I started working. I grew and learned a lot working on clinical data projects, and I kept bringing what I knew from biology into that work. That is how I came to spatial data and One Health, looking for ways to bring together everything around us and how our environment affects our health, and that is where the projects that came later started to take shape.' },
        { etiqueta: 'New tools, new projects', texto: 'Over the next years I gave shape to those ideas, while I moved forward at work and learned new tools and ways of running projects. I started analysing data about cities and tinkering with GIS and geospatial technologies, and that led to maps such as the relief of a Galician estuary over an old nautical chart [[ria]] or the channel of the Lindis River, in New Zealand, drawn with a relative elevation model [[lindis]].' },
        { etiqueta: 'A new door', texto: 'When AI models arrived, what I could do on my own changed. It interested me from the first moment, because ideas that used to stay in a drawer, for lack of time or because I did not know where to start, came within reach. That led to [the open-data explorations](#explorations) on this page, and also to WikiNatu, an app that crosses my hiking routes with iNaturalist observations to know which species I can find [[wikinatu]].' },
        { etiqueta: 'AI at the service of people', texto: 'In everything I do, I want my work to have an impact and bring some benefit. With AI, governance is how I get there, keeping this tool at the service of people and not misused. I validate and monitor AI models in healthcare, across different systems and organisations, and I take care of understanding each model’s context and the people who will use it, to design the governance strategy that suits it best. That is where I saw a gap the market was not covering, measuring the human layer. A model is not an isolated system. A person uses it and is influenced by it, and for governance to be complete, the interaction between the user and the model has to be measured too. That idea gave rise to [Vigía](#tools).' },
        { etiqueta: 'Let’s talk', texto: 'Today I still go to the mountains [[montana]] and travel whenever I can [[paisaje]], and I keep learning and building projects with these tools. If anything here interests you, write to me on [LinkedIn](https://www.linkedin.com/in/miguel-ferreiro-garcia) or by [email](correo:), and I will be happy to connect.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Portrait of Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Scarce swallowtail butterfly on gorse' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Public website of ProReg, the EAU prostate cancer registry' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu on the O Pindo route: 83 iNaturalist species seen near the route, and five species cards with how many times each was seen and when it was last seen' },
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
