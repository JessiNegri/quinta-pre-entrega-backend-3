# Pre-entrega Módulo 7 — Carga de archivos, documentos y comprobantes

## ShipNow API

En esta pre-entrega se incorporó a ShipNow la carga y gestión de archivos utilizando **Multer**.

La API permite subir documentos de usuarios, licencias y comprobantes de entrega mediante `multipart/form-data`, almacenarlos en carpetas organizadas del servidor y registrar únicamente sus metadatos en MongoDB.

La implementación se integra con el sistema existente de errores, logging, Swagger y testing funcional.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Winston
- Swagger
- Mocha
- Chai
- Supertest

---

## Configuración de Multer

La configuración de Multer se encuentra centralizada en:

src/middlewares/upload.middleware.js

Esta configuración se encarga de:

- determinar la carpeta de destino;
- generar nombres únicos para los archivos;
- validar el tipo de archivo;
- limitar el tamaño máximo;
- validar el campo utilizado para subir el archivo.

Los nombres de los archivos se generan utilizando UUID para evitar colisiones.

Actualmente se aceptan archivos:

application/pdf

El tamaño máximo permitido es:

5 MB

---

## Estructura de archivos

Los archivos se almacenan en carpetas diferentes según su finalidad:

uploads/
├── documents/
├── licenses/
└── proofs/

- `documents/`: documentos de usuarios.
- `licenses/`: licencias de usuarios.
- `proofs/`: comprobantes asociados a entregas.

La carpeta `uploads/` está incluida en `.gitignore`, por lo que los archivos cargados durante la ejecución de la aplicación no se suben al repositorio.

---

## Documentos de usuario

### Endpoint

POST /api/users/:uid/documents

La petición utiliza:

multipart/form-data

Campos requeridos:

document → File
type     → user_document

El sistema:

1. verifica que se haya enviado un archivo;
2. valida que el archivo sea PDF;
3. valida que no supere los 5 MB;
4. valida el tipo de documento;
5. verifica que el usuario exista;
6. guarda el archivo en `uploads/documents`;
7. registra los metadatos en el usuario.

---

## Licencias de usuario

### Endpoint

POST /api/users/:uid/licenses

La petición utiliza:

multipart/form-data

Campo requerido:

license → File

La licencia se registra automáticamente con el tipo:

license

El archivo se almacena en:

uploads/licenses/

y sus metadatos quedan asociados al usuario correspondiente.

---

## Comprobantes de entrega

### Endpoint

POST /api/deliveries/:did/proof

La petición utiliza:

multipart/form-data

Campo requerido:

proof → File

El sistema verifica que la entrega exista antes de asociar el comprobante.

Los comprobantes se almacenan en:

uploads/proofs/

y se registran con:

documentType: delivery-proof

---

## Metadatos

Los archivos completos no se almacenan dentro de MongoDB.

La base de datos guarda únicamente información relacionada con cada archivo, como:

{
    "originalName": "document.pdf",
    "fileName": "uuid-generado.pdf",
    "path": "uploads/documents/uuid-generado.pdf",
    "mimetype": "application/pdf",
    "size": 395133,
    "type": "user_document"
}

Para los comprobantes de entrega también se registra la fecha de carga:

{
    "originalName": "proof.pdf",
    "fileName": "uuid-generado.pdf",
    "path": "uploads/proofs/uuid-generado.pdf",
    "mimetype": "application/pdf",
    "size": 395133,
    "documentType": "delivery-proof",
    "uploadedAt": "2026-08-13T03:13:42.017Z"
}

---

## Validaciones y manejo de errores

La carga de archivos está integrada al sistema centralizado de errores de ShipNow.

Se contemplan, entre otros, los siguientes errores:

FILE_REQUIRED
INVALID_FILE_TYPE
FILE_TOO_LARGE
INVALID_FILE_FIELD
INVALID_DOCUMENT_TYPE
USER_NOT_FOUND
DELIVERY_NOT_FOUND

Los errores mantienen el formato general de respuesta de la API.

Ejemplo:

{
    "status": "error",
    "error": "FILE_REQUIRED",
    "message": "Debe adjuntar un archivo"
}

También se manejan los errores propios de Multer, como archivos que superan el tamaño máximo permitido o campos de archivo inesperados.

---

## Logging

La carga de archivos está integrada con el logger de Winston.

Se registran eventos relevantes como:

- carga exitosa de documentos;
- carga exitosa de licencias;
- asociación de comprobantes a entregas;
- archivos faltantes;
- tipos de documento inválidos;
- entidades no encontradas;
- errores durante la carga o eliminación de archivos.

---

## Swagger

Los endpoints de carga están documentados con Swagger utilizando:

multipart/form-data

La documentación especifica:

- parámetros de la ruta;
- nombre del campo de archivo;
- campos adicionales;
- tipos permitidos;
- respuestas exitosas;
- posibles errores.

La documentación puede consultarse con el servidor iniciado en:

http://localhost:8080/api/docs

---

## Testing funcional

Se agregaron tests funcionales para la carga de archivos utilizando:

- Mocha
- Chai
- Supertest

Los tests del módulo se encuentran en:

test/uploads.test.js

Para las pruebas se utiliza un PDF ubicado en:

test/files/test-document.pdf

Los casos cubiertos son:

- carga correcta de un documento de usuario;
- error cuando falta el archivo;
- error cuando el tipo de documento es inválido;
- error cuando la entrega no existe al intentar asociar un comprobante.

Para ejecutar todos los tests:

npm test

Resultado actual:

39 passing

Para ejecutar solamente los tests de carga de archivos:

npx mocha --file test/test.setup.js test/uploads.test.js

Resultado:

4 passing

---

## Archivos excluidos del repositorio

Los archivos cargados durante la ejecución de la aplicación no deben subirse a GitHub.

La carpeta de uploads se encuentra incluida en `.gitignore`:

gitignore
uploads/

También se mantiene excluido:

gitignore
node_modules/

El archivo:

test/files/test-document.pdf

se utiliza exclusivamente para los tests funcionales y puede mantenerse dentro del repositorio.

---

## Funcionalidades implementadas

- Configuración centralizada de Multer.
- Organización de archivos por carpetas.
- Carga de documentos de usuario.
- Carga de licencias.
- Carga de comprobantes de entrega.
- Generación de nombres únicos mediante UUID.
- Validación de archivos PDF.
- Tamaño máximo de 5 MB.
- Validación del campo de archivo.
- Validación del tipo de documento.
- Asociación de archivos con usuarios y entregas.
- Almacenamiento exclusivo de metadatos en MongoDB.
- Manejo centralizado de errores.
- Integración con Winston.
- Documentación con Swagger.
- Tests funcionales con Mocha, Chai y Supertest.

