import AppError from "@/shared/errors/AppError";
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcrypt";

interface IResetPassword {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    async execute({ token, password }: IResetPassword): Promise<void> {
        const userToken = await userTokensRepositories.findByToken(token);

        if (!userToken) {
            throw new AppError("Token not found", 404);
        }

        const user = await usersRepositories.findById(userToken.id);

        if (!user) {
            throw new AppError("User not exists", 404);
        }

        const tokenCreatedAt = userToken.created_at;

        // Calcula a data de expiracao do token + 2 horas
        const compareDate = addHours(tokenCreatedAt, 2)

        // Verifica se o token expirou ou nao e se nao expirou ele atualiza a senha do usuario
        if(isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired", 401)
        }

        user.password = await hash(password, 10);

        await usersRepositories.save(user);
    }
}
