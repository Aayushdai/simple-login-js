import logger from "../config/logger.js";

export const errorHandler =(error, req, res, next) => {
    logger.error("Request failed",{
        method: req.method,
        url: req.orginalUrl,
        message: error.message,
        stack: error.stack
    });

    if(res.headerSent) {
        return next(error);
    }

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: error.statusCode? error.message : "Internal Server Error"
    });
};