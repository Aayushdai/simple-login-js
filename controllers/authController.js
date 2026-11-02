import { registerUser, loginUser } from "../services/authService.js";

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

export const login = async (req,res) => {
    try {
        const user = await loginUser(req.body);

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        req.session.regenerate((error) => {
            if(error){
                return res.status(500).json({
                    success: false,
                    message: "Session creation failed"
                })
 
            }
 
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        
        req.session.save((error) => {
            if(error) {
                return res.status(500).json({
                    success: false,
                    message: "Session saving failed"
                });
            }
            return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
            });
        
        });        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getCurrentUser = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.session.user
    });
};