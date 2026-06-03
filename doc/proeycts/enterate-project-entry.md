# Entérate - entrada para portafolio

```json
{
  "title": "Entérate",
  "slug": "enterate",
  "description": "Plataforma para reportar y consultar fenómenos naturales, accidentes y publicaciones comunitarias en un solo lugar. Combina eventos, comentarios y notificaciones para mantener informada a la población.",
  "content": "Entérate es una aplicación fullstack pensada para comunicar a la población sobre fenómenos, emergencias y accidentes cercanos. El sistema permite registrar usuarios, crear eventos geolocalizados, publicar reportes asociados a esos eventos, comentar publicaciones y consultar notificaciones. Construí una API REST para centralizar la lógica y una interfaz web con PrimeFaces para que el usuario pueda autenticarse, ver eventos, crear publicaciones y participar con comentarios.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Java",
    "Spring Boot",
    "PrimeFaces",
    "SQL Server",
    "Maven"
  ],
  "category": "fullstack",
  "demo_url": null,
  "repo_urls": [
    "https://github.com/her24770/Enterate-Back-End",
    "https://github.com/her24770/Enterate-Front-End"
  ],
  "featured": false,
  "order": 4,
  "status": "completed",
  "year": 2024,
  "problem_solved": "La población no tenía un canal centralizado para reportar, consultar y comentar emergencias o accidentes cercanos.",
  "architecture": "Separé el proyecto en dos aplicaciones: un backend Spring Boot y un frontend JSF/PrimeFaces. El backend está organizado por capas, con controladores REST para exponer endpoints, servicios para encapsular la lógica, repositorios JPA para el acceso a SQL Server y DTOs para transportar datos entre la API y la interfaz. El frontend consume esos endpoints por HTTP desde beans de JSF y mantiene la sesión del usuario para mostrar eventos, publicaciones y comentarios. Elegí esta estructura porque me permitió practicar una arquitectura fullstack clásica en Java, mantener la lógica de datos fuera de la vista y reutilizar el backend para varios módulos funcionales.",
  "challenges": "Lo más difícil fue conectar correctamente el frontend JSF con la API REST y mantener consistentes los nombres de campos entre modelos, DTOs, JSON manual y tablas de SQL Server. También implicó manejar fechas en formato ISO, mapear respuestas JSON con Jackson y coordinar entidades relacionadas como publicaciones, eventos, usuarios y comentarios. Resolverlo me obligó a ordenar mejor las capas y a estandarizar las respuestas del backend con un objeto común.",
  "what_i_learned": "Aprendí a construir una aplicación Java de extremo a extremo usando Spring Boot, JPA, SQL Server y PrimeFaces. También consolidé conceptos de APIs REST, separación por capas, consumo HTTP desde una interfaz JSF, manejo de sesiones, serialización JSON y modelado de relaciones básicas entre entidades.",
  "would_do_different": "Si lo construyera desde cero, usaría variables de entorno reales en lugar de credenciales fijas, agregaría migraciones con Flyway o Liquibase, centralizaría el cliente HTTP del frontend para no repetir lógica, mejoraría la autenticación con JWT o sesiones más seguras y agregaría Docker para levantar backend, frontend y base de datos con un solo comando. También limpiaría los artefactos del template de PrimeFaces para dejar solo las pantallas propias del proyecto.",
  "setup_instructions": "Requisitos previos: JDK 17, Maven, SQL Server local y un servidor compatible con aplicaciones WAR Jakarta/JSF para el frontend. 1. Crear la base de datos SQL Server `enterateBD`. 2. Ejecutar el script `Enterate-Back-End/SQL/query completo.sql` para crear las tablas principales. 3. Verificar las credenciales del perfil `dev` en `Enterate-Back-End/pom.xml`: URL `jdbc:sqlserver://localhost:1433;databaseName=enterateBD;encrypt=true;trustServerCertificate=true;`, usuario `sa`, contraseña `admin` y puerto `9001`. 4. Levantar el backend con `cd Enterate-Back-End` y `./mvnw spring-boot:run -Pdev`. La API queda disponible en `http://localhost:9001/enterate` y Swagger en `http://localhost:9001/enterate/swagger-ui.html`. 5. Construir el frontend con `cd Enterate-Front-End` y `mvn clean package`. 6. Desplegar el WAR generado en `Enterate-Front-End/target/CGB-BanReservas-5.0.0.war` en el servidor de aplicaciones. 7. Abrir la página de login del frontend y confirmar que puede consumir la API en `http://localhost:9001/enterate`.",
  "team_size": 1,
  "team_description": null,
  "role": "Full-stack"
}
```
