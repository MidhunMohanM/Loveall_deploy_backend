import User from "../models/user.model.js";
import { verifyJWT } from "../services/jwt.js";

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    };
    const token = authorization.split(' ')[1];
    console.log("Test2")
    try {
        const decoded = await verifyJWT(token);
        const user = await User.findByPk(decoded.id);
        if (user) {
            req.user = decoded;
            next();
        }
        
        else  {
            return res.status(403).json({
                message: "Unauthorized! Kindly register",
                redirectTo: "register"
            });
        }
        
    }
    catch (error) {
        console.log(error)
        return res.status(403).json({
            message: "Unauthorized! Kindly register",
            redirectTo: "register"
        });
    }
}

const loginAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({message: "No token provided", redirectTo: "login"});
    }
    else {
        return res.status(200).json({success: true, message: "Login Successfully"});
    }
}
export {authMiddleware, loginAuth};