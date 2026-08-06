# Módulo 2 - Mocking y Datos de Prueba
## Objetivo del módulo

En esta etapa se incorporó un sistema de Mocking dentro del proyecto ShipNow API.

El objetivo es generar información simulada pero consistente para poder probar el comportamiento de la API sin depender de datos cargados manualmente en MongoDB.

Trabajar con datos mock permite:

Poblar rápidamente la base de datos.
Simular escenarios reales.
Validar endpoints existentes.
Facilitar pruebas durante el desarrollo.
Mantener relaciones entre entidades sin crear datos manualmente.

# ¿Qué es Mocking?

Mocking consiste en generar datos falsos pero con una estructura compatible con los modelos reales del proyecto.

Los datos generados son ficticios y tienen como objetivo permitir pruebas de funcionalidades, endpoints y relaciones entre entidades.

En este módulo se incorporó generación automática de:

Usuarios.
Comercios.
Pedidos.
Entregas.

Los datos generados respetan:

Roles válidos.
Estados permitidos.
Prioridades disponibles.
Relaciones entre entidades.

# Librerías incorporadas

Para generar información aleatoria se utilizó FakerJS.

Instalación:

npm install @faker-js/faker

También se incorporó bcryptjs para generar contraseñas compatibles con los usuarios reales del sistema.

Instalación:

npm install bcryptjs

# Endpoints incorporados

Se creó un router específico para mocking:

/api/mocks

Los endpoints disponibles son:

## GET /api/mocks/mockingusers

Genera usuarios falsos utilizando FakerJS.

Los datos son devueltos como respuesta y no se guardan en MongoDB.

Ejemplo:

GET /api/mocks/mockingusers?qty=2

Respuesta:

{
  "status": "success",
  "payload": [
    {
      "firstName": "Ana",
      "lastName": "Perez",
      "email": "ana@test.com",
      "role": "customer"
    }
  ]
}

## GET /api/mocks/mockingorders

Genera pedidos falsos utilizando datos simulados.

Los pedidos contienen:

Cliente.
Comercio.
Items.
Dirección de entrega.
Total.
Estado.
Prioridad.

Los datos solamente se devuelven en la respuesta y no se almacenan en MongoDB.

Ejemplo:

GET /api/mocks/mockingorders?qty=2

Respuesta:

{
  "status": "success",
  "payload": [
    {
      "customer": "ID_USUARIO",
      "store": "ID_STORE",
      "items": [
        {
          "name": "Producto ejemplo",
          "quantity": 2,
          "price": 1500
        }
      ],
      "deliveryAddress": "Dirección ejemplo",
      "total": 3000,
      "status": "created",
      "priority": "normal"
    }
  ]
}

## POST /api/mocks/generateData

Genera datos simulados y los inserta en MongoDB.

Permite crear:

Usuarios.
Comercios.
Pedidos.
Entregas.

Ejemplo:

POST /api/mocks/generateData

Body:

{
  "users": 10,
  "stores": 5,
  "orders": 20
}

Respuesta:

{
  "status": "success",
  "payload": {
    "users": 10,
    "stores": 5,
    "orders": 20,
    "deliveries": 20
  }
}

# Carpeta mocks

Se creó una carpeta específica para la generación de datos simulados.

Estructura:

src/mocks/

users.mock.js

stores.mock.js

orders.mock.js

deliveries.mock.js

Esta separación permite mantener organizada la lógica de creación de información falsa.

# users.mock.js

Este archivo es responsable de generar usuarios falsos.

Utiliza FakerJS para crear:

Nombres.
Apellidos.
Correos electrónicos.

También utiliza bcryptjs para generar contraseñas encriptadas:

const password = await bcrypt.hash("coder123",10)

Los roles utilizados se obtienen desde las constantes del proyecto:

USER_ROLES

Roles disponibles:

admin
customer
store
driver

La función:

generateMockUsers(quantity)

permite generar múltiples usuarios automáticamente.

# stores.mock.js

Este archivo genera comercios falsos.

Cada comercio queda asociado a un usuario propietario.

Los datos generados incluyen:

Nombre.
Dirección.
Usuario propietario.
Estado activo.

Ejemplo:

{
  "name": "Store Demo",
  "address": "Dirección ejemplo",
  "owner": "ID_USUARIO",
  "isActive": true
}

# orders.mock.js

Este archivo genera pedidos falsos.

Cada pedido contiene:

customer.
store.
items.
deliveryAddress.
total.
status.
priority.

Los productos son generados utilizando FakerJS.

El total del pedido se calcula automáticamente recorriendo los items:

total = cantidad * precio

Los estados disponibles utilizan la constante:

ORDER_STATUS

Estados posibles:

created
assigned
picked_up
in_transit
delivered
cancelled

La prioridad utiliza:

ORDER_PRIORITY

Valores posibles:

low
normal
high

# deliveries.mock.js

Este archivo genera entregas asociadas a pedidos.

Cada entrega contiene:

Pedido asociado.
Repartidor asignado.
Estado.
Fecha de entrega.

La relación generada es:

User (driver)

        ↓

Delivery

        ↓

Order

# Service de Mocking

Archivo:

src/services/mocks.service.js

Contiene la lógica de negocio para la generación de datos.

El proceso de generación masiva realiza:

Generación de usuarios.
Inserción de usuarios en MongoDB.
Selección de usuarios con rol store.
Generación de comercios.
Inserción de comercios.
Generación de pedidos asociados.
Inserción de pedidos.
Generación de entregas.
Inserción de entregas.
Retorno de cantidades creadas.

# Controller de Mocking

Archivo:

src/controllers/mocks.controller.js

El controlador recibe las solicitudes HTTP y delega la lógica al service.

Los endpoints manejados son:

GET /api/mocks/mockingusers

GET /api/mocks/mockingorders

POST /api/mocks/generateData

# Repository

La persistencia se realiza mediante repositories.

Se utilizaron métodos de inserción masiva:

insertManyUsers()

insertManyStores()

insertManyOrders()

insertManyDeliveries()

Esto permite mantener la separación entre la lógica de negocio y el acceso a MongoDB.

Relaciones entre entidades

Los datos generados mantienen las relaciones del sistema:

Usuario

 ↓

Comercio

 ↓

Pedido

 ↓

Entrega

Esto permite simular escenarios similares a los reales.

## Arquitectura implementada

La arquitectura utilizada mantiene la separación por capas:

Routes

   ↓

Controllers

   ↓

Services

   ↓

Mocks / Repositories

   ↓

MongoDB

El router solamente recibe las peticiones.

El controller maneja la comunicación HTTP.

El service contiene la lógica de generación.

Los repositories manejan la persistencia.

# Constantes utilizadas

Para evitar valores escritos manualmente se utilizan constantes:

USER_ROLES.
ORDER_STATUS.
ORDER_PRIORITY.

Esto asegura que los datos generados sean compatibles con los modelos del sistema.

# Pruebas realizadas

Los endpoints fueron probados utilizando Postman.

# Generación de usuarios
GET /api/mocks/mockingusers?qty=2

Resultado:

Se generan usuarios falsos correctamente sin guardarlos en MongoDB.

# Generación de pedidos
GET /api/mocks/mockingorders?qty=2

Resultado:

Se generan pedidos con:

Items.
Estados válidos.
Prioridades válidas.
Relaciones entre entidades.

# Generación de datos completos
POST /api/mocks/generateData

Resultado:

Se insertan correctamente:

Usuarios.
Comercios.
Pedidos.
Entregas.

Ejemplo:

{
  "users": 10,
  "stores": 5,
  "orders": 20,
  "deliveries": 20
}
Autor

Jessica Negri
