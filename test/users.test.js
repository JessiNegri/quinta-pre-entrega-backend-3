import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional del módulo Users", () => {

    let createdUserId;

    it("Debe obtener la lista de usuarios con código HTTP 200", async () => {
        const response = await requester.get("/api/users");

        expect(response.status).to.equal(200);

        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("array");
    });

    it("Debe crear un usuario correctamente", async () => {
        const newUser = {
            firstName: "Usuario",
            lastName: "Testing",
            email: "usuario.testing@shipnow.test",
            password: "coder123",
            role: "customer"
        };

        const response = await requester.post("/api/users").send(newUser);

        expect(response.status).to.equal(201);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("firstName");
        expect(response.body.payload).to.have.property("lastName");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("role");

        expect(response.body.payload.firstName).to.equal("Usuario");
        expect(response.body.payload.lastName).to.equal("Testing");
        expect(response.body.payload.email).to.equal(
            "usuario.testing@shipnow.test"
        );
        expect(response.body.payload.role).to.equal("customer");

        createdUserId = response.body.payload._id;
    });

    it("Debe obtener un usuario existente por ID", async () => {
        const response = await requester.get(`/api/users/${createdUserId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload._id).to.equal(createdUserId);
        expect(response.body.payload).to.have.property("firstName");
        expect(response.body.payload).to.have.property("lastName");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("role");
    });

    it("Debe responder 400 al intentar crear un usuario con datos incompletos", async () => {
        const incompleteUser = {
            firstName: "Usuario",
            email: "incompleto@shipnow.test"
};

        const response = await requester.post("/api/users").send(incompleteUser);

        expect(response.status).to.equal(400);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("VALIDATION_ERROR");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 400 al enviar un rol de usuario inválido", async () => {
        const invalidUser = {
            firstName: "Usuario",
            lastName: "Invalido",
            email: "rol.invalido@shipnow.test",
            password: "coder123",
            role: "superadmin"
        };

        const response = await requester.post("/api/users").send(invalidUser);

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("INVALID_USER_ROLE");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder 404 al buscar un usuario inexistente", async () => {
        const nonExistingId = "64b000000000000000000000";

        const response = await requester.get(`/api/users/${nonExistingId}`);

        expect(response.status).to.equal(404);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("USER_NOT_FOUND");
        expect(response.body.message).to.equal(
            "Usuario no encontrado"
        );
    });

    it("Debe responder 400 al buscar un usuario con ID inválido", async () => {
        const response = await requester.get("/api/users/id-invalido");

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("VALIDATION_ERROR");
        expect(response.body.message).to.equal("ID invalido");
    });

});