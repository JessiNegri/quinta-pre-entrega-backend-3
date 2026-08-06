import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/orderstatus.js";

const deliverySchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.CREATED
        },

        deliveredAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


const DeliveryModel = mongoose.model("Delivery", deliverySchema);

export default DeliveryModel;