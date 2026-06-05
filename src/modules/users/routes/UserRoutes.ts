import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

// Rota de listar todos os usuarios
usersRoutes.get("/", usersControllers.index);

// Rota para criar um novo usuario
usersRoutes.post("/", createUserSchema, usersControllers.create);

export default usersRoutes;
