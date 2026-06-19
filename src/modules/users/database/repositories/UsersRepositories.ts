import { AppDataSource } from "@/shared/infra/typeorm/data-source";
import { User } from "../entities/Users";

export const usersRepositories = AppDataSource.getRepository(User).extend({
    // Encontra um Usuario pelo nome
    findByName(name: string): Promise<User | null> {
        return this.findOneBy({ name });
    },

    // Encontra um Usuario pelo id
    findById(id: number): Promise<User | null> {
        return this.findOneBy({ id });
    },

    // Encontra um Usuario pelo email
    findByEmail(email: string): Promise<User | null> {
        return this.findOneBy({ email });
    },
});
