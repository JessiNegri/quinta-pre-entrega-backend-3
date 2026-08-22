import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional del módulo Deliveries", () => {

    let customerId;
    let storeOwnerId;
    let storeId;
    let driverId;
    let orderId;
    let deliveryId;

    before(async () => {
        const customerResponse = await requester.post("/api/users").send({
            firstName: "Customer",
            lastName: "Delivery",
            email: "customer.delivery@shipnow.test",
            password: "coder123",
            role: "customer"
        });

        customerId = customerResponse.body.payload._id;

        const storeOwnerResponse = await requester.post("/api/users").send({
            firstName: "Store",
            lastName: "Delivery",
            email: "store.delivery@shipnow.test",
            password: "coder123",
            role: "store"
        });

        storeOwnerId = storeOwnerResponse.body.payload._id;

        const driverResponse = await requester.post("/api/users").send({
            firstName: "Driver",
            lastName: "Delivery",
            email: "driver.delivery@shipnow.test",
            password: "coder123",
            role: "driver"
        });

        driverId = driverResponse.body.payload._id;

        const storeResponse = await requester.post("/api/stores").send({
            name: "Tienda Delivery Testing",
            address: "Calle Delivery 123",
            owner: storeOwnerId,
            isActive: true
        });

        storeId = storeResponse.body.payload._id;

        const orderResponse = await requester.post("/api/orders").send({
            customer: customerId,
            store: storeId,
            items: [
                {
                    name: "Producto Delivery",
                    quantity: 1,
                    price: 2500
                }
            ],
            deliveryAddress: "Av. Delivery 456",
            priority: "normal"
        });

        orderId = orderResponse.body.payload._id;
    });

    it("Debe obtener la lista de entregas con código HTTP 200", async () => {
        const response = await requester.get("/api/deliveries");

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");
        expect(response.body.payload).to.be.an("array");
        expect(response.body).to.have.property("pagination");
    });

    it("Debe crear una entrega correctamente", async () => {
        const newDelivery = {
            order: orderId,
            driver: driverId
        };

        const response = await requester
            .post("/api/deliveries")
            .send(newDelivery);

        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("order");
        expect(response.body.payload).to.have.property("driver");
        expect(response.body.payload).to.have.property("status");

        expect(response.body.payload.status).to.equal("created");

        deliveryId = response.body.payload._id;
    });

    it("Debe obtener una entrega existente por ID", async () => {
        const response = await requester.get(
            `/api/deliveries/${deliveryId}`
        );

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload._id).to.equal(deliveryId);

        expect(response.body.payload).to.have.property("order");
        expect(response.body.payload).to.have.property("driver");
        expect(response.body.payload).to.have.property("status");
    });

    it("Debe actualizar correctamente el estado de una entrega", async () => {
        const response = await requester
            .patch(`/api/deliveries/${deliveryId}/status`)
            .send({
                status: "in_transit"
            });

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload.status).to.equal("in_transit");
    });

    it("Debe responder 400 al crear una entrega con datos incompletos", async () => {
        const response = await requester
            .post("/api/deliveries")
            .send({
                order: orderId
            });

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("VALIDATION_ERROR");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 404 al buscar una entrega inexistente", async () => {
        const nonExistingId = "64b000000000000000000000";

        const response = await requester.get(
            `/api/deliveries/${nonExistingId}`
        );

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("DELIVERY_NOT_FOUND");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 al actualizar una entrega con estado inválido", async () => {
        const response = await requester
            .patch(`/api/deliveries/${deliveryId}/status`)
            .send({
                status: "estado_inexistente"
            });

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("INVALID_ORDER_STATUS");
        expect(response.body).to.have.property("message");
    });

    it("Debe eliminar una entrega correctamente", async () => {
        const response = await requester.delete(
            `/api/deliveries/${deliveryId}`
        );

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload._id).to.equal(deliveryId);
    });
});