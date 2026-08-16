import UserModel from "../models/user.model.js";

export const usersRepository = {
    findAll: async ({ page = 1, limit = 10 } = {}) => {
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            UserModel.find()
                .select("-password")
                .skip(skip)
                .limit(limit),
            UserModel.countDocuments()
        ]);

        return {
            users,
            total
        };
    },

    findById: async (id) => {
        return UserModel.findById(id).select("-password");
    },

    create: async (userData) => {
        const user = await UserModel.create(userData);

        const userObject = user.toObject();
        delete userObject.password;

        return userObject;
    },

    update: async (id, updates) => {
        return UserModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");
    },

    delete: async (id) => {
        return UserModel.findByIdAndDelete(id).select("-password");
    }
};