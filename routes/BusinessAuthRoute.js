import { Router } from 'express';
import { businessAuthMiddleware } from "../middleware/isAuthenticated.js";
import businessRegister from '../controllers/BusinessRegister.js';
import businessLogin from '../controllers/BusinessLogin.js';
import businessVerifyOtp from '../controllers/BusinessVerifyOtp.js';
import businessForgetPassword from '../controllers/BForgetPassword.js';
import businessSendOTP from '../controllers/BSendOtp.js';
import manualverify from '../controllers/ManualVerification.js';
import changePassword from '../controllers/BChangePassword.js';
import businessProfileController from '../controllers/businessProfileController.js';
import businessProfileUpdateController from '../controllers/BusinessProfileUpdateController.js';
import businessCreateOfferController from '../controllers/BusinessCreateOfferController.js';
import businessYourOffersController from '../controllers/BusinessYourOffersController.js';
import businessCheckStoresController from '../controllers/BusinessCheckStoresController.js';
import BusinessManageManyOffersController from '../controllers/BusinessManyOfferController.js';
import businessProfileHeaderController from '../controllers/BusinessProfileHeaderController.js';
import fetchFeedback from '../controllers/BFeedback.controller.js';

const router = Router();

router.post('/register', businessRegister);
router.post('/login', businessLogin);
router.post('/forget-password', businessForgetPassword);
router.post('/verify-otp', businessVerifyOtp);
router.post('/send-otp', businessSendOTP);
router.post('/manualverify', manualverify);
router.post('/ChangePass', changePassword);
router.post('/profile', businessProfileController);
router.put('/update-profile', businessProfileUpdateController);
router.post('/create-offer', businessCreateOfferController);
router.get('/your-offers', businessYourOffersController);
router.get('/check-stores', businessCheckStoresController);
router.get('/manage-many-offers', BusinessManageManyOffersController);
router.get('/profile-header', businessProfileHeaderController);
router.get('/feedback',businessAuthMiddleware, fetchFeedback);

export default router;
