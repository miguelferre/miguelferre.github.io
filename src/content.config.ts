import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import yaml from 'js-yaml';

// Todo texto visible va en los dos idiomas.
const texto = z.object({ es: z.string(), en: z.string() });
const lista = z.object({ es: z.array(z.string()), en: z.array(z.string()) });
const metrica = z.object({ valor: z.string(), etiqueta: texto });

const proyectos = defineCollection({
  loader: file('src/data/proyectos.yaml', {
    parser: (contenido) => yaml.load(contenido) as Record<string, unknown>[],
  }),
  schema: z.object({
    tipo: z.enum(['herramienta', 'exploracion']),
    nombre: z.string(),
    pregunta: texto,
    resumen: texto,
    // sector o ámbito del proyecto: es la etiqueta que se ve en tarjetas y fichas
    sector: texto,
    estado: z.enum(['live', 'repo', 'privado']),
    estado_nota: texto.optional(),
    url_live: z.string().url().optional(),
    url_repo: z.string().url().optional(),
    url_descarga: z.string().url().optional(),
    captura: z.string().optional(),
    // id de una figura iso-glow en public/figuras/<id>.html
    figura: z.string().optional(),
    captura_alt: texto.optional(),
    inicio: z.number().optional(),
    intro: texto.optional(),
    como: lista.optional(),
    aprendi: texto.optional(),
    nota_codigo: texto.optional(),
    metricas: z.array(metrica).optional(),
    marcos: z.array(z.string()).optional(),
  }),
});

export const collections = { proyectos };
