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

TECHNOLOGIES = [
    # Lenguajes
    ("Python",         "python",         "language"),
    ("JavaScript",     "javascript",     "language"),
    ("TypeScript",     "typescript",     "language"),
    ("Go",             "go",             "language"),
    ("Java",           "java",           "language"),
    ("Rust",           "rust",           "language"),
    ("PHP",            "php",            "language"),
    # Frontend
    ("React",          "react",          "frontend"),
    ("Vue.js",         "vuejs",          "frontend"),
    ("Next.js",        "nextjs",         "frontend"),
    ("Angular",        "angular",        "frontend"),
    ("Svelte",         "svelte",         "frontend"),
    ("Tailwind CSS",   "tailwindcss",    "frontend"),
    ("HTML/CSS",       "html5",          "frontend"),
    ("Vite",           "vite",           "frontend"),
    # Backend
    ("FastAPI",        "fastapi",        "backend"),
    ("Django",         "django",         "backend"),
    ("Flask",          "flask",          "backend"),
    ("Node.js",        "nodejs",         "backend"),
    ("Express",        "express",        "backend"),
    ("NestJS",         "nestjs",         "backend"),
    ("Spring Boot",    "springboot",     "backend"),
    ("Laravel",        "laravel",        "backend"),
    # Bases de datos
    ("PostgreSQL",     "postgresql",     "database"),
    ("MySQL",          "mysql",          "database"),
    ("MongoDB",        "mongodb",        "database"),
    ("Redis",          "redis",          "database"),
    ("SQLite",         "sqlite",         "database"),
    ("Supabase",       "supabase",       "database"),
    ("Firebase",       "firebase",       "database"),
    # DevOps / Infra
    ("Docker",         "docker",         "devops"),
    ("Kubernetes",     "kubernetes",     "devops"),
    ("Nginx",          "nginx",          "devops"),
    ("GitHub Actions", "githubactions",  "devops"),
    ("Linux",          "linux",          "devops"),
    ("AWS",            "aws",            "devops"),
    ("GCP",            "gcp",            "devops"),
    ("Vercel",         "vercel",         "devops"),
    # IA / ML
    ("Anthropic",      "anthropic",      "ai"),
    ("OpenAI",         "openai",         "ai"),
    ("LangChain",      "langchain",      "ai"),
    ("TensorFlow",     "tensorflow",     "ai"),
    ("PyTorch",        "pytorch",        "ai"),
    # Herramientas
    ("Git",            "git",            "tool"),
    ("GraphQL",        "graphql",        "tool"),
    ("REST API",       "rest",           "tool"),
    ("WebSockets",     "websockets",     "tool"),
    ("Socket.io",      "socketio",       "tool"),
    ("SQLAlchemy",     "sqlalchemy",     "tool"),
    ("Prisma",         "prisma",         "tool"),
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
        f"(gen_random_uuid(), '{name}', '{icon}', '{category}')"
        for name, icon, category in TECHNOLOGIES
    )
    op.execute(f"INSERT INTO technologies (id, name, icon, category) VALUES {rows}")


def downgrade() -> None:
    op.drop_table("project_technologies")
    op.drop_table("technologies")
