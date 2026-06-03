"""agregar columna color a tecnologias

Revision ID: 004
Revises: 003
Create Date: 2024-01-01 00:00:03.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

revision: str = "004"
down_revision: Union[str, None] = "003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Colores de marca por tecnología
COLORS = {
    # Lenguajes
    "Java":           "#ED8B00",
    "JavaScript":     "#F7DF1E",
    "TypeScript":     "#3178C6",
    "Python":         "#3776AB",
    "Go":             "#00ADD8",
    "Rust":           "#CE422B",
    "PHP":            "#777BB4",
    # Frontend
    "React":          "#61DAFB",
    "HTML/CSS":       "#E34F26",
    "Vue.js":         "#4FC08D",
    "Next.js":        "#555555",
    "Angular":        "#DD0031",
    "Svelte":         "#FF3E00",
    "Tailwind CSS":   "#06B6D4",
    "Framer Motion":  "#BB4B96",
    "Vite":           "#646CFF",
    # Backend
    "Node.js":        "#339933",
    "Flask":          "#555555",
    "FastAPI":        "#009688",
    "Django":         "#0C4B33",
    "Express":        "#555555",
    "NestJS":         "#E0234E",
    "Spring Boot":    "#6DB33F",
    "Laravel":        "#FF2D20",
    # Bases de datos
    "MongoDB":        "#47A248",
    "MySQL":          "#4479A1",
    "SQL Server":     "#CC2927",
    "Neo4j":          "#4581C3",
    "PostgreSQL":     "#4169E1",
    "Redis":          "#DC382D",
    "SQLite":         "#003B57",
    "Supabase":       "#3ECF8E",
    "Firebase":       "#FFCA28",
    # DevOps
    "Git":            "#F05032",
    "Docker":         "#2496ED",
    "Kubernetes":     "#326CE5",
    "Nginx":          "#009639",
    "GitHub Actions": "#2088FF",
    "Linux":          "#FCC624",
    "AWS":            "#FF9900",
    "GCP":            "#4285F4",
    "Vercel":         "#555555",
    # IA / ML
    "OpenAI":         "#412991",
    "Anthropic":      "#CC785C",
    "LangChain":      "#1C3C3C",
    "TensorFlow":     "#FF6F00",
    "PyTorch":        "#EE4C2C",
    # Herramientas
    "Hibernate":      "#59666C",
    "Figma":          "#F24E1E",
    "GraphQL":        "#E10098",
    "REST API":       "#6B7280",
    "WebSockets":     "#6B7280",
    "Socket.io":      "#555555",
    "SQLAlchemy":     "#D71F00",
    "Prisma":         "#2D3748",
    # Extras (migración 003)
    "Zod":            "#3E67B1",
    "Zustand":        "#764ABC",
    "Resend":         "#555555",
    "AWS Rekognition":"#FF9900",
    "Cloudflare R2":  "#F48120",
    "Maven":          "#C71A36",
    "PrimeFaces":     "#4696EC",
    "Drizzle ORM":    "#C5F74F",
    "Material UI":    "#007FFF",
    "Streamlit":      "#FF4B4B",
    "Pandas":         "#150458",
    "Plotly":         "#3F4F75",
    "Alembic":        "#6BA539",
    "Bootstrap":      "#7952B3",
}


def upgrade() -> None:
    op.add_column("technologies", sa.Column("color", sa.String(20), nullable=True))

    conn = op.get_bind()
    for name, color in COLORS.items():
        conn.execute(
            text("UPDATE technologies SET color = :color WHERE name = :name"),
            {"color": color, "name": name},
        )


def downgrade() -> None:
    op.drop_column("technologies", "color")
