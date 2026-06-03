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
]


# =============================================================================
# PROYECTOS
# Agrega un dict por proyecto. Copia el bloque de SWAP y edita los valores.
#
# Campo "technologies":
#   - primary:   las tecnologías principales del stack (las que aparecen en la card)
#   - secondary: dependencias de apoyo, herramientas, librerías
#
# Los nombres deben coincidir exactamente con los del catálogo (migración 002)
# o con los que agregues en EXTRA_TECHNOLOGIES arriba.
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
