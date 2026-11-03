import { getAllUsers} from '../services/userService.js';
import logger from '../config/logger.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    }catch (error) {
        next(error);
    }
};