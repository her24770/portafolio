# SKY Chat

Entrada lista para insertar en la tabla `projects`.

```json
{
  "title": "SKY Chat",
  "slug": "sky-chat",
  "description": "Chat en tiempo real con una IA sarcástica que participa como un tercer personaje en la conversación. SKY recuerda dinámicas entre usuarios, cambia de personalidad por sala y convierte un chat simple en una experiencia impredecible.",
  "content": "SKY Chat es una aplicación fullstack de mensajería en tiempo real donde dos usuarios pueden conversar mientras una IA llamada SKY interviene con personalidad propia. La app permite crear salas 1:1, enviar mensajes en vivo, ver presencia online, recibir indicadores de escritura y configurar el comportamiento de SKY por sala mediante emociones, roles y prompts personalizados. Además, SKY mantiene contexto activo de la conversación y puede extraer un perfil relacional entre los usuarios para reutilizarlo en futuras interacciones.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Tailwind CSS",
    "OpenAI",
    "Socket.IO",
    "Vite"
  ],
  "category": "ai",
  "demo_url": null,
  "repo_urls": [
    "https://github.com/her24770/me-sky-chat"
  ],
  "featured": true,
  "order": 0,
  "status": "completed",
  "year": 2026,
  "problem_solved": "Los chats tradicionales son pasivos; este proyecto agrega una IA con personalidad, memoria y contexto que participa activamente en la conversación.",
  "architecture": "Construí la app con una separación clara entre frontend, backend y servicios de infraestructura. El frontend usa React con Vite para una interfaz rápida de chat, login y administración. El backend usa Express para la API REST y Socket.IO para eventos en tiempo real como mensajes, presencia, escritura y cambios de modo de SKY. PostgreSQL guarda usuarios, salas, mensajes y perfiles relacionales como fuente persistente de verdad, mientras Redis maneja presencia online y contexto activo de cada sala con compresión cuando el historial crece. La lógica de IA está separada en servicios de OpenAI, contexto y memoria para mantener aisladas las responsabilidades de prompt, resumen y extracción relacional. Docker Compose orquesta frontend, backend, PostgreSQL y Redis para que el entorno completo pueda levantarse de forma reproducible.",
  "challenges": "Lo más complejo fue diseñar una IA que no respondiera como chatbot genérico, sino como un personaje con reglas, emociones y roles combinables. Resolví esto construyendo un system prompt dinámico que mezcla personalidad base, modo activo, rol activo, prompt personalizado y perfil relacional. Otro reto fue manejar memoria sin enviar todo el historial a OpenAI: usé Redis como ventana de contexto activa, estimación simple de tokens y compresión de mensajes antiguos. También fue importante coordinar autenticación JWT con Socket.IO para que solo usuarios autorizados pudieran entrar a sus salas y recibir eventos en tiempo real.",
  "what_i_learned": "Aprendí a integrar IA dentro de una experiencia en tiempo real sin tratarla como una respuesta aislada de API. Consolidé patrones de manejo de sockets autenticados, separación entre memoria persistente y memoria activa, diseño de prompts con comportamiento configurable y uso de Redis para estado efímero. También entendí mejor cómo una decisión pequeña de producto, como cuándo debe intervenir la IA, puede afectar bastante la arquitectura y la experiencia de usuario.",
  "would_do_different": "Si lo construyera de nuevo, movería la lógica de intervención de SKY a un servicio más aislado o a una cola para evitar que el flujo del socket dependa directamente de llamadas a OpenAI. También agregaría tests para los disparadores de respuesta, extracción de perfiles y permisos por sala. En frontend, terminaría de conectar la carga de mensajes anteriores y compartiría las definiciones de emociones y roles entre backend y frontend para evitar duplicación.",
  "setup_instructions": "Requisitos previos: Docker, Docker Compose y una API key de OpenAI.\n\n1. Clonar el repositorio:\n   git clone <repo-url>\n   cd me-sky-chat\n\n2. Crear el archivo de variables de entorno:\n   cp .env.example .env\n\n3. Editar .env y configurar al menos:\n   OPENAI_API_KEY=<tu_api_key_de_openai>\n   JWT_SECRET=<secreto_seguro>\n   POSTGRES_URI=postgresql://sky:skypass@postgres:5432/skychat\n   REDIS_URL=redis://redis:6379\n   PORT=3000\n   FRONTEND_URL=http://localhost:5173\n\n4. Levantar los servicios:\n   docker-compose up --build\n\n5. En otra terminal, ejecutar el seed inicial:\n   docker-compose exec backend npm run seed\n\n6. Abrir la app en:\n   http://localhost:5173\n\nCredenciales de prueba incluidas por el seed:\n   nandez / nandez123\n   luna / luna123\n   marco / marco123\n   sofia / sofia123\n\nEl backend queda disponible en http://localhost:3000 y expone /health para verificar estado.",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack"
}
```
