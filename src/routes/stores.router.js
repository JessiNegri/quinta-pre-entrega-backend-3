import { Router } from "express";
import { getStores, getStoreById, createStore, updateStore, deleteStore } from "../controllers/stores.controller.js";

const router = Router();

/**
 * @swagger
 * /api/stores:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Obtener todas las tiendas
 *     description: Devuelve la lista de tiendas registradas.
 *     responses:
 *       200:
 *         description: Lista de tiendas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoresResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getStores);

/**
 * @swagger
 * /api/stores/{sid}:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Obtener una tienda por ID
 *     description: Devuelve una tienda específica mediante su identificador.
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     responses:
 *       200:
 *         description: Tienda obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tienda no encontrada
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
router.get("/:sid", getStoreById);

/**
 * @swagger
 * /api/stores:
 *   post:
 *     tags:
 *       - Stores
 *     summary: Crear una tienda
 *     description: Crea una nueva tienda en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreInput'
 *     responses:
 *       201:
 *         description: Tienda creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario propietario no encontrado
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
router.post("/", createStore);

/**
 * @swagger
 * /api/stores/{sid}:
 *   put:
 *     tags:
 *       - Stores
 *     summary: Actualizar una tienda
 *     description: Actualiza los datos de una tienda existente.
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreInput'
 *     responses:
 *       200:
 *         description: Tienda actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tienda no encontrada
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
router.put("/:sid", updateStore);

/**
 * @swagger
 * /api/stores/{sid}:
 *   delete:
 *     tags:
 *       - Stores
 *     summary: Eliminar una tienda
 *     description: Elimina una tienda existente.
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     responses:
 *       200:
 *         description: Tienda eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tienda no encontrada
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
router.delete("/:sid", deleteStore);

export default router;