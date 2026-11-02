import User from "../models/User.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const registerUser = async (userData) => {
    const {
        firstName,
        lastName,
        phoneNumber,                      //objective destructing
        email,
        password,

    } = userData;

    const existingUser = await User.findOne({
        where: { email },
    });

    if(existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
    });

    return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        email:newUser.email,
        role: newUser.role
    }
}