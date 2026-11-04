import {getUsers} from '../controllers/userController.js';
import express from 'express';
import { rateLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.get('/',rateLimiter,getUsers);

export default router;