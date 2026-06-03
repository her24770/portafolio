# Entrada de portafolio: Iglesia Principe de Paz

```json
{
  "title": "Iglesia Príncipe de Paz",
  "slug": "iglesia-principe-de-paz",
  "description": "Plataforma web para centralizar la presencia digital de la Iglesia Príncipe de Paz, mostrando eventos, ministerios, sedes, anuncios y recursos para la comunidad.",
  "content": "Construí una plataforma web para la Iglesia Príncipe de Paz en Guatemala con el objetivo de que la congregación tuviera un sitio claro, moderno y administrable. La app muestra información pública como próximos eventos, ministerios, sedes, anuncios, transmisiones en vivo y una promesa bíblica del día. También incluye una base backend para recibir y gestionar contenido como peticiones de oración, testimonios, mensajes de contacto, material de estudio y proyectos de misión. La aplicación funciona como una solución full-stack dentro de Next.js, combinando páginas públicas renderizadas en servidor con rutas API conectadas a PostgreSQL mediante Supabase y Drizzle ORM.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "Tailwind CSS",
    "Zod"
  ],
  "category": "fullstack",
  "demo_url": null,
  "repo_urls": [
    "https://github.com/her24770/PrincipeDePaz"
  ],
  "featured": false,
  "order": 4,
  "status": "in_progress",
  "year": 2026,
  "problem_solved": "La iglesia necesitaba una plataforma centralizada para comunicar eventos, ministerios, sedes, anuncios y recursos espirituales a su comunidad.",
  "architecture": "Decidí construir el proyecto como una aplicación full-stack con Next.js App Router porque permite mantener el frontend público y las rutas API en un solo código base. Las páginas principales se renderizan como server components para consultar directamente los datos necesarios de la landing, mientras que los endpoints API manejan operaciones de creación y consulta para las entidades principales. La base de datos está modelada con Drizzle ORM sobre PostgreSQL/Supabase, lo que me permitió definir tablas, enums y relaciones de forma tipada. Supabase se usa para autenticación, storage de imágenes públicas y conexión a la base de datos, mientras que Docker con output standalone prepara la app para despliegues reproducibles.",
  "challenges": "El reto principal fue diseñar un modelo de datos suficientemente amplio para cubrir necesidades reales de una iglesia sin sobrecomplicar la primera versión. Tuve que estructurar eventos, anuncios, ministerios, sedes, peticiones, testimonios, material de estudio, proyectos de misión y cuentas de donación con relaciones claras y estados manejables. También cuidé que las consultas públicas tuvieran filtros útiles, como anuncios activos no expirados, eventos próximos y contenido ordenado, y que los formularios/API validaran datos con Zod antes de llegar a la base de datos.",
  "what_i_learned": "Reforcé cómo organizar una app full-stack moderna con Next.js App Router, server components, rutas API y Drizzle ORM en un mismo proyecto. También consolidé el uso de Supabase más allá de la base de datos, especialmente para autenticación SSR, service clients y storage público. A nivel de producto aprendí a traducir necesidades no técnicas de una organización en entidades, estados y flujos concretos.",
  "would_do_different": "Si lo empezara desde cero hoy, separaría desde antes las capas de administración y contenido público para evitar que el panel admin quedara como una fase posterior demasiado grande. También agregaría migraciones versionadas desde el inicio, pruebas básicas para los endpoints principales y un sistema más explícito de permisos por rol para distinguir acciones de administradores y pastores.",
  "setup_instructions": "Requisitos previos: Node.js 22, npm, Docker opcional y un proyecto de Supabase con PostgreSQL habilitado.\n\n1. Instalar dependencias:\n```bash\nnpm install\n```\n\n2. Crear el archivo de entorno:\n```bash\ncp .env.local.example .env.local\n```\n\n3. Configurar estas variables en `.env.local`:\n```bash\nNEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\nSUPABASE_SERVICE_ROLE_KEY=\nDATABASE_URL=\nNEXT_PUBLIC_SITE_URL=http://localhost:3000\n```\n\n4. Aplicar el esquema de base de datos:\n```bash\nnpm run db:generate\nnpm run db:push\n```\n\n5. Levantar el servidor local:\n```bash\nnpm run dev\n```\n\nLa app queda disponible en `http://localhost:3000`.\n\nPara correr con Docker:\n```bash\ndocker-compose up --build\n```\n\nTambién se puede construir manualmente con:\n```bash\ndocker build -t principe-de-paz .\ndocker run -p 3000:3000 --env-file .env.local principe-de-paz\n```",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack"
}
```
