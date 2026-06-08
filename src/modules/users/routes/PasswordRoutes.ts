import { Router } from "express";
import ResetPasswordControllers from "../controllers/ResetPasswordControllers";
import ForgotPasswordControllers from "../controllers/ForgotPasswordControllers";
import { ForgotPasswordSchema, ResetPasswordSchema } from "../schemas/PasswordSchemas";

const passwordRoutes = Router();
const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPasswordControllers();

passwordRoutes.post("/forgot", ForgotPasswordSchema, forgotPasswordControllers.create);
passwordRoutes.post("/reset", ResetPasswordSchema, resetPasswordControllers.create);

export default passwordRoutes;
