/*
    This file contains the routes for operation on a user's account
*/

import express from "express";
import { verifyToken } from "../middleware/verifyToken.middleware";
import { usersController } from "../controllers/users.controller";

export const userRoutes = express.Router();

userRoutes.put("/user/pwchange", [verifyToken], usersController.changePassword);
userRoutes.delete("/user", [verifyToken], usersController.deleteUser);
