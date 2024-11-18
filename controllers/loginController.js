import {User} from '../models/association.js'
import { createJWT } from "../services/jwt.js";
import { comparePassword } from "../services/passwordHash.js";

const login = async (req, res, next) => {
    const {email, password, otp} = req.body;
    // Check if email and otp or password is provided or not
    if (!email || !(otp || password)) {
        return res.status(400).json({success: true, message: "Kindly fill the required field."})
    }
    try {
        // Check if user is registered or not
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({success: true, message: "User not found", redirectTo: "register"});
        }

        // Check if user is verified or not
        if (!user.verified) {
            return res.status(400).json({success: false, message: "Kindly verify your account.", redirectTo: "verify-otp"})
        }
        // If otp is provide do all check
        if (otp) {
            const currentTime = new Date().getTime();
            const otp_expiration_time = user.otp_expiration_time.getTime();
            if (currentTime > otp_expiration_time) {
                return res.status(400).json({success: false, message: "OTP has been expired"});
            }
            if (otp !== user.otp) {
                return res.status(400).json({success: false, message: "It is an invalid OTP."});
            }
        }
        // If password is provided do proper check
        else {
            const hashedPassword = user.password_hash;
            const isMatched = await comparePassword(password, hashedPassword);
            if (!isMatched) {
                res.status(401).json({success: false, message: "Password is incorrect."})
            }
        }

        // Create jwt token for each login session
        const payload = {
            id: user.user_id,
            email: user.email
        }
        const token = createJWT(payload);
        return res.status(200).json({success: true, message: "You have logged in successfully", token});
    }
    catch (error) {
        next(error);
    }
}

export default login;