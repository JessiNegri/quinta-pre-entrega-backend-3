import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional del módulo Mocking", () => {

    it("Debe responder con código HTTP 200 al generar usuarios mock", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=2");

        expect(response.status).to.equal(200);
    });

    it("Debe devolver un objeto como respuesta", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=2");

        expect(response.body).to.be.an("object");
    });

    it("Debe contener las propiedades status y payload", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=2");

        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("payload");

        expect(response.body.status).to.equal("success");
    });

    it("Payload debe ser un arreglo", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=2");

        expect(response.body.payload).to.be.an("array");
    });

    it("Payload debe contener usuarios mock", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=2");

        expect(response.body.payload).to.have.lengthOf(2);

        const user = response.body.payload[0];

        expect(user).to.have.property("firstName");
        expect(user).to.have.property("lastName");
        expect(user).to.have.property("email");
        expect(user).to.have.property("password");
        expect(user).to.have.property("role");
    });

    it("Debe responder con código HTTP 200 al generar pedidos mock", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=2");

        expect(response.status).to.equal(200);
    });

    it("Debe devolver un objeto como respuesta al generar pedidos mock", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=2");

        expect(response.body).to.be.an("object");
    });

    it("Debe contener las propiedades status y payload en pedidos mock", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=2");

        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("payload");

        expect(response.body.status).to.equal("success");
    });

    it("Payload debe contener pedidos mock", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=2");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.lengthOf(2);

        const order = response.body.payload[0];

        expect(order).to.have.property("items");
        expect(order).to.have.property("deliveryAddress");
        expect(order).to.have.property("total");
        expect(order).to.have.property("status");
        expect(order).to.have.property("priority");

        expect(order.items).to.be.an("array");
    });

    it("Debe responder 400 si la cantidad de usuarios mock es 0", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=0");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 si la cantidad de usuarios mock es negativa", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=-1");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 si la cantidad de usuarios mock no es numérica", async () => {
        const response = await requester.get("/api/mocks/mockingusers?qty=abc");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 si la cantidad de pedidos mock es 0", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=0");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 si la cantidad de pedidos mock es negativa", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=-1");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 si la cantidad de pedidos mock no es numérica", async () => {
        const response = await requester.get("/api/mocks/mockingorders?qty=abc");

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_MOCK_QUANTITY"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe generar datos de prueba correctamente", async () => {
    const response = await requester.post("/api/mocks/generateData").send({
            users: 3,
            stores: 1,
            orders: 2
        });

    expect(response.status).to.equal(201);

    expect(response.body).to.be.an("object");
    expect(response.body.status).to.equal("success");
    expect(response.body).to.have.property("message");
    expect(response.body).to.have.property("payload");

    expect(response.body.payload).to.be.an("object");
    expect(response.body.payload).to.have.property("users");
    expect(response.body.payload).to.have.property("stores");
    expect(response.body.payload).to.have.property("orders");
    expect(response.body.payload).to.have.property("deliveries");

    expect(response.body.payload.users).to.equal(3);
    expect(response.body.payload.stores).to.equal(1);
    expect(response.body.payload.orders).to.equal(2);
    expect(response.body.payload.deliveries).to.equal(2);
});

it("Debe responder 400 al intentar generar datos con cantidades inválidas", async () => {
    const response = await requester.post("/api/mocks/generateData").send({
            users: 2,
            stores: 0,
            orders: -1
        });

    expect(response.status).to.equal(400);

    expect(response.body).to.be.an("object");
    expect(response.body.status).to.equal("error");
    expect(response.body.error).to.equal(
        "INVALID_MOCK_QUANTITY"
    );
    expect(response.body).to.have.property("message");
});

});

