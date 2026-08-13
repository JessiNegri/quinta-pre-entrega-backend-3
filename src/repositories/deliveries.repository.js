import DeliveryModel from "../models/delivery.model.js";

export const deliveriesRepository = {
    findAll: async () => {
        return DeliveryModel.find()
            .populate("order")
            .populate("driver");
    },

    findById: async (id) => {
        return DeliveryModel.findById(id)
            .populate("order")
            .populate("driver");
    },

    create: async (deliveryData) => {
        return DeliveryModel.create(deliveryData);
    },

    updateStatus: async (id, status) => {
        return DeliveryModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
    },

    updateProof: async (id, proofData) => {
        return DeliveryModel.findByIdAndUpdate(
            id,
            { proof: proofData },
            { new: true }
        );
    },

    delete: async (id) => {
        return DeliveryModel.findByIdAndDelete(id);
    }
};