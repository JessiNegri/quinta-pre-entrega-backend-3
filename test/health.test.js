import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Testing funcional del Health Check", () => {

    it("Debe responder con código HTTP 200", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.status).to.equal(200);
    });

    it("Debe devolver el estado de la API", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.body).to.have.property("status");
        expect(response.body.status).to.equal("success");
    });

    it("Debe devolver información del entorno y uptime", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.body).to.have.property("environment");
        expect(response.body).to.have.property("uptime");
        expect(response.body.uptime).to.be.a("number");
    });

    it("Debe devolver un timestamp válido", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.body).to.have.property("timestamp");
        expect(new Date(response.body.timestamp).toString())
            .to.not.equal("Invalid Date");
    });
});