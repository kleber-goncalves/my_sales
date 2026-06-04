import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import AppError from "@/shared/errors/AppError";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsControllers {
    async index(request: Request, response: Response): Promise<Response> {
        const listProductsService = new ListProductService();
        const products = await listProductsService.execute();
        return response.json(products);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!id || typeof id !== "string") {
            throw new AppError("ID do produto inválido ou não fornecido", 400);
        }

        const showProductService = new ShowProductService();
        const product = await showProductService.execute({ id });
        return response.json(product);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;

        // O 'name.trim() === ""' verifica se o 'name' esta com espaco em branco
        if (
            name === undefined ||
            name.trim() === "" ||
            price === undefined ||
            quantity === undefined
        ) {
            throw new AppError(
                "Todos os campos (name, price, quantity) são obrigatórios e devem ser válidos",
                400,
            );
        }

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, price, quantity } = request.body;

        if (!id || typeof id !== "string") {
            throw new AppError("ID do produto inválido ou não fornecido", 400);
        }

        if (
            name === undefined ||
            price === undefined ||
            quantity === undefined
        ) {
            throw new AppError(
                "Todos os campos (name, price, quantity) são obrigatórios e devem ser válidos",
                400,
            );
        }

        const updateProductService = new UpdateProductService();
        const product = await updateProductService.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!id || typeof id !== "string") {
            throw new AppError("ID do produto inválido ou não fornecido", 400);
        }

        const deleteProductService = new DeleteProductService();
        await deleteProductService.execute({ id });

        return response.status(204).send([]);
    }
}
