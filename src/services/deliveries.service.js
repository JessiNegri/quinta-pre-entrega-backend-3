import { deliveriesRepository } from "../repositories/deliveries.repository.js";
import { ORDER_STATUS } from "../constants/orderstatus.js";
import { createError } from "../utils/apiResponse.js";

export const deliveriesService = {

    getDeliveries: async () => {
        return deliveriesRepository.findAll();
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

    deleteDelivery: async (id) => {
        const delivery =
            await deliveriesRepository.delete(id);

        if (!delivery) {
            throw createError("DELIVERY_NOT_FOUND");
        }

        return delivery;
    }
};