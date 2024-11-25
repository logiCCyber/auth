import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET_KEY;

export const generateToken = function (userId) {
    return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
}

export const authenticateUser = function (token) {
    try {
        return jwt.verify(token, SECRET) ? true : false;
    } catch (err) {
        return null;
    }
}