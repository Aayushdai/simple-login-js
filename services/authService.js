import User from "../models/User.js";
import { redisClient } from "../config/redis.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import AppError from "../utils/AppError.js";

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
        throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
    });

    await redisClient.del("users");

    return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        email:newUser.email,
        role: newUser.role
    }

}

export const loginUser = async ({email, password}) => {
    const user = await User.findOne({
        where: { email }
    });

    if(!user) {
throw new AppError("Invalid email or password", 401);    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if(!isPasswordValid) {
throw new AppError("Invalid email or password", 401);    }

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
    };
};

export const logoutUser = (req) => {
    return new Promise((resolve, reject)=> {
        req.session.destroy((error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
};