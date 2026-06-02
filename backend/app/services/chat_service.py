import json
from pathlib import Path
from sqlalchemy.orm import Session
import anthropic

from app.config import get_settings
from app.services.project_service import get_all_projects, get_project_by_slug

settings = get_settings()
ABOUT_ME_PATH = Path(__file__).parent.parent.parent / "about-me.md"
MODEL = "claude-sonnet-4-6"

TOOLS = [
    {
        "name": "get_all_projects",
        "description": "Obtiene la lista completa de proyectos del portafolio",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_project_by_slug",
        "description": "Obtiene el detalle completo de un proyecto específico por su slug",
        "input_schema": {
            "type": "object",
            "properties": {
                "slug": {
                    "type": "string",
                    "description": "El slug único del proyecto, ej: 'uvghelp'",
                }
            },
            "required": ["slug"],
        },
    },
    {
        "name": "get_contact_info",
        "description": "Obtiene la información de contacto del desarrollador (email, LinkedIn, GitHub)",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
]


def _read_about_me() -> str:
    if ABOUT_ME_PATH.exists():
        return ABOUT_ME_PATH.read_text(encoding="utf-8")
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
    }


def _handle_tool(db: Session, tool_name: str, tool_input: dict, about_me: str) -> dict:
    if tool_name == "get_all_projects":
        return {"projects": _projects_to_summary(get_all_projects(db))}

    if tool_name == "get_project_by_slug":
        slug = tool_input.get("slug", "")
        project = get_project_by_slug(db, slug)
        if not project:
            return {"error": f"Proyecto con slug '{slug}' no encontrado"}
        return _project_to_detail(project)

    if tool_name == "get_contact_info":
        return {"about_me": about_me}

    return {"error": f"Herramienta '{tool_name}' no reconocida"}


def process_chat(db: Session, user_message: str) -> str:
    about_me = _read_about_me()
    projects = get_all_projects(db)

    system_prompt = f"""Eres un asistente del portafolio personal de un desarrollador full-stack. Responde de forma amigable y profesional.

Información del desarrollador:
{about_me}

Proyectos (resumen):
{json.dumps(_projects_to_summary(projects), ensure_ascii=False, indent=2)}

Usa las herramientas disponibles cuando necesites información más detallada.
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
            result = _handle_tool(db, block.name, block.input, about_me)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": json.dumps(result, ensure_ascii=False),
            })

        messages.append({"role": "user", "content": tool_results})

    return ""
