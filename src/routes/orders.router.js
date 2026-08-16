import { Router } from "express";
import { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from "../controllers/orders.controller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener todos los pedidos
 *     description: Devuelve la lista de pedidos registrados.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{oid}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener un pedido por ID
 *     description: Devuelve un pedido específico mediante su identificador.
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pedido no encontrado
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
router.get("/:oid", getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear un pedido
 *     description: Crea un nuevo pedido en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente o tienda no encontrados
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
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders/{oid}/status:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Actualizar el estado de un pedido
 *     description: Actualiza el estado de un pedido existente.
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatusInput'
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Estado o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pedido no encontrado
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
router.put("/:oid/status", updateOrderStatus);

/**
 * @swagger
 * /api/orders/{oid}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Eliminar un pedido
 *     description: Elimina un pedido existente.
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pedido no encontrado
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
router.delete("/:oid", deleteOrder);

export default router;