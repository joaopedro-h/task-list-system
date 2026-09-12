import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

async function authMiddleware(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Token inválido!"
        });
    }

    const [, token] = authHeader.split(" ");

    try {

        const decoded = jwt.verify(token, authConfig.secret);

        req.userId = decoded.id;

        return next();

    } catch (error) {

        return res.status(401).json({
            error: "Token inválido!"
        });

    }

}

export default authMiddleware;