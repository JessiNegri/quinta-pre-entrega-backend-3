import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import usersRouter from "./routes/users.router.js";
import storesRouter from "./routes/stores.router.js";
import ordersRouter from "./routes/orders.router.js";
import deliveriesRouter from "./routes/deliveries.router.js";
import mocksRouter from "./routes/mocks.router.js";
import loggerRouter from "./routes/loggers.router.js";
import healthRouter from "./routes/health.router.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "ShipNow API"
    });
});

app.use("/api/users", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/deliveries", deliveriesRouter);
app.use("/health", healthRouter);

if (process.env.NODE_ENV !== "production") {
    app.use("/api/mocks", mocksRouter);
    app.use("/api/logger", loggerRouter);
}

// Middleware para rutas inexistentes
app.use(notFoundHandler);

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;


