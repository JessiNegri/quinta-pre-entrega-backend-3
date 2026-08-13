export const ERROR_DICTIONARY = {
    VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos inválidos o incompletos"
    },

    USER_NOT_FOUND: {
        statusCode: 404,
        message: "Usuario no encontrado"
    },

    DRIVER_NOT_FOUND: {
        statusCode: 404,
        message: "Repartidor no encontrado"
    },

    STORE_NOT_FOUND: {
        statusCode: 404,
        message: "Tienda no encontrada"
    },

    ORDER_NOT_FOUND: {
        statusCode: 404,
        message: "Pedido no encontrado"
    },

    INVALID_USER_ROLE: {
        statusCode: 400,
        message: "Rol inválido"
    },

    INVALID_ORDER_STATUS: {
        statusCode: 400,
        message: "Estado de orden inválido"
    },

    INVALID_ORDER_PRIORITY: {
        statusCode: 400,
        message: "Prioridad de pedido inválida"
    },

    ORDER_ITEMS_REQUIRED: {
        statusCode: 400,
        message: "El pedido debe incluir al menos un item"
    },

    USER_ALREADY_EXISTS: {
        statusCode: 409,
        message: "Ya existe un usuario con ese email"
    },

    ROUTE_NOT_FOUND: {
        statusCode: 404,
        message: "Ruta no encontrada"
    },

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno del servidor"
    },

    INVALID_MOCK_QUANTITY: {
        statusCode: 400,
        message: "La cantidad de datos mock debe ser un número entero mayor que cero"
    },

    DELIVERY_NOT_FOUND: {
        statusCode: 404,
        message: "Entrega no encontrada"
    },

    MOCK_DATA_GENERATION_ERROR: {
        statusCode: 500,
        message: "Error al generar los datos de prueba"
    },

    FILE_REQUIRED: {
        statusCode: 400,
        message: "Debe adjuntar un archivo"
    },

    INVALID_DOCUMENT_TYPE: {
        statusCode: 400,
        message: "Tipo de documento inválido"
    },

    INVALID_FILE_TYPE: {
        statusCode: 400,
        message: "Tipo de archivo no permitido"
    },

    FILE_TOO_LARGE: {
        statusCode: 400,
        message: "El archivo supera el tamaño máximo permitido"
    },

    INVALID_FILE_FIELD: {
        statusCode: 400,
        message: "El campo del archivo no es válido"
    },

    FILE_UPLOAD_ERROR: {
        statusCode: 500,
        message: "Error al guardar el archivo"
    },
};