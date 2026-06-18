import AppError from "@/shared/errors/AppError";
import { Product } from "../database/entities/Products";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import RedisCache from "@/shared/cache/RedisCache";

interface IUpdateProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService {
    async execute({
        id,
        name,
        price,
        quantity,
    }: IUpdateProduct): Promise<Product> {
        const redisCache = new RedisCache();

        // verifica se o id digitado em valido em Number
        if (isNaN(Number(id))) {
            throw new AppError("O formato do ID fornecido é inválido", 400);
        }

        const product = await productsRepositories.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        const productExists = await productsRepositories.findByName(name);

        if (productExists && productExists.id !== id) {
            throw new AppError("O produto com esse nome ja existe", 409);
        }

        if (quantity < 0 || price < 0) {
            throw new AppError(
                "Os campos price e quantity são obrigatórios e devem ser válidos",
                400,
            );
        }

        // atualiza os dados do produto no banco de dados com os dados passados
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepositories.save(product);

        // invalida o cache com a chave 'api-mysales-PRODUCT-LIST' para atualizar o cache
        await redisCache.invalidate("api-mysales-PRODUCT-LIST");

        return product;
    }
}
