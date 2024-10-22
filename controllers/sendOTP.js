import {User} from '../models/association.js'
import generateOTP from "../services/otpGenerator.js";
import sendMail from "../services/sendMail.js";
import validator from "validator";
const sendOTP = async (req, res, next) => {
    try {
        const {email} = req.body;
        
        // validate email
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Kindly enter the valid email"});
        }
        const user = await User.findOne({where: {email}});

        // check if user exist
        if (!user) {
            return res.status(404).json({success: false, message: "You have not been registered", redirectTo: "register"})
        }
    
        const otp = generateOTP(6);
    
        // Otp will expire after 10 minutes
        const current_time = new Date();
        const expiration_time = Number(process.env.OTP_EXPIRATION_TIME) || 10;
        const otp_expiration_time = new Date(current_time.getTime() + expiration_time * 60000);
    
        // Update otp and expiration time
        const [updatedUser] = await User.update(
            {otp, otp_expiration_time},
            {where: {email}}
        )
        const subject = "OTP verification"
        await sendMail(otp, email, subject);
        return res.status(201).json({success: true, message: "Kindly verify the OTP"});
    } catch (error) {
        return next(error);
    }
}

export default sendOTP;