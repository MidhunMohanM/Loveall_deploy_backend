import Business from "../models/Business.model.js";
import { createJWT } from "../services/jwt.js";
import { comparePassword } from "../services/passwordHash.js";

const businessLogin = async (req, res, next) => {
    const { business_email, password } = req.body;

    if (!business_email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Check if business is registered
        const business = await Business.findOne({ where: { business_email } });
        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found. Please register first." });
        }
        if (!business.verified) {
            return res.status(403).json({ success: false, message: "Please verify your account." });
        }
        // Check if business is manually verified
        if (!business.manual_verified) {
            return res.status(403).json({ success: false, message: "Account pending manual verification. Contact support." });
        }
        

        // Verify password
        const isMatched = await comparePassword(password, business.password_hash);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Incorrect password." });
        }
        if (business.temp_pass===true) {
            return res.status(403).json({ success: false, message: "Kindly change your password." });
        }
        // Create JWT token
        const payload = { id: business.business_id, email: business.business_email };
        const token = createJWT(payload);

        return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};

export default businessLogin;