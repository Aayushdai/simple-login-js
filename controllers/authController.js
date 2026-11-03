import { registerUser, loginUser, logoutUser } from "../services/authService.js";
import logger from "../config/logger.js";

export const register = async (req,res, next) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user
        });
    }catch (error) {
        next(error);
    }
}

export const login = async (req,res, next) => {
    try {
        const user = await loginUser(req.body);

        req.session.regenerate((error) => {
            if(error){
                next(error);
             }
 
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        
        req.session.save((error) => {
            if(error) {
                return next(error);
            }
            return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
            });
        
        });        
    } catch (error) {
       next(error);
        
    }
}

export const getCurrentUser = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.session.user
    });
};

export const logout = async (req, res, next) => {
    try {
        await logoutUser(req);
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }catch (error) {
        next(error);
    }
};