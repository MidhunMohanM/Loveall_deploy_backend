import { Router } from 'express';
import { businessAuthMiddleware } from "../middleware/isAuthenticated.js";
import businessRegister from '../controllers/BusinessRegister.js';
import businessLogin from '../controllers/BusinessLogin.js';
import businessVerifyOtp from '../controllers/BusinessVerifyOtp.js';
import businessForgetPassword from '../controllers/BForgetPassword.js';
import businessSendOTP from '../controllers/BSendOtp.js';
import manualverify from '../controllers/ManualVerification.js';
import changePassword from '../controllers/BChangePassword.js';
import businessProfileController from '../controllers/BusinessProfileController.js';
import businessProfileUpdateController from '../controllers/BusinessProfileUpdateController.js';
import businessCreateOfferController from '../controllers/BusinessCreateOfferController.js';
import businessYourOffersController from '../controllers/BusinessYourOffersController.js';
import businessCheckStoresController from '../controllers/BusinessCheckStoresController.js';
import BusinessManageManyOffersController from '../controllers/BusinessManyOfferController.js';
import businessProfileHeaderController from '../controllers/BusinessProfileHeaderController.js';
import fetchFeedback from '../controllers/BFeedback.controller.js';
import { BusinessTransactionController } from '../controllers/BTransaction.controller.js';

const router = Router();

router.post('/register', businessRegister);
router.post('/login', businessLogin);
router.post('/forget-password', businessForgetPassword);
router.post('/verify-otp', businessVerifyOtp);
router.post('/send-otp', businessSendOTP);
router.post('/manualverify', manualverify);
router.post('/ChangePass', changePassword);
router.post('/profile', businessAuthMiddleware, businessProfileController); 
router.put('/update-profile', businessAuthMiddleware, businessProfileUpdateController);
router.post('/create-offer', businessAuthMiddleware, businessCreateOfferController);
router.get('/your-offers', businessAuthMiddleware, businessYourOffersController);
router.get('/check-stores', businessAuthMiddleware, businessCheckStoresController);
router.get('/manage-many-offers', businessAuthMiddleware, BusinessManageManyOffersController);
router.get('/profile-header', businessAuthMiddleware, businessProfileHeaderController);
router.get('/feedback', businessAuthMiddleware, fetchFeedback);
router.post('/transaction', businessAuthMiddleware, BusinessTransactionController);

export default router;

