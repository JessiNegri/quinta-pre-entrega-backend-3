import { createError, errorResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export function errorHandler(error, req, res, next) {
    let handledError = error;

    if (error.name === "CastError") {
        handledError = createError(
            "VALIDATION_ERROR",
            "ID invalido"
        );
    }

    if (error.code === "LIMIT_FILE_SIZE") {
        handledError = createError("FILE_TOO_LARGE");
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
        handledError = createError("INVALID_FILE_FIELD");
    }

    if (
        error.name === "MulterError" &&
        error.code !== "LIMIT_FILE_SIZE" &&
        error.code !== "LIMIT_UNEXPECTED_FILE"
    ) {
        handledError = createError("FILE_UPLOAD_ERROR");
    }

    if (
        error.code === "ENOENT" ||
        error.code === "EACCES" ||
        error.code === "EPERM"
    ) {
        handledError = createError("FILE_UPLOAD_ERROR");
    }

    const statusCode = handledError.statusCode || 500;
    const errorCode =
        handledError.code || "INTERNAL_SERVER_ERROR";
    const message =
        handledError.message || "Error interno del servidor";

    if (statusCode < 500) {
        logger.warning(`${errorCode}: ${message}`);
    } else {
        logger.error(`${errorCode}: ${message}`);
    }

    return errorResponse(res, {
        statusCode,
        error: errorCode,
        message
    });
}