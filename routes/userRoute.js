import { Router } from "express";
import discountController from "../controllers/discountController.js";
import transaction from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middleware/isAuthenticated.js";
import feedback from "../controllers/feedback.controller.js";
import category from "../controllers/category.controller.js";
import dashboard from "../controllers/dashboard.controller.js";
import home from "../controllers/home.controller.js";

const router = Router();
router.post('/discount', discountController);
router.post('/home', home)
router.get('/transaction',authMiddleware, transaction);
router.post('/feedback', authMiddleware, feedback);
router.get('/category', category);
router.get('/dashboard',authMiddleware, dashboard);

export default router;