import jwt from 'jsonwebtoken';

const createJWT =  (payload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: 60 * 60 * 24 *7}
    );
    return token;
}

const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log("error in jwt")
        throw new Error(error);
    }
}

export {createJWT, verifyJWT};