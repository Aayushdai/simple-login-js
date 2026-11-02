import express from "express";
import { register, login} from "../controllers/authController.js";
import { validate} from "../middleware/validate.js";
import { registerSchema, loginSchema} from "../validators/authValidator.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", isAuthenticated, getCurrentUser);
export default router;