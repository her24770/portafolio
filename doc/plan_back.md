# Prompt — Construcción del Backend del Portafolio Personal

## Contexto

Estoy construyendo mi portafolio personal como desarrollador full-stack. El frontend ya existe en la raíz del repo. Tu tarea es crear toda la estructura del backend dentro de una carpeta `/backend`. **No toques nada de los archivos existentes en la raíz.**

---

## Convenciones obligatorias

- Archivos Python: `snake_case` → `project_service.py`
- Carpetas: `kebab-case` → `portfolio-backend/`
- Variables Python: `snake_case` → `project_id`
- Constantes: `UPPER_SNAKE_CASE` → `MAX_RESULTS`
- Clases Python: `PascalCase` → `ProjectService`
- Un archivo, una responsabilidad
- Nunca hardcodear valores — todo va en variables de entorno
- Siempre validar en el servidor
- Cada función hace una sola cosa

### Formato de error estándar (siempre este formato, sin excepción)
```json
{
  "error": true,
  "code": "NOT_FOUND",
  "message": "El proyecto con slug 'uvghelp' no existe"
}
```

### Códigos HTTP
- GET exitoso → 200
- POST exitoso → 201
- DELETE exitoso → 204
- No encontrado → 404
- Input inválido → 400
- Error del servidor → 500

---

## Stack

- Python 3.11+
- FastAPI
- SQLAlchemy 2.x
- Alembic (migraciones)
- PostgreSQL 15+
- Anthropic SDK (para el chat con IA)
- Pydantic v2
- Docker + Docker Compose

---

## Estructura de carpetas a crear

```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   ├── project.py
│   │   └── contact_message.py
│   ├── schemas/
│   │   ├── project.py
│   │   └── contact_message.py
│   ├── routers/
│   │   ├── projects.py
│   │   ├── contact.py
│   │   └── chat.py
│   └── services/
│       ├── project_service.py
│       ├── contact_service.py
│       └── chat_service.py
├── migrations/
│   └── versions/
│       └── 001_crear_tablas_iniciales.py
├── about-me.md
├── .env
├── .env.example
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

---

## Base de Datos

### Tabla `projects`
```
id              UUID PK DEFAULT gen_random_uuid()
title           VARCHAR NOT NULL
slug            VARCHAR UNIQUE NOT NULL        -- versión URL del título, ej: "uvghelp"
description     TEXT                           -- texto corto para cards (2-3 líneas)
content         TEXT                           -- explicación completa para vista detallada
thumbnail_url   VARCHAR                        -- imagen principal de la card
images          JSONB DEFAULT '[]'             -- array de URLs de screenshots
tech_stack      JSONB DEFAULT '[]'             -- array de strings, ej: ["React", "FastAPI"]
category        VARCHAR                        -- "ai", "fullstack", "backend", "frontend"
demo_url        VARCHAR                        -- link al proyecto en vivo
repo_url        VARCHAR                        -- link al repositorio GitHub
featured        BOOLEAN DEFAULT false          -- true = aparece en home
order           INTEGER DEFAULT 0             -- posición en la lista
status          VARCHAR DEFAULT 'completed'   -- "completed" o "in_progress"
created_at      TIMESTAMP DEFAULT now()
```

### Tabla `contact_messages`
```
id              UUID PK DEFAULT gen_random_uuid()
name            VARCHAR NOT NULL
email           VARCHAR NOT NULL
message         TEXT NOT NULL
read            BOOLEAN DEFAULT false
created_at      TIMESTAMP DEFAULT now()
```

---

## Endpoints

### Proyectos

**GET /api/projects**
- Lista todos los proyectos
- Query params opcionales:
  - `featured=true` → solo proyectos destacados (para el home)
  - `category=ai` → filtrar por categoría
- Ordenados por `order` ASC
- Respuesta: array de proyectos

**GET /api/projects/:slug**
- Detalle de un proyecto por su slug
- Si no existe → 404 con formato de error estándar

### Contacto

**POST /api/contact**
- Body: `{ name, email, message }`
- Valida que ningún campo esté vacío
- Guarda en BD
- Respuesta 201: `{ "success": true, "message": "Mensaje recibido" }`

### Chat con IA

**POST /api/chat**
- Body: `{ "message": "..." }`
- Lógica:
  1. Lee el archivo `about-me.md` como contexto base
  2. Consulta la BD y obtiene todos los proyectos (id, title, slug, description, tech_stack, category, demo_url, status)
  3. Construye un contexto combinado con esa información
  4. Llama a Anthropic API con estas herramientas (function calling / tools):
     - `get_all_projects()` → devuelve lista completa de proyectos
     - `get_project_by_slug(slug: str)` → devuelve detalle de un proyecto específico
     - `get_contact_info()` → devuelve email, LinkedIn, GitHub desde el about-me.md
  5. La IA decide qué herramienta usar según la pregunta
  6. Devuelve la respuesta final
- Respuesta: `{ "response": "..." }`
- Modelo: `claude-sonnet-4-20250514`
- La API key nunca se expone al frontend

---

## Variables de entorno

### `.env.example`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
ANTHROPIC_API_KEY=sk-ant-...
APP_PORT=8000
APP_ENV=development
CORS_ORIGINS=http://localhost:5173
```

---

## Docker

### `docker-compose.yml`
Servicios:
- `portfolio-backend` — la API FastAPI
- `portfolio-db` — PostgreSQL 15

Reglas:
- Nunca hardcodear valores en docker-compose.yml
- Usar siempre `env_file: .env`
- Nombres de servicios con prefijo `portfolio-`

### Puertos — regla crítica
Solo el backend expone un puerto al exterior para que el frontend pueda consumir la API. La base de datos NO expone ningún puerto al exterior, solo es accesible internamente dentro de la red Docker.

```yaml
services:
  portfolio-backend:
    ports:
      - "${APP_PORT}:8000"   # expuesto al exterior para el frontend

  portfolio-db:
    # sin "ports" — solo accesible internamente
    expose:
      - "5432"               # visible solo dentro de la red Docker
```

Todos los servicios deben estar en la misma red Docker interna:
```yaml
networks:
  portfolio-network:
    driver: bridge
```

### Migraciones automáticas al levantar Docker
El backend debe ejecutar las migraciones de Alembic automáticamente antes de iniciar el servidor. Configurar el `Dockerfile` o el `entrypoint` para que haga:

```bash
alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000
```

El servicio `portfolio-backend` debe depender de `portfolio-db` con healthcheck para asegurarse de que PostgreSQL esté listo antes de correr las migraciones:

```yaml
depends_on:
  portfolio-db:
    condition: service_healthy
```

Y `portfolio-db` debe tener su healthcheck configurado:
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
  interval: 5s
  timeout: 5s
  retries: 5
```

---

## `about-me.md`

Crear el archivo con esta estructura base (yo lo llenaré con mi información real):

```markdown
# Sobre mí

**Nombre:** [tu nombre]
**Rol:** Full-Stack Developer
**Ubicación:** Guatemala
**Disponibilidad:** Disponible para trabajo
**Email:** [tu email]
**LinkedIn:** [tu LinkedIn]
**GitHub:** [tu GitHub]

## Bio

[párrafo de presentación]

## Stack principal

[lista de tecnologías]

## Fortalezas

[lista de fortalezas]

## Formación

[universidad, carrera, año]
```

---

## Notas finales

- CORS configurado para aceptar el origen del frontend en desarrollo y producción
- Swagger automático disponible en `/docs`
- Todas las migraciones con nombres descriptivos: `001_crear_tablas_iniciales.py`
- El `requirements.txt` debe incluir todas las dependencias con versiones fijas
- El `Dockerfile` del backend debe usar Python 3.11-slim como imagen base