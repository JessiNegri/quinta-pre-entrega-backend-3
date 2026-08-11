import { Router } from "express";
import { generateMockUsers, generateMockOrders, generateData } from "../controllers/mocks.controller.js";

const router = Router();

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar usuarios mock
 *     description: Genera usuarios simulados sin guardarlos en MongoDB.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Usuarios mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MockUsersResponse'
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/mockingusers", generateMockUsers);

/**
 * @swagger
 * /api/mocks/mockingorders:
 *   get:
 *     tags:
 *       - Mocks
 *     summary: Generar pedidos mock
 *     description: Genera pedidos simulados sin guardarlos en MongoDB.
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de pedidos mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Pedidos mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MockOrdersResponse'
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/mockingorders", generateMockOrders);

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     tags:
 *       - Mocks
 *     summary: Generar y guardar datos de prueba
 *     description: Genera usuarios, tiendas, pedidos y entregas mock y los guarda en MongoDB.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateDataInput'
 *     responses:
 *       201:
 *         description: Datos de prueba generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateDataResponse'
 *       400:
 *         description: Cantidades inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/generateData", generateData);

export default router;