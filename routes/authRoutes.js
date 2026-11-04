import express from "express";
import { rateLimiter} from "../middleware/rateLimitMiddleware.js";
import { register, login, logout} from "../controllers/authController.js";
import { validate} from "../middleware/validate.js";
import { registerSchema, loginSchema} from "../validators/authValidator.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register",rateLimiter, validate(registerSchema), register);
router.post("/login", rateLimiter, validate(loginSchema), login);
router.get("/me", isAuthenticated, getCurrentUser);
router.post("/logout", isAuthenticated, logout);
export default router;