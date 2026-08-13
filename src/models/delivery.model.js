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
        },

        proof: {
            originalName: {
                type: String
            },

            fileName: {
                type: String
            },

            path: {
                type: String
            },

            mimetype: {
                type: String
            },

            size: {
                type: Number
            },

            documentType: {
                type: String,
                default: "delivery-proof"
            },

            uploadedAt: {
                type: Date
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const DeliveryModel = mongoose.model("Delivery", deliverySchema);

export default DeliveryModel;