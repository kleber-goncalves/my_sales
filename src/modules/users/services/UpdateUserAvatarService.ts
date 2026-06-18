import AppError from "@/shared/errors/AppError";
import { User } from "../database/entities/Users";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import path from "node:path";
import uploadConfig from "@/config/upload";
import fs from "fs";
import RedisCache from "@/shared/cache/RedisCache";

interface IUpdateUserAvatar {
    userId: number;
    avatarFileName: string;
}

export default class UpdateUserAvatarService {
    async execute({
        userId,
        avatarFileName,
    }: IUpdateUserAvatar): Promise<User> {
        const redisCache = new RedisCache();
        const user = await usersRepositories.findById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists =
                await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await usersRepositories.save(user);

        await redisCache.invalidate("api-mysales-USER-LIST");


        return user;
    }
}
