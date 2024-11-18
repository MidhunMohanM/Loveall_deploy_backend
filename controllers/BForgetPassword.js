import { Business } from '../models/association.js';
import validator from "validator";
import { hashPassword } from "../services/passwordHash.js";

const forgetPasswordBusiness = async (req, res, next) => {
    const { business_email, otp, password } = req.body;

    const passwordRequirement = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    };

    try {
        if (!business_email || !otp || !password) {
            return res.status(400).json({ success: false, message: "All fields are compulsory" });
        }

        // Check if the email is valid or not
        if (!validator.isEmail(business_email)) {
            return res.status(400).json({ success: false, message: "Email is not valid" });
        }

        // Check if the password is strong or not
        if (!validator.isStrongPassword(password, passwordRequirement)) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character." });
        }

        const business = await Business.findOne({ where: { business_email } });

        // Check if the business exists in the database
        if (!business) {
            return res.status(404).json({ success: false, message: "You have not registered." });
        }

        // Check if the OTP is correct or not
        if (business.otp != otp) {
            return res.status(404).json({ success: false, message: "OTP is incorrect." });
        }

        // Create a hash password 
        const password_hash = await hashPassword(password);
        
        // Update the business password
        const [updatedBusiness] = await Business.update(
            { password_hash, otp: null },
            { where: { business_email } }
        );

        return res.status(201).json({ success: true, message: "Your password has been successfully changed." });
    } catch (error) {
        next(error);
    }
};

export default forgetPasswordBusiness;