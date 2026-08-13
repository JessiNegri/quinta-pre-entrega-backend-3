import { Router } from "express";
import { getDeliveries, getDeliveryById, createDelivery, updateDeliveryStatus, uploadDeliveryProof, deleteDelivery } from "../controllers/deliveries.controller.js";

import upload from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Obtener todas las entregas
 *     description: Devuelve la lista de entregas registradas.
 *     responses:
 *       200:
 *         description: Lista de entregas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveriesResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getDeliveries);

/**
 * @swagger
 * /api/deliveries/{did}:
 *   get:
 *     tags:
 *       - Deliveries
 *     summary: Obtener una entrega por ID
 *     description: Devuelve una entrega específica junto con la información del pedido y repartidor asociados.
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Entrega no encontrada
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
router.get("/:did", getDeliveryById);

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     tags:
 *       - Deliveries
 *     summary: Crear una entrega
 *     description: Crea una nueva entrega asociada a un pedido y un repartidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryInput'
 *     responses:
 *       201:
 *         description: Entrega creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pedido o repartidor no encontrados
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
router.post("/", createDelivery);

/**
 * @swagger
 * /api/deliveries/{did}/status:
 *   patch:
 *     tags:
 *       - Deliveries
 *     summary: Actualizar el estado de una entrega
 *     description: Actualiza el estado de una entrega existente.
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryStatusInput'
 *     responses:
 *       200:
 *         description: Estado de la entrega actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponse'
 *       400:
 *         description: Estado o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Entrega no encontrada
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
router.patch("/:did/status", updateDeliveryStatus);

/**
 * @swagger
 * /api/deliveries/{did}/proof:
 *   post:
 *     tags:
 *       - Deliveries
 *     summary: Subir comprobante de una entrega
 *     description: Sube un comprobante en formato PDF y lo asocia a una entrega existente.
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - proof
 *             properties:
 *               proof:
 *                 type: string
 *                 format: binary
 *                 description: Comprobante de entrega en formato PDF
 *     responses:
 *       200:
 *         description: Comprobante asociado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponse'
 *       400:
 *         description: Archivo requerido, campo inválido o tipo de archivo no permitido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Entrega no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       413:
 *         description: El archivo supera el tamaño máximo permitido
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
router.post(
    "/:did/proof",
    upload.single("proof"),
    uploadDeliveryProof
);

/**
 * @swagger
 * /api/deliveries/{did}:
 *   delete:
 *     tags:
 *       - Deliveries
 *     summary: Eliminar una entrega
 *     description: Elimina una entrega existente.
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Entrega no encontrada
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
router.delete("/:did", deleteDelivery);

export default router;