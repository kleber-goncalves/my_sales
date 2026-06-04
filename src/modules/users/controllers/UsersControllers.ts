import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";
import AppError from "@/shared/errors/AppError";

export default class UsersControllers {
    // Controller de listar todos os usuarios
    async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute();
        return response.json(users);
    }

    // Controller de criar um novo usuario
    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        if (
            name === undefined ||
            name.trim() === "" ||
            email === undefined ||
            email.trim() === "" ||
            password === undefined ||
            password.trim() === ""
        ) {
            throw new AppError(
                "Todos os campos (name, email e password) são obrigatórios e devem ser válidos",
                400,
            );
        }

        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });
        return response.json(user);
    }
}
