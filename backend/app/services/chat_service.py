import json
from pathlib import Path
from sqlalchemy.orm import Session
from openai import OpenAI

from app.config import get_settings
from app.services.project_service import get_all_projects, get_project_by_slug

settings = get_settings()
ABOUT_DIR = Path(__file__).parent.parent.parent / "about"
MODEL = "gpt-4o-mini"

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_bio",
            "description": "Obtiene la presentación personal del desarrollador: nombre, rol, ubicación, disponibilidad y contacto",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_skills",
            "description": "Obtiene información sobre el perfil técnico del desarrollador, sus áreas de fortaleza y cómo trabaja",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_experience",
            "description": "Obtiene la experiencia laboral del desarrollador: empresas, roles y responsabilidades",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_education",
            "description": "Obtiene la formación académica del desarrollador: universidad, carrera y certificaciones",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_services",
            "description": "Obtiene los servicios freelance que ofrece el desarrollador y cómo contratarlo",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_values",
            "description": "Obtiene los valores, forma de trabajar y qué motiva al desarrollador",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_all_projects",
            "description": "Obtiene la lista completa de proyectos del portafolio",
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_project_by_slug",
            "description": "Obtiene el detalle completo de un proyecto específico por su slug",
            "parameters": {
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


def _clean(text: str) -> str:
    import re
    # quitar markdown
    text = re.sub(r'\*{1,2}(.+?)\*{1,2}', r'\1', text)   # **bold** y *italic*
    text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)  # encabezados
    text = re.sub(r'^\s*[-*]\s+', '', text, flags=re.MULTILINE)  # bullets
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)  # listas numeradas
    # colapsar líneas en blanco múltiples
    text = re.sub(r'\n{2,}', ' ', text).strip()
    text = re.sub(r'\n', ' ', text)
    # truncar a 3 oraciones
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return ' '.join(sentences[:3]).strip()


def process_chat(db: Session, user_message: str, history: list[dict] = []) -> str:
    projects = get_all_projects(db)

    system_prompt = f"""Eres Sky, el asistente del portafolio de Josue Hernández. Respondes como si fuera un chat, no un documento.

FORMATO — sin excepciones:
- Texto plano puro. Cero markdown: sin asteriscos, sin guiones de lista, sin almohadillas, sin negritas.
- Máximo 2 oraciones en tu respuesta final. No importa cuánta información tengas disponible: elige lo más relevante y di solo eso.
- Si el usuario quiere más detalle, lo pedirá. No lo anticipes.

CONTENIDO:
- Cuando uses una herramienta y obtengas información extensa, extrae solo los 2-3 puntos más representativos.
- Nunca enumeres todo lo que está en el archivo. Sintetiza.

Proyectos: {', '.join(p['title'] for p in _projects_to_summary(projects))}

Responde en el idioma del usuario."""

    client = OpenAI(api_key=settings.openai_api_key)

    prior = []
    for msg in history:
        role = "assistant" if msg.get("role") == "ai" else "user"
        prior.append({"role": role, "content": msg.get("text", "")})

    messages = [
        {"role": "system", "content": system_prompt},
        *prior,
        {"role": "user", "content": user_message},
    ]

    while True:
        response = client.chat.completions.create(
            model=MODEL,
            tools=TOOLS,
            messages=messages,
            max_tokens=600,
        )

        message = response.choices[0].message

        if not message.tool_calls:
            return _clean(message.content or "")

        messages.append({
            "role": "assistant",
            "content": message.content,
            "tool_calls": [
                {
                    "id": tc.id,
                    "type": "function",
                    "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                }
                for tc in message.tool_calls
            ],
        })

        for tc in message.tool_calls:
            tool_input = json.loads(tc.function.arguments)
            result = _handle_tool(db, tc.function.name, tool_input)
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": json.dumps(result, ensure_ascii=False),
            })

    return ""
