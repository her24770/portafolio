# QuetzalShop — entrada para portafolio

```json
{
  "title": "QuetzalShop",
  "slug": "quetzalshop",
  "description": "Sistema web para gestionar inventario, ventas, compras, clientes y empleados de una tienda, con control de acceso real por roles de base de datos.",
  "content": "QuetzalShop es una aplicación full-stack para administrar la operación de una tienda: productos, categorías, proveedores, clientes, empleados, ventas, compras, historial y reportes. Lo construí como un sistema funcional con login, dashboard protegido por permisos y flujos de negocio completos para registrar ventas y compras que actualizan el inventario automáticamente. El valor principal del proyecto está en que la seguridad no se queda solo en el frontend o en lógica de aplicación: los roles existen directamente en PostgreSQL y el backend valida los permisos reales de cada rol antes de ejecutar operaciones.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Svelte",
    "TypeScript",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Docker"
  ],
  "category": "fullstack",
  "demo_url": "https://quetzalshop.jhgo.online",
  "repo_urls": [
    "https://github.com/her24770/BD-quetzal_shop"
  ],
  "featured": true,
  "order": 0,
  "status": "completed",
  "year": 2026,
  "problem_solved": "Una tienda necesitaba administrar ventas, compras e inventario con permisos claros para cada tipo de empleado.",
  "architecture": "Diseñé el proyecto como una aplicación full-stack separada en tres servicios con Docker: PostgreSQL como base de datos, FastAPI como backend y SvelteKit como frontend. El backend está organizado por rutas, controladores, schemas y capa de consultas, separando la lógica HTTP de la lógica de negocio y del acceso a datos. Para las operaciones CRUD simples usé SQLModel como ORM, mientras que las operaciones críticas y reportes complejos se resolvieron con SQL explícito, vistas y stored procedures. La decisión más importante fue conectar el API con pools distintos según el rol PostgreSQL del usuario autenticado, de forma que los permisos reales de la base de datos fueran parte de la arquitectura y no solo una validación superficial en código.",
  "challenges": "Lo más retador fue hacer que los permisos fueran dinámicos y consistentes entre frontend, backend y PostgreSQL. Tuve que mapear usuarios de aplicación a roles reales de base de datos, crear pools de conexión por rol y consultar information_schema para reflejar cambios de GRANT y REVOKE sin reiniciar el sistema. También fue delicado manejar ventas y compras como transacciones atómicas: los stored procedures validan stock, productos y proveedores antes de escribir, y hacen ROLLBACK cuando una operación no puede completarse.",
  "what_i_learned": "Aprendí a llevar la seguridad de una aplicación más allá del middleware, usando roles, GRANT, REVOKE y conexiones reales por rol en PostgreSQL. También consolidé el uso combinado de ORM y SQL explícito: el ORM funciona bien para CRUD mantenible, pero los stored procedures, vistas y consultas agregadas son mejores para operaciones críticas, reportes y reglas de negocio cercanas a la base de datos.",
  "would_do_different": "Si lo construyera de nuevo, separaría con más claridad las operaciones que usan el pool owner y las que deben ejecutarse estrictamente con el rol activo, para reducir el riesgo de permisos demasiado amplios en consultas de lectura. También agregaría migraciones formales en lugar de depender solo de scripts SQL iniciales, ampliaría las pruebas de integración sobre permisos y stored procedures, y evitaría algunos acoplamientos entre la matriz de permisos del frontend y los nombres internos de tablas.",
  "setup_instructions": "Requisitos previos: Docker, Docker Compose y Git.\n\n1. Clonar el repositorio:\n```bash\ngit clone https://github.com/her24770/BD-quetzal_shop\ncd BD-quetzal_shop\ngit checkout proyecto-3\n```\n\n2. Crear el archivo de variables de entorno:\n```bash\ncp .env.example .env\n```\n\n3. Levantar todos los servicios:\n```bash\ndocker compose up\n```\n\n4. Abrir la aplicación en `http://localhost:3000`.\n\n5. El backend queda disponible en `http://localhost:8000` y la documentación de la API en `http://localhost:8000/docs`.\n\nVariables principales incluidas en `.env.example`: `DB_HOST=db`, `DB_PORT=5432`, `DB_NAME=quetzalshop_db`, `DB_USER=proy3`, `DB_PASSWORD=secret`, `JWT_SECRET`, `APP_PORT=8000`, `FRONTEND_PORT=3000` y `VITE_API_URL=http://localhost:8000`.\n\nUsuarios de prueba: `admin@quetzalshop.com / admin123`, `cajero1@quetzalshop.com / cajero123`, `bodeguero1@quetzalshop.com / bodega123`, `gerente@quetzalshop.com / gerente123`, `auditor@quetzalshop.com / auditor123`.",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack developer"
}
```
