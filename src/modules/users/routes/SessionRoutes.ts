import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "../schemas/SessionSchema";

const sessionsRoutes = Router();
const sessionsController = new SessionsControllers();

sessionsRoutes.post("/", sessionSchema, sessionsController.create);

export default sessionsRoutes;
