import { usersService } from "../services/users.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { DOCUMENT_TYPES } from "../constants/documentTypes.js";
import fs from "fs";
import logger from "../config/logger.js";

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

        return successResponse(res, {
            statusCode: 201,
            message: "Usuario creado correctamente",
            payload: user
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await usersService.updateUser(
            req.params.uid,
            req.body
        );

        return successResponse(res, {
            message: "Usuario actualizado correctamente",
            payload: user
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await usersService.deleteUser(req.params.uid);

        return successResponse(res, {
            message: "Usuario eliminado correctamente",
            payload: user
        });
    } catch (error) {
        next(error);
    }
};

export const uploadUserDocument = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { type } = req.body;
        const file = req.file;

        const user = await usersService.addDocument(
            uid,
            file,
            type
        );

        logger.info(
            `Documento cargado para el usuario ${uid}: ${req.file.filename}`
        );

        return successResponse(res, {
            message: "Documento agregado correctamente",
            payload: user
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

export const uploadUserLicense = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const file = req.file;

        const user = await usersService.addDocument(
            uid,
            file,
            DOCUMENT_TYPES.LICENSE
        );

        logger.info(
            `Licencia cargada para el usuario ${uid}: ${req.file.filename}`
        );

        return successResponse(res, {
            message: "Licencia agregada correctamente",
            payload: user
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