import { env } from "../config/env.config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const username = String(req.body.username);
    const token = req.headers["x-access-token"] as string | undefined;

    if (!username) {
        return res.status(403).json({
            message: "No username provided"
        })
    }

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    jwt.verify(token, env.AUTH_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized action, dint't pass JWT verification"
            });
        } else {
            next();
        }
    });

};
