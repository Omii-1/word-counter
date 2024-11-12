import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface CustomRequest extends Request {
    user?: any;
}

export const authenticationToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(411).json({
            msg: "Authentication token required"
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            console.error("Token verification error:", err);
            res.status(403).json({
                error: err,
                msg: "Token expired or invalid"
            });
            return;
        }

        req.user = user;  // Attaching user data to the request
        next();
    });
};
