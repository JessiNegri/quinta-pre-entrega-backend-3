import fs from "fs";
import { deliveriesService } from "../services/deliveries.service.js";
import { successResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export const getDeliveries = async (req, res, next) => {
    try {
        const deliveries = await deliveriesService.getDeliveries();

        return successResponse(res, {
            message: "Entregas obtenidas correctamente",
            payload: deliveries
        });
    } catch (error) {
        next(error);
    }
};

export const getDeliveryById = async (req, res, next) => {
    try {
        const { did } = req.params;

        const delivery =
            await deliveriesService.getDeliveryById(did);

        return successResponse(res, {
            message: "Entrega obtenida correctamente",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};

export const createDelivery = async (req, res, next) => {
    try {
        const delivery =
            await deliveriesService.createDelivery(req.body);

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
        const { did } = req.params;
        const { status } = req.body;

        const delivery =
            await deliveriesService.updateDeliveryStatus(
                did,
                status
            );

        return successResponse(res, {
            message: "Estado de entrega actualizado correctamente",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};

export const uploadDeliveryProof = async (req, res, next) => {
    try {
        const { did } = req.params;

        const delivery =
            await deliveriesService.uploadProof(
                did,
                req.file
            );

        logger.info(
            `Comprobante asociado a la entrega ${did}: ${req.file.filename}`
        );

        return successResponse(res, {
            message: "Comprobante asociado correctamente",
            payload: delivery
        });
    } catch (error) {
        if (req.file) {
            try {
                await fs.promises.unlink(req.file.path);
            } catch (unlinkError) {
                logger.error(
                    `Error al eliminar archivo: ${unlinkError.message}`
                );
            }
        }

        next(error);
    }
};

export const deleteDelivery = async (req, res, next) => {
    try {
        const { did } = req.params;

        const delivery =
            await deliveriesService.deleteDelivery(did);

        return successResponse(res, {
            message: "Entrega eliminada correctamente",
            payload: delivery
        });
    } catch (error) {
        next(error);
    }
};