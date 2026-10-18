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
        { etiqueta: 'Biología', texto: 'Empecé por la Biología en la Universidade de Santiago de Compostela. El mundo natural me ha interesado siempre, de las moléculas a los ecosistemas [[mariposa]], y allí aprendí de casi todas sus ramas. Eso me llevó a seguir con la bioingeniería en Barcelona, y fue ahí donde me di cuenta de que mi sitio no estaba en el laboratorio sino delante del ordenador.' },
        { etiqueta: 'Datos de salud', texto: 'Con ese primer contacto con la informática seguí formándome en bioinformática y bioestadística, a mi ritmo y en un programa online, y a la vez empecé a trabajar. Crecí mucho en proyectos de datos clínicos, y el trabajo se fue cruzando con lo que me interesaba desde la biología. Así llegué a los datos espaciales y al exposoma, cómo el entorno en el que vivimos influye en la salud, y ahí empezaron a tomar forma los proyectos que vinieron después.' },
        { etiqueta: 'Mapas', texto: 'En los años siguientes, mientras avanzaba en el trabajo y aprendía nuevas herramientas y formas de llevar proyectos, fui dando forma a esas ideas. Empecé a analizar datos de ciudades y a trastear con las tecnologías geoespaciales y el GIS, primero con mapas más cartográficos [[ria]] y después con otros más estéticos [[lindis]].' },
        { etiqueta: 'IA', texto: 'Con la llegada de los modelos de IA se me abrió otra puerta. De repente tenía muchos más recursos a mano y podía llegar bastante más lejos que antes, y me interesó desde el primer momento. Empecé a juntar todos mis intereses, y lo primero que salió fue WikiNatu, una aplicación que uso para saber qué especies me puedo encontrar en las rutas de senderismo [[wikinatu]]. Según fui aprendiendo llegaron [los proyectos de más arriba](#exploraciones).' },
        { etiqueta: 'Gobernanza', texto: 'Y otra vez se cruzaron lo que me gustaba hacer y mi trabajo, esta vez en la gobernanza de modelos de IA. Uso herramientas comerciales y trabajo con organizaciones que están empezando en esto, y con esa experiencia vi un hueco, medir la capa humana. Un modelo no es un sistema aislado. Lo usa una persona que se deja influir por él, y eso también hay que medirlo, de forma transversal. De ahí sale [Vigía](#herramientas).' },
        { etiqueta: 'Fuera del trabajo', texto: 'Mientras tanto la naturaleza sigue muy presente. Salgo a la montaña [[montana]] y viajo siempre que puedo [[paisaje]], y sigo aprendiendo y creando proyectos con estas herramientas.' },
        { etiqueta: 'Contacto', texto: 'Si te interesa algo de lo que cuento aquí, escríbeme por [LinkedIn](https://www.linkedin.com/in/miguel-ferreiro-garcia) o por [correo](correo:) y estaré encantado de conectar. Mi trayectoria completa está en LinkedIn.' },
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
        { etiqueta: 'Today', texto: 'I am Miguel [[retrato]]. I work on monitoring and overseeing artificial intelligence models in healthcare, from Santiago de Compostela, Spain.' },
        { etiqueta: 'Biology', texto: 'I started with Biology at the University of Santiago de Compostela. The natural world has always interested me, from molecules to ecosystems [[mariposa]], and there I learned about almost all of its branches. That led me on to bioengineering in Barcelona, and that is where I realised my place was not in the lab but in front of a computer.' },
        { etiqueta: 'Health data', texto: 'With that first contact with computing I kept studying bioinformatics and biostatistics, at my own pace in an online programme, and at the same time I started working. I grew a lot on clinical data projects, and my work started to cross paths with what interested me from biology. That is how I came to spatial data and the exposome, how the place we live affects our health, and that is where the projects that came later started to take shape.' },
        { etiqueta: 'Maps', texto: 'Over the next years, as I moved forward at work and learned new tools and ways of running projects, I gave shape to those ideas. I started analysing data about cities and tinkering with geospatial technologies and GIS, first with more cartographic maps [[ria]] and then with more aesthetic ones [[lindis]].' },
        { etiqueta: 'AI', texto: 'When AI models arrived, another door opened. Suddenly I had far more resources at hand and could go much further than before, and it interested me from the first moment. I started bringing all my interests together, and the first thing that came out was WikiNatu, an app I use to know which species I can find on hiking routes [[wikinatu]]. As I kept learning, [the projects above](#explorations) followed.' },
        { etiqueta: 'Governance', texto: 'And once again what I liked doing and my work crossed paths, this time in the governance of AI models. I use commercial tools and work with organisations that are starting out in this, and that experience showed me a gap, measuring the human layer. A model is not an isolated system. A person uses it and is influenced by it, and that has to be measured too, across the board. That is where [Vigía](#tools) comes from.' },
        { etiqueta: 'Outside work', texto: 'Meanwhile nature is still very present. I go to the mountains [[montana]] and travel whenever I can [[paisaje]], and I keep learning and building projects with these tools.' },
        { etiqueta: 'Contact', texto: 'If anything here interests you, write to me on [LinkedIn](https://www.linkedin.com/in/miguel-ferreiro-garcia) or by [email](correo:), and I will be happy to connect. My full background is on LinkedIn.' },
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
