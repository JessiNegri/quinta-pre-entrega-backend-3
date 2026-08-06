import { Router } from "express";
import { generateMockUsers, generateMockOrders, generateData } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingusers", generateMockUsers);

router.get("/mockingorders", generateMockOrders);

router.post("/generateData", generateData);

export default router;

