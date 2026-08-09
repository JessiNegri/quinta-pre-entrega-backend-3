import { ordersRepository } from "../repositories/orders.repository.js";
import { ORDER_STATUS } from "../constants/orderstatus.js";
import { ORDER_PRIORITY } from "../constants/orderpriority.js";
import { createError } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export const ordersService = {
    getOrders: async () => {
        return ordersRepository.findAll();
    },

    getOrderById: async (id) => {
        const order = await ordersRepository.findById(id);

        if (!order) {
            logger.warning(`Pedido no encontrado: ${id}`);
            throw createError("ORDER_NOT_FOUND");
        }

        return order;
    },

    createOrder: async (orderData) => {
        const { customer, store, items, deliveryAddress, priority } = orderData;

        if (!customer || !store || !items || !deliveryAddress) {
            logger.warning("Intento de crear pedido con datos incompletos");
            throw createError("VALIDATION_ERROR");
        }

        const userFound = await ordersRepository.findCustomerById(customer);

        if (!userFound) {
            logger.warning(`Cliente no encontrado: ${customer}`);
            throw createError("USER_NOT_FOUND");
        }

        const storeFound = await ordersRepository.findStoreById(store);

        if (!storeFound) {
            logger.warning(`Tienda no encontrada: ${store}`);
            throw createError("STORE_NOT_FOUND");
        }

        if (!Array.isArray(items) || items.length === 0) {
            logger.warning("Intento de crear pedido sin items");
            throw createError("ORDER_ITEMS_REQUIRED");
        }

        if (
            priority &&
            !Object.values(ORDER_PRIORITY).includes(priority)
        ) {
            logger.warning(`Prioridad de pedido inválida: ${priority}`);
            throw createError("INVALID_ORDER_PRIORITY");
        }

        const total = items.reduce(
            (accumulator, item) => accumulator + item.price * item.quantity,
            0
        );

        const newOrder = {
            ...orderData,
            total,
            status: ORDER_STATUS.CREATED,
            priority: priority || ORDER_PRIORITY.NORMAL
        };

        const order = await ordersRepository.create(newOrder);

        logger.info(`Pedido creado correctamente: ${order._id}`);

        return order;
    },

    updateOrderStatus: async (id, status) => {
        if (!Object.values(ORDER_STATUS).includes(status)) {
            logger.warning(`Estado de pedido inválido: ${status}`);
            throw createError("INVALID_ORDER_STATUS");
        }

        const order = await ordersRepository.updateStatus(id, status);

        if (!order) {
            logger.warning(`Pedido no encontrado para actualizar: ${id}`);
            throw createError("ORDER_NOT_FOUND");
        }

        logger.info(`Estado del pedido ${id} actualizado a ${status}`);

        return order;
    },

    deleteOrder: async (id) => {
        const order = await ordersRepository.delete(id);

        if (!order) {
            logger.warning(`Pedido no encontrado para eliminar: ${id}`);
            throw createError("ORDER_NOT_FOUND");
        }

        logger.info(`Pedido eliminado correctamente: ${id}`);

        return order;
    }
};