import mongoose from "mongoose";
import { envConfig } from "./env.js";
import logger from "./logger.js";

const connectDB = async () => {
    const mongoUri = envConfig.mongoUri;

    if (!mongoUri) {
        const error = new Error("Falta la variable MONGODB_URI");

        logger.fatal(`Error de configuración: ${error.message}`);

        throw error;
    }

    try {
        await mongoose.connect(mongoUri);

        logger.info("MongoDB conectado");
    } catch (error) {
        logger.fatal(`Error al conectar con MongoDB: ${error.message}`);

        throw error;
    }
};

export default connectDB;
