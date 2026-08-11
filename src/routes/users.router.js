import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Devuelve la lista de usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener un usuario por ID
 *     description: Devuelve un usuario específico mediante su identificador.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:uid", getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:uid", updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario existente mediante su identificador.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 6a46646de068d46fc6bbda5a
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:uid", deleteUser);

export default router;