# ShipNow API

API REST backend desarrollada para la gestión de un sistema de logística y envíos.

ShipNow permite administrar usuarios, tiendas, pedidos y entregas, incorporando una arquitectura por capas, generación de datos simulados, manejo global de errores, logging, documentación con Swagger, testing funcional, carga de archivos, paginación, health check y contenerización con Docker.

El proyecto fue desarrollado con Node.js, Express y MongoDB, buscando mantener una estructura organizada, modular y preparada para distintos entornos de ejecución.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript ES Modules
- dotenv
- bcryptjs
- Faker
- Winston
- Swagger / OpenAPI
- Multer
- Mocha
- Chai
- Supertest
- Docker
- Docker Compose

---

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar las responsabilidades de la aplicación.

El flujo principal es:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
MongoDB
```

### Routes

Definen los endpoints disponibles y conectan cada solicitud con su controller correspondiente.

### Controllers

Reciben las solicitudes HTTP, delegan la lógica al service y construyen las respuestas de la API.

### Services

Contienen la lógica de negocio, validaciones y reglas de cada módulo.

### Repositories

Centralizan el acceso a la base de datos mediante los modelos de Mongoose.

### Models

Definen los schemas y modelos utilizados para almacenar información en MongoDB.

Esta separación evita incluir lógica de negocio o acceso directo a la base de datos dentro de los routers.

---

## Estructura general del proyecto

```text
src/
├── config/
├── constants/
├── controllers/
├── middlewares/
├── mocks/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js

test/
├── app.test.js
├── deliveries.test.js
├── health.test.js
├── logger.test.js
├── mocks.test.js
├── orders.test.js
├── swagger.test.js
├── uploads.test.js
├── users.test.js
└── test.setup.js

Dockerfile
docker-compose.yml
.dockerignore
.env.example
.gitignore
package.json
README.md
```

---

## Variables de entorno

El proyecto utiliza variables de entorno centralizadas.

Se incluye un archivo `.env.example` como referencia.

```env
PORT=8080
MONGODB_URI=
NODE_ENV=development
LOG_LEVEL=debug
```

Para ejecutar el proyecto localmente se debe crear un archivo `.env` a partir de `.env.example` y configurar `MONGODB_URI` con la conexión correspondiente a MongoDB.

Ejemplo para una instancia local:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
LOG_LEVEL=debug
```

El archivo `.env` real no debe subirse al repositorio.

El entorno de testing utiliza una configuración independiente mediante `.env.test`, permitiendo separar la base de datos utilizada durante las pruebas de la base de desarrollo.

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Luego crear el archivo `.env` y configurar las variables necesarias.

---

## Ejecución en desarrollo

Para ejecutar la API utilizando Nodemon:

```bash
npm run dev
```

La aplicación queda disponible por defecto en:

```text
http://localhost:8080
```

Para ejecutar la aplicación sin Nodemon:

```bash
npm start
```

---

## Health Check

La API incluye un endpoint de health check que permite comprobar rápidamente que el servicio está funcionando.

```http
GET /health
```

Ejemplo de respuesta:

```json
{
  "status": "success",
  "environment": "development",
  "uptime": 72.74,
  "timestamp": "2026-08-18T21:14:09.476Z"
}
```

El endpoint informa:

- estado del servicio;
- entorno actual;
- tiempo de actividad;
- timestamp de la respuesta.

No expone credenciales ni información sensible.

---

## Documentación Swagger

La documentación interactiva de la API está disponible en:

```text
http://localhost:8080/api/docs
```

Swagger utiliza OpenAPI 3.0 y documenta los principales módulos de ShipNow:

- Users
- Stores
- Orders
- Deliveries
- Mocks
- Logger
- Health
- carga de documentos
- carga de comprobantes

También incluye schemas reutilizables, respuestas exitosas, respuestas de error, parámetros de paginación y carga de archivos mediante `multipart/form-data`.

---

## Endpoints principales

### Health

```http
GET /health
```

### Users

```http
GET    /api/users
GET    /api/users/:uid
POST   /api/users
PUT    /api/users/:uid
DELETE /api/users/:uid
```

La consulta general de usuarios admite paginación mediante:

```text
?page=1&limit=10
```

### Documentos de usuarios

```http
POST /api/users/:uid/documents
```

Permite asociar documentos PDF a usuarios mediante Multer.

### Stores

```http
GET    /api/stores
GET    /api/stores/:sid
POST   /api/stores
PUT    /api/stores/:sid
DELETE /api/stores/:sid
```

### Orders

```http
GET    /api/orders
GET    /api/orders/:oid
POST   /api/orders
PATCH  /api/orders/:oid/status
DELETE /api/orders/:oid
```

La consulta general admite paginación:

```text
?page=1&limit=10
```

Los pedidos utilizan estados controlados por constantes del proyecto.

### Deliveries

```http
GET    /api/deliveries
GET    /api/deliveries/:did
POST   /api/deliveries
PATCH  /api/deliveries/:did/status
DELETE /api/deliveries/:did
```

La consulta general admite paginación:

```text
?page=1&limit=10
```

Los estados de las entregas permiten representar el seguimiento del proceso logístico desde su creación hasta su entrega o cancelación.

### Comprobantes de entregas

```http
POST /api/deliveries/:did/proof
```

Permite cargar y asociar un comprobante PDF a una entrega existente.

### Mocks

El módulo de mocking permite generar datos simulados consistentes con los modelos reales.

Entre los endpoints disponibles se encuentran:

```http
GET  /api/mocks/mockingusers
GET  /api/mocks/mockingorders
POST /api/mocks/generateData
```

Los mocks utilizan Faker y las constantes definidas por el proyecto para generar roles, estados y prioridades válidas.

### Logger

```http
GET /api/logger/test
```

Permite validar el funcionamiento del sistema de logging durante el desarrollo.

Los endpoints internos de mocks y logger no se habilitan cuando la aplicación se ejecuta en ambiente de producción.

Para consultar la documentación completa de parámetros, cuerpos de solicitud y respuestas, utilizar Swagger en `/api/docs`.

---

## Manejo global de errores

ShipNow utiliza un middleware global de errores para mantener respuestas consistentes en toda la API.

El formato general es:

```json
{
  "status": "error",
  "error": "ERROR_CODE",
  "message": "Mensaje descriptivo"
}
```

El proyecto contempla errores del dominio como:

- recursos inexistentes;
- IDs inválidos;
- datos incompletos;
- roles inválidos;
- estados inválidos;
- archivos requeridos;
- tipos de archivo no permitidos;
- archivos demasiado grandes;
- cantidades inválidas para generación de mocks;
- rutas inexistentes.

Esto evita implementar respuestas de error diferentes en cada endpoint.

---

## Logging

El proyecto utiliza Winston como sistema centralizado de logging.

Se registran eventos relevantes de la aplicación utilizando diferentes niveles de log.

En desarrollo se dispone de salida por consola para facilitar el seguimiento de la aplicación.

Los archivos generados dentro de `logs/` son archivos de ejecución y no forman parte del repositorio.

La carpeta se encuentra ignorada mediante `.gitignore`.

---

## Carga de archivos

La API utiliza Multer para administrar la carga de archivos.

Se contemplan principalmente:

- documentos asociados a usuarios;
- licencias;
- comprobantes asociados a entregas.

Los archivos permitidos son PDF.

El sistema valida:

- existencia del archivo;
- campo utilizado;
- tipo MIME;
- tipo de documento;
- tamaño máximo permitido.

El límite configurado es de:

```text
5 MB
```

Además del archivo físico, la API almacena metadata asociada en la entidad correspondiente.

Entre los datos registrados pueden encontrarse:

```text
originalName
fileName
path
mimetype
size
documentType
```

Las carpetas y archivos generados localmente dentro de `uploads/` no se suben al repositorio.

---

## Paginación y performance

Los endpoints que pueden devolver colecciones grandes utilizan paginación.

Actualmente se aplica a:

```http
GET /api/users
GET /api/orders
GET /api/deliveries
```

Ejemplo:

```http
GET /api/users?page=1&limit=10
```

La respuesta incluye información de paginación:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

También se limita el tamaño máximo de las consultas y de los archivos cargados para evitar respuestas o cargas sin control.

---

## Testing funcional

La API cuenta con una suite de tests funcionales implementada con:

- Mocha
- Chai
- Supertest

Para ejecutar todos los tests:

```bash
npm test
```

La suite utiliza un entorno de testing separado del entorno de desarrollo.

Actualmente se validan:

- rutas generales;
- health check;
- usuarios;
- pedidos;
- entregas;
- mocking;
- logger;
- Swagger;
- carga de archivos;
- casos exitosos;
- errores esperados.

También se cubre el flujo principal de entregas:

```text
crear entrega
→ obtener entrega
→ actualizar estado
→ validar errores
→ eliminar entrega
```

Estado de la suite al momento de la entrega:

```text
53 passing
```

---

## Docker

ShipNow puede ejecutarse dentro de un contenedor Docker.

El proyecto incluye:

```text
Dockerfile
.dockerignore
docker-compose.yml
```

El `Dockerfile` utiliza una estrategia multi-stage para separar la instalación de dependencias de la imagen final utilizada para ejecutar la aplicación.

---

## Construir la imagen Docker

Para construir manualmente la imagen:

```bash
docker build -t shipnow-api .
```

Luego puede ejecutarse proporcionando las variables de entorno necesarias.

---

## Docker Compose

Docker Compose permite levantar de forma conjunta:

- ShipNow API;
- MongoDB.

Para construir y levantar los servicios:

```bash
docker compose up --build
```

También puede ejecutarse:

```bash
docker-compose up --build
```

en instalaciones que utilicen el comando clásico de Compose.

La API queda disponible en:

```text
http://localhost:8080
```

MongoDB utiliza el puerto:

```text
27017
```

El servicio MongoDB incluye un healthcheck.

La API depende del estado saludable de MongoDB, evitando iniciar la aplicación antes de que la base de datos esté disponible.

Para comprobar el estado de los servicios:

```bash
docker compose ps
```

Se espera un estado similar a:

```text
shipnow-api     Up
shipnow-mongo   Up (healthy)
```

Para detener los servicios:

```bash
docker compose down
```

---

## Ejecución en producción

En ambiente de producción:

```env
NODE_ENV=production
```

La aplicación mantiene disponibles los endpoints necesarios para operar y supervisar la API.

Los endpoints internos destinados a desarrollo, como mocks y logger, se encuentran deshabilitados en producción.

Por ejemplo, una consulta a un endpoint interno deshabilitado responde utilizando el manejo global de rutas inexistentes:

```json
{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}
```

El health check permanece disponible para comprobar el estado del servicio.

---

## Seguridad y archivos ignorados

El repositorio utiliza `.gitignore` para evitar versionar archivos locales o sensibles.

No se incluyen:

```text
node_modules/
.env
.env.test
logs/
uploads/
coverage/
archivos temporales
```

El archivo `.env.example` sí se incluye porque funciona como guía de configuración y no contiene credenciales reales.

`.dockerignore` también evita copiar archivos innecesarios o sensibles durante la construcción de la imagen Docker.

---

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

### Producción / ejecución normal

```bash
npm start
```

### Tests

```bash
npm test
```

---

## Respuestas de la API

Las respuestas exitosas mantienen una estructura consistente.

Ejemplo:

```json
{
  "status": "success",
  "message": "Operación realizada correctamente",
  "payload": {}
}
```

Las respuestas de error utilizan:

```json
{
  "status": "error",
  "error": "ERROR_CODE",
  "message": "Mensaje descriptivo"
}
```

---

## Funcionalidades principales

ShipNow integra en un único proyecto:

- arquitectura por capas;
- persistencia con MongoDB y Mongoose;
- CRUD de las entidades principales;
- gestión de estados de pedidos y entregas;
- generación de datos mock;
- carga de datos de prueba;
- manejo global de errores;
- errores personalizados;
- logging con Winston;
- documentación Swagger;
- testing funcional automatizado;
- carga de archivos con Multer;
- validación de archivos PDF;
- límite de tamaño de uploads;
- almacenamiento de metadata de archivos;
- paginación;
- health check;
- configuración por variables de entorno;
- separación de entornos;
- control de endpoints internos en producción;
- Docker multi-stage;
- Docker Compose;
- MongoDB contenerizado con healthcheck.

---

## Estado del proyecto

ShipNow se encuentra preparado para ser instalado, ejecutado, probado y revisado directamente desde el repositorio.

Para una revisión rápida se recomienda seguir este orden:

```text
1. Configurar las variables de entorno
2. Instalar las dependencias
3. Ejecutar la API
4. Probar GET /health
5. Abrir /api/docs
6. Probar los endpoints principales
7. Ejecutar npm test
8. Opcionalmente ejecutar el proyecto mediante Docker Compose
```

La documentación detallada de cada endpoint se encuentra disponible mediante Swagger.