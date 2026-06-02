# Prompt — Analizar proyecto y generar entrada para la BD del portafolio

## Contexto

Tengo un portafolio personal con una base de datos PostgreSQL que almacena mis proyectos. Necesito que analices el proyecto que te voy a describir/compartir y generes un JSON listo para insertar en la tabla `projects`.

---

## Esquema de la tabla `projects`

### Identificación

**`title`** ✅ `string`
El nombre del proyecto tal como aparecerá en el portafolio. Legible, con mayúsculas correctas. Ej: `"UVG Help"`, `"Portfolio API"`.

**`slug`** ✅ `string`
Versión URL del título: solo minúsculas, palabras separadas por guiones, sin caracteres especiales. Se usa en la ruta del detalle del proyecto. Ej: `"uvg-help"`, `"portfolio-api"`.

---

### Descripción pública

**`description`** ✅ `string`
Texto corto que aparece en la card del proyecto en el portafolio. Máximo 2-3 líneas. Debe enganchar al visitante y comunicar el valor del proyecto de forma directa. No es un resumen técnico, es una presentación.

**`content`** ✅ `string`
Explicación general del proyecto: qué es, para qué existe y cómo funciona a grandes rasgos. Este campo es el cuerpo principal de la vista de detalle. No entrar en detalles técnicos profundos aquí — esos van en sus campos dedicados.

**`thumbnail_url`** ❌ `string | null`
URL de la imagen principal que se muestra en la card. Dejar `null` si no hay imagen disponible todavía.

**`images`** ❌ `array`
Array de URLs de screenshots o imágenes adicionales del proyecto (capturas de pantalla, diagramas, etc.). Dejar `[]` si no hay.

---

### Clasificación

**`technologies`** ✅ `array`
Array de strings con los nombres de las tecnologías usadas. Usar los nombres exactos del catálogo del sistema: `"React"`, `"FastAPI"`, `"PostgreSQL"`, `"Docker"`, `"TypeScript"`, etc. No inventar nombres que no existan en la lista. Si una tecnología no está en el catálogo, omitirla.

**`category`** ✅ `string`
Categoría principal del proyecto. Debe ser exactamente una de estas opciones:
- `"ai"` — el valor principal del proyecto está en la integración con IA
- `"fullstack"` — tiene frontend y backend propios
- `"backend"` — API, servicio, script, sin frontend propio
- `"frontend"` — interfaz visual sin backend propio

**`status`** ✅ `string`
- `"completed"` — el proyecto está terminado y funcional
- `"in_progress"` — aún está en desarrollo activo

**`year`** ✅ `integer`
Año en que se desarrolló o lanzó el proyecto. Si duró varios años, poner el año en que se terminó o en que estuvo más activo. Ej: `2024`.

**`featured`** ✅ `boolean`
`true` si es uno de los proyectos más representativos del portafolio. Solo marcar como featured los 3-4 proyectos más fuertes. El resto va en `false`.

**`order`** ✅ `integer`
Posición en la lista de proyectos (0 = primero). Asignar según importancia, impacto o relevancia. Los featured deberían tener los números más bajos.

---

### Links

**`demo_url`** ❌ `string | null`
URL donde el proyecto está desplegado y se puede ver en vivo. `null` si no está en producción o el link ya no está activo.

**`repo_urls`** ❌ `array`
Array de URLs de repositorios en GitHub. Puede tener más de uno si el proyecto tiene repos separados (ej: frontend y backend). Dejar `[]` si los repos son privados o no existen.

---

### Profundidad técnica

**`problem_solved`** ✅ `string`
Una sola línea, concisa y clara, explicando qué problema concreto resuelve este proyecto. Ej: `"Los estudiantes de UVG no tenían un lugar centralizado para compartir apuntes y resolver dudas entre compañeros"`.

**`architecture`** ✅ `string`
Explicación de las decisiones de arquitectura: por qué se eligió este stack, cómo están organizados los servicios o capas, qué patrones se aplicaron (MVC, repositorio, eventos, etc.) y por qué. No es una lista de tecnologías — es el razonamiento detrás de cómo se construyó.

**`challenges`** ✅ `string`
Qué fue técnicamente difícil durante el desarrollo y cómo se resolvió. Puede incluir problemas de performance, decisiones difíciles de diseño, bugs complejos, limitaciones de infraestructura, etc.

**`what_i_learned`** ✅ `string`
Qué aprendiste construyendo este proyecto que no sabías antes o que consolidaste. Puede ser técnico (una tecnología, un patrón) o de proceso (cómo planear mejor, cómo trabajar en equipo).

**`would_do_different`** ✅ `string`
Con lo que sabes hoy, qué cambiarías si lo construyeras desde cero. Puede ser de arquitectura, de stack, de scope, de proceso. Esto muestra madurez técnica.

**`setup_instructions`** ✅ `string`
Instrucciones paso a paso para levantar el proyecto localmente o con Docker. Incluir: requisitos previos, variables de entorno necesarias, comandos para correrlo. Debe ser suficientemente claro para que alguien más pueda levantarlo sin preguntar.

---

### Equipo

**`team_size`** ✅ `integer`
Número de personas que trabajaron en el proyecto. `1` si fue un proyecto solo, `2` o más si fue en equipo.

**`team_description`** ❌ `string | null`
Si fue en equipo, describir quién más participó y en qué rol. Ej: `"Trabajé con un diseñador UX que hizo los wireframes y un compañero que desarrolló el módulo de pagos"`. Dejar `null` si fue un proyecto solo.

**`role`** ✅ `string`
Tu rol específico dentro del proyecto. Ej: `"Solo dev"`, `"Full-stack"`, `"Backend lead"`, `"Frontend"`, `"Tech lead"`.

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
