import { AppDataSource } from "@/shared/infra/typeorm/data-source";
import { Product } from "../entities/Products";
import { In } from "typeorm";

// cria um repositório de produtos que herda de AppDataSource e extende o repositório de produtos de AppDataSource

interface IFindProducts {
    id: string;
}

// O 'extend' permite adicionar novas funções ao repositório de produtos
export const productsRepositories = AppDataSource.getRepository(Product).extend(
    {
        // encontra um produto pelo nome
        async findByName(name: string): Promise<Product | null> {
            return await this.findOneBy({ name });
        },

        // Recebe o id em string (que o usuario digitou)
        async findById(id: string): Promise<Product | null> {
            return await this.findOneBy({ id });
        },

        // Recebe o id em string (que o usuario digitou) e retorna o produto caso ele exista ou nao retorna null
        async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
            const productsIds = products.map((product) => product.id);

            const existsProducts = await this.find({
                where: { id: In(productsIds) },
            });

            if (!existsProducts.length) {
                return [];
            }

            return existsProducts;
        },
    },
);
