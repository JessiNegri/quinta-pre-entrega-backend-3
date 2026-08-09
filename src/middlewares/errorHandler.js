import { createError, errorResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export function errorHandler(error, req, res, next) {
    let handledError = error;

    // Si nos envían un ID de MongoDB inválido
    if (error.name === "CastError") {
        handledError = createError("VALIDATION_ERROR", "ID invalido");
    }

    const statusCode = handledError.statusCode || 500;
    const errorCode = handledError.code || "INTERNAL_SERVER_ERROR";
    const message = handledError.message || "Error interno del servidor";

    // Errores esperados del cliente
    if (statusCode < 500) {
        logger.warning(`${errorCode}: ${message}`);
    } else {
        // Errores inesperados del servidor
        logger.error(`${errorCode}: ${message}`);
    }

    return errorResponse(res, {
        statusCode,
        error: errorCode,
        message
    });
}
