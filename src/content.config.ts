import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import yaml from 'js-yaml';

const metrica = z.object({ valor: z.string(), etiqueta: z.string() });

const proyectos = defineCollection({
  loader: file('src/data/proyectos.yaml', {
    parser: (texto) => yaml.load(texto) as Record<string, unknown>[],
  }),
  schema: z.object({
    tipo: z.enum(['herramienta', 'exploracion']),
    nombre: z.string(),
    pregunta: z.string(),
    resumen: z.string(),
    estado: z.enum(['live', 'repo', 'privado']),
    estado_nota: z.string().optional(),
    url_live: z.string().url().optional(),
    url_repo: z.string().url().optional(),
    url_ficha: z.string().optional(),
    url_informe: z.string().optional(),
    captura: z.string().optional(),
    captura_alt: z.string().optional(),
    inicio: z.number().optional(),
    intro: z.string().optional(),
    como: z.array(z.string()).optional(),
    aprendi: z.string().optional(),
    nota_codigo: z.string().optional(),
    metricas: z.array(metrica).optional(),
    marcos: z.array(z.string()).optional(),
  }),
});

export const collections = { proyectos };
