import { mocksService } from "../services/mocks.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const generateMockUsers = async (req, res, next) => {
    try {
        const qty = req.query.qty !== undefined? Number(req.query.qty): 10;

        const users = await mocksService.getMockUsers(qty);

        return successResponse(res, {
            message: "Usuarios mock generados correctamente",
            payload: users
        });

    } catch (error) {
        next(error);
    }
};

export const generateMockOrders = async (req, res, next) => {
    try {
        const qty = req.query.qty !== undefined? Number(req.query.qty): 10;

        const orders = await mocksService.getMockOrders(qty);

        return successResponse(res, {
            message: "Pedidos mock generados correctamente",
            payload: orders
        });

    } catch (error) {
        next(error);
    }
};

export const generateData = async (req, res, next) => {
    try {
        const result = await mocksService.generateData(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: "Datos de prueba generados correctamente",
            payload: result
        });

    } catch (error) {
        next(error);
    }
};