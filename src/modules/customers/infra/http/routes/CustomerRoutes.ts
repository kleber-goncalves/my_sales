import { Router } from "express";
import CustomersControllers from "../controllers/CustumersControllers";
import AuthMiddleware from "@/shared/middlewares/authMiddleware";
import { createCustomerSchema, idParamsValidation, updateCustomerSchema } from "../schemas/CustomerSchemas";


const customersRoutes = Router();
const customersControllers = new CustomersControllers();

// Routa de listar todos os clientes
customersRoutes.get("/", customersControllers.index);

// Rota para buscar um cliente pelo id
customersRoutes.get("/:id", idParamsValidation, customersControllers.show);

// Rota para criar um cliente
customersRoutes.post(
    "/",
    AuthMiddleware.execute,
    createCustomerSchema,
    customersControllers.create,
);

// Rota para atualizar um cliente
customersRoutes.patch(
    "/:id",
    AuthMiddleware.execute,
    updateCustomerSchema,
    idParamsValidation,
    customersControllers.update,
);

// Rota para deletar um cliente
customersRoutes.delete(
    "/:id",
    AuthMiddleware.execute,
    idParamsValidation,
    customersControllers.delete,
);

export default customersRoutes;
