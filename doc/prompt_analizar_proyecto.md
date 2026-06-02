# Prompt — Analizar proyecto y generar entrada para la BD del portafolio

## Contexto

Tengo un portafolio personal con una base de datos PostgreSQL que almacena mis proyectos. Necesito que analices el proyecto que te voy a describir/compartir y generes un JSON listo para insertar en la tabla `projects`.

---

## Esquema de la tabla `projects`

| Campo          | Tipo    | Requerido | Descripción |
|----------------|---------|-----------|-------------|
| `title`        | string  | ✅        | Nombre del proyecto, legible y con mayúsculas correctas |
| `slug`         | string  | ✅        | Versión URL del título, solo minúsculas, guiones en lugar de espacios. Ej: `"uvg-help"` |
| `description`  | string  | ✅        | Texto corto para la card — máximo 2-3 líneas, orientado al visitante del portafolio. Debe enganchar y resumir el valor del proyecto |
| `content`      | string  | ✅        | Explicación completa para la vista de detalle. Incluye: qué problema resuelve, cómo funciona, decisiones técnicas importantes, retos que enfrentaste |
| `thumbnail_url`| string  | ❌        | URL de la imagen principal (dejar `null` si no hay) |
| `images`       | array   | ❌        | Array de URLs de screenshots adicionales. Dejar `[]` si no hay |
| `tech_stack`   | array   | ✅        | Array de strings con las tecnologías usadas. Ser específico: `"FastAPI"` no `"Python"`, `"PostgreSQL"` no `"SQL"` |
| `category`     | string  | ✅        | Una de estas opciones exactas: `"ai"`, `"fullstack"`, `"backend"`, `"frontend"` |
| `demo_url`     | string  | ❌        | URL del proyecto en producción. `null` si no está desplegado |
| `repo_url`     | string  | ❌        | URL del repositorio en GitHub. `null` si es privado o no existe |
| `featured`     | boolean | ✅        | `true` si es uno de los proyectos más importantes/representativos. Máximo 3-4 proyectos pueden ser featured |
| `order`        | integer | ✅        | Posición en la lista (0 = primero). Asigna según importancia o impacto |
| `status`       | string  | ✅        | `"completed"` si está terminado, `"in_progress"` si aún está en desarrollo |

---

## Tu tarea

1. **Analiza el proyecto a fondo** — lee el código, README, estructura de carpetas, dependencias, o lo que te comparta.
2. **Infiere lo que no te digan explícitamente** — si ves que usa React + FastAPI + PostgreSQL, deduce que es `"fullstack"`. Si tiene un endpoint de IA, considera `"ai"`.
3. **Escribe `description` y `content` como un copywriter técnico** — no solo describas, vende el proyecto de forma honesta.
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
  "tech_stack": [],
  "category": "",
  "demo_url": null,
  "repo_url": null,
  "featured": false,
  "order": 0,
  "status": "completed"
}
```

---

## Proyecto a analizar
Analiza el proeycto presente completamente