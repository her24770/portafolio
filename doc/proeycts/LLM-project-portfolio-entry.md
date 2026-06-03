# SalesAI - Entrada para portafolio

```json
{
  "title": "SalesAI",
  "slug": "sales-ai",
  "description": "Asistente de ventas con IA que convierte archivos CSV o Excel en análisis, respuestas en lenguaje natural y gráficas útiles para tomar decisiones de negocio.",
  "content": "SalesAI es una aplicación web para analizar datos de ventas sin depender de dashboards rígidos o consultas manuales. El usuario crea una cuenta, registra el contexto de su empresa, sube archivos CSV o Excel y puede conversar con sus datos para obtener insights, problemas detectados y recomendaciones accionables. Cada análisis vive dentro de un chat con historial persistente, y también existe un chat global que combina el contexto estadístico de varios archivos para comparar periodos, detectar tendencias y hacer preguntas históricas.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Python",
    "Streamlit",
    "OpenAI",
    "SQLite",
    "Docker",
    "Pandas",
    "Plotly"
  ],
  "category": "ai",
  "demo_url": null,
  "repo_urls": [
    "https://github.com/her24770/LLM-proyect1"
  ],
  "featured": true,
  "order": 0,
  "status": "in_progress",
  "year": 2026,
  "problem_solved": "Los negocios pequeños suelen tener datos de ventas en archivos sueltos, pero no una forma simple de convertirlos en análisis accionables usando lenguaje natural.",
  "architecture": "Construí la aplicación como una solución monolítica en Streamlit porque necesitaba moverme rápido y combinar interfaz, estado de sesión, carga de archivos y experiencia conversacional en un solo flujo. Separé el código por responsabilidades: autenticación y base de datos en auth.py, CRUD de chats y contexto en chats.py, llamadas a OpenAI en ia.py, interfaz principal en dashboard.py, conversación en chat.py y visualizaciones en graficas.py. La persistencia se maneja con SQLite para mantener el despliegue simple y portable, mientras que Docker encapsula el runtime y monta el directorio de datos para conservar usuarios, chats y mensajes.",
  "challenges": "El reto principal fue darle contexto útil a la IA sin enviar archivos completos en cada mensaje. Lo resolví comprimiendo cada archivo en un JSON con dimensiones, tipos de columnas, estadísticas y una muestra inicial; así el costo de tokens se mantiene controlado aunque el CSV sea grande. También fue importante persistir múltiples conversaciones por usuario, manejar un chat maestro con contexto histórico y mantener la sesión protegida con bcrypt, expiración por inactividad y onboarding de empresa.",
  "what_i_learned": "Aprendí a diseñar una experiencia de análisis con IA que no depende solo del prompt, sino de cómo se prepara y conserva el contexto. También consolidé el uso de Streamlit para aplicaciones completas con autenticación, estado de sesión, persistencia, carga de archivos, visualizaciones dinámicas y despliegue con Docker.",
  "would_do_different": "Si lo construyera desde cero, separaría la capa de backend en una API propia y usaría PostgreSQL para escalar mejor usuarios, auditoría e historial. También agregaría pruebas automatizadas para las funciones de contexto, autenticación y persistencia, y terminaría los módulos pendientes de reportes y movimientos antes de dejarlo como producto cerrado.",
  "setup_instructions": "Requisitos previos: Docker y Docker Compose.\n\n1. Clonar el repositorio:\n`git clone https://github.com/her24770/LLM-proyect1.git`\n\n2. Entrar al proyecto:\n`cd LLM-proyect1`\n\n3. Crear el archivo de variables de entorno:\n`cp .env.example .env`\n\n4. Editar `.env` y agregar la clave requerida:\n`OPENAI_API_KEY=tu_api_key_de_openai`\n\n5. Levantar la aplicación con Docker:\n`docker compose up --build`\n\n6. Abrir la app en el navegador:\n`http://localhost:8502`\n\nLa base de datos SQLite se crea automáticamente en `app/data/users.db` y el volumen `./app/data:/app/data` conserva usuarios, chats y mensajes entre reinicios.",
  "team_size": 1,
  "team_description": null,
  "role": "Solo dev"
}
```
