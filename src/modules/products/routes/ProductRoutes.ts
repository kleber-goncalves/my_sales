import { Router } from "express";
import ProductsControllers from './../controllers/ProductsControllers';


const productsRoutes = Router();
const productsControllers = new ProductsControllers();

// Routa de listar todos os produtos
productsRoutes.get("/", productsControllers.index);

// Rota para buscar um produto pelo id
productsRoutes.get("/:id", productsControllers.show);

// Rota para crear um produto
productsRoutes.post("/", productsControllers.create);

// para atualizar um produto
productsRoutes.put("/:id", productsControllers.update);

// Rota para deletar um produto
productsRoutes.delete("/:id", productsControllers.delete);

export default productsRoutes;
