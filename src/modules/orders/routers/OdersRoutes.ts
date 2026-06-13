import { Router } from "express";
import OrdersControllers from "../controllers/OrdersControllers";
import { createOrderValidation, idParams } from "../schemas/OrdersSchemas";
import AuthMiddleware from "@/shared/middlewares/authMiddleware";

const ordersRoutes = Router();
const ordersControllers = new OrdersControllers();

ordersRoutes.get(
    "/:id",
    AuthMiddleware.execute,
    idParams,
    ordersControllers.show,
);
ordersRoutes.post(
    "/",
    AuthMiddleware.execute,
    createOrderValidation,
    ordersControllers.create,
);

export default ordersRoutes;
