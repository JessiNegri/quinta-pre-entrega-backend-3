import dotenv from "dotenv";

dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const requiredEnvVars = ["PORT", "MONGODB_URI", "NODE_ENV"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Falta la variable de entorno: ${envVar}`);
    }
});

export const envConfig = {
    port: process.env.PORT,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV
};