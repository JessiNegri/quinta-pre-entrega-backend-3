import { Router } from "express";
import { testLogger } from "../controllers/loggers.controller.js";

const router = Router();

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     tags:
 *       - Logger
 *     summary: Probar los niveles del logger
 *     description: Endpoint utilizado para validar el funcionamiento de los niveles de logging. No representa una funcionalidad de negocio.
 *     responses:
 *       200:
 *         description: Logger funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoggerResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/test", testLogger);

export default router;