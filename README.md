# Pre-entrega Módulo 6 — Testing funcional con Mocha, Chai y Supertest

En esta pre-entrega se incorporó una suite de **tests funcionales automatizados** para validar los endpoints principales de la API ShipNow.

Los tests comprueban tanto casos exitosos como errores esperados, verificando los códigos HTTP, la estructura de las respuestas y las propiedades principales del `body`.

## Tecnologías utilizadas

Para la implementación de los tests se utilizaron:

* **Mocha:** organización y ejecución de la suite de tests.
* **Chai:** assertions y validación de resultados.
* **Supertest:** realización de peticiones HTTP directamente sobre la aplicación Express.
* **Cross-env:** configuración de `NODE_ENV=test` al ejecutar la suite.
* **MongoDB / Mongoose:** base de datos independiente para el entorno de testing.

## Instalación

Instalar las dependencias del proyecto:

npm install

Las herramientas utilizadas para testing se encuentran configuradas como dependencias de desarrollo del proyecto.

## Ejecución de los tests

Para ejecutar toda la suite:

npm test

El script configurado en `package.json` es:

"test": "cross-env NODE_ENV=test mocha --file test/test.setup.js test/**/*.test.js"

Esto permite ejecutar Mocha utilizando automáticamente el entorno de testing.

## Entorno de testing

El proyecto utiliza un entorno separado del entorno de desarrollo.

El archivo utilizado es:

.env.test

Ejemplo de configuración:

PORT=8081
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow-test
NODE_ENV=test

La base de datos utilizada para los tests es independiente:

shipnow-test

De esta manera, las pruebas no modifican ni dependen de los datos utilizados durante el desarrollo normal de la aplicación.

> Para ejecutar los tests localmente es necesario tener MongoDB disponible y configurar las variables de entorno correspondientes.

El archivo `.env.test` no debe subirse al repositorio. Cada desarrollador debe crear su propia configuración local utilizando las variables necesarias.

## Separación de Express y servidor

La aplicación Express se encuentra separada del levantamiento del servidor:

src/
├── app.js
└── server.js

`app.js` configura y exporta la aplicación Express, mientras que `server.js` se encarga de iniciar el servidor.

Gracias a esta separación, Supertest puede importar directamente:

import app from "../src/app.js";

sin necesidad de levantar manualmente un puerto durante los tests.

## Estructura de tests

La suite se encuentra dentro de:

test/
├── app.test.js
├── logger.test.js
├── mocks.test.js
├── orders.test.js
├── swagger.test.js
├── test.setup.js
└── users.test.js

## Módulo Users

Se prueban los endpoints principales de usuarios.

Casos cubiertos:

* Obtener la lista de usuarios.
* Crear un usuario correctamente.
* Obtener un usuario existente por ID.
* Intentar crear un usuario con datos incompletos.
* Intentar crear un usuario con un rol inválido.
* Consultar un usuario inexistente.
* Consultar utilizando un ID inválido.
* Validar la estructura del `body`.
* Validar propiedades importantes del usuario.

Entre los códigos HTTP comprobados se encuentran:

200 OK
201 Created
400 Bad Request
404 Not Found

## Módulo Orders

Se prueban las operaciones principales de pedidos.

Casos cubiertos:

* Obtener la lista de pedidos.
* Crear un pedido con datos válidos.
* Obtener un pedido por ID.
* Actualizar el estado de un pedido.
* Intentar crear un pedido con datos incompletos.
* Consultar un pedido inexistente.
* Intentar actualizar un pedido con un estado inválido.
* Consultar utilizando un ID inválido.
* Validar la estructura y propiedades principales del pedido.

La actualización de estado se realiza mediante:

PUT /api/orders/:oid/status

Los datos necesarios para crear pedidos durante los tests se generan dentro del propio entorno de testing, evitando depender de registros cargados manualmente.

## Módulo Mocking

Se validan los endpoints:

GET /api/mocks/mockingusers
GET /api/mocks/mockingorders
POST /api/mocks/generateData

### Generación de usuarios mock

Se comprueba:

* Respuesta HTTP correcta.
* Estructura de la respuesta.
* Existencia de `status` y `payload`.
* Que `payload` sea un arreglo.
* Cantidad solicitada de usuarios.
* Propiedades principales de los usuarios generados.

También se prueban cantidades inválidas:

qty=0
qty=-1
qty=abc

Estos casos deben responder con:

400 Bad Request
INVALID_MOCK_QUANTITY

### Generación de pedidos mock

Se comprueba:

* Respuesta HTTP correcta.
* Estructura del `body`.
* Cantidad solicitada de pedidos.
* Propiedades principales de los pedidos generados.

También se prueban cantidades inválidas, verificando el formato de error definido por la aplicación.

### Generación de datos de prueba

También se prueba:

POST /api/mocks/generateData

La prueba genera cantidades controladas de usuarios, tiendas, pedidos y entregas.

Se valida:

* Código HTTP de creación.
* `status`.
* `message`.
* `payload`.
* Cantidad de usuarios generados.
* Cantidad de tiendas generadas.
* Cantidad de pedidos generados.
* Cantidad de entregas generadas.

También se prueba el comportamiento ante cantidades inválidas.

## Logger

Se prueba el endpoint:

GET /api/logger/test

El test comprueba:

* Código HTTP `200`.
* Respuesta de tipo objeto.
* `status: "success"`.
* Existencia de `message`.
* Existencia de `payload`.
* Existencia del arreglo `levels`.
* Niveles de logging configurados.

Entre los niveles comprobados se encuentran:

debug
http
info
warning
error
fatal

## Swagger

La suite incluye una prueba funcional para comprobar que la documentación Swagger se encuentra disponible.

Se valida:

* Acceso correcto a la documentación.
* Código HTTP `200`.
* Respuesta con contenido HTML.

## Rutas inexistentes

También se prueba el comportamiento de la aplicación cuando se solicita una ruta inexistente.

La API debe responder:

404 Not Found

manteniendo el formato de errores definido por ShipNow:

{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}

# Validación de errores

Los tests no comprueban únicamente que una petición falle.

También verifican:

* Código HTTP correspondiente.
* `status: "error"`.
* Código de error.
* Mensaje de error.
* Estructura del `body`.

Entre los errores cubiertos se encuentran:

VALIDATION_ERROR
INVALID_USER_ROLE
USER_NOT_FOUND
ORDER_NOT_FOUND
INVALID_ORDER_STATUS
INVALID_MOCK_QUANTITY
ROUTE_NOT_FOUND

## Datos controlados y repetibles

Los tests utilizan datos creados específicamente dentro del entorno de testing.

Por ejemplo, para probar la creación de pedidos se generan previamente los usuarios y la tienda necesarios para realizar la operación.

De esta manera, la suite:

* No depende de datos cargados manualmente.
* No utiliza información del entorno de desarrollo.
* Puede ejecutarse nuevamente de forma independiente.
* Mantiene los datos de prueba aislados.

## Limpieza de la base de testing

La configuración ubicada en:

test/test.setup.js

se encarga de conectar la suite con la base de testing.

Antes de comenzar las pruebas se eliminan los registros existentes de las colecciones utilizadas y, al finalizar, los datos generados durante los tests vuelven a eliminarse.

Finalmente se cierra la conexión con MongoDB.

Esto evita que una ejecución afecte a la siguiente y mantiene los tests repetibles.

## Resultado

La suite funcional cubre los principales comportamientos de ShipNow mediante casos exitosos y errores esperados.

Se encuentran cubiertos:

* Users
* Orders
* Mocks
* Logger
* Swagger
* Manejo global de rutas inexistentes
* Formato global de errores
* Entorno independiente de testing
* Limpieza de datos de prueba

La suite puede ejecutarse completa mediante:

npm test

## Autor

Jessica Negri
