import mongoose from "mongoose";
import connectDB from "../src/config/db.js";

before(async function () {
    this.timeout(10000);

    await connectDB();

    const collections = mongoose.connection.collections;

    for (const collection of Object.values(collections)) {
        await collection.deleteMany({});
    }
});

after(async function () {
    this.timeout(10000);

    const collections = mongoose.connection.collections;

    for (const collection of Object.values(collections)) {
        await collection.deleteMany({});
    }

    await mongoose.connection.close();
});