import { deliveriesService } from "../services/deliveries.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getDeliveries = async (req, res, next) => {
    try {
        const deliveries = await deliveriesService.getDeliveries();

        return successResponse(res, {
            message: "Lista de entregas",
            payload: deliveries
        });
    } catch (error) {
        next(error);
    }
};

export const getDeliveryById = async (req, res, next) => {
    try {
        const delivery = await deliveriesService.getDeliveryById(
            req.params.did
        );

        return successResponse(res, {
            message: "Obtener entrega por id",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};

export const createDelivery = async (req, res, next) => {
    try {
        const delivery = await deliveriesService.createDelivery(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: "Entrega creada correctamente",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};

export const updateDeliveryStatus = async (req, res, next) => {
    try {
        const delivery = await deliveriesService.updateDeliveryStatus(
            req.params.did,
            req.body.status
        );

        return successResponse(res, {
            message: "Entrega actualizada",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};

export const deleteDelivery = async (req, res, next) => {
    try {
        const delivery = await deliveriesService.deleteDelivery(
            req.params.did
        );

        return successResponse(res, {
            message: "Entrega eliminada",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};