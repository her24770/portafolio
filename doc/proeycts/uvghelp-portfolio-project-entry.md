# UVG Help — Entrada para portafolio

```json
{
  "title": "UVG Help",
  "slug": "uvg-help",
  "description": "Panel administrativo y API para centralizar información universitaria de la UVG: lugares, eventos, cursos, profesores, servicios, pagos y contactos en una sola herramienta.",
  "content": "UVG Help es un sistema de información universitaria pensado para que administradores puedan mantener actualizados los datos clave de la Universidad del Valle de Guatemala. El proyecto incluye una API REST con autenticación, validación, documentación automática y persistencia en PostgreSQL, junto con un panel web desde el que se pueden crear, editar, buscar, ordenar, paginar y exportar registros. La idea fue construir una base funcional para consultar y administrar información institucional desde una interfaz simple, sin depender de hojas de cálculo dispersas o procesos manuales.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "SQLAlchemy",
    "Alembic",
    "Docker",
    "JavaScript",
    "HTML",
    "CSS"
  ],
  "category": "fullstack",
  "demo_url": "https://uvg.jhgo.online/web/UVHelp",
  "repo_urls": [
    "https://github.com/her24770/web-UVGHelp-frontend",
    "https://github.com/her24770/web-UVGHelp-backend"
  ],
  "featured": true,
  "order": 0,
  "status": "completed",
  "year": 2026,
  "problem_solved": "La información universitaria estaba distribuida y necesitaba una forma centralizada de administrarse y consultarse desde una herramienta web.",
  "architecture": "Separé el proyecto en dos aplicaciones: un backend FastAPI y un frontend administrativo estático. En el backend usé una arquitectura por capas con modelos SQLAlchemy, schemas Pydantic, routers por entidad y servicios reutilizables para CRUD, paginación y respuestas de error. PostgreSQL guarda las entidades principales y Alembic controla las migraciones. El frontend está hecho con HTML, CSS y JavaScript modular, consumiendo la API con fetch y protegiendo las vistas mediante JWT en localStorage. Elegí Docker para que tanto la API como la base de datos y el panel pudieran levantarse de forma reproducible en local o en servidor.",
  "challenges": "Lo más retador fue construir funcionalidades que normalmente resolvería con un framework: tablas reutilizables, modales, toasts, paginación, búsqueda con debounce, ordenamiento, estado sincronizado en la URL y exportación a CSV/Excel sin librerías externas. En backend también fue importante estandarizar errores, validar inputs con Pydantic, manejar relaciones entre entidades y crear un endpoint de imágenes que validara MIME, extensión y tamaño antes de guardar archivos.",
  "what_i_learned": "Consolidé el uso de FastAPI para crear APIs documentadas automáticamente, aprendí a estructurar mejor un backend con SQLAlchemy y Alembic, y entendí con más profundidad lo que hacen por dentro los frameworks frontend al implementar componentes y manejo de estado con JavaScript puro. También reforcé la importancia de Docker para evitar problemas de entorno y facilitar despliegues.",
  "would_do_different": "Si lo construyera desde cero hoy, usaría un framework frontend como React con TypeScript para mejorar mantenibilidad, tipado y reutilización de componentes. También endurecería la seguridad desde el inicio usando bcrypt o Argon2 para contraseñas, CORS más restrictivo, permisos por rol más claros y pruebas automatizadas para los endpoints principales. Además, centralizaría ambos servicios en un único compose de desarrollo para levantar frontend, backend y base de datos con un solo comando.",
  "setup_instructions": "Requisitos previos: Docker y Docker Compose. Backend: clonar https://github.com/her24770/web-UVGHelp-backend, entrar a la carpeta, copiar .env.example a .env y docker-compose.yml.example a docker-compose.yml. Variables necesarias: DATABASE_URL, DB_USER, DB_PASSWORD, APP_ENV, APP_PORT, CORS_ORIGINS, JWT_SECRET y JWT_EXPIRE_HOURS. Luego ejecutar docker compose up --build. El contenedor aplica migraciones con Alembic, ejecuta seed.py y levanta la API en http://localhost:8000. Swagger queda en http://localhost:8000/docs. Credenciales de prueba: admin@uvg.edu.gt / admin123. Frontend: clonar https://github.com/her24770/web-UVGHelp-frontend, copiar .env.example a .env y docker-compose.yml.example a docker-compose.yml. Variables necesarias: API_BASE=http://localhost:8000/api y TOKEN_KEY=uvg_token. Ejecutar docker compose up --build y abrir http://localhost:3000. Alternativamente, el frontend puede servirse con python3 -m http.server 3000 o npx serve ., pero debe ejecutarse desde un servidor HTTP porque usa módulos ES.",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack developer"
}
```
