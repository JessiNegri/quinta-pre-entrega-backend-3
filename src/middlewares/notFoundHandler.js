import { createError } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export function notFoundHandler(req, res, next) {
    logger.warning(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);

    next(createError("ROUTE_NOT_FOUND"));
}