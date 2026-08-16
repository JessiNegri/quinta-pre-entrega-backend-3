import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockStores } from "../mocks/stores.mock.js";
import { generateMockOrders } from "../mocks/orders.mock.js";
import { generateMockDeliveries } from "../mocks/deliveries.mock.js";

import { USER_ROLES } from "../constants/userroles.js";
import { ordersRepository } from "../repositories/orders.repository.js";
import { createError } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export const mocksService = {

    getMockUsers: async (qty = 10) => {

        if (!Number.isInteger(qty) || qty <= 0) {
            logger.warning(`Cantidad inválida de usuarios mock: ${qty}`);
            throw createError("INVALID_MOCK_QUANTITY");
        }

        logger.debug(`Generando ${qty} usuarios mock`);

        return await generateMockUsers(qty);
    },

    getMockOrders: async (qty = 10) => {

        if (!Number.isInteger(qty) || qty <= 0) {
            logger.warning(`Cantidad inválida de pedidos mock: ${qty}`);
            throw createError("INVALID_MOCK_QUANTITY");
        }

        logger.debug(`Generando ${qty} pedidos mock`);

        const mockUsers = await generateMockUsers(qty * 3);

        if (mockUsers.length >= 2) {
            mockUsers[0].role = USER_ROLES.CUSTOMER;
            mockUsers[1].role = USER_ROLES.STORE;
        }

        const owners = mockUsers.filter(
            user => user.role === USER_ROLES.STORE
        );

        const customers = mockUsers.filter(
            user => user.role === USER_ROLES.CUSTOMER
        );

        if (owners.length === 0) {
            logger.warning(
                "No se encontraron usuarios con rol store para generar mocks"
            );
            throw createError("STORE_NOT_FOUND");
        }

        if (customers.length === 0) {
            logger.warning(
                "No se encontraron usuarios customer para generar mocks"
            );
            throw createError("USER_NOT_FOUND");
        }

        const mockStores = generateMockStores(owners);

        const mockOrders = generateMockOrders(
            qty,
            customers,
            mockStores
        );

        logger.info(
            `${mockOrders.length} pedidos mock generados correctamente`
        );

        return mockOrders;
    },

    generateData: async ({
        users = 10,
        stores = 5,
        orders = 20
    } = {}) => {

        if (
            !Number.isInteger(users) ||
            !Number.isInteger(stores) ||
            !Number.isInteger(orders) ||
            users < 3 ||
            stores <= 0 ||
            orders <= 0
        ) {
            logger.warning(
                `Cantidad inválida para generación de datos: users=${users}, stores=${stores}, orders=${orders}`
            );

            throw createError("INVALID_MOCK_QUANTITY");
        }

        logger.info(
            `Iniciando generación de datos mock: users=${users}, stores=${stores}, orders=${orders}`
        );

        const mockUsers = await generateMockUsers(users);

        if (mockUsers.length >= 3) {
            mockUsers[0].role = USER_ROLES.CUSTOMER;
            mockUsers[1].role = USER_ROLES.STORE;
            mockUsers[2].role = USER_ROLES.DRIVER;
        }

        const createdUsers =
            await ordersRepository.insertManyUsers(mockUsers);

        const owners = createdUsers.filter(
            user => user.role === USER_ROLES.STORE
        );

        const customers = createdUsers.filter(
            user => user.role === USER_ROLES.CUSTOMER
        );

        const drivers = createdUsers.filter(
            user => user.role === USER_ROLES.DRIVER
        );

        if (owners.length === 0) {
            logger.warning("No se encontraron usuarios con rol store");
            throw createError("STORE_NOT_FOUND");
        }

        if (customers.length === 0) {
            logger.warning("No se encontraron usuarios con rol customer");
            throw createError("USER_NOT_FOUND");
        }

        if (drivers.length === 0) {
            logger.warning("No se encontraron usuarios con rol driver");
            throw createError("DRIVER_NOT_FOUND");
        }

        const mockStores = generateMockStores(
            owners.slice(0, stores)
        );

        const createdStores =
            await ordersRepository.insertManyStores(mockStores);

        const mockOrders = generateMockOrders(
            orders,
            customers,
            createdStores
        );

        const createdOrders =
            await ordersRepository.insertManyOrders(mockOrders);

        const mockDeliveries = generateMockDeliveries(
            createdOrders,
            drivers
        );

        const createdDeliveries =
            await ordersRepository.insertManyDeliveries(
                mockDeliveries
            );

        logger.info(
            `Datos mock generados correctamente: users=${createdUsers.length}, stores=${createdStores.length}, orders=${createdOrders.length}, deliveries=${createdDeliveries.length}`
        );

        return {
            users: createdUsers.length,
            stores: createdStores.length,
            orders: createdOrders.length,
            deliveries: createdDeliveries.length
        };
    }
};