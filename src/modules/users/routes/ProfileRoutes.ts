import { Router } from "express";
import AuthMiddleware from "@/shared/middlewares/authMiddleware";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";
import ProfileControllers from "../controllers/ProfileControllers";

const profileRouter = Router();
const profileController = new ProfileControllers();

profileRouter.get("/", AuthMiddleware.execute, profileController.show);

profileRouter.patch(
    "/",
    UpdateUserSchema,
    AuthMiddleware.execute,
    profileController.execute,
);

export default profileRouter;
