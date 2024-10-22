// authRoute.js
import { Router } from 'express';
import register from '../controllers/registerController.js';
import login from '../controllers/loginController.js'
import verifyOtp from '../controllers/verifyOtpController.js'
import forgetPassword from '../controllers/forgetPasswordController.js';
import sendOTP from '../controllers/sendOTP.js';

const router = Router(); // Instantiate the Router

// Define the route and associate it with the controller
router.post('/register', register);      // Register route
router.post('/login', login)             // Login route
router.post('/forget-password', forgetPassword)      // Forget password Route
router.post('/verify-otp', verifyOtp)
router.post('/send-otp', sendOTP)

// Export the router as the default export
export default router;
