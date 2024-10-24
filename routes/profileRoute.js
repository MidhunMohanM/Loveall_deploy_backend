import { Router } from "express";
import { getProfileCardData } from "../controllers/profileCardController.js";
import { getPersonalInfo, updatePersonalInfo } from "../controllers/profileEditPersonalInfoController.js";
import { authMiddleware } from "../middleware/isAuthenticated.js";

const router = Router();

router.post('/card', authMiddleware, getProfileCardData);
router.get('/account', authMiddleware, getPersonalInfo);  // Keeping the existing account route
router.get('/edit-personal-info', authMiddleware, getPersonalInfo);
router.put('/edit-personal-info', authMiddleware, updatePersonalInfo);

export default router;