import AppError from "@/shared/errors/AppError";
import { User } from "../database/entities/Users";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { hash } from "bcrypt";
import RedisCache from "@/shared/cache/RedisCache";

interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    async execute({ name, email, password }: ICreateUser): Promise<User> {
        const emailExists = await usersRepositories.findByEmail(email);
        const redisCache = new RedisCache();


        if (emailExists) {
            throw new AppError("O email ja existe", 409);
        }

        const hashedPassword = await hash(password, 10);

        const user = usersRepositories.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log(user);

        await usersRepositories.save(user);

        await redisCache.invalidate("api-mysales-USER-LIST");

        return user;
    }
}
