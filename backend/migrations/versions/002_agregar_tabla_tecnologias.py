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

# (name, icon, category, my_stack)
TECHNOLOGIES = [
    # Lenguajes
    ("Java",           "java",           "language", True),
    ("JavaScript",     "javascript",     "language", True),
    ("TypeScript",     "typescript",     "language", False),
    ("Python",         "python",         "language", True),
    ("Go",             "go",             "language", False),
    ("Rust",           "rust",           "language", False),
    ("PHP",            "php",            "language", False),
    # Frontend
    ("React",          "react",          "frontend", True),
    ("HTML/CSS",       "html5",          "frontend", True),
    ("Vue.js",         "vuejs",          "frontend", False),
    ("Next.js",        "nextjs",         "frontend", False),
    ("Angular",        "angular",        "frontend", False),
    ("Svelte",         "svelte",         "frontend", False),
    ("Tailwind CSS",   "tailwindcss",    "frontend", False),
    ("Framer Motion",  "framermotion",   "frontend", False),
    ("Vite",           "vite",           "frontend", False),
    # Backend
    ("Node.js",        "nodejs",         "backend",  True),
    ("Flask",          "flask",          "backend",  True),
    ("FastAPI",        "fastapi",        "backend",  False),
    ("Django",         "django",         "backend",  False),
    ("Express",        "express",        "backend",  False),
    ("NestJS",         "nestjs",         "backend",  False),
    ("Spring Boot",    "springboot",     "backend",  False),
    ("Laravel",        "laravel",        "backend",  False),
    # Bases de datos
    ("MongoDB",        "mongodb",        "database", True),
    ("MySQL",          "mysql",          "database", True),
    ("SQL Server",     "microsoftsqlserver", "database", True),
    ("Neo4j",          "neo4j",          "database", True),
    ("PostgreSQL",     "postgresql",     "database", False),
    ("Redis",          "redis",          "database", False),
    ("SQLite",         "sqlite",         "database", False),
    ("Supabase",       "supabase",       "database", False),
    ("Firebase",       "firebase",       "database", False),
    # DevOps / Infra
    ("Git",            "git",            "tool",     True),
    ("Docker",         "docker",         "devops",   False),
    ("Kubernetes",     "kubernetes",     "devops",   False),
    ("Nginx",          "nginx",          "devops",   False),
    ("GitHub Actions", "githubactions",  "devops",   False),
    ("Linux",          "linux",          "devops",   False),
    ("AWS",            "aws",            "devops",   False),
    ("GCP",            "gcp",            "devops",   False),
    ("Vercel",         "vercel",         "devops",   False),
    # IA / ML
    ("OpenAI",         "openai",         "ai",       False),
    ("Anthropic",      "anthropic",      "ai",       False),
    ("LangChain",      "langchain",      "ai",       False),
    ("TensorFlow",     "tensorflow",     "ai",       False),
    ("PyTorch",        "pytorch",        "ai",       False),
    # Herramientas
    ("Hibernate",      "hibernate",      "tool",     True),
    ("Figma",          "figma",          "tool",     False),
    ("GraphQL",        "graphql",        "tool",     False),
    ("REST API",       "rest",           "tool",     False),
    ("WebSockets",     "websockets",     "tool",     False),
    ("Socket.io",      "socketio",       "tool",     False),
    ("SQLAlchemy",     "sqlalchemy",     "tool",     False),
    ("Prisma",         "prisma",         "tool",     False),
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
        f"(gen_random_uuid(), '{name}', '{icon}', '{category}', {str(my_stack).lower()})"
        for name, icon, category, my_stack in TECHNOLOGIES
    )
    op.execute(f"INSERT INTO technologies (id, name, icon, category, my_stack) VALUES {rows}")


def downgrade() -> None:
    op.drop_table("project_technologies")
    op.drop_table("technologies")
