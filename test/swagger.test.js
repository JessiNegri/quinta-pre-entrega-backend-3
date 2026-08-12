import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";

const requester = supertest(app);

describe("Testing funcional de Swagger", () => {

    it("Debe permitir acceder a la documentación Swagger", async () => {
        const response = await requester.get("/api/docs/");

        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("text/html");
    });

});