import { Router } from "express";
import { getProfileCardData } from "../controllers/profileCardController.js"; // Assuming cardController is the new controller
import { authMiddleware } from "../middleware/isAuthenticated.js";

const router = Router();

router.post('/card', authMiddleware, getProfileCardData);  // Card controller route with authentication

export default router;
