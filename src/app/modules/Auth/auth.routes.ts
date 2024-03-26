import express from "express";
import { AuthController } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);

export const AuthRoutes = router;
