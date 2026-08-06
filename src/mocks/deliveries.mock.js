import { faker } from "@faker-js/faker";

import { ORDER_STATUS } from "../constants/orderstatus.js";

export const generateMockDelivery = (orderId, driverId) => {

    return {
        order: orderId,
        driver: driverId,
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
        deliveredAt: null
    };

};

export const generateMockDeliveries = (orders = [], drivers = []) => {
    const deliveries = [];

    if (!orders.length || !drivers.length) {
        return deliveries;
}

    for (const order of orders) {
        const driver = faker.helpers.arrayElement(drivers);

        deliveries.push(generateMockDelivery(order._id, driver._id));
    }

    return deliveries;
};