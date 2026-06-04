import { Router } from "express";
import ProductsControllers from "./../controllers/ProductsControllers";
import {
    createProductSchema,
    idParamsValidation,
    UpdateProductSchema,
} from "../schemas/ProductSchemas";

const productsRoutes = Router();
const productsControllers = new ProductsControllers();

// Routa de listar todos os produtos
productsRoutes.get("/", productsControllers.index);

// Rota para buscar um produto pelo id
productsRoutes.get("/:id", idParamsValidation, productsControllers.show);

// Rota para crear um produto
productsRoutes.post("/", createProductSchema, productsControllers.create);

// Rota para atualizar um produto
productsRoutes.put("/:id", UpdateProductSchema, productsControllers.update);

// Rota para deletar um produto
productsRoutes.delete("/:id", idParamsValidation, productsControllers.delete);

export default productsRoutes;
