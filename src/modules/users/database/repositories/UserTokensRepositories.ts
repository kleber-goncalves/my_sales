import { AppDataSource } from "@/shared/typeorm/data-source";
import { UserToken } from "../entities/UserToken";

export const userTokensRepositories = AppDataSource.getRepository(UserToken).extend({
    // Encontra um token pelo token passado como parametro e retorna ele ou null se nao encontrar nenhum token
    async findByToken(token: string): Promise<UserToken | null> {
        const userToken = await this.findOneBy({ token });
        return userToken;
    },

    // Cria um novo token para o usuario passado como parametro e retorna ele criado ou undefined
    async generate(user_id: number): Promise<UserToken | undefined> {
        const userToken = this.create({
            user_id,
        });
        await this.save(userToken);

        return userToken;
    },

});
