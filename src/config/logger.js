import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

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

const logger = winston.createLogger({
    levels: customLevels.levels,

    level: process.env.NODE_ENV === "production"
        ? "info"
        : "debug",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        })
    ),

    transports: [
        new winston.transports.Console(),

        new DailyRotateFile({
            filename: "logs/error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "7d",
            level: "error"
        })
    ]
});

export default logger;