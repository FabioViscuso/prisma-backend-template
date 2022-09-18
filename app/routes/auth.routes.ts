/*
    This file contains specification for the routes used for authorization
*/

import express from "express";
import { checkForExistingUserOrEmail } from "../middleware/checkDuplicates.middleware";
import { usersController } from "../controllers/users.controller";

export const authRoutes = express.Router();

authRoutes.post("/auth/signup", [checkForExistingUserOrEmail], usersController.signup);
authRoutes.post("/auth/signin", usersController.signin);
