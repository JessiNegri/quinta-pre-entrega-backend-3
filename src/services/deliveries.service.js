import { deliveriesRepository } from "../repositories/deliveries.repository.js";
import { ORDER_STATUS } from "../constants/orderstatus.js";
import { createError } from "../utils/apiResponse.js";

export const deliveriesService = {
    getDeliveries: async ({ page = 1, limit = 10 } = {}) => {
        return deliveriesRepository.findAll({
            page,
            limit
        });
    },

    getDeliveryById: async (id) => {
        const delivery = await deliveriesRepository.findById(id);

        if (!delivery) {
            throw createError("DELIVERY_NOT_FOUND");
        }

        return delivery;
    },

    createDelivery: async (deliveryData) => {
        const { order, driver } = deliveryData;

        if (!order || !driver) {
            throw createError("VALIDATION_ERROR");
        }

        return deliveriesRepository.create({
            ...deliveryData,
            status: ORDER_STATUS.CREATED
        });
    },

    updateDeliveryStatus: async (id, status) => {
        if (!Object.values(ORDER_STATUS).includes(status)) {
            throw createError("INVALID_ORDER_STATUS");
        }

        const delivery =
            await deliveriesRepository.updateStatus(id, status);

        if (!delivery) {
            throw createError("DELIVERY_NOT_FOUND");
        }

        return delivery;
    },

    uploadProof: async (deliveryId, file) => {
        const delivery =
            await deliveriesRepository.findById(deliveryId);

        if (!delivery) {
            throw createError("DELIVERY_NOT_FOUND");
        }

        if (!file) {
            throw createError("FILE_REQUIRED");
        }

        const proofData = {
            originalName: file.originalname,
            fileName: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            documentType: "delivery-proof",
            uploadedAt: new Date()
        };

        return deliveriesRepository.updateProof(
            deliveryId,
            proofData
        );
    },

    deleteDelivery: async (id) => {
        const delivery =
            await deliveriesRepository.delete(id);

        if (!delivery) {
            throw createError("DELIVERY_NOT_FOUND");
        }

        return delivery;
    }
};