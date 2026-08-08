import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockStores } from "../mocks/stores.mock.js";
import { generateMockOrders } from "../mocks/orders.mock.js";
import { generateMockDeliveries } from "../mocks/deliveries.mock.js";

import { USER_ROLES } from "../constants/userroles.js";
import { ordersRepository } from "../repositories/orders.repository.js";
import { createError } from "../utils/apiResponse.js";

export const mocksService = {

    getMockUsers: async (qty = 10) => {

        if (!Number.isInteger(qty) || qty <= 0) {
            throw createError("INVALID_MOCK_QUANTITY");
        }

        return await generateMockUsers(qty);
    },

    getMockOrders: async (qty = 10) => {

        if (!Number.isInteger(qty) || qty <= 0) {
            throw createError("INVALID_MOCK_QUANTITY");
        }

        const mockUsers = await generateMockUsers(qty * 3);

        const owners = mockUsers.filter(
            user => user.role === USER_ROLES.STORE
        );

        const customers = mockUsers.filter(
            user => user.role === USER_ROLES.CUSTOMER
        );

        if (owners.length === 0) {
            throw createError("STORE_NOT_FOUND");
        }

        if (customers.length === 0) {
            throw createError("USER_NOT_FOUND");
        }

        const mockStores = generateMockStores(owners);

        return generateMockOrders(
            qty,
            customers,
            mockStores
        );
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
            users <= 0 ||
            stores <= 0 ||
            orders <= 0
        ) {
            throw createError("INVALID_MOCK_QUANTITY");
        }

        const mockUsers = await generateMockUsers(users);

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
            throw createError("STORE_NOT_FOUND");
        }

        if (customers.length === 0) {
            throw createError("USER_NOT_FOUND");
        }

        if (drivers.length === 0) {
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

        const mockDeliveries =
            generateMockDeliveries(
                createdOrders,
                drivers
            );

        const createdDeliveries =
            await ordersRepository.insertManyDeliveries(
                mockDeliveries
            );

        return {
            users: createdUsers.length,
            stores: createdStores.length,
            orders: createdOrders.length,
            deliveries: createdDeliveries.length
        };
    }
};
