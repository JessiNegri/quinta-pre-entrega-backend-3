import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional del módulo Orders", () => {

    let customerId;
    let storeOwnerId;
    let storeId;
    let orderId;

    before(async () => {
        const customerResponse = await requester.post("/api/users").send({
                firstName: "Customer",
                lastName: "Testing",
                email: "customer.orders@shipnow.test",
                password: "coder123",
                role: "customer"
            });

        customerId = customerResponse.body.payload._id;

        const storeOwnerResponse = await requester.post("/api/users").send({
                firstName: "Store",
                lastName: "Owner",
                email: "store.owner.orders@shipnow.test",
                password: "coder123",
                role: "store"
            });

        storeOwnerId = storeOwnerResponse.body.payload._id;

        const storeResponse = await requester.post("/api/stores").send({
                name: "Tienda Testing",
                address: "Calle Testing 123",
                owner: storeOwnerId,
                isActive: true
            });

        storeId = storeResponse.body.payload._id;
    });

    it("Debe obtener la lista de pedidos con código HTTP 200", async () => {
        const response = await requester.get("/api/orders");

        expect(response.status).to.equal(200);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("array");
    });

    it("Debe crear un pedido correctamente", async () => {
        const newOrder = {
            customer: customerId,
            store: storeId,
            items: [
                {
                    name: "Producto Testing",
                    quantity: 2,
                    price: 1500
                }
            ],
            deliveryAddress: "Av. Testing 456",
            priority: "normal"
        };

        const response = await requester.post("/api/orders").send(newOrder);

        expect(response.status).to.equal(201);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("customer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("items");
        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload).to.have.property("total");
        expect(response.body.payload).to.have.property("status");
        expect(response.body.payload).to.have.property("priority");

        expect(response.body.payload.items).to.be.an("array");
        expect(response.body.payload.items).to.have.lengthOf(1);

        orderId = response.body.payload._id;
    });

    it("Debe obtener un pedido existente por ID", async () => {
        const response = await requester.get(`/api/orders/${orderId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload._id).to.equal(orderId);

        expect(response.body.payload).to.have.property("customer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("items");
        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload).to.have.property("status");
        expect(response.body.payload).to.have.property("priority");
    });

    it("Debe actualizar correctamente el estado de un pedido", async () => {
        const response = await requester.put(`/api/orders/${orderId}/status`).send({
                status: "assigned"
            });

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload.status).to.equal("assigned");
    });

    it("Debe responder 400 al intentar crear un pedido con datos incompletos", async () => {
        const incompleteOrder = {customer: customerId};

        const response = await requester.post("/api/orders").send(incompleteOrder);

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("VALIDATION_ERROR");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 404 al buscar un pedido inexistente", async () => {
        const nonExistingId = "64b000000000000000000000";

        const response = await requester.get(`/api/orders/${nonExistingId}`);

        expect(response.status).to.equal(404);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("ORDER_NOT_FOUND");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 al actualizar un pedido con un estado inválido", async () => {
        const response = await requester.put(`/api/orders/${orderId}/status`).send({
                status: "estado_inexistente"
            });

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("INVALID_ORDER_STATUS");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 al buscar un pedido con ID inválido", async () => {
        const response = await requester.get("/api/orders/id-invalido");

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("VALIDATION_ERROR");
        expect(response.body).to.have.property("message");
    });

});