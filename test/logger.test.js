import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional del módulo Logger", () => {

    it("Debe responder correctamente al endpoint del logger", async () => {
        const response = await requester.get("/api/logger/test");

        expect(response.status).to.equal(200);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("success");

        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("payload");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("levels");

        expect(response.body.payload.levels).to.be.an("array");
        expect(response.body.payload.levels).to.include("debug");
        expect(response.body.payload.levels).to.include("http");
        expect(response.body.payload.levels).to.include("info");
        expect(response.body.payload.levels).to.include("warning");
        expect(response.body.payload.levels).to.include("error");
        expect(response.body.payload.levels).to.include("fatal");
    });

});