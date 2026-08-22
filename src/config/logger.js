import winston from "winston";
import { envConfig } from "./env.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const details = Object.keys(meta).length
            ? ` ${JSON.stringify(meta)}`
            : "";

        return `${timestamp} [${level}] ${stack || message}${details}`;
    })
);

const transports = [
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),

    new winston.transports.File({
        filename: "logs/combined.log"
    })
];

if (envConfig.nodeEnv === "development") {
    transports.push(
        new winston.transports.Console()
    );
}

const logger = winston.createLogger({
    levels: customLevels.levels,
    level: envConfig.logLevel,
    format: logFormat,
    transports
});

export default logger;