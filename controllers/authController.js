import { registerUser } from "../services/authService.js";

export const register = async (req,res) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user
        });
    }catch (error) {
        const statusCode =
        error.message === "Email already registered" ? 409 : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
}