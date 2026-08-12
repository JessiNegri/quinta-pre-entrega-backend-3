import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional de rutas generales", () => {

    it("Debe responder 404 para una ruta inexistente", async () => {
        const response = await requester.get("/api/ruta-inexistente");

        expect(response.status).to.equal(404);

        expect(response.body).to.be.an("object");
        expect(response.body.status).to.equal("error");
        expect(response.body.error).to.equal("ROUTE_NOT_FOUND");
        expect(response.body.message).to.equal("Ruta no encontrada");
    });

});