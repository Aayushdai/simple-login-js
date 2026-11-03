import { getAllUsers} from '../services/userService.js';
import logger from '../config/logger.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    }catch (error) {
        logger.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}