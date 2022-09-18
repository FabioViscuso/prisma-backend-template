/*
    This file exports what the user.routes.js file should render/send
    at the end of the middleware chain. As of now those are just placeholders
*/

import { env } from "../config/env.config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { prisma } from "../server";

// Change user password
const changePassword = async (req: Request, res: Response) => {
    const username = String(req.body.username);

    prisma.users.update({
        where: {
            username: username
        },
        data: {
            password: bcrypt.hashSync(req.body.newPassword, 8),
        }
    })
        .then(() => res.json({ message: "Password successfully updated" }))
        .catch((err: any) => res.status(500).json({ message: err.message }));
}

// Delete user
const deleteUser = (req: Request, res: Response) => {
    const username = String(req.body.username);

    prisma.users.delete({
        where: {
            username: username
        }
    })
        .then(() => res.json({ message: "Password successfully updated" }))
        .catch((err: any) => res.status(500).json({ message: err.message }));
}

// Save User to Database
const signup = async (req: Request, res: Response) => {
    await prisma.users.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }
    })
        .then(() => {
            if (req.body.roles) {
                res.json({ message: "User registered successfully!" });
            }
        }
        )
        .catch((err: any) => {
            res.status(500).json({ message: err.message });
        });
};

// Logs in the user
const signin = async (req: Request, res: Response) => {
    await prisma.users.findFirst({
        where: {
            username: req.body.username
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).json({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, env.AUTH_SECRET, {
                expiresIn: 86400 // 24 hours
            });


            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        })
        .catch((err: any) => {
            res.status(500).json({ source: 'signin Prisma', message: err.message });
        });
};

export const usersController = {
    signin,
    signup,
    changePassword,
    deleteUser
}
