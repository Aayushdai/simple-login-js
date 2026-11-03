import User from '../models/User.js';

export const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "role"
        ]
    });
    return users;
    }