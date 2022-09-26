import jwt, {decode} from 'jsonwebtoken';
const { sign, verify } = jwt;
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
    return sign(
        {user: user.email},
        process.env.JWT_ACCESS_TOKEN
    );
}

const getUserFromToken = async (jwt) => {
    return decode(jwt);
}

const authenticateToken = (req, res, next) => {
    const accessToken = req.cookies["user-token"]

    if(!accessToken) {
        return res.json({auth: false, returnMessage: 'Login failed: Token not valid'})
    }
    try {
        const validToken = verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        if (validToken) {
            req.authenticated = true
            next();
        }
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

export {
    generateToken,
    authenticateToken,
    getUserFromToken
};