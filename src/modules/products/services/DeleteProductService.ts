import AppError from "@/shared/errors/AppError";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

interface IDeleteProduct {
    id: string;
}

// Porque: 'Promise<void>', Porque apos voce apagar o produto ele nao retorna nada
export default class DeleteProductService {
    async execute({ id }: IDeleteProduct): Promise<void> {
        const product = await productsRepositories.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        await productsRepositories.remove(product);
    }
}
