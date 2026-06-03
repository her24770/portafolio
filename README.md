# Portafolio — Josue Hernández

Portafolio personal full stack con panel de administración de proyectos, integración con IA y almacenamiento en la nube. El frontend es una SPA con animaciones fluidas; el backend expone una API REST que alimenta todo el contenido dinámico.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, Vite 8, Framer Motion, React Router 7, Tailwind CSS 4 |
| Backend | FastAPI, Uvicorn (ASGI), SQLAlchemy 2, Alembic |
| Base de datos | PostgreSQL 15 |
| Almacenamiento | Cloudflare R2 (compatible S3) via boto3 |
| IA | OpenAI SDK |
| Infraestructura | Docker, Docker Compose, Nginx |

---

## Estructura del proyecto

```
portafolio/
├── frontend/                     # SPA — React + Vite
│   ├── public/assets/            # Estáticos (foto, CV PDF)
│   ├── src/
│   │   ├── components/           # Componentes compartidos
│   │   │   ├── Hero.jsx          # Panel izquierdo persistente (home/about)
│   │   │   ├── MainLayout.jsx    # Layout raíz con Outlet de React Router
│   │   │   ├── Navbar.jsx
│   │   │   └── Icon.jsx
│   │   ├── pages/
│   │   │   ├── about/            # Página About (secciones independientes)
│   │   │   │   ├── AboutContent.jsx
│   │   │   │   └── sections/     # Intro, TechStack, Trayectoria, Formacion, Ficha
│   │   │   └── projects/         # Galería de proyectos + detalle
│   │   │       ├── ProjectsPage.jsx
│   │   │       └── detail/       # ProjectDetail, VideoPlayer, Reveal, etc.
│   │   ├── sections/             # Secciones del home (About, Stack, Projects…)
│   │   ├── services/api.js       # Cliente fetch (fetchProjects, fetchStack…)
│   │   ├── contexts/             # ThemeContext (dark/light)
│   │   ├── hooks/useIsMobile.js
│   │   └── index.css             # Design tokens + todas las clases CSS
│   ├── Dockerfile                # Node 20 (build) → Nginx Alpine (serve)
│   ├── nginx.conf                # SPA fallback + proxy
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
│   │   └── services/             # Lógica de negocio, OpenAI, R2
│   ├── migrations/               # Alembic — versiones de BD
│   ├── about/                    # Contenido markdown (bio, skills, etc.)
│   ├── Dockerfile                # Python 3.11 slim
│   ├── entrypoint.sh             # alembic upgrade head → uvicorn
│   ├── requirements.txt
│   └── alembic.ini
│
├── docker-compose.yml            # Orquestación de los 3 servicios
├── .env.example                  # Plantilla de variables de entorno
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
# Puertos expuestos
FRONTEND_PORT=5173
APP_PORT=8000

# Base de datos
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=portfolio_pass
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://portfolio_user:portfolio_pass@portfolio-db:5432/portfolio_db

# Frontend (URL del backend accesible desde el navegador)
VITE_API_URL=http://localhost:8000

# OpenAI
OPENAI_API_KEY=sk-...

# Cloudflare R2 (almacenamiento de imágenes)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxx.r2.dev

# App
APP_ENV=production
CORS_ORIGINS=http://localhost:5173
```

> **Nota:** `VITE_API_URL` se inyecta en el build del frontend como `build arg` de Docker. Si cambias el puerto del backend debes reconstruir la imagen del frontend.

---

## Levantar con Docker (recomendado)

```bash
# Primera vez o tras cambios en código/dependencias
docker compose up -d --build

# Siguientes arranques
docker compose up -d
```

Las migraciones de base de datos se ejecutan automáticamente al iniciar el backend (`entrypoint.sh`).

| Servicio | URL local |
|----------|-----------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |

### Comandos útiles

```bash
# Ver logs en tiempo real
docker compose logs -f backend
docker compose logs -f frontend

# Reiniciar un servicio
docker compose restart backend

# Detener todo
docker compose down

# Detener y borrar volúmenes (borra la BD)
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

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar el build de producción |
| `npm run lint` | Ejecutar ESLint |

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Requiere PostgreSQL corriendo localmente y DATABASE_URL configurada
alembic upgrade head           # Aplicar migraciones
uvicorn app.main:app --reload  # http://localhost:8000
```

---

## API — Endpoints principales

### Proyectos
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Lista todos los proyectos |
| `GET` | `/api/projects/featured` | Solo proyectos destacados |
| `GET` | `/api/projects/{slug}` | Detalle de un proyecto |

### Stack / Tecnologías
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/stack` | Tecnologías del portafolio |

### Contacto
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/contact` | Enviar mensaje de contacto |

### Chat IA
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/chat` | Chat con integración OpenAI |

### Upload
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/upload` | Subir archivos a Cloudflare R2 |

La documentación interactiva completa está en `/docs` (Swagger) y `/redoc`.

---

## Rutas del frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Home — About, Stack, Proyectos, Contacto |
| `/about` | About — Intro, Stack, Trayectoria, Formación, Ficha/Contacto |
| `/projects` | Galería de proyectos con rueda 3D interactiva |
| `/projects/:slug` | Detalle de proyecto — video, galería, stack, arquitectura |

Home y About comparten el mismo `MainLayout`: Hero persistente en la izquierda, contenido dinámico en la derecha vía React Router `<Outlet />`. Al navegar entre rutas el Hero no se remonta, evitando flashes de transición.

---

## Decisiones de arquitectura

**Layout persistente con nested routes**
`MainLayout` envuelve `/` y `/about` como rutas anidadas. El `Hero` permanece montado al navegar entre Home y About; solo el `<Outlet />` cambia. Esto mantiene el estado de animación y evita re-renders innecesarios.

**Scroll container propio**
El panel derecho tiene `overflow-y: auto` independiente del documento. Los `IntersectionObserver` y las animaciones de Framer Motion reciben ese elemento como `root`, lo que permite que los `whileInView` funcionen correctamente dentro de un contenedor fijo.

**Build del frontend en dos etapas**
Node 20 compila el bundle; Nginx Alpine lo sirve. `VITE_API_URL` se inyecta como `build arg` de Docker, por lo que el valor queda embebido en el JS final sin exponer variables en runtime.

**Migraciones automáticas en arranque**
`entrypoint.sh` ejecuta `alembic upgrade head` antes de levantar Uvicorn, garantizando que la base de datos esté siempre sincronizada con el código.

**PostgreSQL solo en red interna**
La base de datos no expone puertos al host. Solo backend y frontend se comunican a través de `portfolio-network`; la DB es inaccesible desde fuera del entorno Docker.

---

## Variables de entorno — referencia

| Variable | Requerida | Descripción |
|----------|:---------:|-------------|
| `FRONTEND_PORT` | ✓ | Puerto host para el frontend |
| `APP_PORT` | ✓ | Puerto host para la API |
| `POSTGRES_USER` | ✓ | Usuario de PostgreSQL |
| `POSTGRES_PASSWORD` | ✓ | Contraseña de PostgreSQL |
| `POSTGRES_DB` | ✓ | Nombre de la base de datos |
| `DATABASE_URL` | ✓ | URL de conexión SQLAlchemy |
| `VITE_API_URL` | ✓ | URL del backend visible desde el navegador |
| `OPENAI_API_KEY` | ✓ | API key de OpenAI |
| `APP_ENV` | — | `development` / `production` (default: `production`) |
| `CORS_ORIGINS` | ✓ | Orígenes permitidos separados por coma |
| `R2_ACCOUNT_ID` | * | Cloudflare R2 account ID |
| `R2_ACCESS_KEY_ID` | * | R2 access key |
| `R2_SECRET_ACCESS_KEY` | * | R2 secret key |
| `R2_BUCKET_NAME` | * | Nombre del bucket R2 |
| `R2_PUBLIC_URL` | * | URL pública del bucket R2 |

\* Requeridas solo si se usa la subida de archivos.

---

## Autor

**Josue Hernández González**
[josuehernandez.fjbg@gmail.com](mailto:josuehernandez.fjbg@gmail.com) · [LinkedIn](https://linkedin.com/in/josue-hernandez-gonzalez) · Ciudad de Guatemala
