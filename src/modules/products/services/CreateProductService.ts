import AppError from "@/shared/errors/AppError";
import { Product } from "../database/entities/Products";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

// interface para receber os dados do produto para ser criado, com os tipos de dados corretos
interface ICreateProduct {
    name: string;
    price: number;
    quantity: number;
}

// cria um produto no banco de dados com os dados passados e retorna o produto criado
export default class CreateProductService {
    async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
        const productExists = await productsRepositories.findByName(name);

        if (productExists) {
            throw new AppError("O produto com esse nome ja existe", 409);
        }

        if (quantity < 0 || price < 0) {
            throw new AppError(
                "Os campos price e quantity são obrigatórios e devem ser válidos",
                400,
            );
        }

        // cria o produto no banco de dados com os dados passados
        const product = productsRepositories.create({
            name,
            price,
            quantity,
        });

        console.log(product);

        // salva no banco de dados o produto criado
        await productsRepositories.save(product);

        // retorna o produto criado
        return product;
    }
}
