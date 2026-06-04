import AppError from "@/shared/errors/AppError";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Products";

interface IShowProduct {
    id: string;
}

export default class ShowProductService {
    async execute({ id }: IShowProduct): Promise<Product> {

        // verifica se o id digitado em valido em Number
        if (isNaN(Number(id))) {
            throw new AppError("O formato do ID fornecido é inválido", 400);
        }

        const product = await productsRepositories.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    }
}
