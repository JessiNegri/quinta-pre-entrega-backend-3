# Pre-entrega Módulo 5: Documentación profesional de API con Swagger

## ShipNow API

API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, tiendas, pedidos y entregas.

En esta pre-entrega se incorpora documentación interactiva de la API utilizando Swagger/OpenAPI, permitiendo consultar y probar los endpoints directamente desde el navegador.

---

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Swagger / OpenAPI
* Swagger UI
* Faker.js
* bcryptjs
* Winston
* dotenv

---

## Documentación con Swagger

La documentación interactiva de la API está disponible en:

`http://localhost:8080/api/docs`

Desde Swagger UI se pueden consultar y probar los endpoints de los diferentes módulos de la aplicación.

La configuración de Swagger se encuentra separada de la lógica de las rutas.

---

## Módulos documentados

La documentación está organizada mediante los siguientes tags:

* Users
* Orders
* Deliveries
* Mocks
* Logger

Cada endpoint documentado incluye, según corresponda:

* Método HTTP
* Ruta
* Descripción
* Parámetros
* Request Body
* Respuesta exitosa
* Posibles errores

---

## Endpoints principales

### Users

Permite gestionar los usuarios de ShipNow.

* `GET /api/users`
* `GET /api/users/{uid}`
* `POST /api/users`
* `PUT /api/users/{uid}`
* `DELETE /api/users/{uid}`

### Stores

Permite gestionar las tiendas asociadas a los usuarios.

* `GET /api/stores`
* `GET /api/stores/{sid}`
* `POST /api/stores`
* `PUT /api/stores/{sid}`
* `DELETE /api/stores/{sid}`

### Orders

Permite gestionar los pedidos.

* `GET /api/orders`
* `GET /api/orders/{oid}`
* `POST /api/orders`
* `PATCH /api/orders/{oid}/status`
* `DELETE /api/orders/{oid}`

### Deliveries

Permite gestionar las entregas y su estado.

* `GET /api/deliveries`
* `GET /api/deliveries/{did}`
* `POST /api/deliveries`
* `PATCH /api/deliveries/{did}/status`
* `DELETE /api/deliveries/{did}`

### Mocks

Permite generar datos simulados para realizar pruebas sin necesidad de cargarlos manualmente.

* `GET /api/mocks/users`
* `GET /api/mocks/orders`
* `POST /api/mocks/seed`

El endpoint `/api/mocks/seed` permite generar e insertar datos de prueba en MongoDB.

Ejemplo de body:

{
  "users": 10,
  "stores": 5,
  "orders": 20
}

La respuesta informa la cantidad de usuarios, tiendas, pedidos y entregas generadas.

Ejemplo:

{
  "status": "success",
  "message": "Datos de prueba generados correctamente",
  "payload": {
    "users": 10,
    "stores": 4,
    "orders": 20,
    "deliveries": 20
  }
}

Los endpoints de mocks también contemplan cantidades inválidas.

Ejemplo:

`GET /api/mocks/users?qty=2`

---

## Logger

Se dispone de un endpoint destinado a comprobar el funcionamiento del sistema de logging:

`GET /api/logger`

Este endpoint es una herramienta de validación técnica y no representa una funcionalidad de negocio.

Permite verificar diferentes niveles de logging, incluyendo:

* debug
* http
* info
* warning
* error
* fatal

---

## Schemas reutilizables

La documentación de Swagger utiliza schemas reutilizables para representar las principales estructuras de la API.

Entre ellos se encuentran:

* User
* Store
* Order
* Delivery
* OrderItem
* ErrorResponse
* SuccessResponse

Estos schemas permiten mantener una documentación consistente y evitar la repetición innecesaria de estructuras.

---

## Manejo de errores

La API utiliza un sistema centralizado de manejo de errores mediante un diccionario de errores.

Entre los errores contemplados se encuentran:

* Datos inválidos o incompletos
* Usuario no encontrado
* Tienda no encontrada
* Pedido no encontrado
* Entrega no encontrada
* Rol de usuario inválido
* Estado de pedido inválido
* Prioridad de pedido inválida
* Items de pedido requeridos
* Cantidad inválida para mocks
* Error interno del servidor
* Ruta no encontrada

Las respuestas de error utilizan una estructura uniforme.

Ejemplo:

{
  "status": "error",
  "error": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}

---

## Estructura de respuesta

Las respuestas exitosas utilizan una estructura uniforme:

{
  "status": "success",
  "message": "Mensaje descriptivo",
  "payload": {}
}

Las respuestas de error utilizan:

{
  "status": "error",
  "error": "ERROR_CODE",
  "message": "Descripción del error"
}

---

## Requisitos

Para ejecutar el proyecto se necesita tener instalado:

* Node.js
* MongoDB o una conexión a MongoDB Atlas
* npm

---

## Instalación

Clonar el repositorio:

git clone URL_DEL_REPOSITORIO


Ingresar al proyecto:

cd shipnow-api

Instalar las dependencias:

npm install

Crear un archivo `.env` a partir del archivo `.env.example` y configurar las variables necesarias.

Ejemplo:

env
PORT=8080
MONGODB_URI=tu_conexion_a_mongodb
NODE_ENV=development

---

## Ejecución

Para iniciar el servidor:

npm run dev

Una vez iniciado el servidor, se puede acceder a Swagger desde:

`http://localhost:8080/api/docs`

---

## Pruebas

Los endpoints pueden probarse directamente desde Swagger UI.

También se pueden utilizar herramientas como Postman para realizar las pruebas de la API.

Durante la validación de esta pre-entrega se comprobaron los principales endpoints de:

* Users
* Stores
* Orders
* Deliveries
* Mocks
* Logger

Las respuestas obtenidas fueron verificadas contra el comportamiento real de la API.

---

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar responsabilidades:

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
└── utils/

La comunicación principal sigue el flujo:

Router
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

La configuración de Swagger se mantiene separada de la lógica de las rutas.

---

## Variables de entorno

El archivo `.env` no debe subirse al repositorio.

El proyecto incluye un archivo `.env.example` como referencia para configurar las variables necesarias.

---

## Autor

Jessica Negri
