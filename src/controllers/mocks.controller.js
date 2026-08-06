import { mocksService } from "../services/mocks.service.js";

export const generateMockUsers = async (req, res) => {
    try {
        const qty = Number(req.query.qty) || 10;

        const users = await mocksService.getMockUsers(qty);

        res.json({
            status: "success",
            payload: users
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const generateMockOrders = async (req, res) => {
    try {
        const qty = Number(req.query.qty) || 10;

        const orders = await mocksService.getMockOrders(qty);

        res.json({
            status: "success",
            payload: orders
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const generateData = async (req, res) => {
    try {
        const result = await mocksService.generateData(req.body);

        res.status(201).json({
            status: "success",
            payload: result
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};