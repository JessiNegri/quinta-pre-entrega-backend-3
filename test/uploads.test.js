import { expect } from "chai";
import supertest from "supertest";
import path from "path";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional de carga de archivos", () => {

    let createdUserId;

    before(async () => {
        const newUser = {
            firstName: "Archivo",
            lastName: "Testing",
            email: "archivo.testing@shipnow.test",
            password: "coder123",
            role: "customer"
        };

        const response = await requester
            .post("/api/users")
            .send(newUser);

        createdUserId = response.body.payload._id;
    });

    it("Debe cargar correctamente un documento de usuario", async () => {
        const filePath = path.resolve(
            "test/files/test-document.pdf"
        );

        const response = await requester
            .post(`/api/users/${createdUserId}/documents`)
            .field("type", "user_document")
            .attach("document", filePath);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload.documents).to.be.an("array");

        const documents = response.body.payload.documents;

        expect(documents.length).to.be.greaterThan(0);

        const document = documents[documents.length - 1];

        expect(document.originalName).to.equal(
            "test-document.pdf"
        );

        expect(document.type).to.equal("user_document");
        expect(document.mimetype).to.equal("application/pdf");
        expect(document).to.have.property("fileName");
        expect(document).to.have.property("path");
        expect(document).to.have.property("size");
    });

    it("Debe responder error cuando falta el archivo", async () => {
        const response = await requester
            .post(`/api/users/${createdUserId}/documents`)
            .field("type", "user_document");

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("FILE_REQUIRED");
        expect(response.body).to.have.property("message");
    });

    it("Debe responder error cuando el tipo de documento es inválido", async () => {
        const filePath = path.resolve(
            "test/files/test-document.pdf"
        );

        const response = await requester
            .post(`/api/users/${createdUserId}/documents`)
            .field("type", "tipo_invalido")
            .attach("document", filePath);

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "INVALID_DOCUMENT_TYPE"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder error cuando la entrega no existe al cargar un comprobante", async () => {
        const nonExistingDeliveryId =
            "64b000000000000000000000";

        const filePath = path.resolve(
            "test/files/test-document.pdf"
        );

        const response = await requester
            .post(
                `/api/deliveries/${nonExistingDeliveryId}/proof`
            )
            .attach("proof", filePath);

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal(
            "DELIVERY_NOT_FOUND"
        );
        expect(response.body).to.have.property("message");
    });

    it("Debe responder error cuando el tipo de archivo no está permitido", async () => {
    const filePath = path.resolve(
        "test/files/test-image.jpg"
    );

    const response = await requester
        .post(`/api/users/${createdUserId}/documents`)
        .field("type", "user_document")
        .attach("document", filePath);

    expect(response.status).to.equal(400);

    expect(response.body.status).to.equal("error");
    expect(response.body.error).to.equal(
        "INVALID_FILE_TYPE"
    );
    expect(response.body).to.have.property("message");
});

it("Debe responder error cuando el campo del archivo es incorrecto", async () => {
    const filePath = path.resolve(
        "test/files/test-document.pdf"
    );

    const response = await requester
        .post(`/api/users/${createdUserId}/documents`)
        .field("type", "user_document")
        .attach("file", filePath);

    expect(response.status).to.equal(400);

    expect(response.body.status).to.equal("error");
    expect(response.body.error).to.equal(
        "INVALID_FILE_FIELD"
    );
    expect(response.body).to.have.property("message");
});

});