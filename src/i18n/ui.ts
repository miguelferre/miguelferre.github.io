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
      lema: 'Buscando mantener la inteligencia artificial al servicio de las personas.',
      // Descripción de la portada: una idea por línea
      subtitulo: [
        'Vengo de la biología, crecí trabajando con datos clínicos y hoy me dedico a la gobernanza de modelos de IA.',
        'Por mi cuenta exploro ideas, y algunas acaban convertidas en herramientas o proyectos. Te invito a conocerlas.',
      ],
      herramientasEntradilla: 'Herramientas',
      herramientasTitulo: 'Herramientas para vigilar modelos de IA.',
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
        { etiqueta: 'Me presento', texto: 'Soy Miguel [[retrato]]. Trabajo desde Santiago de Compostela en la vigilancia y supervisión de modelos de inteligencia artificial.' },
        { etiqueta: 'Con un pie dentro y otro fuera', texto: 'Mis intereses siempre han estado muy ligados a la naturaleza, y siempre he disfrutado aprendiendo sobre ella [[mariposa]]. Eso me llevó a estudiar Biología, y fue ahí donde de verdad me enamoré de ese mundo, desde las moléculas hasta los ecosistemas. Seguí formándome en bioingeniería, y ahí me di cuenta de que mi sitio no estaba en el laboratorio, sino repartido entre la montaña y el ordenador.' },
        { etiqueta: 'Entender la sanidad digital desde la biología', texto: 'Tras ese primer contacto con la informática seguí formándome en bioinformática y bioestadística, online y compaginándolo con mi entrada en el mundo laboral. Crecí y aprendí mucho trabajando con datos clínicos de organizaciones de varios países europeos, armonizándolos y cuidando su calidad, y fui aplicando lo que había aprendido en biología. El siguiente paso fue el análisis de los datos geoespaciales y One Health, que une la salud humana, la animal y la ambiental, y ahí empezaron a tomar forma los proyectos que vinieron posteriormente.' },
        { etiqueta: 'Primeros pasos en el mapa', texto: 'En los años siguientes fui dando forma a esas ideas, a la vez que avanzaba en el trabajo y aprendía nuevas herramientas y formas de llevar proyectos. Empecé a analizar datos de ciudades y a aprender GIS y tecnologías geoespaciales. Mis primeros proyectos fueron mapas de lo que me rodeaba [[ria]], o de los recuerdos de mis viajes [[paisaje]] vistos desde otros ángulos [[lindis]].' },
        { etiqueta: 'Una puerta nueva', texto: 'Con la llegada de los modelos de IA cambió lo que podía hacer por mi cuenta. Me interesó desde el primer momento, porque ideas que antes se quedaban en el cajón, por falta de tiempo o porque no sabía por dónde empezar, pasaron a estar a mi alcance. De ahí salieron [las exploraciones con datos abiertos](#exploraciones) de esta página, y también proyectos como una aplicación que cruza mis rutas de senderismo con las observaciones de iNaturalist para saber qué especies me puedo encontrar [[wikinatu]].' },
        { etiqueta: 'Vigilamos al modelo, pero quien decide es el usuario', texto: 'La IA ya participa en decisiones que afectan a personas, y quiero que mi trabajo sirva para que esas decisiones sean seguras y justas. La gobernanza es la forma de conseguirlo, que esta herramienta siga al servicio de la gente y no se use de forma perjudicial. Valido y vigilo modelos de IA en sanidad, en distintos sistemas y organizaciones, y me encargo de conocer el contexto de cada modelo y a las personas que lo van a usar, para diseñar la estrategia de gobernanza que mejor le encaja. Ahí vi un hueco que el mercado no cubría, medir la capa humana. Un modelo no es un sistema aislado, lo usa una persona y cambia su forma de trabajar y de decidir. Para que la gobernanza sea completa también hay que medir esa interacción entre el usuario y el modelo. De esa idea salió [Vigía](#herramientas).' },
        { etiqueta: 'Hablemos', texto: 'Cada día sigo aprendiendo y explorando ideas nuevas, y ahora ya puedo dejar a mis agentes investigando de vez en cuando mientras aprovecho para salir a la montaña [[montana]]. Si te interesa algo de lo que cuento aquí, escríbeme y estaré encantado de conectar.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Retrato de Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Mariposa chupaleches posada en un tojo' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Web pública de ProReg, el registro de cáncer de próstata de la EAU' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu en la ruta del monte Pindo, en Carnota: 83 especies de iNaturalist avistadas cerca de la ruta, y cinco fichas con cuántas veces se vio cada una y cuándo por última vez' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel en un valle nevado de montaña' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valle con un río y montañas nevadas' },
        ria: { src: '/sobre-mi/mapa-ria.webp', alt: 'Mapa de relieve de una ría gallega sobre una carta náutica antigua' },
        lindis: { src: '/sobre-mi/lindis.webp', alt: 'Modelo de elevación relativa del río Lindis, en Nueva Zelanda, en amarillo, granate y azul' },
      },
      perfilLinkedIn: 'Perfil completo en LinkedIn',
      // Fondo animado de la portada: se ven fragmentos de estas palabras
      claves: [
        'gobernanza', 'IA', 'sanidad', 'validación', 'datos', 'geoespacial',
        'bioinformática', 'bioestadística', 'biología', 'ISO 42001',
        'EU AI Act', 'NIST AI RMF', 'confianza', 'producto', 'modelos', 'personas',
        'human in the loop', 'capa humana', 'supervisión humana',
        'deriva', 'calidad', 'explicabilidad', 'equidad',
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
      lema: 'Working to keep artificial intelligence at the service of people.',
      subtitulo: [
        'I come from biology, grew up professionally working with clinical data, and today I work on the governance of AI models.',
        'On my own, I explore ideas, and some end up as tools or projects. You are welcome to take a look.',
      ],
      herramientasEntradilla: 'Tools',
      herramientasTitulo: 'Tools to monitor AI models.',
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
        { etiqueta: 'Introducing myself', texto: 'I am Miguel [[retrato]]. I work from Santiago de Compostela, Spain, on monitoring and overseeing artificial intelligence models.' },
        { etiqueta: 'One foot in, one foot out', texto: 'My interests have always been closely tied to nature, and I have always enjoyed learning about it [[mariposa]]. That led me to study Biology, and that is where I truly fell in love with that world, from molecules to ecosystems. I went on to study bioengineering, and there I realised my place was not in the lab, but split between the mountains and the computer.' },
        { etiqueta: 'Understanding digital health through biology', texto: 'After that first contact with computing I kept studying bioinformatics and biostatistics, online and alongside my first steps into the working world. I grew and learned a lot working with clinical data from organisations in several European countries, harmonising it and looking after its quality, and I kept applying what I had learned in biology. The next step was geospatial data analysis and One Health, which links human, animal and environmental health, and that is where the projects that came later started to take shape.' },
        { etiqueta: 'First steps on the map', texto: 'Over the next years I gave shape to those ideas, while I moved forward at work and learned new tools and ways of running projects. I started analysing data about cities and learning GIS and geospatial technologies. My first projects were maps of what was around me [[ria]], or of memories of my travels [[paisaje]] seen from other angles [[lindis]].' },
        { etiqueta: 'A new door', texto: 'When AI models arrived, what I could do on my own changed. It interested me from the first moment, because ideas that used to stay in a drawer, for lack of time or because I did not know where to start, came within reach. That led to [the open-data explorations](#explorations) on this page, and also to projects such as an app that crosses my hiking routes with iNaturalist observations to know which species I can find [[wikinatu]].' },
        { etiqueta: 'We watch the model, but the user decides', texto: 'AI already takes part in decisions that affect people, and I want my work to help make those decisions safe and fair. Governance is how I get there, keeping this tool at the service of people and not used to cause harm. I validate and monitor AI models in healthcare, across different systems and organisations, and I take care of understanding each model’s context and the people who will use it, to design the governance strategy that suits it best. That is where I saw a gap the market was not covering, measuring the human layer. A model is not an isolated system, a person uses it and it changes how that person works and decides. For governance to be complete, the interaction between the user and the model has to be measured too. That idea gave rise to [Vigía](#tools).' },
        { etiqueta: 'Let’s talk', texto: 'Every day I keep learning and exploring new ideas, and now I can leave my agents researching every now and then while I head out to the mountains [[montana]]. If anything here interests you, write to me and I will be happy to connect.' },
      ],
      fotos: {
        retrato: { src: '/sobre-mi/retrato.webp', alt: 'Portrait of Miguel Ferreiro', pos: '50% 18%' },
        mariposa: { src: '/sobre-mi/mariposa.webp', alt: 'Scarce swallowtail butterfly on gorse' },
        proreg: { src: '/sobre-mi/proreg.webp', alt: 'Public website of ProReg, the EAU prostate cancer registry' },
        wikinatu: { src: '/sobre-mi/wikinatu.webp', alt: 'WikiNatu on the Monte Pindo route, in Carnota: 83 iNaturalist species seen near the route, and five species cards with how many times each was seen and when it was last seen' },
        montana: { src: '/sobre-mi/montana.webp', alt: 'Miguel in a snowy mountain valley' },
        paisaje: { src: '/sobre-mi/paisaje.webp', alt: 'Valley with a river and snowy mountains' },
        ria: { src: '/sobre-mi/mapa-ria.webp', alt: 'Relief map of a Galician estuary over an old nautical chart' },
        lindis: { src: '/sobre-mi/lindis.webp', alt: 'Relative elevation model of the Lindis River, New Zealand, in yellow, maroon and blue' },
      },
      perfilLinkedIn: 'Full profile on LinkedIn',
      claves: [
        'governance', 'AI', 'healthcare', 'validation', 'data', 'geospatial',
        'bioinformatics', 'biostatistics', 'biology', 'ISO 42001',
        'EU AI Act', 'NIST AI RMF', 'trust', 'product', 'models', 'people',
        'human in the loop', 'human layer', 'human oversight',
        'drift', 'quality', 'explainability', 'fairness',
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
