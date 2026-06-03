"""agregar tabla tecnologias

Revision ID: 002
Revises: 001
Create Date: 2024-01-01 00:00:01.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# (name, icon, category, my_stack, level)
# level: "Avanzado" | "Intermedio" | "Básico"
TECHNOLOGIES = [
    # Lenguajes
    ("Java",           "java",           "language", True,  "Intermedio"),
    ("JavaScript",     "javascript",     "language", True,  "Avanzado"),
    ("TypeScript",     "typescript",     "language", True,  "Intermedio"),
    ("Python",         "python",         "language", True,  "Avanzado"),
    ("Go",             "go",             "language", False, "Básico"),
    ("Rust",           "rust",           "language", False, "Básico"),
    ("PHP",            "php",            "language", False, "Básico"),
    # Frontend
    ("React",          "react",          "frontend", True,  "Avanzado"),
    ("HTML/CSS",       "html5",          "frontend", True,  "Avanzado"),
    ("Vue.js",         "vuejs",          "frontend", False, "Básico"),
    ("Next.js",        "nextjs",         "frontend", True,  "Intermedio"),
    ("Angular",        "angular",        "frontend", False, "Básico"),
    ("Svelte",         "svelte",         "frontend", False, "Básico"),
    ("Tailwind CSS",   "tailwindcss",    "frontend", False, "Intermedio"),
    ("Framer Motion",  "framermotion",   "frontend", False, "Básico"),
    ("Vite",           "vite",           "frontend", False, "Básico"),
    # Backend
    ("Node.js",        "nodejs",         "backend",  True,  "Intermedio"),
    ("Flask",          "flask",          "backend",  True,  "Intermedio"),
    ("FastAPI",        "fastapi",        "backend",  True,  "Intermedio"),
    ("Django",         "django",         "backend",  False, "Básico"),
    ("Express",        "express",        "backend",  False, "Básico"),
    ("NestJS",         "nestjs",         "backend",  False, "Básico"),
    ("Spring Boot",    "springboot",     "backend",  True,  "Básico"),
    ("Laravel",        "laravel",        "backend",  False, "Básico"),
    # Bases de datos
    ("MongoDB",        "mongodb",        "database", True,  "Intermedio"),
    ("MySQL",          "mysql",          "database", True,  "Intermedio"),
    ("SQL Server",     "microsoftsqlserver", "database", True, "Básico"),
    ("Neo4j",          "neo4j",          "database", True,  "Básico"),
    ("PostgreSQL",     "postgresql",     "database", True,  "Intermedio"),
    ("Redis",          "redis",          "database", False, "Básico"),
    ("SQLite",         "sqlite",         "database", False, "Básico"),
    ("Supabase",       "supabase",       "database", False, "Básico"),
    ("Firebase",       "firebase",       "database", False, "Básico"),
    # DevOps / Infra
    ("Git",            "git",            "tool",     True,  "Avanzado"),
    ("Docker",         "docker",         "devops",   True,  "Intermedio"),
    ("Kubernetes",     "kubernetes",     "devops",   False, "Básico"),
    ("Nginx",          "nginx",          "devops",   False, "Básico"),
    ("GitHub Actions", "githubactions",  "devops",   False, "Básico"),
    ("Linux",          "linux",          "devops",   False, "Básico"),
    ("AWS",            "aws",            "devops",   False, "Básico"),
    ("GCP",            "gcp",            "devops",   False, "Básico"),
    ("Vercel",         "vercel",         "devops",   False, "Básico"),
    # IA / ML
    ("OpenAI",         "openai",         "ai",       False, "Básico"),
    ("Anthropic",      "anthropic",      "ai",       False, "Básico"),
    ("LangChain",      "langchain",      "ai",       False, "Básico"),
    ("TensorFlow",     "tensorflow",     "ai",       False, "Básico"),
    ("PyTorch",        "pytorch",        "ai",       False, "Básico"),
    # Herramientas
    ("Hibernate",      "hibernate",      "tool",     True,  "Básico"),
    ("Figma",          "figma",          "tool",     False, "Básico"),
    ("GraphQL",        "graphql",        "tool",     False, "Básico"),
    ("REST API",       "rest",           "tool",     True,  "Intermedio"),
    ("WebSockets",     "websockets",     "tool",     False, "Básico"),
    ("Socket.io",      "socketio",       "tool",     False, "Básico"),
    ("SQLAlchemy",     "sqlalchemy",     "tool",     True,  "Intermedio"),
    ("Prisma",         "prisma",         "tool",     False, "Básico"),
]


def upgrade() -> None:
    op.create_table(
        "technologies",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            primary_key=True,
        ),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("icon", sa.String(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("my_stack", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("level", sa.String(20), server_default="Básico", nullable=False),
        sa.UniqueConstraint("name"),
    )

    op.create_table(
        "project_technologies",
        sa.Column(
            "project_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("projects.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column(
            "technology_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("technologies.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("importance", sa.String(), server_default="secondary"),
    )

    rows = ", ".join(
        f"(gen_random_uuid(), '{name}', '{icon}', '{category}', {str(my_stack).lower()}, '{level}')"
        for name, icon, category, my_stack, level in TECHNOLOGIES
    )
    op.execute(f"INSERT INTO technologies (id, name, icon, category, my_stack, level) VALUES {rows}")


def downgrade() -> None:
    op.drop_table("project_technologies")
    op.drop_table("technologies")
