import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";

export const checkForExistingUserOrEmail = (req: Request, res: Response, next: NextFunction) => {
    const username = String(req.body.username);
    const email = String(req.body.email);

    // username check
    prisma.users.findFirst({
        where: {
            username: username
        }
    }).then((user) => {
        if (user) {
            res.status(400).json({
                message: "Signup failed! Username is already in use!"
            });
            return;
        }

        // email check
        prisma.users.findFirst({
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                res.status(400).json({
                    message: "Signup failed! Email is already in use!"
                });
                return;
            }

            // pass to the next middleware if all check are passed
            next();
        });
    });
};
