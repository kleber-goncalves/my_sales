import AppError from "@/shared/errors/AppError";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import RedisCache from "@/shared/cache/RedisCache";

interface IDeleteProduct {
    id: string;
}

// Porque: 'Promise<void>', Porque apos voce apagar o produto ele nao retorna nada
export default class DeleteProductService {
    async execute({ id }: IDeleteProduct): Promise<void> {

        if (isNaN(Number(id))) {
            throw new AppError("O formato do ID fornecido é inválido", 400);
        }

        const product = await productsRepositories.findById(id);
        const redisCache = new RedisCache();

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        // limpa o cache da lista de produtos do redis com a chave 'api-mysales-PRODUCT-LIST' 
        await redisCache.invalidate("api-mysales-PRODUCT-LIST");

        await productsRepositories.remove(product);
    }
}
