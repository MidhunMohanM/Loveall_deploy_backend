import { Business } from '../models/association.js';
import generateOTP from "../services/otpGenerator.js";
import sendMail from "../services/sendMail.js";
import validator from "validator";

const sendOTPBussiness = async (req, res, next) => {
    try {
        const { business_email } = req.body;

        // Validate email
        if (!business_email || !validator.isEmail(business_email)) {
            return res.status(400).json({ success: false, message: "Kindly enter a valid email" });
        }

        const business = await Business.findOne({ where: { business_email } });

        // Check if business exists
        if (!business) {
            return res.status(404).json({ success: false, message: "You have not been registered", redirectTo: "register" });
        }

        const otp = generateOTP(6);

        // OTP will expire after 10 minutes
        const current_time = new Date();
        const expiration_time = Number(process.env.OTP_EXPIRATION_TIME) || 10;
        const otp_expiration_time = new Date(current_time.getTime() + expiration_time * 60000);
        const otp_expiration_time_iso = otp_expiration_time.toISOString();

        // Update OTP and expiration time
        const [updatedBusiness] = await Business.update(
            { otp, otp_expiration_time_iso },
            { where: { business_email } }
        );

        const subject = "OTP Verification";
        await sendMail(otp, business_email, subject);

        return res.status(201).json({ success: true, message: "Kindly verify the OTP" });
    } catch (error) {
        return next(error);
    }
};

export default sendOTPBussiness;