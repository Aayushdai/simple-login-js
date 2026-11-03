import {getUsers} from '../controllers/userController.js';
import express from 'express';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.get('/', cacheMiddleware("users",60),getUsers);

export default router;