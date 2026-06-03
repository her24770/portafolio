# SWAP - entrada para portafolio
	
```json
{
  "title": "SWAP",
  "slug": "swap",
  "description": "Plataforma universitaria para conectar estudiantes que buscan tutorías, materiales académicos y servicios dentro de la comunidad UVG, con búsqueda semántica, recomendaciones y moderación de contenido.",
  "content": "SWAP es una plataforma digital para estudiantes de la Universidad del Valle de Guatemala. El proyecto centraliza tres necesidades comunes del campus: encontrar tutorías, intercambiar o comprar materiales académicos y descubrir negocios o servicios ofrecidos por otros estudiantes. Desde la aplicación, los usuarios pueden registrarse con correo institucional, crear publicaciones, guardar favoritos, filtrar por categorías, revisar perfiles, dejar reseñas y descubrir contenido recomendado según sus intereses. También integra búsqueda semántica para encontrar publicaciones aunque la búsqueda no coincida palabra por palabra, además de moderación automática para mantener segura la comunidad.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",	
    "Prisma",
    "Redis",
    "Docker",
    "FastAPI",
    "Python",
    "Socket.io",
    "OpenAI-moderation",
    "API-Resend",
    "Cloudfare-R2",
    "Docker",
    "AWS-Recognition",
    "Zod",
    "Zustand"	
  ],
  "category": "fullstack",
  "demo_url": "swap.jhgo.online",
  "repo_urls": ["https://github.com/her24770/swap-frontend","https://github.com/her24770/swap-backend"],
  "featured": true,
  "order": 0,
  "status": "Progress",
  "year": 2026,
  "problem_solved": "Los estudiantes de UVG no tenían un espacio centralizado y seguro para encontrar tutorías, materiales académicos y servicios ofrecidos por otros estudiantes.",
  "architecture": "El proyecto se construyó como una aplicación fullstack separando claramente frontend, backend y servicios auxiliares. El frontend usa Next.js con React y TypeScript para manejar rutas, perfiles, filtros, formularios e internacionalización. El backend usa Express con TypeScript y una arquitectura por capas: rutas para exponer endpoints, controladores para la lógica de negocio, repositorios para aislar el acceso a datos con Prisma y servicios para integraciones externas como embeddings, email, almacenamiento y moderación. PostgreSQL se usa como base principal, con pgvector para búsqueda semántica; Redis se usa para cachear recomendaciones y manejar datos temporales como códigos de verificación. También se agregó un microservicio FastAPI para generar embeddings sin cargar esa responsabilidad al backend principal.",
  "challenges": "Lo más complejo fue integrar funcionalidades avanzadas sin romper el flujo principal de publicaciones. La búsqueda semántica exigió agregar pgvector, generar embeddings al crear o editar publicaciones y mantener una consulta eficiente por similitud. Las recomendaciones también fueron un reto porque combinan intereses del usuario, etiquetas, likes, acuerdos completados y cache en Redis para no recalcular todo en cada request. Otro punto difícil fue la moderación: el texto se valida con palabras restringidas y OpenAI, mientras que las imágenes se moderan con Rekognition en segundo plano para no bloquear innecesariamente la experiencia del usuario.",
  "what_i_learned": "Aprendí a diseñar una aplicación fullstack más cercana a un producto real: separar responsabilidades por capas, usar Prisma con relaciones complejas, cachear resultados con Redis, trabajar con Docker Compose y conectar servicios externos de IA y almacenamiento. También consolidé la importancia de tomar decisiones de arquitectura pensando en mantenibilidad, no solo en que el feature funcione una vez.",
  "would_do_different": "Si lo construyera desde cero, definiría desde el inicio una estrategia más estricta de migraciones, pruebas automatizadas y contratos de API compartidos entre frontend y backend. También separaría antes algunos módulos grandes del backend, especialmente publicaciones, recomendaciones y moderación, para que cada dominio tuviera límites más claros. A nivel de producto, reduciría el alcance inicial para validar primero el flujo principal y después agregar búsqueda semántica, recomendaciones y moderación avanzada.",
  "setup_instructions": "Requisitos previos: Docker y Docker Compose instalados. Para levantar el backend: 1. Entrar a `swap-backend`. 2. Copiar variables con `cp .env.example .env`. 3. Configurar como mínimo `JWT_SECRET`, `OPENAI_API_KEY`, credenciales de AWS Rekognition, credenciales de Cloudflare R2 y `RESEND_API_KEY`; los valores de PostgreSQL y Redis pueden quedarse como los defaults para desarrollo. 4. Ejecutar `docker compose up --build`. 5. Verificar con `curl http://localhost:3001/api/health`. 6. Para datos de prueba, correr `docker compose exec api npm run prisma:seed`, luego `docker compose exec api npx tsx prisma/seedPruebas.ts` y finalmente `docker compose exec api npx tsx prisma/backfillEmbeddings.ts`. Para levantar el frontend: 1. Entrar a `swap-frontend`. 2. Copiar variables con `cp .env.example .env`. 3. Confirmar `NEXT_PUBLIC_API_URL=http://localhost:3001` y `NEXT_PUBLIC_SOCKET_URL=http://localhost:3001`. 4. Ejecutar `docker compose up --build`. 5. Abrir `http://localhost:3000`.",
  "team_size": 6,
  "team_description": "Trabajé con un equipo de estudiantes de Ingeniería de Software I de la Universidad del Valle de Guatemala en el análisis, diseño, desarrollo, base de datos, documentación y entrega del producto.",
  "role": "Full-stack developer"
}
```
