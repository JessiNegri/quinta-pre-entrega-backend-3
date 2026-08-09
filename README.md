# ShipNow API — Pre-entrega Módulo 4

## Logging y monitoreo básico

En esta pre-entrega se incorpora un sistema de **logging profesional** a ShipNow API utilizando **Winston**.

El objetivo es reemplazar los mensajes de consola utilizados anteriormente por un logger centralizado, permitiendo registrar eventos importantes de la aplicación mediante distintos niveles de log.

Además, se incorporó persistencia de errores en archivos y rotación automática de logs.

---

## Winston

Se utiliza **Winston** como logger centralizado.

La configuración se encuentra en:

```text
src/config/logger.js
```

Se definieron los siguientes niveles:

```text
debug
http
info
warning
error
fatal
```

Cada nivel permite identificar la importancia del evento registrado.

---

## Configuración según el entorno

El comportamiento del logger cambia según la variable de entorno `NODE_ENV`.

### Desarrollo

En desarrollo se habilitan logs desde el nivel:

```text
debug
```

Esto permite visualizar información detallada durante las pruebas.

### Producción

En producción el logger comienza desde el nivel:

```text
info
```

De esta manera se reducen los mensajes de debugging y se conservan los eventos más relevantes.

---

## Salida por consola

El logger utiliza un transporte de consola para mostrar los eventos mientras la aplicación está ejecutándose.

Por ejemplo:

```text
2026-08-09 13:01:03 [info] MongoDB conectado
2026-08-09 13:01:03 [info] Servidor escuchando en el puerto 8080
2026-08-09 13:01:08 [debug] Log de prueba nivel debug
2026-08-09 13:01:08 [http] Log de prueba nivel http
2026-08-09 13:01:08 [info] Log de prueba nivel info
2026-08-09 13:01:08 [warning] Log de prueba nivel warning
2026-08-09 13:01:08 [error] Log de prueba nivel error
2026-08-09 13:01:08 [fatal] Log de prueba nivel fatal
```

Los mensajes incluyen:

* Fecha y hora.
* Nivel del log.
* Mensaje.

---

## Persistencia de errores

Los niveles `error` y `fatal` se almacenan en archivos dentro de:

```text
logs/
```

Los archivos tienen un formato similar a:

```text
error-2026-08-09.log
```

El archivo de errores contiene únicamente los niveles:

```text
error
fatal
```

Esto permite consultar posteriormente los errores producidos por la aplicación.

---

## Rotación de archivos

Para evitar que los archivos de logs crezcan indefinidamente se utiliza:

```text
winston-daily-rotate-file
```

La configuración actual realiza una rotación diaria y conserva los archivos durante **7 días**.

De esta forma se mantiene un historial reciente sin generar archivos demasiado grandes.

---

## Integración con el manejo de errores

El logger fue integrado al middleware global:

```text
src/middlewares/errorHandler.js
```

Los errores esperados del cliente se registran como:

```text
warning
```

Mientras que los errores inesperados del servidor se registran como:

```text
error
```

Las respuestas enviadas al cliente continúan utilizando el sistema centralizado de respuestas y errores implementado anteriormente.

---

## Eventos registrados

El logger fue incorporado en diferentes puntos importantes de la aplicación.

### Servidor

Se registra el inicio correcto del servidor:

```text
Servidor escuchando en el puerto 8080
```

### MongoDB

Se registra la conexión exitosa:

```text
MongoDB conectado
```

### Rutas inexistentes

El middleware `notFoundHandler` registra las rutas inexistentes como `warning`.

Ejemplo:

```text
[warning] Ruta no encontrada: GET /api/ruta-inexistente
```

### Pedidos

El servicio de pedidos registra eventos importantes como:

* Pedido creado correctamente.
* Pedido actualizado.
* Pedido eliminado.
* Pedido no encontrado.
* Datos inválidos.
* Estados o prioridades inválidas.

### Mocking

El servicio de mocks registra:

* Generación de datos mock.
* Cantidades inválidas.
* Usuarios, pedidos y datos de prueba generados correctamente.
* Situaciones en las que no se encuentran usuarios, tiendas o repartidores necesarios.

---

## Endpoint de prueba

Se agregó un endpoint específico para comprobar el funcionamiento del logger:

```text
GET /api/logger/test
```

Este endpoint genera un registro para cada uno de los niveles configurados:

```text
debug
http
info
warning
error
fatal
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Logger funcionando correctamente",
  "payload": {
    "levels": [
      "debug",
      "http",
      "info",
      "warning",
      "error",
      "fatal"
    ]
  }
}
```

Al ejecutar el endpoint, los seis niveles pueden observarse en la consola.

Los niveles `error` y `fatal` también se almacenan en el archivo de errores.

---

## Logs y Git

Los archivos generados por el sistema de logging no deben subirse al repositorio.

La carpeta:

```text
logs/
```

se encuentra incluida en `.gitignore`.

Por lo tanto, los archivos generados automáticamente por Winston quedan fuera del repositorio de GitHub.

---

## Dependencias utilizadas

Para implementar el sistema de logging se incorporaron:

```text
winston
winston-daily-rotate-file
```

---

## Resultado

Con esta implementación, ShipNow cuenta con un sistema de logging centralizado que permite:

* Registrar eventos importantes.
* Diferenciar los eventos según su nivel.
* Mostrar información en consola.
* Persistir errores en archivos.
* Rotar automáticamente los archivos.
* Integrarse con el manejo global de errores.
* Facilitar el debugging y monitoreo básico de la API.
