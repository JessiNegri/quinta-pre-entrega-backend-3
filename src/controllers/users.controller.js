import { usersService } from "../services/users.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await usersService.getUsers();

        return successResponse(res, {
            message: "Lista de usuarios",
            payload: users
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await usersService.getUserById(req.params.uid);

        return successResponse(res, {
            message: "Usuario obtenido correctamente",
            payload: user
        });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await usersService.createUser(req.body);
        res.status(201).json({ status: "success", payload: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await usersService.updateUser(req.params.uid, req.body);
        res.json({ status: "success", payload: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await usersService.deleteUser(req.params.uid);
        res.json({ status: "success", payload: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
};








