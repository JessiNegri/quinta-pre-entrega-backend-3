import { usersService } from "../services/users.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await usersService.getUsers();

        return successResponse(res, { message: "Lista de usuarios", payload: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await usersService.getUserById(req.params.uid);

        return successResponse(res, { message: "Usuario obtenido correctamente", payload: user });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await usersService.createUser(req.body);

        return successResponse(res, { statusCode: 201, message: "Usuario creado correctamente", payload: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await usersService.updateUser( req.params.uid, req.body);

        return successResponse(res, {message: "Usuario actualizado correctamente", payload: user});
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await usersService.deleteUser(req.params.uid);

        return successResponse(res, { message: "Usuario eliminado correctamente", payload: user });
    } catch (error) {
        next(error);
    }
};