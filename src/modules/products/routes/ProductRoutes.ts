import { Router } from "express";
import ProductsControllers from "./../controllers/ProductsControllers";
import {
    createProductSchema,
    idParamsValidation,
    UpdateProductSchema,
} from "../schemas/ProductSchemas";
import AuthMiddleware from "@/shared/middlewares/authMiddleware";

const productsRoutes = Router();
const productsControllers = new ProductsControllers();

// Routa de listar todos os produtos
productsRoutes.get("/", productsControllers.index);

// Rota para buscar um produto pelo id
productsRoutes.get("/:id", idParamsValidation, productsControllers.show);

// Rota para criar um produto
productsRoutes.post(
    "/",
    AuthMiddleware.execute,
    createProductSchema,
    productsControllers.create,
);

// Rota para atualizar um produto
productsRoutes.put(
    "/:id",
    AuthMiddleware.execute,
    idParamsValidation,
    UpdateProductSchema,
    productsControllers.update,
);

// Rota para deletar um produto
productsRoutes.delete(
    "/:id",
    AuthMiddleware.execute,
    idParamsValidation,
    productsControllers.delete,
);

export default productsRoutes;
