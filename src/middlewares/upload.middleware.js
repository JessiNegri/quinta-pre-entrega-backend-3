import multer from "multer";
import { createError } from "../utils/apiResponse.js";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const uploadDirectories = [
    "uploads/documents",
    "uploads/licenses",
    "uploads/proofs"
];

uploadDirectories.forEach((directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "document") {
            return callback(null, "uploads/documents");
        }

        if (file.fieldname === "license") {
            return callback(null, "uploads/licenses");
        }

        if (file.fieldname === "proof") {
            return callback(null, "uploads/proofs");
        }

        return callback(createError("INVALID_FILE_FIELD"));
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const fileName = `${crypto.randomUUID()}${extension}`;

        callback(null, fileName);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === "application/pdf") {
        return callback(null, true);
    }

    return callback(createError("INVALID_FILE_TYPE"));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;