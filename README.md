# Portafolio — Josue Hernández

Portafolio personal fullstack con chat IA, notificaciones por correo, panel de proyectos y almacenamiento en la nube. El frontend es una SPA con animaciones fluidas; el backend expone una API REST que alimenta todo el contenido dinámico.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, Vite 8, Framer Motion, React Router 7, Tailwind CSS 4 |
| Backend | FastAPI, Uvicorn (ASGI), SQLAlchemy 2, Alembic |
| Base de datos | PostgreSQL 15 |
| Almacenamiento | Cloudflare R2 (compatible S3) via boto3 |
| IA | OpenAI GPT-4o-mini con tool calling |
| Email | Gmail SMTP con App Password |
| Infraestructura | Docker, Docker Compose, Nginx |

---

## Estructura del proyecto

```
portafolio/
├── frontend/                     # SPA — React + Vite
│   ├── public/assets/            # Estáticos (foto, CV PDF, logos)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx          # Panel izquierdo persistente (home/about)
│   │   │   ├── MainLayout.jsx    # Layout raíz con Outlet de React Router
│   │   │   └── ChatWidget.jsx    # Widget flotante del chat IA
│   │   ├── pages/
│   │   │   ├── about/            # Página About
│   │   │   │   ├── AboutContent.jsx
│   │   │   │   └── sections/     # Intro, Formacion, Fortalezas, Trayectoria, TechStack, Ficha
│   │   │   └── projects/         # Galería de proyectos + detalle
│   │   ├── sections/             # Secciones del home (Stack, Projects, Contacto…)
│   │   ├── services/api.js       # Cliente fetch (fetchProjects, fetchStack, sendChat…)
│   │   ├── contexts/             # ThemeContext (dark/light)
│   │   ├── hooks/useIsMobile.js
│   │   └── index.css             # Design tokens + todas las clases CSS
│   ├── Dockerfile                # Node 20 (build) → Nginx Alpine (serve)
│   ├── nginx.conf
│   └── vite.config.js
│
├── backend/                      # API REST — FastAPI
│   ├── app/
│   │   ├── main.py               # Punto de entrada, CORS, routers
│   │   ├── config.py             # Settings via pydantic-settings
│   │   ├── database.py           # SQLAlchemy engine + sesión
│   │   ├── models/               # ORM: Project, Technology, ContactMessage
│   │   ├── schemas/              # Pydantic request/response
│   │   ├── routers/              # projects, technologies, contact, upload, chat
│   │   └── services/
│   │       ├── chat_service.py   # GPT-4o-mini con tool calling + archivos about/
│   │       ├── email_service.py  # Notificaciones Gmail SMTP
│   │       ├── project_service.py
│   │       └── upload_service.py
│   ├── migrations/               # Alembic — versiones de BD + seed
│   ├── about/                    # Markdown con contexto del desarrollador
│   │   ├── bio.md
│   │   ├── skills.md
│   │   ├── experience.md
│   │   ├── education.md
│   │   ├── services.md
│   │   └── values.md
│   ├── Dockerfile
│   ├── entrypoint.sh             # alembic upgrade head → uvicorn
│   ├── requirements.txt
│   └── alembic.ini
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Prerrequisitos

- **Docker** ≥ 24 y **Docker Compose** ≥ 2.20
- **Node.js** ≥ 20 (solo para desarrollo frontend sin Docker)
- **Python** ≥ 3.11 (solo para desarrollo backend sin Docker)

---

## Configuración inicial

### 1. Clonar y configurar variables de entorno

```bash
git clone <repo-url>
cd portafolio
cp .env.example .env
```

Editar `.env` con los valores reales:

```env
# Puertos expuestos al host
FRONTEND_PORT=5173
APP_PORT=8000

# Base de datos
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=portfolio_pass
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://portfolio_user:portfolio_pass@portfolio-db:5432/portfolio_db

# Frontend — URL del backend accesible desde el navegador del visitante
# Mismo dominio con /api/: dejar vacío. Dominio separado: poner la URL completa.
VITE_API_URL=http://localhost:8000

# OpenAI — requerido para el chat IA
OPENAI_API_KEY=sk-...

# Gmail — requerido para notificaciones del formulario de contacto
# Crear App Password en: myaccount.google.com/apppasswords
GMAIL_USER=tucorreo@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_TO=correo-donde-recibes@gmail.com   # puede ser diferente a GMAIL_USER

# Cloudflare R2 — requerido solo para subida de imágenes
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxx.r2.dev

# App
APP_ENV=production
CORS_ORIGINS=http://localhost:5173
```

---

## Levantar con Docker (recomendado)

```bash
# Primera vez o tras cambios en código/dependencias
docker compose up -d --build

# Siguientes arranques
docker compose up -d
```

Las migraciones y el seed de datos se ejecutan automáticamente al iniciar el backend.

| Servicio | URL local |
|----------|-----------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |

### Comandos útiles

```bash
# Logs en tiempo real
docker compose logs -f portfolio-backend
docker compose logs -f portfolio-frontend

# Reconstruir un servicio tras cambios en código
docker compose build portfolio-backend
docker compose up -d portfolio-backend

# IMPORTANTE: VITE_API_URL se embebe en el build.
# Si cambias esa variable, reconstruir el frontend:
docker compose build portfolio-frontend
docker compose up -d portfolio-frontend

# Detener todo
docker compose down

# Borrar la BD (vuelve a crearse con seed al levantar)
docker compose down -v
```

---

## Desarrollo local (sin Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5174 con HMR
```

El dev server lee `VITE_API_URL` del `.env` en tiempo de ejecución — no requiere rebuild para cambiar el backend apuntado.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

alembic upgrade head           # aplica migraciones y seed
uvicorn app.main:app --reload  # http://localhost:8000
```

---

## Chat IA

El widget de chat (`ChatWidget.jsx`) conecta con el endpoint `POST /api/chat`. El backend usa GPT-4o-mini con **tool calling**: el modelo decide qué información necesita y llama las herramientas relevantes en lugar de cargar todo el contexto de una vez.

### Herramientas disponibles

| Tool | Fuente | Se activa cuando preguntan… |
|------|--------|-----------------------------|
| `get_bio` | `about/bio.md` | quién es Josue, contacto, presentación |
| `get_skills` | `about/skills.md` | tecnologías, perfil técnico |
| `get_experience` | `about/experience.md` | experiencia laboral, prácticas |
| `get_education` | `about/education.md` | universidad, formación |
| `get_services` | `about/services.md` | freelance, disponibilidad, contratación |
| `get_values` | `about/values.md` | forma de trabajar, valores |
| `get_all_projects` | BD | lista de proyectos |
| `get_project_by_slug` | BD | detalle de un proyecto específico |

Los archivos `about/*.md` se leen en tiempo de ejecución — editarlos no requiere rebuild del contenedor.

### Requisito

`OPENAI_API_KEY` debe estar configurada en el `.env`. Sin ella el endpoint devuelve 500.

---

## Notificaciones de contacto por correo

Cuando alguien envía un mensaje por el formulario de contacto, el backend guarda el mensaje en la BD **y** envía una notificación por Gmail al correo configurado en `GMAIL_TO`.

### Configuración

1. Crear un **App Password** en la cuenta de Google que enviará los correos:
   `myaccount.google.com/apppasswords`
2. Configurar en `.env`:
   ```env
   GMAIL_USER=cuenta-que-envia@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   GMAIL_TO=donde-quieres-recibirlos@gmail.com
   ```

`GMAIL_TO` puede ser distinto a `GMAIL_USER` — el correo de envío y el de recepción son independientes. Si no se configuran estas variables el formulario sigue funcionando (guarda en BD) pero no envía notificación.

El correo recibido tiene `Reply-To` apuntando al email del remitente, así puedes responder directamente desde tu cliente de correo.

---

## API — Endpoints

### Proyectos
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Lista todos los proyectos |
| `GET` | `/api/projects/featured` | Solo proyectos destacados |
| `GET` | `/api/projects/{slug}` | Detalle de un proyecto |

### Tecnologías
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/technologies/stack` | Tecnologías del stack personal |

### Contacto
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/contact` | Enviar mensaje (guarda en BD + email) |

### Chat IA
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/chat` | Chat con GPT-4o-mini, acepta historial |

Body esperado:
```json
{
  "message": "¿qué proyectos tiene Josue?",
  "history": [
    { "role": "user", "text": "hola" },
    { "role": "ai", "text": "Hola, ¿en qué puedo ayudarte?" }
  ]
}
```

### Upload
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/upload` | Subir archivos a Cloudflare R2 |

Documentación interactiva completa en `/docs` (Swagger) y `/redoc`.

---

## Rutas del frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Home — Hero, Stack, Proyectos, Contacto |
| `/about` | Sobre mí, Formación, Fortalezas, Trayectoria, Stack, Contacto |
| `/projects` | Galería de proyectos |
| `/projects/:slug` | Detalle de proyecto |

---

## Decisiones de arquitectura

**Layout persistente con nested routes**
`MainLayout` envuelve `/` y `/about`. El `Hero` permanece montado al navegar entre ambas rutas; solo el `<Outlet />` cambia. Evita re-renders y mantiene el estado de animación.

**VITE_API_URL como build arg**
La URL del backend se inyecta en el build del frontend como argumento de Docker. El valor queda embebido en el JS final. En producción con mismo dominio y nginx enrutando `/api/`, se deja vacío para que las llamadas sean rutas relativas.

**Chat con tool calling en lugar de contexto masivo**
El sistema prompt no incluye toda la información del desarrollador. El modelo llama herramientas específicas según la pregunta, manteniendo el contexto de la conversación sin disparar el costo de tokens.

**Seed en migraciones**
La migración `003_seed_data.py` inserta los proyectos y tecnologías iniciales. Al borrar la BD y levantar de nuevo, `alembic upgrade head` restaura todo el contenido automáticamente.

**Migraciones automáticas en arranque**
`entrypoint.sh` ejecuta `alembic upgrade head` antes de levantar Uvicorn, garantizando que la base de datos esté siempre sincronizada con el código al hacer deploy.

---

## Variables de entorno — referencia completa

| Variable | Requerida | Descripción |
|----------|:---------:|-------------|
| `FRONTEND_PORT` | ✓ | Puerto host para el frontend |
| `APP_PORT` | ✓ | Puerto host para la API |
| `POSTGRES_USER` | ✓ | Usuario de PostgreSQL |
| `POSTGRES_PASSWORD` | ✓ | Contraseña de PostgreSQL |
| `POSTGRES_DB` | ✓ | Nombre de la base de datos |
| `DATABASE_URL` | ✓ | URL de conexión SQLAlchemy |
| `VITE_API_URL` | ✓ | URL del backend visible desde el navegador (vacío = mismo dominio) |
| `OPENAI_API_KEY` | ✓ | API key de OpenAI — requerida para el chat |
| `GMAIL_USER` | — | Cuenta Gmail que envía las notificaciones |
| `GMAIL_APP_PASSWORD` | — | App Password de Google (no la contraseña normal) |
| `GMAIL_TO` | — | Correo que recibe las notificaciones (puede diferir de GMAIL_USER) |
| `APP_ENV` | — | `development` / `production` (default: `production`) |
| `CORS_ORIGINS` | ✓ | Orígenes permitidos separados por coma |
| `R2_ACCOUNT_ID` | * | Cloudflare R2 account ID |
| `R2_ACCESS_KEY_ID` | * | R2 access key |
| `R2_SECRET_ACCESS_KEY` | * | R2 secret key |
| `R2_BUCKET_NAME` | * | Nombre del bucket R2 |
| `R2_PUBLIC_URL` | * | URL pública del bucket R2 |

\* Requeridas solo si se usa la subida de archivos a R2.

---

## Autor

**Josue Hernández González**
[jhosues910hergo@gmail.com](mailto:jhosues910hergo@gmail.com) · [LinkedIn](https://linkedin.com/in/josue-hernandez-gonzalez) · Guatemala
