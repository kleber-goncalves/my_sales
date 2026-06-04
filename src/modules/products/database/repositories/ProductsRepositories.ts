import { AppDataSource } from "@/shared/typeorm/data-source";
import { Product } from "../entities/Products";

// cria um repositório de produtos que herda de AppDataSource e extende o repositório de produtos de AppDataSource

// O 'extend' permite adicionar novas funções ao repositório de produtos
export const productsRepositories = AppDataSource.getRepository(Product).extend({
    // encontra um produto pelo nome
    async findByName(name: string): Promise<Product | null> {
        return await this.findOneBy({ name });
    },

    // Recebe o id em string (que o usuario digitou)
    async findById(id: string): Promise<Product | null> {
        return await this.findOneBy({ id });
    },
});
