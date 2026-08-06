import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

export const generateMockStore = (ownerId) => {
    return {
        _id: new mongoose.Types.ObjectId(),
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        owner: ownerId,
        isActive: faker.datatype.boolean()
    };
};

export const generateMockStores = (owners = []) => {
    const stores = [];
    
    for(const owner of owners){
        stores.push(
            generateMockStore(owner._id)
        );
    }

    return stores;
};





