 # ED Discover

  - `title`: `ED Discover`
  - `slug`: `ed-discover`
  - `description`: Plataforma de descubrimiento musical que recomienda canciones y amistades a partir de gustos, épocas, géneros y
  patrones de escucha modelados como un grafo.
  - `thumbnail_url`: `null`
  - `images`: `[]`
  - `technologies`: `React`, `TypeScript`, `Node.js`, `Express`, `Neo4j`, `Material UI`, `Vite`
  - `category`: `fullstack`
  - `demo_url`: `null`
  - `repo_urls`:
    - `https://github.com/her24770/ED-Discover-FrontEnd`
    - `https://github.com/her24770/ED-Discover-BackEnd`
  - `featured`: `true`
  - `order`: `2`
  - `status`: `completed`
  - `year`: `2026`

  ## Content

  ED Discover es una aplicación web para explorar música de forma personalizada. El usuario puede registrarse, iniciar sesión, ver sus
  canciones, reproducir videos asociados desde YouTube y recibir recomendaciones basadas en su historial musical. La app también
  muestra un perfil de intereses con artistas, géneros, emociones, álbumes y sugerencias de amistad calculadas desde las relaciones del
  usuario dentro de Neo4j.

  ## Technical Details

  - `problem_solved`: Los usuarios necesitaban una forma personalizada de descubrir música y personas con gustos similares usando
  relaciones reales entre canciones, géneros, artistas y hábitos de escucha.
  - `architecture`: Separé el proyecto en un frontend React con Vite y TypeScript y un backend Express independiente. Elegí Neo4j
  porque el dominio del proyecto es naturalmente relacional: usuarios escuchan canciones, siguen artistas, sienten emociones, tienen
  géneros favoritos y se conectan con otros usuarios. La API REST expone endpoints por recurso y concentra las consultas Cypher en
  controladores, dejando que Neo4j calcule recomendaciones por popularidad, género, época y similitud entre usuarios.
  - `challenges`: Lo más difícil fue modelar el sistema de recomendaciones como un grafo útil y no solo como tablas equivalentes. Tuve
  que definir nodos y relaciones con pesos, consultar preferencias agregadas con Cypher y transformar los tipos numéricos de Neo4j para
  que el frontend pudiera mostrarlos correctamente. También resolví la sincronización entre interacción del usuario y recomendaciones
  incrementando el peso de escucha cada vez que se reproduce una canción.
  - `what_i_learned`: Consolidé el uso de Neo4j y Cypher para resolver problemas donde las relaciones son más importantes que los
  registros aislados. También practiqué la integración full-stack entre React y Express, el manejo de autenticación básica con bcrypt y
  la construcción de interfaces basadas en datos reales de una API.
  - `would_do_different`: Si lo construyera de nuevo, separaría la lógica de negocio en servicios o repositorios en lugar de dejarla
  dentro de los controladores, agregaría JWT para sesiones reales, movería la URL del backend a variables de entorno en el frontend,
  prepararía seeds y migraciones para Neo4j y dockerizaría todo para levantar frontend, backend y base de datos con un solo comando.
  - `setup_instructions`:

  ```txt
  Requisitos previos: Node.js 20 o superior, npm, Yarn 1.x y una instancia de Neo4j local o en Aura con los datos del proyecto
  cargados.

  Backend:
  1. Entrar a ED-Discover-BackEnd.
  2. Ejecutar npm install.
  3. Crear un archivo .env en la raíz del backend con estas variables: NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD y opcionalmente
  NEO4J_DATABASE.
  4. Si la base está vacía, cargar el esquema y datos desde los archivos Cypher en ED-Discover-BackEnd/querys.
  5. Ejecutar npm run dev para desarrollo o npm start para producción local. El backend corre por defecto en http://localhost:3000.

  Frontend:
  1. Entrar a ED-Discover-FrontEnd.
  2. Ejecutar yarn install.
  3. Asegurarse de que el backend esté corriendo en http://localhost:3000, ya que las llamadas están configuradas directamente hacia
  esa URL.
  4. Ejecutar yarn dev.
  5. Abrir la URL que muestre Vite, normalmente http://localhost:5173.

  ## Team

  - team_size: 2
  - team_description: Trabajé en equipo en un proyecto académico de Estructura de Datos; mi aporte se enfocó en integrar el frontend
    con el backend, construir endpoints sobre Neo4j y conectar las recomendaciones con la experiencia de usuario.

  - role: Full-stack developer

