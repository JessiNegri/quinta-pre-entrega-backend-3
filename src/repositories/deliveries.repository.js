import DeliveryModel from "../models/delivery.model.js";

export const deliveriesRepository = {
    findAll: async ({ page = 1, limit = 10 } = {}) => {
        const skip = (page - 1) * limit;

        const [deliveries, total] = await Promise.all([
            DeliveryModel.find()
                .skip(skip)
                .limit(limit),
            DeliveryModel.countDocuments()
        ]);

        return {
            deliveries,
            total
        };
    },

    findById: async (id) => {
        return DeliveryModel.findById(id)
            .populate("order")
            .populate("driver", "-password");
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