import AppError from "@/shared/errors/AppError";
import { User } from "../database/entities/Users";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface ISessionUser {
    email: string;
    password: string;
}

interface ISessionResponse {
    user: User;
    token: string;
}

export default class SessionUserService {
    async execute({
        email,
        password,
    }: ISessionUser): Promise<ISessionResponse> {
        const user = await usersRepositories.findByEmail(email);

        if (!user) {
            throw new AppError("Email ou senha incorretos", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError("Email ou senha incorretos", 401);
        }

        if (!process.env.APP_SECRET) {
            throw new Error(
                "ERRO CRÍTICO: A variável ambiente APP_SECRET não foi configurada corretamente no arquivo .env!",
            );
        }

        const token = sign({}, process.env.APP_SECRET as string, {
            subject: String(user.id),
            expiresIn: "1d",
        });

        return {
            user,
            token,
        };
    }
}
