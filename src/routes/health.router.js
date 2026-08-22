import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Verificar el estado de la API
 *     description: Devuelve información básica sobre el estado y disponibilidad de la API.
 *     responses:
 *       200:
 *         description: API funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get("/", getHealth);

export default router;