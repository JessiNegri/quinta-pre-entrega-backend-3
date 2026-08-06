import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockStores } from "../mocks/stores.mock.js";
import { generateMockOrders } from "../mocks/orders.mock.js";
import { generateMockDeliveries } from "../mocks/deliveries.mock.js";

import { USER_ROLES } from "../constants/userroles.js";
import { ordersRepository } from "../repositories/orders.repository.js";

export const mocksService = {

    getMockUsers: async (qty = 10) => {
        return await generateMockUsers(qty);
    },

    getMockOrders: async (qty = 10) => {

        const mockUsers = await generateMockUsers(qty * 3);

        let owners = mockUsers.filter(user => user.role === USER_ROLES.STORE);

        let customers = mockUsers.filter(user => user.role === USER_ROLES.CUSTOMER);

        if (owners.length === 0) {owners.push(mockUsers[0]);}

        if (customers.length === 0) {customers.push(mockUsers[1]);}

        const mockStores = generateMockStores(owners);

        return generateMockOrders(qty, customers, mockStores);
},

    generateData: async ({ users = 10, stores = 5, orders = 20 }) => {

        const mockUsers = await generateMockUsers(users);

        const createdUsers = await ordersRepository.insertManyUsers(mockUsers);

        const owners = createdUsers.filter(user => user.role === USER_ROLES.STORE);

        const customers = createdUsers.filter(user => user.role === USER_ROLES.CUSTOMER);

        const drivers = createdUsers.filter(user => user.role === USER_ROLES.DRIVER);

        const mockStores = generateMockStores(owners.slice(0, stores));

        const createdStores = await ordersRepository.insertManyStores(mockStores);

        const mockOrders = generateMockOrders(orders, customers, createdStores);

        const createdOrders = await ordersRepository.insertManyOrders(mockOrders);

        const mockDeliveries = generateMockDeliveries(createdOrders, drivers);

        const createdDeliveries = await ordersRepository.insertManyDeliveries(mockDeliveries);

        return {
            users: createdUsers.length,
            stores: createdStores.length,
            orders: createdOrders.length,
            deliveries: createdDeliveries.length
        };
    }
};