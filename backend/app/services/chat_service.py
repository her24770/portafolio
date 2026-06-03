import json
from pathlib import Path
from sqlalchemy.orm import Session
import anthropic

from app.config import get_settings
from app.services.project_service import get_all_projects, get_project_by_slug

settings = get_settings()
ABOUT_DIR = Path(__file__).parent.parent.parent / "about"
MODEL = "claude-sonnet-4-6"

TOOLS = [
    {
        "name": "get_bio",
        "description": "Obtiene la presentación personal del desarrollador: nombre, rol, ubicación, disponibilidad y contacto",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_skills",
        "description": "Obtiene información sobre el perfil técnico del desarrollador, sus áreas de fortaleza y cómo trabaja",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_experience",
        "description": "Obtiene la experiencia laboral del desarrollador: empresas, roles y responsabilidades",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_education",
        "description": "Obtiene la formación académica del desarrollador: universidad, carrera y certificaciones",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_services",
        "description": "Obtiene los servicios freelance que ofrece el desarrollador y cómo contratarlo",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_values",
        "description": "Obtiene los valores, forma de trabajar y qué motiva al desarrollador",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_all_projects",
        "description": "Obtiene la lista completa de proyectos del portafolio",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "get_project_by_slug",
        "description": "Obtiene el detalle completo de un proyecto específico por su slug",
        "input_schema": {
            "type": "object",
            "properties": {
                "slug": {
                    "type": "string",
                    "description": "El slug único del proyecto, ej: 'uvg-help'",
                }
            },
            "required": ["slug"],
        },
    },
]

FILE_MAP = {
    "get_bio": "bio.md",
    "get_skills": "skills.md",
    "get_experience": "experience.md",
    "get_education": "education.md",
    "get_services": "services.md",
    "get_values": "values.md",
}


def _read_about(filename: str) -> str:
    path = ABOUT_DIR / filename
    if path.exists():
        return path.read_text(encoding="utf-8")
    return ""


def _projects_to_summary(projects) -> list[dict]:
    return [
        {
            "id": str(p.id),
            "title": p.title,
            "slug": p.slug,
            "description": p.description,
            "technologies": [t.name for t in p.technologies],
            "category": p.category,
            "demo_url": p.demo_url,
            "status": p.status,
            "year": p.year,
        }
        for p in projects
    ]


def _project_to_detail(project) -> dict:
    return {
        "id": str(project.id),
        "title": project.title,
        "slug": project.slug,
        "description": project.description,
        "content": project.content,
        "thumbnail_url": project.thumbnail_url,
        "images": project.images,
        "technologies": [t.name for t in project.technologies],
        "category": project.category,
        "demo_url": project.demo_url,
        "repo_urls": project.repo_urls,
        "featured": project.featured,
        "status": project.status,
        "year": project.year,
        "problem_solved": project.problem_solved,
        "architecture": project.architecture,
        "challenges": project.challenges,
        "what_i_learned": project.what_i_learned,
        "would_do_different": project.would_do_different,
        "role": project.role,
        "team_size": project.team_size,
        "team_description": project.team_description,
    }


def _handle_tool(db: Session, tool_name: str, tool_input: dict) -> dict:
    if tool_name in FILE_MAP:
        return {"content": _read_about(FILE_MAP[tool_name])}

    if tool_name == "get_all_projects":
        return {"projects": _projects_to_summary(get_all_projects(db))}

    if tool_name == "get_project_by_slug":
        slug = tool_input.get("slug", "")
        project = get_project_by_slug(db, slug)
        if not project:
            return {"error": f"Proyecto con slug '{slug}' no encontrado"}
        return _project_to_detail(project)

    return {"error": f"Herramienta '{tool_name}' no reconocida"}


def process_chat(db: Session, user_message: str) -> str:
    projects = get_all_projects(db)

    system_prompt = f"""Eres un asistente del portafolio personal de un desarrollador. Responde de forma amigable y profesional.

Tienes herramientas para obtener información detallada sobre el desarrollador y sus proyectos. Úsalas según lo que pregunte el usuario — no cargues información que no sea necesaria.

Proyectos disponibles (resumen):
{json.dumps(_projects_to_summary(projects), ensure_ascii=False, indent=2)}

Responde siempre en el idioma en que te hablen."""

    client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model=MODEL,
            max_tokens=1024,
            system=system_prompt,
            tools=TOOLS,
            messages=messages,
        )

        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return ""

        if response.stop_reason != "tool_use":
            break

        messages.append({"role": "assistant", "content": response.content})
        tool_results = []

        for block in response.content:
            if block.type != "tool_use":
                continue
            result = _handle_tool(db, block.name, block.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": json.dumps(result, ensure_ascii=False),
            })

        messages.append({"role": "user", "content": tool_results})

    return ""
