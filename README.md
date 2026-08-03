# ShipNow API - Pre-entrega Módulo 1

## Descripción

Este proyecto corresponde a la pre-entrega del Módulo 1 del curso de Backend.

La aplicación fue refactorizada utilizando una arquitectura de tres capas para mejorar la organización, el mantenimiento y la escalabilidad del código.

La estructura implementada es:

* **Controller:** recibe las peticiones HTTP y envía las respuestas.
* **Service:** contiene la lógica de negocio y las validaciones.
* **Repository:** encapsula el acceso a MongoDB mediante Mongoose.

Además, se implementó una configuración centralizada de variables de entorno y un archivo de constantes para evitar el uso de strings mágicos.

---

## Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv

---

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` utilizando como referencia el archivo `.env.example`.

Variables necesarias:

```env
PORT=
MONGODB_URI=
NODE_ENV=
```

---

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

## Arquitectura

El proyecto fue organizado utilizando una arquitectura por capas:

```
src/
│
├── config/
├── constants/
├── controllers/
├── models/
├── repositories/
├── routes/
└── services/
```

### Controller

Gestiona las solicitudes HTTP y devuelve la respuesta correspondiente.

### Service

Contiene la lógica de negocio y las validaciones necesarias antes de acceder a la base de datos.

### Repository

Es la única capa que conoce Mongoose y se encarga del acceso a MongoDB.

---

## Variables de entorno

El proyecto valida automáticamente las siguientes variables al iniciar:

* PORT
* MONGODB_URI
* NODE_ENV

Si alguna de ellas no existe, la aplicación finaliza mostrando un mensaje descriptivo.

---

## Autor

Jessica Negri








ShipNow API es una aplicación backend construida con Node.js, Express y MongoDB.

En su estado base, la API permite trabajar con tres entidades principales:

* Usuarios
* Comercios
* Pedidos

La idea del proyecto es simular una API simple de logística/envíos.

Un usuario puede representar a un cliente.
Un comercio representa el lugar desde donde sale el pedido.
Un pedido representa una solicitud de envío asociada a un usuario y a un comercio.

### Flujo principal

El flujo básico de la API es:

1. Crear un usuario.
2. Crear un comercio.
3. Crear un pedido usando el ID del usuario y el ID del comercio.
4. Consultar los pedidos.
5. Actualizar el estado de un pedido.

El pedido contiene una lista de items, una dirección de entrega, un total calculado y un estado.

### Entidades principales

### User

Representa a un usuario dentro del sistema.

Campos principales:

```json
{
  "firstName": "Martina",
  "lastName": "Gómez",
  "email": "martina@test.com",
  "password": "123456",
  "role": "customer"
}
```

Roles disponibles:

```txt
admin
customer
store
```

En esta versión base, el usuario se usa principalmente como cliente del pedido.

---

### Store

Representa un comercio.

Campos principales:

```json
{
  "name": "Kiosco Centro",
  "address": "Av. Siempre Viva 742",
  "owner": "ID_DEL_USUARIO"
}
```

El campo `owner` guarda el ID de un usuario asociado al comercio.

---

### Order

Representa un pedido o envío.

Campos principales:

```json
{
  "customer": "ID_DEL_USUARIO",
  "store": "ID_DEL_COMERCIO",
  "deliveryAddress": "Av. Siempre Viva 742",
  "items": [
    {
      "name": "Caja mediana",
      "quantity": 2,
      "price": 1500
    }
  ]
}
```

Cuando se crea un pedido, la API calcula el total automáticamente recorriendo los items.

Ejemplo:

```txt
2 unidades x $1500 = $3000
```

El pedido se crea inicialmente con estado:

```txt
created
```

Estados posibles del pedido:

```txt
created
assigned
picked_up
in_transit
delivered
cancelled
```

### Endpoints disponibles

### Health check

Permite verificar que la API está funcionando.

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "API funcionando correctamente"
}
```

---

## Users

### Obtener usuarios

```http
GET /api/users
```

### Obtener usuario por ID

```http
GET /api/users/:uid
```

### Crear usuario

```http
POST /api/users
```

Body de ejemplo:

```json
{
  "firstName": "Martina",
  "lastName": "Gómez",
  "email": "martina@test.com",
  "password": "123456",
  "role": "customer"
}
```

### Actualizar usuario

```http
PUT /api/users/:uid
```

### Eliminar usuario

```http
DELETE /api/users/:uid
```

---

## Stores

### Obtener comercios

```http
GET /api/stores
```

### Obtener comercio por ID

```http
GET /api/stores/:sid
```

### Crear comercio

```http
POST /api/stores
```

Body de ejemplo:

```json
{
  "name": "Kiosco Centro",
  "address": "Av. Siempre Viva 742",
  "owner": "ID_DEL_USUARIO"
}
```

### Actualizar comercio

```http
PUT /api/stores/:sid
```

### Eliminar comercio

```http
DELETE /api/stores/:sid
```

---

## Orders

### Obtener pedidos

```http
GET /api/orders
```

### Obtener pedido por ID

```http
GET /api/orders/:oid
```

### Crear pedido

```http
POST /api/orders
```

Body de ejemplo:

```json
{
  "customer": "ID_DEL_USUARIO",
  "store": "ID_DEL_COMERCIO",
  "deliveryAddress": "Av. Siempre Viva 742",
  "items": [
    {
      "name": "Caja mediana",
      "quantity": 2,
      "price": 1500
    },
    {
      "name": "Sobre chico",
      "quantity": 1,
      "price": 800
    }
  ]
}
```

Respuesta esperada:

```json
{
  "status": "success",
  "payload": {
    "_id": "ID_DEL_PEDIDO",
    "customer": "ID_DEL_USUARIO",
    "store": "ID_DEL_COMERCIO",
    "items": [
      {
        "name": "Caja mediana",
        "quantity": 2,
        "price": 1500
      },
      {
        "name": "Sobre chico",
        "quantity": 1,
        "price": 800
      }
    ],
    "deliveryAddress": "Av. Siempre Viva 742",
    "total": 3800,
    "status": "created"
  }
}
```

### Actualizar estado del pedido

```http
PUT /api/orders/:oid/status
```

Body de ejemplo:

```json
{
  "status": "in_transit"
}
```

### Eliminar pedido

```http
DELETE /api/orders/:oid
```

---

## Formato general de respuestas

Las respuestas exitosas siguen una estructura simple:

```json
{
  "status": "success",
  "payload": {}
}
```

Las respuestas de error, en esta versión base, todavía se manejan de forma simple desde las rutas:

```json
{
  "status": "error",
  "message": "Usuario no encontrado"
}
```

Más adelante, el proyecto será refactorizado para incorporar una capa centralizada de manejo de errores.

## Estado actual del proyecto

Esta versión base de ShipNow funciona, pero todavía no representa una API completamente profesional.

Actualmente el proyecto tiene:

```txt
app.js
server.js
models
routes
controllers
services
repositories
config/db.js
config/env.js
```

Todavía no incorpora:

```txt
middleware global de errores
logger profesional
Swagger
tests automatizados
Multer
Docker
```

Durante el curso, la API será mejorada progresivamente para separar responsabilidades, mejorar la mantenibilidad y acercarse a una estructura más profesional.

Clase 1:
```txt 
-> Mejoramos la arquitectura añadiendo "controllers", "services" y "repositories" para separar responsabilidades.

-> Añadimos el archivo ./config/env.js para centralizar la configuración de variables de entorno.
```