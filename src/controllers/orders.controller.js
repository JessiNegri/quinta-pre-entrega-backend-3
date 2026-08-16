import { ordersService } from "../services/orders.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getOrders = async (req, res, next) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);

        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1),100);

        const { orders, total } = await ordersService.getOrders({ page, limit });

        return res.status(200).json({
            status: "success",
            message: "Lista de pedidos",
            payload: orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await ordersService.getOrderById(req.params.oid);

        return successResponse(res, {
            message: "Pedido obtenido correctamente",
            payload: order
        });
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const order = await ordersService.createOrder(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: "Pedido creado correctamente",
            payload: order
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await ordersService.updateOrderStatus(
            req.params.oid,
            req.body.status
        );

        return successResponse(res, {
            message: "Estado del pedido actualizado correctamente",
            payload: order
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const order = await ordersService.deleteOrder(req.params.oid);

        return successResponse(res, {
            message: "Pedido eliminado correctamente",
            payload: order
        });
    } catch (error) {
        next(error);
    }
};

