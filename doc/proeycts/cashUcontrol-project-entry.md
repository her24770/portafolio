# Cash U Control - entrada para portafolio

```json
{
  "title": "Cash U Control",
  "slug": "cash-u-control",
  "description": "Aplicacion web para llevar control de ingresos personales, consultar historial financiero y gestionar el perfil de usuario desde un dashboard sencillo.",
  "content": "Cash U Control es una aplicacion fullstack orientada al control financiero personal. Construi un frontend en React con una interfaz tipo dashboard para login, registro, perfil de usuario e historial de ingresos, conectado a una API REST en Flask. El backend maneja autenticacion con JWT, contrasenas encriptadas, permisos por rol y persistencia en MongoDB. La base del sistema permite registrar ingresos, actualizar el saldo activo del usuario y consultar movimientos; ademas, deja estructurados modulos futuros para egresos, metas, recompensas y consejos financieros.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "React",
    "JavaScript",
    "Flask",
    "Python",
    "MongoDB",
    "Bootstrap"
  ],
  "category": "fullstack",
  "demo_url": null,
  "repo_urls": [],
  "featured": false,
  "order": 6,
  "status": "in_progress",
  "year": 2024,
  "problem_solved": "Los usuarios necesitaban una forma simple de registrar ingresos y consultar su historial financiero sin depender de hojas de calculo manuales.",
  "architecture": "Separe el proyecto en dos aplicaciones: un frontend React y una API REST en Flask. En el frontend use React Router para organizar vistas dentro de un layout de dashboard y Axios para consumir el backend. En la API estructure el codigo por rutas, controladores y configuracion, usando Blueprints de Flask para separar modulos como usuarios, ingresos, egresos, metas, recompensas y consejos. MongoDB fue una buena opcion para iterar rapido con documentos flexibles, mientras que JWT y bcrypt resolvieron autenticacion, sesiones y almacenamiento seguro de contrasenas.",
  "challenges": "Lo mas retador fue conectar correctamente autenticacion, autorizacion y datos de usuario entre frontend y backend. Tuve que manejar tokens JWT, validar acciones segun rol o propietario del recurso, convertir ObjectId de MongoDB y mantener sincronizado el saldo del usuario cuando se registraba un ingreso. Tambien aprendi que el alcance del proyecto podia crecer rapido: varios modulos quedaron estructurados, pero no todos llegaron al mismo nivel de implementacion que usuarios e ingresos.",
  "what_i_learned": "Aprendi a construir una aplicacion fullstack completa conectando React con una API Flask, a proteger endpoints con JWT, a trabajar con MongoDB desde PyMongo y a pensar mejor en permisos por usuario. Tambien consolide la importancia de definir primero el contrato de la API para que el frontend no dependa de endpoints incompletos.",
  "would_do_different": "Si lo construyera de nuevo, definiria desde el inicio un contrato claro para todos los modulos, agregaria variables de entorno para la URL del API en el frontend, documentaria dependencias con un requirements.txt y usaria Docker Compose para levantar Flask y MongoDB juntos. Tambien completaria los CRUD de egresos, metas y recompensas antes de construir sus pantallas, agregaria tests basicos de API y centralizaria Axios con interceptores para enviar el token automaticamente.",
  "setup_instructions": "Requisitos previos: Node.js y npm, Python 3, y una instancia de MongoDB local o en Atlas.\n\nBackend:\n1. Entrar a la carpeta `CashUControl-Back-End/Back-End`.\n2. Crear un entorno virtual: `python -m venv venv`.\n3. Activarlo: `source venv/bin/activate` en Linux/macOS o `venv\\Scripts\\activate` en Windows.\n4. Instalar dependencias: `pip install \"Flask[async]\" PyJWT python-dotenv flask-pymongo flask pymongo bcrypt flask-cors`.\n5. Crear un archivo `.env` con estas variables: `MONGO_URI=<cadena_de_conexion_mongodb>` y `SECRET=<clave_para_jwt>`.\n6. Levantar la API: `python src/app.py`. El backend corre en `http://localhost:5000`.\n\nFrontend:\n1. Entrar a la carpeta `CashUControl-FrontEnd/Front-End`.\n2. Instalar dependencias: `npm install`.\n3. Levantar React: `npm run start`.\n4. Abrir `http://localhost:3000`. El frontend espera que la API este disponible en `http://localhost:5000`.",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack"
}
```
