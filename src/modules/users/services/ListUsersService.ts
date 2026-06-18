import RedisCache from "@/shared/cache/RedisCache";
import { User } from "../database/entities/Users";
import { usersRepositories } from "../database/repositories/UsersRepositories";

export default class ListUsersService {
    async execute(): Promise<User[]> {
        const redisCache = new RedisCache();

        let users = await redisCache.recover<User[]>("api-mysales-USER-LIST");

        if (!users) {
            users = await usersRepositories.find();
            await redisCache.save(
                "api-mysales-USER-LIST",
                JSON.stringify(users),
            );
        }
        return users;
    }
}
