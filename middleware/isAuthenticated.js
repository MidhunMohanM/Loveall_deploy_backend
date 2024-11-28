import User from "../models/user.model.js"; // Importing User from user.model.js
import Business from "../models/business.model.js"; // Importing Business from business.model.js
import { verifyJWT } from "../services/jwt.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        console.log("Authorization header is missing.");
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register",
        });
    }
    const token = authorization.split(' ')[1];
    console.log("Extracted token:", token ? token.substring(0, 10) + "..." : "null");

    try {
        const decoded = await verifyJWT(token);
        console.log("Header is having correct token. Decoded data:", decoded);
        const user = await User.findByPk(decoded.id);
        if (user) {
            req.user = decoded;
            next();
        } else {
            console.log("User not found for the decoded token.");
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register",
            });
        }
    } catch (error) {
        console.log("Invalid token:", error.message);
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register",
        });
    }
};

const loginAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("Authorization header in loginAuth:", token);
    if (!token) {
        console.log("No token provided in loginAuth");
        return res.status(403).json({ message: "No token provided", redirectTo: "login" });
    } else {
        console.log("Token found in loginAuth");
        return res.status(200).json({ success: true, message: "Login Successfully" });
    }
};

const businessAuthMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        console.log("Authorization header is missing.");
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register",
        });
    }
    const token = authorization.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("Header is having correct token. Decoded data:", decoded);
        const business = await Business.findByPk(decoded.id);
        if (business) {
            req.business = decoded;
            next();
        } else {
            console.log("Business not found for the decoded token.");
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register",
            });
        }
    } catch (error) {
        console.log("Invalid token:", error.message);
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register",
        });
    }
};

export { authMiddleware, loginAuth, businessAuthMiddleware };
