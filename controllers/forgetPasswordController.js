import {User} from '../models/association.js'
import validator from "validator";
import { hashPassword } from "../services/passwordHash.js";

const forgetPassword = async(req, res, next) => {
    const {email, otp, password} = req.body;
    const passwordReqirement = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    };
    try {
        if (!email || !otp || !password) {
            return res.status(400).json({success: false, message: "All fields are compulsory"})
        }

        // check if email is valid or not
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Email is not valid"});
        }

        // Check if password is strong or not
        if (!validator.isStrongPassword(password, passwordReqirement)) {
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."})
        }
        const user = await User.findOne({where: {email}});

        // Check the user exist in the database
        if (!user) {
            return res.status(404).json({success: false, message: "You have not been registered.", redirectTo: "register"})
        }

        // Check if otp is correct or not
        if (user.otp != otp) {
            return res.status(404).json({success: false, message: "OTP is incorrect."})
        }

        // Create a hash password 
        const password_hash = await hashPassword(password);
        
        // Update the user password
        const [updatedUser] = await User.update(
            {password_hash, otp: null},
            {where: {email}}
        )
        return res.status(201).json({success: true, message: "Your password has been successfully changed."});
    } catch (error) {
        next(error);
    }
}

export default forgetPassword;