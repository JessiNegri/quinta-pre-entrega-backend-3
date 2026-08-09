import logger from "../config/logger.js";
import { successResponse } from "../utils/apiResponse.js";

export const testLogger = (req, res) => {
    logger.debug("Log de prueba nivel debug");
    logger.http("Log de prueba nivel http");
    logger.info("Log de prueba nivel info");
    logger.warning("Log de prueba nivel warning");
    logger.error("Log de prueba nivel error");
    logger.fatal("Log de prueba nivel fatal");

    return successResponse(res, {
        message: "Logger funcionando correctamente",
        payload: {
            levels: ["debug", "http", "info", "warning", "error", "fatal"]
        }
    });
};