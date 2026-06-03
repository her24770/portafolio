"""seed de proyectos

Revision ID: 003
Revises: 002
Create Date: 2024-01-01 00:00:02.000000

"""
import json
from typing import Sequence, Union
from alembic import op
from sqlalchemy import text

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# =============================================================================
# TECNOLOGÍAS EXTRA
# Agrega aquí las que no estén en el catálogo base (migración 002).
# Se insertan con ON CONFLICT DO NOTHING, así que no rompen nada si ya existen.
# =============================================================================

EXTRA_TECHNOLOGIES = [
    ("Zod",             "zod",              "tool"),
    ("Zustand",         "zustand",          "frontend"),
    ("Resend",          "resend",           "tool"),
    ("AWS Rekognition", "aws-rekognition",  "tool"),
    ("Cloudflare R2",   "cloudflare-r2",    "devops"),
    ("Maven",           "apachemaven",      "tool"),
    ("PrimeFaces",      "primefaces",       "frontend"),
    ("Drizzle ORM",     "drizzle",          "tool"),
    ("Material UI",     "materialui",       "frontend"),
    ("Streamlit",       "streamlit",        "frontend"),
    ("Pandas",          "pandas",           "tool"),
    ("Plotly",          "plotly",           "tool"),
    ("Alembic",         "alembic",          "tool"),
    ("Bootstrap",       "bootstrap",        "frontend"),
]


# =============================================================================
# PROYECTOS
# =============================================================================

PROJECTS = [
    {
        "title": "SWAP",
        "slug": "swap",
        "description": "Plataforma universitaria para conectar estudiantes que buscan tutorías, materiales académicos y servicios dentro de la comunidad UVG, con búsqueda semántica, recomendaciones y moderación de contenido.",
        "content": "SWAP es una plataforma digital para estudiantes de la Universidad del Valle de Guatemala. El proyecto centraliza tres necesidades comunes del campus: encontrar tutorías, intercambiar o comprar materiales académicos y descubrir negocios o servicios ofrecidos por otros estudiantes. Desde la aplicación, los usuarios pueden registrarse con correo institucional, crear publicaciones, guardar favoritos, filtrar por categorías, revisar perfiles, dejar reseñas y descubrir contenido recomendado según sus intereses. También integra búsqueda semántica para encontrar publicaciones aunque la búsqueda no coincida palabra por palabra, además de moderación automática para mantener segura la comunidad.",
        "thumbnail_url": "proyectos/swap/swap_principal.png",
        "images": ["proyectos/swap/swap_1.png","proyectos/swap/swap_2.png"],
        "video_url": "proyectos/swap/swap_video.webm",
        "category": "fullstack",
        "demo_url": "https://swap.jhgo.online",
        "repo_urls": [
            "https://github.com/her24770/swap-frontend",
            "https://github.com/her24770/swap-backend",
        ],
        "featured": True,
        "order": 0,
        "status": "in_progress",
        "year": 2026,
        "problem_solved": "Los estudiantes de UVG no tenían un espacio centralizado y seguro para encontrar tutorías, materiales académicos y servicios ofrecidos por otros estudiantes.",
        "architecture": "El proyecto se construyó como una aplicación fullstack separando claramente frontend, backend y servicios auxiliares. El frontend usa Next.js con React y TypeScript para manejar rutas, perfiles, filtros, formularios e internacionalización. El backend usa Express con TypeScript y una arquitectura por capas: rutas para exponer endpoints, controladores para la lógica de negocio, repositorios para aislar el acceso a datos con Prisma y servicios para integraciones externas como embeddings, email, almacenamiento y moderación. PostgreSQL se usa como base principal, con pgvector para búsqueda semántica; Redis se usa para cachear recomendaciones y manejar datos temporales como códigos de verificación. También se agregó un microservicio FastAPI para generar embeddings sin cargar esa responsabilidad al backend principal.",
        "challenges": "Lo más complejo fue integrar funcionalidades avanzadas sin romper el flujo principal de publicaciones. La búsqueda semántica exigió agregar pgvector, generar embeddings al crear o editar publicaciones y mantener una consulta eficiente por similitud. Las recomendaciones también fueron un reto porque combinan intereses del usuario, etiquetas, likes, acuerdos completados y cache en Redis para no recalcular todo en cada request. Otro punto difícil fue la moderación: el texto se valida con palabras restringidas y OpenAI, mientras que las imágenes se moderan con Rekognition en segundo plano para no bloquear innecesariamente la experiencia del usuario.",
        "what_i_learned": "Aprendí a diseñar una aplicación fullstack más cercana a un producto real: separar responsabilidades por capas, usar Prisma con relaciones complejas, cachear resultados con Redis, trabajar con Docker Compose y conectar servicios externos de IA y almacenamiento. También consolidé la importancia de tomar decisiones de arquitectura pensando en mantenibilidad, no solo en que el feature funcione una vez.",
        "would_do_different": "Si lo construyera desde cero, definiría desde el inicio una estrategia más estricta de migraciones, pruebas automatizadas y contratos de API compartidos entre frontend y backend. También separaría antes algunos módulos grandes del backend, especialmente publicaciones, recomendaciones y moderación, para que cada dominio tuviera límites más claros. A nivel de producto, reduciría el alcance inicial para validar primero el flujo principal y después agregar búsqueda semántica, recomendaciones y moderación avanzada.",
        "setup_instructions": "Requisitos previos: Docker y Docker Compose instalados.\n\nBackend:\n1. Entrar a swap-backend\n2. cp .env.example .env\n3. Configurar JWT_SECRET, OPENAI_API_KEY, credenciales AWS Rekognition, Cloudflare R2 y RESEND_API_KEY\n4. docker compose up --build\n5. curl http://localhost:3001/api/health\n6. Datos de prueba: docker compose exec api npm run prisma:seed\n\nFrontend:\n1. Entrar a swap-frontend\n2. cp .env.example .env\n3. Confirmar NEXT_PUBLIC_API_URL=http://localhost:3001\n4. docker compose up --build\n5. Abrir http://localhost:3000",
        "team_size": 6,
        "team_description": "Trabajé con un equipo de estudiantes de Ingeniería de Software I de la Universidad del Valle de Guatemala en el análisis, diseño, desarrollo, base de datos, documentación y entrega del producto.",
        "role": "Full-stack developer",
        "technologies": {
            "primary": [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "PostgreSQL",
                "FastAPI",
                "Docker",
            ],
            "secondary": [
                "Python",
                "Prisma",
                "Redis",
                "Socket.io",
                "OpenAI",
                "Zod",
                "Zustand",
                "Resend",
                "AWS Rekognition",
                "Cloudflare R2",
            ],
        },
    },

    {
        "title": "SKY Chat",
        "slug": "sky-chat",
        "description": "Chat en tiempo real con una IA sarcástica que participa como un tercer personaje en la conversación. SKY recuerda dinámicas entre usuarios, cambia de personalidad por sala y convierte un chat simple en una experiencia impredecible.",
        "content": "SKY Chat es una aplicación fullstack de mensajería en tiempo real donde dos usuarios pueden conversar mientras una IA llamada SKY interviene con personalidad propia. La app permite crear salas 1:1, enviar mensajes en vivo, ver presencia online, recibir indicadores de escritura y configurar el comportamiento de SKY por sala mediante emociones, roles y prompts personalizados. Además, SKY mantiene contexto activo de la conversación y puede extraer un perfil relacional entre los usuarios para reutilizarlo en futuras interacciones.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "ai",
        "demo_url": None,
        "repo_urls": ["https://github.com/her24770/me-sky-chat"],
        "featured": True,
        "order": 1,
        "status": "completed",
        "year": 2026,
        "problem_solved": "Los chats tradicionales son pasivos; este proyecto agrega una IA con personalidad, memoria y contexto que participa activamente en la conversación.",
        "architecture": "El frontend usa React con Vite para la interfaz de chat, login y administración. El backend usa Express para la API REST y Socket.IO para mensajes, presencia, escritura y cambios de modo en tiempo real. PostgreSQL guarda usuarios, salas, mensajes y perfiles relacionales, mientras Redis maneja presencia y contexto activo de cada sala con compresión cuando el historial crece. La lógica de IA está separada en servicios de OpenAI, contexto y memoria para aislar prompt, resumen y extracción relacional. Docker Compose orquesta los cuatro servicios para levantar el entorno de forma reproducible.",
        "challenges": "Lo más complejo fue diseñar una IA con reglas, emociones y roles combinables, no como chatbot genérico. Resolví esto con un system prompt dinámico que mezcla personalidad base, modo activo, rol, prompt personalizado y perfil relacional. Otro reto fue manejar memoria sin enviar todo el historial a OpenAI: usé Redis como ventana de contexto activa con estimación de tokens y compresión de mensajes antiguos. También fue importante coordinar JWT con Socket.IO para que solo usuarios autorizados pudieran entrar a sus salas.",
        "what_i_learned": "Aprendí a integrar IA dentro de una experiencia en tiempo real sin tratarla como una respuesta aislada de API. Consolidé patrones de sockets autenticados, separación entre memoria persistente y activa, diseño de prompts con comportamiento configurable y uso de Redis para estado efímero. También entendí cómo una decisión pequeña de producto, como cuándo debe intervenir la IA, puede afectar bastante la arquitectura.",
        "would_do_different": "Si lo construyera de nuevo, movería la lógica de intervención de SKY a un servicio más aislado o a una cola para evitar que el flujo del socket dependa directamente de llamadas a OpenAI. También agregaría tests para los disparadores de respuesta, extracción de perfiles y permisos por sala, y compartiría las definiciones de emociones y roles entre backend y frontend para evitar duplicación.",
        "setup_instructions": "Requisitos previos: Docker, Docker Compose y API key de OpenAI.\n\n1. git clone https://github.com/her24770/me-sky-chat && cd me-sky-chat\n2. cp .env.example .env\n3. Configurar en .env: OPENAI_API_KEY, JWT_SECRET, POSTGRES_URI=postgresql://sky:skypass@postgres:5432/skychat, REDIS_URL=redis://redis:6379, PORT=3000, FRONTEND_URL=http://localhost:5173\n4. docker-compose up --build\n5. En otra terminal: docker-compose exec backend npm run seed\n6. Abrir http://localhost:5173\n\nCredenciales de prueba: nandez / nandez123, luna / luna123.",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack",
        "technologies": {
            "primary": ["React", "Node.js", "Express", "PostgreSQL", "OpenAI"],
            "secondary": ["Redis", "Docker", "Tailwind CSS", "Socket.io", "Vite"],
        },
    },

    {
        "title": "QuetzalShop",
        "slug": "quetzalshop",
        "description": "Sistema web para gestionar inventario, ventas, compras, clientes y empleados de una tienda, con control de acceso real por roles de base de datos.",
        "content": "QuetzalShop es una aplicación full-stack para administrar la operación de una tienda: productos, categorías, proveedores, clientes, empleados, ventas, compras, historial y reportes. Lo construí como un sistema funcional con login, dashboard protegido por permisos y flujos de negocio completos para registrar ventas y compras que actualizan el inventario automáticamente. El valor principal del proyecto está en que la seguridad no se queda solo en el frontend o en lógica de aplicación: los roles existen directamente en PostgreSQL y el backend valida los permisos reales de cada rol antes de ejecutar operaciones.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": "https://quetzalshop.jhgo.online",
        "repo_urls": ["https://github.com/her24770/BD-quetzal_shop"],
        "featured": True,
        "order": 2,
        "status": "completed",
        "year": 2026,
        "problem_solved": "Una tienda necesitaba administrar ventas, compras e inventario con permisos claros para cada tipo de empleado.",
        "architecture": "Diseñé el proyecto como una aplicación full-stack con Docker: PostgreSQL como base de datos, FastAPI como backend y SvelteKit como frontend. El backend está organizado por rutas, controladores, schemas y capa de consultas. Para las operaciones CRUD simples usé SQLModel como ORM, mientras que las operaciones críticas y reportes se resolvieron con SQL explícito, vistas y stored procedures. La decisión más importante fue conectar el API con pools distintos según el rol PostgreSQL del usuario autenticado, de forma que los permisos reales de la base de datos fueran parte de la arquitectura y no solo una validación superficial en código.",
        "challenges": "Lo más retador fue hacer que los permisos fueran dinámicos y consistentes entre frontend, backend y PostgreSQL. Tuve que mapear usuarios de aplicación a roles reales de base de datos, crear pools de conexión por rol y consultar information_schema para reflejar cambios de GRANT y REVOKE sin reiniciar el sistema. También fue delicado manejar ventas y compras como transacciones atómicas: los stored procedures validan stock y proveedores antes de escribir, y hacen ROLLBACK cuando una operación no puede completarse.",
        "what_i_learned": "Aprendí a llevar la seguridad de una aplicación más allá del middleware, usando roles, GRANT, REVOKE y conexiones reales por rol en PostgreSQL. También consolidé el uso combinado de ORM y SQL explícito: el ORM funciona bien para CRUD mantenible, pero los stored procedures, vistas y consultas agregadas son mejores para operaciones críticas y reglas de negocio cercanas a la base de datos.",
        "would_do_different": "Si lo construyera de nuevo, separaría con más claridad las operaciones que usan el pool owner y las que deben ejecutarse con el rol activo, para reducir el riesgo de permisos demasiado amplios en consultas de lectura. También agregaría migraciones formales en lugar de depender solo de scripts SQL iniciales, ampliaría las pruebas sobre permisos y stored procedures, y evitaría acoplamientos entre la matriz de permisos del frontend y los nombres internos de tablas.",
        "setup_instructions": "Requisitos previos: Docker, Docker Compose y Git.\n\n1. git clone https://github.com/her24770/BD-quetzal_shop && cd BD-quetzal_shop && git checkout proyecto-3\n2. cp .env.example .env\n3. docker compose up\n4. Abrir http://localhost:3000 (frontend) y http://localhost:8000/docs (API).\n\nUsuarios de prueba: admin@quetzalshop.com / admin123, cajero1@quetzalshop.com / cajero123, gerente@quetzalshop.com / gerente123.",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack developer",
        "technologies": {
            "primary": ["Svelte", "FastAPI", "Python", "PostgreSQL"],
            "secondary": ["TypeScript", "Docker"],
        },
    },

    {
        "title": "SalesAI",
        "slug": "sales-ai",
        "description": "Asistente de ventas con IA que convierte archivos CSV o Excel en análisis, respuestas en lenguaje natural y gráficas útiles para tomar decisiones de negocio.",
        "content": "SalesAI es una aplicación web para analizar datos de ventas sin depender de dashboards rígidos o consultas manuales. El usuario crea una cuenta, registra el contexto de su empresa, sube archivos CSV o Excel y puede conversar con sus datos para obtener insights, problemas detectados y recomendaciones accionables. Cada análisis vive dentro de un chat con historial persistente, y también existe un chat global que combina el contexto estadístico de varios archivos para comparar periodos, detectar tendencias y hacer preguntas históricas.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "ai",
        "demo_url": None,
        "repo_urls": ["https://github.com/her24770/LLM-proyect1"],
        "featured": True,
        "order": 3,
        "status": "in_progress",
        "year": 2026,
        "problem_solved": "Los negocios pequeños suelen tener datos de ventas en archivos sueltos, pero no una forma simple de convertirlos en análisis accionables usando lenguaje natural.",
        "architecture": "Construí la aplicación como una solución monolítica en Streamlit porque necesitaba moverme rápido y combinar interfaz, estado de sesión, carga de archivos y experiencia conversacional en un solo flujo. Separé el código por responsabilidades: autenticación en auth.py, CRUD de chats en chats.py, llamadas a OpenAI en ia.py, interfaz principal en dashboard.py y visualizaciones en graficas.py. La persistencia se maneja con SQLite para mantener el despliegue simple y portable, mientras que Docker encapsula el runtime y monta el directorio de datos para conservar usuarios, chats y mensajes.",
        "challenges": "El reto principal fue darle contexto útil a la IA sin enviar archivos completos en cada mensaje. Lo resolví comprimiendo cada archivo en un JSON con dimensiones, tipos de columnas, estadísticas y una muestra inicial; así el costo de tokens se mantiene controlado aunque el CSV sea grande. También fue importante persistir múltiples conversaciones por usuario, manejar un chat maestro con contexto histórico y mantener la sesión protegida con bcrypt y expiración por inactividad.",
        "what_i_learned": "Aprendí a diseñar una experiencia de análisis con IA que no depende solo del prompt, sino de cómo se prepara y conserva el contexto. También consolidé el uso de Streamlit para aplicaciones completas con autenticación, estado de sesión, persistencia, carga de archivos, visualizaciones dinámicas y despliegue con Docker.",
        "would_do_different": "Si lo construyera desde cero, separaría la capa de backend en una API propia y usaría PostgreSQL para escalar mejor usuarios, auditoría e historial. También agregaría pruebas automatizadas para las funciones de contexto, autenticación y persistencia, y terminaría los módulos pendientes de reportes y movimientos antes de dejarlo como producto cerrado.",
        "setup_instructions": "Requisitos previos: Docker y Docker Compose.\n\n1. git clone https://github.com/her24770/LLM-proyect1 && cd LLM-proyect1\n2. cp .env.example .env\n3. Editar .env y agregar: OPENAI_API_KEY=tu_api_key\n4. docker compose up --build\n5. Abrir http://localhost:8502\n\nLa base de datos SQLite se crea automáticamente en app/data/users.db y el volumen ./app/data:/app/data conserva usuarios, chats y mensajes entre reinicios.",
        "team_size": 1,
        "team_description": None,
        "role": "Solo dev",
        "technologies": {
            "primary": ["Python", "Streamlit", "OpenAI"],
            "secondary": ["SQLite", "Docker", "Pandas", "Plotly"],
        },
    },

    {
        "title": "ED Discover",
        "slug": "ed-discover",
        "description": "Plataforma de descubrimiento musical que recomienda canciones y amistades a partir de gustos, géneros y patrones de escucha modelados como un grafo.",
        "content": "ED Discover es una aplicación web para explorar música de forma personalizada. El usuario puede registrarse, iniciar sesión, ver sus canciones, reproducir videos asociados desde YouTube y recibir recomendaciones basadas en su historial musical. La app también muestra un perfil de intereses con artistas, géneros, emociones, álbumes y sugerencias de amistad calculadas desde las relaciones del usuario dentro de Neo4j.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": None,
        "repo_urls": [
            "https://github.com/her24770/ED-Discover-FrontEnd",
            "https://github.com/her24770/ED-Discover-BackEnd",
        ],
        "featured": True,
        "order": 4,
        "status": "completed",
        "year": 2026,
        "problem_solved": "Los usuarios necesitaban una forma personalizada de descubrir música y personas con gustos similares usando relaciones reales entre canciones, géneros, artistas y hábitos de escucha.",
        "architecture": "Separé el proyecto en un frontend React con Vite y TypeScript y un backend Express independiente. Elegí Neo4j porque el dominio del proyecto es naturalmente relacional: usuarios escuchan canciones, siguen artistas, sienten emociones, tienen géneros favoritos y se conectan con otros usuarios. La API REST expone endpoints por recurso y concentra las consultas Cypher en controladores, dejando que Neo4j calcule recomendaciones por popularidad, género, época y similitud entre usuarios.",
        "challenges": "Lo más difícil fue modelar el sistema de recomendaciones como un grafo útil y no solo como tablas equivalentes. Tuve que definir nodos y relaciones con pesos, consultar preferencias agregadas con Cypher y transformar los tipos numéricos de Neo4j para que el frontend pudiera mostrarlos correctamente. También resolví la sincronización entre interacción del usuario y recomendaciones incrementando el peso de escucha cada vez que se reproduce una canción.",
        "what_i_learned": "Consolidé el uso de Neo4j y Cypher para resolver problemas donde las relaciones son más importantes que los registros aislados. También practiqué la integración full-stack entre React y Express, el manejo de autenticación básica con bcrypt y la construcción de interfaces basadas en datos reales de una API.",
        "would_do_different": "Si lo construyera de nuevo, separaría la lógica de negocio en servicios o repositorios en lugar de dejarla en los controladores, agregaría JWT para sesiones reales, movería la URL del backend a variables de entorno en el frontend, prepararía seeds y migraciones para Neo4j y dockerizaría todo para levantar el entorno con un solo comando.",
        "setup_instructions": "Requisitos previos: Node.js 20+, npm, Yarn 1.x y Neo4j local o en Aura con datos del proyecto cargados.\n\nBackend:\n1. cd ED-Discover-BackEnd && npm install\n2. Crear .env con NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD\n3. Cargar datos desde archivos Cypher en /querys si la BD está vacía\n4. npm run dev → http://localhost:3000\n\nFrontend:\n1. cd ED-Discover-FrontEnd && yarn install\n2. yarn dev → http://localhost:5173",
        "team_size": 2,
        "team_description": "Trabajé en equipo en un proyecto académico de Estructura de Datos; mi aporte se enfocó en integrar el frontend con el backend, construir endpoints sobre Neo4j y conectar las recomendaciones con la experiencia de usuario.",
        "role": "Full-stack developer",
        "technologies": {
            "primary": ["React", "TypeScript", "Node.js", "Express", "Neo4j"],
            "secondary": ["Material UI", "Vite"],
        },
    },

    {
        "title": "UVG Help",
        "slug": "uvg-help",
        "description": "Panel administrativo y API para centralizar información universitaria de la UVG: lugares, eventos, cursos, profesores, servicios, pagos y contactos en una sola herramienta.",
        "content": "UVG Help es un sistema de información universitaria pensado para que administradores puedan mantener actualizados los datos clave de la Universidad del Valle de Guatemala. El proyecto incluye una API REST con autenticación, validación, documentación automática y persistencia en PostgreSQL, junto con un panel web desde el que se pueden crear, editar, buscar, ordenar, paginar y exportar registros. La idea fue construir una base funcional para consultar y administrar información institucional desde una interfaz simple, sin depender de hojas de cálculo dispersas o procesos manuales.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": "https://uvg.jhgo.online/web/UVHelp",
        "repo_urls": [
            "https://github.com/her24770/web-UVGHelp-frontend",
            "https://github.com/her24770/web-UVGHelp-backend",
        ],
        "featured": True,
        "order": 5,
        "status": "completed",
        "year": 2026,
        "problem_solved": "La información universitaria estaba distribuida y necesitaba una forma centralizada de administrarse y consultarse desde una herramienta web.",
        "architecture": "Separé el proyecto en dos aplicaciones: un backend FastAPI y un frontend administrativo estático en HTML, CSS y JavaScript modular. En el backend usé arquitectura por capas con modelos SQLAlchemy, schemas Pydantic, routers por entidad y servicios reutilizables para CRUD, paginación y respuestas de error. PostgreSQL guarda las entidades principales y Alembic controla las migraciones. El frontend consume la API con fetch y protege las vistas mediante JWT en localStorage. Elegí Docker para que API, base de datos y panel pudieran levantarse de forma reproducible.",
        "challenges": "Lo más retador fue construir sin frameworks las funcionalidades que normalmente resolvería con librerías: tablas, modales, toasts, paginación, búsqueda con debounce, ordenamiento, estado en URL y exportación a CSV sin dependencias externas. En el backend fue importante estandarizar errores, validar inputs con Pydantic, manejar relaciones entre entidades y crear un endpoint de imágenes que validara MIME, extensión y tamaño antes de guardar archivos.",
        "what_i_learned": "Consolidé el uso de FastAPI para crear APIs documentadas automáticamente, aprendí a estructurar mejor un backend con SQLAlchemy y Alembic, y entendí con más profundidad lo que hacen por dentro los frameworks frontend al implementar componentes y manejo de estado con JavaScript puro. También reforcé la importancia de Docker para evitar problemas de entorno y facilitar despliegues.",
        "would_do_different": "Si lo construyera desde cero hoy, usaría React con TypeScript en el frontend para mejorar mantenibilidad y reutilización. También endurecería la seguridad con bcrypt, CORS más restrictivo y permisos por rol más claros. Agregaría pruebas automatizadas para los endpoints principales y centralizaría frontend, backend y base de datos en un único compose de desarrollo.",
        "setup_instructions": "Requisitos previos: Docker y Docker Compose.\n\nBackend:\n1. git clone https://github.com/her24770/web-UVGHelp-backend\n2. cp .env.example .env && cp docker-compose.yml.example docker-compose.yml\n3. Variables: DATABASE_URL, DB_USER, DB_PASSWORD, APP_ENV, APP_PORT, CORS_ORIGINS, JWT_SECRET\n4. docker compose up --build → API en http://localhost:8000, Swagger en /docs\n5. Credenciales: admin@uvg.edu.gt / admin123\n\nFrontend:\n1. git clone https://github.com/her24770/web-UVGHelp-frontend\n2. cp .env.example .env && cp docker-compose.yml.example docker-compose.yml\n3. Variables: API_BASE=http://localhost:8000/api, TOKEN_KEY=uvg_token\n4. docker compose up --build → http://localhost:3000",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack developer",
        "technologies": {
            "primary": ["Python", "FastAPI", "PostgreSQL", "JavaScript"],
            "secondary": ["SQLAlchemy", "Alembic", "Docker", "HTML/CSS"],
        },
    },

    {
        "title": "Iglesia Príncipe de Paz",
        "slug": "iglesia-principe-de-paz",
        "description": "Plataforma web para centralizar la presencia digital de la Iglesia Príncipe de Paz, mostrando eventos, ministerios, sedes, anuncios y recursos para la comunidad.",
        "content": "Construí una plataforma web para la Iglesia Príncipe de Paz en Guatemala con el objetivo de que la congregación tuviera un sitio claro, moderno y administrable. La app muestra información pública como próximos eventos, ministerios, sedes, anuncios, transmisiones en vivo y una promesa bíblica del día. También incluye una base backend para recibir y gestionar peticiones de oración, testimonios, mensajes de contacto, material de estudio y proyectos de misión. La aplicación funciona como una solución full-stack dentro de Next.js, combinando páginas públicas en servidor con rutas API conectadas a PostgreSQL mediante Supabase y Drizzle ORM.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": None,
        "repo_urls": ["https://github.com/her24770/PrincipeDePaz"],
        "featured": False,
        "order": 6,
        "status": "in_progress",
        "year": 2026,
        "problem_solved": "La iglesia necesitaba una plataforma centralizada para comunicar eventos, ministerios, sedes, anuncios y recursos espirituales a su comunidad.",
        "architecture": "Decidí construir el proyecto como una aplicación full-stack con Next.js App Router porque permite mantener el frontend público y las rutas API en un solo código base. Las páginas principales se renderizan como server components para consultar datos directamente, mientras que los endpoints API manejan operaciones de creación y consulta. La base de datos está modelada con Drizzle ORM sobre PostgreSQL/Supabase, lo que me permitió definir tablas, enums y relaciones de forma tipada. Supabase se usa para autenticación, storage de imágenes y conexión a la base de datos, mientras que Docker prepara la app para despliegues reproducibles.",
        "challenges": "El reto principal fue diseñar un modelo de datos suficientemente amplio para cubrir necesidades reales de una iglesia sin sobrecomplicar la primera versión. Tuve que estructurar eventos, anuncios, ministerios, sedes, peticiones, testimonios, material de estudio y proyectos de misión con relaciones claras. También cuidé que las consultas públicas tuvieran filtros útiles, como anuncios activos no expirados y eventos próximos, y que los formularios validaran datos con Zod antes de llegar a la base de datos.",
        "what_i_learned": "Reforcé cómo organizar una app full-stack moderna con Next.js App Router, server components, rutas API y Drizzle ORM en un mismo proyecto. También consolidé el uso de Supabase más allá de la base de datos, especialmente para autenticación SSR y storage público. A nivel de producto aprendí a traducir necesidades no técnicas de una organización en entidades, estados y flujos concretos.",
        "would_do_different": "Si lo empezara desde cero hoy, separaría desde antes las capas de administración y contenido público para evitar que el panel admin quedara como una fase posterior demasiado grande. También agregaría migraciones versionadas desde el inicio, pruebas básicas para los endpoints principales y un sistema más explícito de permisos por rol.",
        "setup_instructions": "Requisitos previos: Node.js 22, npm y un proyecto Supabase con PostgreSQL.\n\n1. npm install\n2. cp .env.local.example .env.local\n3. Configurar: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL, NEXT_PUBLIC_SITE_URL=http://localhost:3000\n4. npm run db:generate && npm run db:push\n5. npm run dev → http://localhost:3000\n\nCon Docker: docker-compose up --build",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack",
        "technologies": {
            "primary": ["Next.js", "React", "TypeScript", "PostgreSQL"],
            "secondary": ["Supabase", "Tailwind CSS", "Docker", "Zod", "Drizzle ORM"],
        },
    },

    {
        "title": "BecaGo UVG",
        "slug": "becago-uvg",
        "description": "Plataforma para que estudiantes becados de UVG encuentren actividades, se inscriban y lleven control de sus horas completadas en un solo lugar.",
        "content": "BecaGo UVG es una aplicación web para gestionar actividades de horas beca. Los estudiantes pueden registrarse, iniciar sesión, ver actividades disponibles, revisar detalles como fecha, ubicación, cupos y horas otorgadas, e inscribirse directamente desde la plataforma. También incluye un perfil de usuario con carrera, contacto e imagen, y un resumen de progreso que calcula horas completadas, horas pendientes y porcentaje de avance cruzando la base de datos con un archivo Excel de horas requeridas por estudiante.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": None,
        "repo_urls": [],
        "featured": False,
        "order": 7,
        "status": "completed",
        "year": 2025,
        "problem_solved": "Los estudiantes becados necesitaban una forma centralizada de encontrar actividades, reservar cupos y dar seguimiento a sus horas de beca.",
        "architecture": "Construí el proyecto como una aplicación monolítica en Django porque el alcance encajaba bien con un backend integrado, autenticación lista para usar, panel de administración y templates renderizados del lado del servidor. La lógica principal vive en una app llamada tasks, con modelos para actividades, inscripciones y perfiles. La relación entre usuarios y actividades se maneja mediante inscripciones, mientras que el progreso se calcula cruzando actividades completadas con un Excel de horas requeridas. La interfaz usa templates Django y Bootstrap, con configuración para servir estáticos con WhiteNoise y desplegar con Gunicorn.",
        "challenges": "Lo más delicado fue controlar las inscripciones sin sobrepasar los cupos disponibles. Para resolverlo usé transaction.atomic y refresh_from_db antes de descontar espacios, reduciendo el riesgo de inconsistencias cuando varios usuarios intentan inscribirse al mismo tiempo. Otro reto fue integrar el cálculo de horas con un Excel externo, porque el sistema debía tolerar usuarios no encontrados o archivos faltantes sin romper la experiencia.",
        "what_i_learned": "Con este proyecto consolidé el uso de Django como framework full-stack: modelos, migraciones, autenticación, templates, formularios, archivos media y panel de administración. También aprendí a conectar datos externos con pandas, generar visualizaciones con Matplotlib dentro de una vista web y preparar una app Django para despliegue usando Gunicorn y WhiteNoise.",
        "would_do_different": "Si lo construyera de nuevo, reemplazaría el Excel por un modelo propio en la base de datos para administrar las horas requeridas de forma más confiable desde el panel admin. También movería SECRET_KEY, DEBUG y ALLOWED_HOSTS a variables de entorno, agregaría pruebas para inscripciones y cálculo de horas, y usaría PostgreSQL si el proyecto fuera a manejar usuarios reales en producción.",
        "setup_instructions": "Requisitos previos: Python 3.11.9+, pip y virtualenv.\n\n1. Clonar el repositorio y entrar a la carpeta del proyecto\n2. python3 -m venv .venv && source .venv/bin/activate\n3. pip install -r requirements.txt\n4. Verificar que exista Horas_Beca.xlsx en la raíz con columnas Usuario y Horas Beca\n5. python manage.py migrate\n6. Opcional: python manage.py createsuperuser para administrar desde /admin/\n7. python manage.py runserver → http://127.0.0.1:8000/",
        "team_size": 1,
        "team_description": None,
        "role": "Solo dev",
        "technologies": {
            "primary": ["Python", "Django", "SQLite"],
            "secondary": ["Bootstrap"],
        },
    },

    {
        "title": "Entérate",
        "slug": "enterate",
        "description": "Plataforma para reportar y consultar fenómenos naturales, accidentes y publicaciones comunitarias en un solo lugar. Combina eventos, comentarios y notificaciones para mantener informada a la población.",
        "content": "Entérate es una aplicación fullstack para comunicar a la población sobre fenómenos, emergencias y accidentes cercanos. El sistema permite registrar usuarios, crear eventos geolocalizados, publicar reportes asociados a esos eventos, comentar publicaciones y consultar notificaciones. Construí una API REST para centralizar la lógica y una interfaz web con PrimeFaces para que el usuario pueda autenticarse, ver eventos, crear publicaciones y participar con comentarios.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": None,
        "repo_urls": [
            "https://github.com/her24770/Enterate-Back-End",
            "https://github.com/her24770/Enterate-Front-End",
        ],
        "featured": False,
        "order": 8,
        "status": "completed",
        "year": 2024,
        "problem_solved": "La población no tenía un canal centralizado para reportar, consultar y comentar emergencias o accidentes cercanos.",
        "architecture": "Separé el proyecto en dos aplicaciones: un backend Spring Boot y un frontend JSF/PrimeFaces. El backend está organizado por capas con controladores REST, servicios para encapsular la lógica, repositorios JPA para el acceso a SQL Server y DTOs para transportar datos entre la API y la interfaz. El frontend consume esos endpoints por HTTP desde beans de JSF y mantiene la sesión del usuario para mostrar eventos, publicaciones y comentarios. Esta estructura me permitió practicar una arquitectura fullstack clásica en Java y reutilizar el backend para varios módulos funcionales.",
        "challenges": "Lo más difícil fue conectar correctamente el frontend JSF con la API REST y mantener consistentes los nombres de campos entre modelos, DTOs, JSON manual y tablas de SQL Server. También implicó manejar fechas en formato ISO, mapear respuestas JSON con Jackson y coordinar entidades relacionadas como publicaciones, eventos, usuarios y comentarios. Resolverlo me obligó a ordenar mejor las capas y estandarizar las respuestas del backend con un objeto común.",
        "what_i_learned": "Aprendí a construir una aplicación Java de extremo a extremo usando Spring Boot, JPA, SQL Server y PrimeFaces. También consolidé conceptos de APIs REST, separación por capas, consumo HTTP desde una interfaz JSF, manejo de sesiones, serialización JSON y modelado de relaciones básicas entre entidades.",
        "would_do_different": "Si lo construyera desde cero, usaría variables de entorno reales en lugar de credenciales fijas, agregaría migraciones con Flyway, centralizaría el cliente HTTP del frontend para no repetir lógica, mejoraría la autenticación con JWT y agregaría Docker para levantar backend, frontend y base de datos con un solo comando.",
        "setup_instructions": "Requisitos previos: JDK 17, Maven, SQL Server local y servidor Jakarta EE para WAR frontend.\n\n1. Crear BD SQL Server enterateBD y ejecutar el script en Enterate-Back-End/SQL/.\n2. Verificar credenciales en pom.xml: URL jdbc:sqlserver://localhost:1433;databaseName=enterateBD, usuario sa, contraseña admin, puerto 9001.\n3. cd Enterate-Back-End && ./mvnw spring-boot:run -Pdev → API en http://localhost:9001/enterate, Swagger en .../swagger-ui.html\n4. cd Enterate-Front-End && mvn clean package\n5. Desplegar WAR en target/ en el servidor de aplicaciones.",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack",
        "technologies": {
            "primary": ["Java", "Spring Boot", "PrimeFaces", "SQL Server"],
            "secondary": ["Maven"],
        },
    },

    {
        "title": "Cash U Control",
        "slug": "cash-u-control",
        "description": "Aplicación web para llevar control de ingresos personales, consultar historial financiero y gestionar el perfil de usuario desde un dashboard sencillo.",
        "content": "Cash U Control es una aplicación fullstack orientada al control financiero personal. Construí un frontend en React con una interfaz tipo dashboard para login, registro, perfil de usuario e historial de ingresos, conectado a una API REST en Flask. El backend maneja autenticación con JWT, contraseñas encriptadas, permisos por rol y persistencia en MongoDB. La base del sistema permite registrar ingresos, actualizar el saldo activo del usuario y consultar movimientos; además, deja estructurados módulos futuros para egresos, metas, recompensas y consejos financieros.",
        "thumbnail_url": None,
        "images": [],
        "video_url": None,
        "category": "fullstack",
        "demo_url": None,
        "repo_urls": [],
        "featured": False,
        "order": 9,
        "status": "in_progress",
        "year": 2024,
        "problem_solved": "Los usuarios necesitaban una forma simple de registrar ingresos y consultar su historial financiero sin depender de hojas de cálculo manuales.",
        "architecture": "Separé el proyecto en un frontend React y una API REST en Flask. En el frontend usé React Router para organizar vistas dentro de un layout de dashboard y Axios para consumir el backend. En la API estructuré el código por rutas, controladores y configuración, usando Blueprints de Flask para separar módulos como usuarios, ingresos, egresos, metas y recompensas. MongoDB fue una buena opción para iterar rápido con documentos flexibles, mientras que JWT y bcrypt resolvieron autenticación y almacenamiento seguro de contraseñas.",
        "challenges": "Lo más retador fue conectar correctamente autenticación, autorización y datos de usuario entre frontend y backend. Tuve que manejar tokens JWT, validar acciones según rol o propietario del recurso, convertir ObjectId de MongoDB y mantener sincronizado el saldo del usuario cuando se registraba un ingreso. También aprendí que el alcance del proyecto podía crecer rápido: varios módulos quedaron estructurados, pero no todos llegaron al mismo nivel de implementación.",
        "what_i_learned": "Aprendí a construir una aplicación fullstack completa conectando React con una API Flask, a proteger endpoints con JWT, a trabajar con MongoDB desde PyMongo y a pensar mejor en permisos por usuario. También consolidé la importancia de definir primero el contrato de la API para que el frontend no dependa de endpoints incompletos.",
        "would_do_different": "Si lo construyera de nuevo, definiría desde el inicio un contrato claro para todos los módulos, agregaría variables de entorno para la URL del API en el frontend y usaría Docker Compose para levantar Flask y MongoDB juntos. También completaría los CRUD de egresos, metas y recompensas antes de construir sus pantallas y centralizaría Axios con interceptores para enviar el token automáticamente.",
        "setup_instructions": "Requisitos previos: Node.js, npm, Python 3 y MongoDB local o en Atlas.\n\nBackend:\n1. cd CashUControl-Back-End/Back-End\n2. python -m venv venv && source venv/bin/activate\n3. pip install Flask PyJWT python-dotenv flask-pymongo pymongo bcrypt flask-cors\n4. Crear .env con MONGO_URI y SECRET\n5. python src/app.py → http://localhost:5000\n\nFrontend:\n1. cd CashUControl-FrontEnd/Front-End && npm install\n2. npm run start → http://localhost:3000",
        "team_size": 1,
        "team_description": None,
        "role": "Full-stack",
        "technologies": {
            "primary": ["React", "Flask", "Python", "MongoDB"],
            "secondary": ["JavaScript", "Bootstrap"],
        },
    },

    # ── Agrega más proyectos aquí siguiendo el mismo formato ─────────────────
]


# =============================================================================
# NO EDITES DEBAJO DE ESTA LÍNEA
# =============================================================================

def upgrade() -> None:
    conn = op.get_bind()

    # 1. Insertar tecnologías extra que falten
    for name, icon, category in EXTRA_TECHNOLOGIES:
        conn.execute(
            text("""
                INSERT INTO technologies (id, name, icon, category)
                VALUES (gen_random_uuid(), :name, :icon, :category)
                ON CONFLICT (name) DO NOTHING
            """),
            {"name": name, "icon": icon, "category": category},
        )

    # 2. Insertar proyectos y vincular tecnologías
    for project in PROJECTS:
        result = conn.execute(
            text("""
                INSERT INTO projects (
                    id, title, slug, description, content,
                    thumbnail_url, images, video_url, category,
                    demo_url, repo_urls, featured, "order", status, year,
                    problem_solved, architecture, challenges,
                    what_i_learned, would_do_different, setup_instructions,
                    team_size, team_description, role
                ) VALUES (
                    gen_random_uuid(), :title, :slug, :description, :content,
                    :thumbnail_url, CAST(:images AS JSONB), :video_url, :category,
                    :demo_url, CAST(:repo_urls AS JSONB), :featured, :order, :status, :year,
                    :problem_solved, :architecture, :challenges,
                    :what_i_learned, :would_do_different, :setup_instructions,
                    :team_size, :team_description, :role
                )
                ON CONFLICT (slug) DO NOTHING
                RETURNING id
            """),
            {
                "title":              project["title"],
                "slug":               project["slug"],
                "description":        project.get("description"),
                "content":            project.get("content"),
                "thumbnail_url":      project.get("thumbnail_url"),
                "images":             json.dumps(project.get("images", [])),
                "video_url":          project.get("video_url"),
                "category":           project.get("category"),
                "demo_url":           project.get("demo_url"),
                "repo_urls":          json.dumps(project.get("repo_urls", [])),
                "featured":           project.get("featured", False),
                "order":              project.get("order", 0),
                "status":             project.get("status", "completed"),
                "year":               project.get("year"),
                "problem_solved":     project.get("problem_solved"),
                "architecture":       project.get("architecture"),
                "challenges":         project.get("challenges"),
                "what_i_learned":     project.get("what_i_learned"),
                "would_do_different": project.get("would_do_different"),
                "setup_instructions": project.get("setup_instructions"),
                "team_size":          project.get("team_size"),
                "team_description":   project.get("team_description"),
                "role":               project.get("role"),
            },
        )

        row = result.fetchone()
        if not row:
            continue
        project_id = str(row[0])

        techs = project.get("technologies", {})
        for tech_name in techs.get("primary", []):
            conn.execute(
                text("""
                    INSERT INTO project_technologies (project_id, technology_id, importance)
                    SELECT :project_id, id, 'primary'
                    FROM technologies WHERE name = :name
                    ON CONFLICT DO NOTHING
                """),
                {"project_id": project_id, "name": tech_name},
            )
        for tech_name in techs.get("secondary", []):
            conn.execute(
                text("""
                    INSERT INTO project_technologies (project_id, technology_id, importance)
                    SELECT :project_id, id, 'secondary'
                    FROM technologies WHERE name = :name
                    ON CONFLICT DO NOTHING
                """),
                {"project_id": project_id, "name": tech_name},
            )


def downgrade() -> None:
    conn = op.get_bind()
    slugs = [p["slug"] for p in PROJECTS]
    conn.execute(
        text("DELETE FROM projects WHERE slug = ANY(:slugs)"),
        {"slugs": slugs},
    )
