# Pre-entrega Módulo 3 — Manejo profesional de errores

## Descripción

En esta tercera etapa del proyecto ShipNow API se incorporó un sistema profesional y centralizado para el manejo de errores.

El objetivo principal fue evitar que cada controller o ruta tenga que construir sus propias respuestas de error y centralizar esta responsabilidad en una única capa.

Para esto se implementaron:

* Errores personalizados del dominio.
* Diccionario centralizado de errores.
* Funciones reutilizables para respuestas HTTP.
* Middleware global de manejo de errores.
* Middleware para rutas inexistentes.
* Validaciones dentro de los services.
* Manejo de errores en el módulo de mocking.
* Manejo de IDs de MongoDB inválidos.
* Respuestas de error uniformes y predecibles.

La arquitectura continúa respetando la separación por capas implementada en las entregas anteriores.

---

# Objetivos del módulo

Durante esta pre-entrega se buscó:

* Centralizar el manejo de errores.
* Evitar respuestas de error dispersas en controllers y rutas.
* Crear errores personalizados para representar situaciones del dominio.
* Unificar el formato de las respuestas de error.
* Detectar los errores en la capa correspondiente.
* Delegar la respuesta final al middleware global.
* Validar cantidades recibidas por el módulo de mocks.
* Controlar valores negativos o inválidos.
* Mantener la arquitectura por capas.

---

# Estructura relacionada con el manejo de errores

La estructura incorporada al proyecto es:

src/
│
├── config/
├── constants/
├── controllers/
├── middlewares/
│   ├── errorHandler.js
│   └── notFoundHandler.js
├── mocks/
├── models/
├── repositories/
├── routes/
├── services/
└── utils/
    ├── apiResponse.js
    └── errorDictionary.js

---

# Diccionario de errores

Archivo:

src/utils/errorDictionary.js

Se creó un diccionario centralizado que contiene los errores utilizados por la aplicación.

Cada error define:

* Código.
* Código HTTP.
* Mensaje predeterminado.

Ejemplo:

USER_NOT_FOUND: {
    statusCode: 404,
    message: "Usuario no encontrado"
}

Entre los errores definidos se encuentran:

VALIDATION_ERROR
USER_NOT_FOUND
STORE_NOT_FOUND
ORDER_NOT_FOUND
INVALID_USER_ROLE
INVALID_ORDER_STATUS
ORDER_ITEMS_REQUIRED
USER_ALREADY_EXISTS
INVALID_MOCK_QUANTITY
DRIVER_NOT_FOUND
ROUTE_NOT_FOUND
INTERNAL_SERVER_ERROR

Esto evita repetir mensajes y códigos HTTP en diferentes partes de la aplicación.

---

# Respuestas HTTP

Archivo:

src/utils/apiResponse.js

Se crearon funciones reutilizables para mantener una estructura uniforme en las respuestas.

## Respuestas exitosas

La función:

successResponse()

permite devolver respuestas con el siguiente formato:

{
  "status": "success",
  "message": "Lista de usuarios",
  "payload": []
}

## Respuestas de error

La función:

errorResponse()

genera respuestas con la siguiente estructura:

{
  "status": "error",
  "error": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}

De esta manera, todas las respuestas de error mantienen una estructura clara y predecible.

---

# Errores personalizados

También se creó la función:

createError()

Esta función recibe el código del error definido en el diccionario.

Ejemplo:

throw createError("USER_NOT_FOUND");

El error generado contiene:

* `statusCode`
* `code`
* `message`

Esto permite que el error viaje desde el service hasta el middleware global sin que el controller tenga que decidir cómo responder.

---

# Middleware global de errores

Archivo:

src/middlewares/errorHandler.js

El middleware global recibe los errores generados durante el procesamiento de las solicitudes.

Su responsabilidad es transformar esos errores en respuestas HTTP uniformes.

El flujo implementado es:

Request
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Error
   ↓
next(error)
   ↓
errorHandler
   ↓
Respuesta HTTP

Los controllers ya no responden directamente los errores utilizando:

res.status(500).json(...)

En su lugar, delegan el error al middleware:

catch (error) {
    next(error);
}

---

# Manejo de IDs inválidos

El middleware también contempla los errores generados por Mongoose cuando se recibe un ID con un formato inválido.

Por ejemplo:

GET /api/users/123

Si MongoDB genera un `CastError`, el middleware lo transforma en un error de validación.

Respuesta:

{
  "status": "error",
  "error": "VALIDATION_ERROR",
  "message": "ID invalido"
}

Esto evita mostrar errores internos de Mongoose directamente al cliente.

---

# Middleware de rutas inexistentes

Archivo:

src/middlewares/notFoundHandler.js

Este middleware se encarga de detectar rutas que no existen.

Ejemplo:

GET /api/pepito

La aplicación genera:

createError("ROUTE_NOT_FOUND")

Y la respuesta es:

{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}

---

# Integración en app.js

Los middlewares se registran después de las rutas:

app.use(notFoundHandler);
app.use(errorHandler);

De esta manera:

1. La solicitud intenta encontrar una ruta.
2. Si la ruta no existe, se genera un error de tipo `ROUTE_NOT_FOUND`.
3. Si durante la ejecución ocurre otro error, se propaga mediante `next(error)`.
4. Finalmente, `errorHandler` genera la respuesta correspondiente.

Los endpoints de mocking continúan protegidos para que solamente estén disponibles fuera del entorno de producción.

if (process.env.NODE_ENV !== "production") {
    app.use("/api/mocks", mocksRouter);
}

---

# Manejo de errores en Users

Los errores relacionados con usuarios ahora son detectados en el service.

Por ejemplo:

if (!user) {
    throw createError("USER_NOT_FOUND");
}

También se valida el rol:

if (role && !Object.values(USER_ROLES).includes(role)) {
    throw createError("INVALID_USER_ROLE");
}

El controller no construye la respuesta de error.

Simplemente propaga el error:

catch (error) {
    next(error);
}

---

# Manejo de errores en Stores

El service de tiendas valida diferentes situaciones.

Por ejemplo:

### Tienda inexistente

throw createError("STORE_NOT_FOUND");

### Datos obligatorios faltantes

throw createError("VALIDATION_ERROR");

### Owner inexistente

throw createError("USER_NOT_FOUND");

### Rol inválido para el owner

throw createError("INVALID_USER_ROLE");

Todos estos errores terminan siendo procesados por el middleware global.

---

# Manejo de errores en Orders

El service de pedidos valida diferentes situaciones.

### Pedido inexistente

throw createError("ORDER_NOT_FOUND");

### Usuario inexistente

throw createError("USER_NOT_FOUND");

### Tienda inexistente

throw createError("STORE_NOT_FOUND");

### Items inexistentes o vacíos

throw createError("ORDER_ITEMS_REQUIRED");

### Estado inválido

throw createError("INVALID_ORDER_STATUS");

El controller solamente propaga los errores mediante:

next(error);

---

# Manejo de errores en Mocking

El sistema de mocking creado durante el Módulo 2 también fue adaptado al nuevo sistema de errores.

El archivo principal es:

src/services/mocks.service.js

Ahora el service valida las cantidades recibidas antes de generar información.

Por ejemplo:

if (
    !Number.isInteger(users) ||
    !Number.isInteger(stores) ||
    !Number.isInteger(orders) ||
    users <= 0 ||
    stores <= 0 ||
    orders <= 0
) {
    throw createError("INVALID_MOCK_QUANTITY");
}

Esto permite controlar:

* Cantidades negativas.
* Cantidad cero.
* Valores decimales.
* Valores que no sean números enteros.

---

# Validación de usuarios, tiendas y drivers

Durante la generación de datos se verifica que existan usuarios con los roles necesarios.

Se obtienen:

STORE
CUSTOMER
DRIVER

Si no existen usuarios suficientes para continuar, se genera un error controlado.

Ejemplo:

if (drivers.length === 0) {
    throw createError("DRIVER_NOT_FOUND");
}

---

# Mocking y carga de datos

El endpoint:

POST /api/mocks/generateData

permite generar información de prueba y almacenarla en MongoDB.

Ejemplo:

{
  "users": 10,
  "stores": 5,
  "orders": 20
}

La respuesta exitosa utilizada actualmente es:

{
  "status": "success",
  "message": "Datos de prueba generados correctamente",
  "payload": {
    "users": 10,
    "stores": 1,
    "orders": 20,
    "deliveries": 20
  }
}

La cantidad real de tiendas puede ser menor que la solicitada debido a que las tiendas dependen de la cantidad de usuarios generados con rol `store`.

---

# Deliveries

Además de usuarios, tiendas y pedidos, el sistema de mocking también genera deliveries.

El proceso es:

Usuarios
   ↓
Stores
   ↓
Orders
   ↓
Deliveries

Cada delivery se encuentra asociado a un pedido generado y a un usuario con rol `driver`.

La carga de datos devuelve también la cantidad de deliveries creados:

{
  "users": 10,
  "stores": 1,
  "orders": 20,
  "deliveries": 20
}

---

# Endpoints de Mocking

Base URL:

/api/mocks

## Generar usuarios

GET /api/mocks/mockingusers

También permite indicar una cantidad mediante query parameter:

GET /api/mocks/mockingusers?qty=10

Los datos generados no se almacenan en MongoDB.

---

## Generar pedidos

GET /api/mocks/mockingorders

También permite indicar una cantidad:

GET /api/mocks/mockingorders?qty=10

Los pedidos generados se devuelven como información simulada y no se almacenan en MongoDB.

---

## Generar y guardar datos

POST /api/mocks/generateData

Ejemplo:

{
  "users": 10,
  "stores": 5,
  "orders": 20
}

Este endpoint genera y almacena:

* Usuarios.
* Stores.
* Orders.
* Deliveries.

---

# Pruebas realizadas en Postman

Se realizaron pruebas para comprobar tanto los casos exitosos como los errores controlados.

## Generación correcta de datos

Request:

POST /api/mocks/generateData

Body:

{
  "users": 10,
  "stores": 5,
  "orders": 20
}

Resultado:

{
  "status": "success",
  "message": "Datos de prueba generados correctamente",
  "payload": {
    "users": 10,
    "stores": 1,
    "orders": 20,
    "deliveries": 20
  }
}

---

## Cantidad negativa

Request:

{
  "users": -5,
  "stores": 5,
  "orders": 20
}

La solicitud es rechazada por el service mediante:

createError("INVALID_MOCK_QUANTITY")

El error es procesado posteriormente por el middleware global.

---

## Cantidad cero

Request:

{
  "users": 0,
  "stores": 5,
  "orders": 20
}

La solicitud también es rechazada debido a que las cantidades deben ser mayores que cero.

---

## Ruta inexistente

Request:

GET /api/pepito

La aplicación responde mediante `notFoundHandler`.

Ejemplo:

{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}

---

## ID inválido

Request:

GET /api/users/123

Mongoose genera un `CastError`.

El middleware `errorHandler` detecta este error y lo transforma en una respuesta controlada:

{
  "status": "error",
  "error": "VALIDATION_ERROR",
  "message": "ID invalido"
}

---

# Arquitectura final

La arquitectura del proyecto mantiene la separación por capas:

Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
MongoDB


El manejo de errores se integra de manera transversal:

Services
   ↓
createError()
   ↓
Controllers
   ↓
next(error)
   ↓
errorHandler
   ↓
HTTP Response

Esto permite mantener separadas las responsabilidades.

Los services detectan las situaciones de error relacionadas con la lógica de negocio.

Los controllers no deciden cómo responder los errores.

El middleware global es responsable de transformar los errores en respuestas HTTP.

---

# Resumen de la Pre-entrega 3

Durante este módulo se incorporó un sistema profesional y centralizado de manejo de errores.

Se implementó:

✔ Diccionario centralizado de errores.

✔ Errores personalizados mediante `createError()`.

✔ Middleware global `errorHandler`.

✔ Middleware `notFoundHandler`.

✔ Respuestas HTTP uniformes.

✔ Validación de IDs inválidos de MongoDB.

✔ Validaciones dentro de los services.

✔ Eliminación de respuestas de error directas en los controllers.

✔ Manejo centralizado de errores del módulo de mocking.

✔ Validación de cantidades inválidas.

✔ Validación de valores negativos y cero.

✔ Validación de usuarios, stores y drivers necesarios para los mocks.

✔ Generación de deliveries.

✔ Pruebas de casos válidos e inválidos mediante Postman.

La aplicación queda preparada para continuar incorporando nuevas funcionalidades manteniendo una arquitectura organizada y un sistema de errores consistente.
