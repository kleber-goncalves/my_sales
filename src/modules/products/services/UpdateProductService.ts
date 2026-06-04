import AppError from "@/shared/errors/AppError";
import { Product } from "../database/entities/Products";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

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
        const product = await productsRepositories.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        const productExists = await productsRepositories.findByName(name);

        if (productExists) {
            throw new AppError("O produto com esse nome ja existe", 409);
        }

       // atualiza os dados do produto no banco de dados com os dados passados
       product.name = name;
       product.price = price;
       product.quantity = quantity;

       await productsRepositories.save(product);

       return product;
    }
}
