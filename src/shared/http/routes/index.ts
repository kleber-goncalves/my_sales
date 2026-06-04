import productsRoutes from "@/modules/products/routes/ProductRoutes";
import { Router } from "express";

const routes = Router();

routes.get("/health", (request, response) => {
    return response.json({ message: "Hello World! Dev Kleber" });
});

routes.use("/products", productsRoutes);

export default routes;
