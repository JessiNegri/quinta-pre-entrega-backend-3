# Pre-entrega Módulo 8 — Performance, escalabilidad y Docker

## Performance

Se incorporó paginación en los endpoints que pueden devolver colecciones grandes:

- `GET /api/users`
- `GET /api/orders`
- `GET /api/deliveries`

Los endpoints aceptan los parámetros de consulta `page` y `limit`.

El valor por defecto de `page` es `1` y el valor por defecto de `limit` es `10`.

Las respuestas incluyen información de paginación mediante los campos:

- `page`
- `limit`
- `total`
- `totalPages`

La paginación fue documentada en Swagger para Users, Orders y Deliveries.

También se optimizaron las consultas de los repositorios utilizando `Promise.all()` para ejecutar en paralelo la obtención de los registros y el conteo total de documentos.

Se redujeron payloads innecesarios evitando devolver el campo `password` de los usuarios. Esto también se aplicó a las relaciones pobladas de `customer` en pedidos y `driver` en entregas.

La generación de pedidos mock fue ajustada para garantizar la existencia de usuarios con roles `customer` y `store`, evitando resultados aleatorios inválidos durante los tests.

## Carga de archivos

Se mantienen las restricciones de carga implementadas con Multer:

- Solo se permiten archivos PDF.
- El tamaño máximo permitido es de 5 MB.
- Se manejan de forma controlada los errores por tipo de archivo y tamaño máximo.
- Los archivos generados en `uploads` no se incluyen en el repositorio ni en la imagen Docker.

## Variables de entorno

La aplicación utiliza variables de entorno para su configuración y valida al iniciar que estén presentes las variables requeridas:

- `PORT`
- `MONGODB_URI`
- `NODE_ENV`
- `LOG_LEVEL`

El archivo `.env.example` contiene la estructura necesaria para configurar el proyecto sin incluir información sensible.

Configuración de ejemplo:

```env
PORT=8080
MONGODB_URI=
NODE_ENV=development
LOG_LEVEL=debug
```

El logger utiliza `LOG_LEVEL` para determinar el nivel de logs de la aplicación.

## Health Check

Se incorporó el endpoint:

`GET /health`

Este endpoint permite comprobar el estado de la API sin exponer información sensible.

La respuesta incluye:

- `status`
- `environment`
- `uptime`
- `timestamp`

El health check fue probado correctamente tanto en `development` como en `production`.

## Endpoints internos en producción

Se definió un criterio para los endpoints internos de la aplicación.

Cuando `NODE_ENV=production`:

- `/api/mocks` se encuentra deshabilitado.
- `/api/logger` se encuentra deshabilitado.
- `/api/docs` permanece disponible para consultar la documentación Swagger.
- `/health` permanece disponible para verificar el estado de la aplicación.

Se comprobó que `/api/mocks` y `/api/logger` devuelven `ROUTE_NOT_FOUND` en producción, mientras Swagger y el health check continúan disponibles.

## Docker

El proyecto incorpora un `Dockerfile` para ejecutar ShipNow dentro de un contenedor.

La imagen utiliza Node.js 22 Alpine y configura el directorio de trabajo de la aplicación.

Las dependencias necesarias para producción se instalan mediante:

```bash
npm ci --omit=dev
```

También se incorporó un archivo `.dockerignore` para evitar copiar archivos innecesarios o sensibles a la imagen.

Entre los archivos y directorios excluidos se encuentran:

- `node_modules`
- archivos `.env`
- `.git`
- `logs`
- `uploads`
- `coverage`
- `test`
- archivos temporales

## Construcción de la imagen Docker

Desde la raíz del proyecto se puede construir la imagen mediante:

docker build -t shipnow-api .

La imagen generada se denomina `shipnow-api`.

## Ejecución del contenedor

Para ejecutar la API dentro de Docker utilizando MongoDB instalado en la máquina host se utiliza:

docker run --env-file .env -e MONGODB_URI=mongodb://host.docker.internal:27017/shipnow-api-85760 -p 8080:8080 --name shipnow-container shipnow-api

Se utiliza `host.docker.internal` para permitir que el contenedor acceda al servidor MongoDB que se ejecuta en la máquina host.

La aplicación queda disponible en el puerto `8080`.

## Verificación con Docker

Con la aplicación ejecutándose dentro del contenedor se verificaron correctamente:

- Conexión con MongoDB.
- `GET /health`
- `GET /api/docs`
- `GET /api/users?page=1&limit=2`
- Paginación de Users.
- Paginación de Orders.
- Paginación de Deliveries.
- Documentación de `page` y `limit` en Swagger.

También se ejecutó la aplicación con `NODE_ENV=production` para comprobar el comportamiento de los endpoints internos.

## Tests

Luego de las modificaciones realizadas para esta pre-entrega se ejecutó nuevamente la suite completa de tests funcionales.

Resultado final:

41 passing

Esto permitió comprobar que las optimizaciones y la preparación para Docker no afectaron el funcionamiento de las funcionalidades desarrolladas en los módulos anteriores.