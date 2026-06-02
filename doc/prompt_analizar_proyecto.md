# Prompt — Analizar proyecto y generar entrada para la BD del portafolio

## Contexto

Tengo un portafolio personal con una base de datos PostgreSQL que almacena mis proyectos. Necesito que analices el proyecto que te voy a describir/compartir y generes un JSON listo para insertar en la tabla `projects`.

---

## Esquema de la tabla `projects`

| Campo                | Tipo    | Requerido | Descripción |
|----------------------|---------|-----------|-------------|
| `title`              | string  | ✅        | Nombre del proyecto, legible y con mayúsculas correctas |
| `slug`               | string  | ✅        | Versión URL del título, solo minúsculas, guiones en lugar de espacios. Ej: `"uvg-help"` |
| `description`        | string  | ✅        | Texto corto para la card — máximo 2-3 líneas, orientado al visitante del portafolio. Debe enganchar y resumir el valor del proyecto |
| `content`            | string  | ✅        | Explicación general del proyecto: qué es, para qué sirve y cómo funciona a grandes rasgos |
| `thumbnail_url`      | string  | ❌        | URL de la imagen principal. `null` si no hay |
| `images`             | array   | ❌        | Array de URLs de screenshots adicionales. `[]` si no hay |
| `technologies`       | array   | ✅        | Array de strings con los nombres exactos de las tecnologías usadas. Usar nombres generales: `"React"`, `"FastAPI"`, `"PostgreSQL"`, `"Docker"`. No inventar nombres que no existan en la lista de tecnologías del sistema |
| `category`           | string  | ✅        | Una de estas opciones exactas: `"ai"`, `"fullstack"`, `"backend"`, `"frontend"` |
| `demo_url`           | string  | ❌        | URL del proyecto en producción. `null` si no está desplegado |
| `repo_urls`          | array   | ❌        | Array de URLs de repositorios en GitHub. `[]` si son privados o no existen. Puede tener más de uno (ej: frontend y backend separados) |
| `featured`           | boolean | ✅        | `true` si es uno de los proyectos más importantes/representativos. Máximo 3-4 proyectos |
| `order`              | integer | ✅        | Posición en la lista (0 = primero). Asigna según importancia o impacto |
| `status`             | string  | ✅        | `"completed"` si está terminado, `"in_progress"` si aún está en desarrollo |
| `year`               | integer | ✅        | Año en que se desarrolló o lanzó el proyecto. Ej: `2024` |
| `problem_solved`     | string  | ✅        | Una línea concisa explicando qué problema resuelve este proyecto |
| `architecture`       | string  | ✅        | Decisiones de arquitectura: por qué se eligió este stack, cómo están organizados los servicios, patrones usados |
| `challenges`         | string  | ✅        | Qué fue técnicamente difícil y cómo se resolvió |
| `what_i_learned`     | string  | ✅        | Qué aprendiste construyendo este proyecto |
| `would_do_different` | string  | ✅        | Qué harías diferente si lo construyeras hoy |
| `setup_instructions` | string  | ✅        | Cómo levantar el proyecto localmente o con Docker, paso a paso |
| `team_size`          | integer | ✅        | `1` si fue solo, `2` o más si fue en equipo |
| `team_description`   | string  | ❌        | Quién más participó y en qué rol. `null` si fue solo |
| `role`               | string  | ✅        | Tu rol específico en el proyecto. Ej: `"Solo dev"`, `"Full-stack"`, `"Backend lead"`, `"Frontend"` |

---

## Tu tarea

1. **Analiza el proyecto a fondo** — lee el código, README, estructura de carpetas, dependencias, o lo que te comparta.
2. **Infiere lo que no te digan explícitamente** — si ves React + FastAPI + PostgreSQL, deduce `"fullstack"`. Si hay endpoints de IA, considera `"ai"`.
3. **Escribe desde la perspectiva del desarrollador** — los campos de texto deben sonar como si el propio developer explicara su trabajo, no como documentación técnica fría.
4. **Genera el JSON final** listo para insertar, sin campos extra, sin comentarios dentro del JSON.

---

## Formato de salida esperado

```json
{
  "title": "",
  "slug": "",
  "description": "",
  "content": "",
  "thumbnail_url": null,
  "images": [],
  "technologies": [],
  "category": "",
  "demo_url": null,
  "repo_urls": [],
  "featured": false,
  "order": 0,
  "status": "completed",
  "year": 2024,
  "problem_solved": "",
  "architecture": "",
  "challenges": "",
  "what_i_learned": "",
  "would_do_different": "",
  "setup_instructions": "",
  "team_size": 1,
  "team_description": null,
  "role": ""
}
```

---

## Proyecto a analizar

Analiza el proyecto presente completamente
