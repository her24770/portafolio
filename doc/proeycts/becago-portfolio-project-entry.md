# BecaGo UVG - Entrada para portafolio

## Resumen

BecaGo UVG es una aplicacion web para que estudiantes becados encuentren actividades, reserven cupos y lleven control de sus horas completadas. El proyecto centraliza el flujo de inscripcion, perfil del estudiante y resumen de progreso en una interfaz sencilla construida con Django.

## Datos principales

- **Titulo:** BecaGo UVG
- **Slug:** `becago-uvg`
- **Categoria:** `fullstack`
- **Estado:** `completed`
- **Anio:** 2025
- **Rol:** Solo dev
- **Equipo:** 1 persona

## Tecnologias

- Python
- Django
- SQLite
- Bootstrap

## Descripcion para card

Plataforma para que estudiantes becados de UVG encuentren actividades, se inscriban y lleven control de sus horas completadas en un solo lugar.

## Contenido para detalle

BecaGo UVG es una aplicacion web para gestionar actividades de horas beca. Los estudiantes pueden registrarse, iniciar sesion, ver actividades disponibles, revisar detalles como fecha, ubicacion, cupos y horas otorgadas, e inscribirse directamente desde la plataforma.

Tambien incluye un perfil de usuario con carrera, contacto e imagen, ademas de un resumen de progreso que calcula horas completadas, horas pendientes y porcentaje de avance usando la informacion registrada en la base de datos y un archivo Excel con las horas requeridas por estudiante.

## Problema resuelto

Los estudiantes becados necesitaban una forma centralizada de encontrar actividades, reservar cupos y dar seguimiento a sus horas de beca.

## Arquitectura

Construí el proyecto como una aplicacion monolitica en Django porque el alcance encajaba bien con un backend integrado, autenticacion lista para usar, panel de administracion y templates renderizados del lado del servidor.

La logica principal vive en una app llamada `tasks`, con modelos para actividades, inscripciones y perfiles. La relacion entre usuarios y actividades se maneja mediante inscripciones, mientras que el progreso de horas se calcula cruzando las actividades completadas con un archivo Excel que contiene las horas requeridas por estudiante.

La interfaz usa templates Django y Bootstrap para mantener una estructura simple. El proyecto tambien incluye configuracion para servir archivos estaticos con WhiteNoise y desplegar con Gunicorn.

## Retos tecnicos

Lo mas delicado fue controlar las inscripciones sin sobrepasar los cupos disponibles. Para resolverlo use `transaction.atomic` y `refresh_from_db` antes de descontar espacios, reduciendo el riesgo de inconsistencias cuando varios usuarios intentan inscribirse al mismo tiempo.

Otro reto fue integrar el calculo de horas con un Excel externo, porque el sistema debia tolerar usuarios no encontrados o archivos faltantes sin romper la experiencia. Tambien agregue validaciones basicas para imagenes de perfil, como tipo de archivo y tamano maximo.

## Aprendizajes

Con este proyecto consolide el uso de Django como framework full-stack: modelos, migraciones, autenticacion, templates, formularios, archivos media y panel de administracion.

Tambien aprendi a conectar datos externos con pandas, generar visualizaciones con Matplotlib dentro de una vista web y preparar una app Django para despliegue usando Gunicorn y WhiteNoise.

## Que haria diferente

Si lo construyera de nuevo, reemplazaria el Excel por un modelo propio en la base de datos para administrar las horas requeridas de forma mas confiable desde el panel admin.

Tambien moveria `SECRET_KEY`, `DEBUG` y `ALLOWED_HOSTS` a variables de entorno, agregaria pruebas para inscripciones y calculo de horas, mejoraria la separacion entre logica de negocio y vistas, y usaria PostgreSQL si el proyecto fuera a manejar usuarios reales en produccion.

## Setup local

### Requisitos previos

- Python 3.11.9 o compatible
- pip
- virtualenv

### Pasos

1. Clonar el repositorio y entrar a la carpeta del proyecto.
2. Crear un entorno virtual:

```bash
python3 -m venv .venv
```

3. Activar el entorno virtual:

```bash
source .venv/bin/activate
```

En Windows:

```bash
.venv\Scripts\activate
```

4. Instalar dependencias:

```bash
pip install -r requirements.txt
```

5. Verificar que exista el archivo `Horas_Beca.xlsx` en la raiz del proyecto con las columnas `Usuario` y `Horas Beca`.
6. Ejecutar migraciones:

```bash
python manage.py migrate
```

7. Crear un superusuario opcional para administrar actividades desde `/admin/`:

```bash
python manage.py createsuperuser
```

8. Levantar el servidor:

```bash
python manage.py runserver
```

9. Abrir la app en:

```text
http://127.0.0.1:8000/
```

No hay variables de entorno obligatorias en la version actual. La configuracion usa SQLite local y valores definidos directamente en `settings.py`.

## JSON listo para insertar

```json
{
  "title": "BecaGo UVG",
  "slug": "becago-uvg",
  "description": "Plataforma para que estudiantes becados de UVG encuentren actividades, se inscriban y lleven control de sus horas completadas en un solo lugar.",
  "content": "BecaGo UVG es una aplicacion web para gestionar actividades de horas beca. Los estudiantes pueden registrarse, iniciar sesion, ver actividades disponibles, revisar detalles como fecha, ubicacion, cupos y horas otorgadas, e inscribirse directamente desde la plataforma. Tambien incluye un perfil de usuario con carrera, contacto e imagen, ademas de un resumen de progreso que calcula horas completadas, horas pendientes y porcentaje de avance usando la informacion registrada en la base de datos y un archivo Excel con las horas requeridas por estudiante.",
  "thumbnail_url": null,
  "images": [],
  "technologies": [
    "Python",
    "Django",
    "SQLite",
    "Bootstrap"
  ],
  "category": "fullstack",
  "demo_url": null,
  "repo_urls": [],
  "featured": false,
  "order": 5,
  "status": "completed",
  "year": 2025,
  "problem_solved": "Los estudiantes becados necesitaban una forma centralizada de encontrar actividades, reservar cupos y dar seguimiento a sus horas de beca.",
  "architecture": "Construi el proyecto como una aplicacion monolitica en Django porque el alcance encajaba bien con un backend integrado, autenticacion lista para usar, panel de administracion y templates renderizados del lado del servidor. Organice la logica principal en una app llamada tasks, con modelos para actividades, inscripciones y perfiles. La relacion entre usuarios y actividades se maneja mediante inscripciones, mientras que el progreso de horas se calcula cruzando las actividades completadas con un archivo Excel que contiene las horas requeridas por estudiante. La interfaz usa templates Django y Bootstrap para mantener una estructura simple, y el proyecto incluye configuracion para servir estaticos con WhiteNoise y desplegar con Gunicorn.",
  "challenges": "Lo mas delicado fue controlar las inscripciones sin sobrepasar los cupos disponibles. Para resolverlo use transaction.atomic y refresh_from_db antes de descontar espacios, reduciendo el riesgo de inconsistencias cuando varios usuarios intentan inscribirse al mismo tiempo. Otro reto fue integrar el calculo de horas con un Excel externo, porque el sistema debia tolerar usuarios no encontrados o archivos faltantes sin romper la experiencia. Tambien trabaje validaciones basicas para imagenes de perfil, como tipo de archivo y tamano maximo.",
  "what_i_learned": "Con este proyecto consolide el uso de Django como framework full-stack: modelos, migraciones, autenticacion, templates, formularios, archivos media y panel de administracion. Tambien aprendi a conectar datos externos con pandas, generar visualizaciones con Matplotlib dentro de una vista web y preparar una app Django para despliegue usando Gunicorn y WhiteNoise.",
  "would_do_different": "Si lo construyera de nuevo, reemplazaria el Excel por un modelo propio en la base de datos para administrar las horas requeridas de forma mas confiable desde el panel admin. Tambien moveria SECRET_KEY, DEBUG y ALLOWED_HOSTS a variables de entorno, agregaria pruebas para inscripciones y calculo de horas, mejoraria la separacion entre logica de negocio y vistas, y usaria PostgreSQL si el proyecto fuera a manejar usuarios reales en produccion.",
  "setup_instructions": "Requisitos previos: Python 3.11.9 o compatible, pip y virtualenv. Pasos: 1. Clonar el repositorio y entrar a la carpeta del proyecto. 2. Crear entorno virtual con python3 -m venv .venv. 3. Activarlo con source .venv/bin/activate en Linux/macOS o .venv\\Scripts\\activate en Windows. 4. Instalar dependencias con pip install -r requirements.txt. 5. Verificar que exista el archivo Horas_Beca.xlsx en la raiz del proyecto con columnas Usuario y Horas Beca. 6. Ejecutar migraciones con python manage.py migrate. 7. Crear un superusuario opcional con python manage.py createsuperuser para administrar actividades desde /admin/. 8. Levantar el servidor con python manage.py runserver. 9. Abrir http://127.0.0.1:8000/. No hay variables de entorno obligatorias en la version actual; la configuracion usa SQLite local y valores definidos directamente en settings.py.",
  "team_size": 1,
  "team_description": null,
  "role": "Solo dev"
}
```
