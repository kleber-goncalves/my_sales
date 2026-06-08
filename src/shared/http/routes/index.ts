import productsRoutes from "@/modules/products/routes/ProductRoutes";
import avatarRoutes from "@/modules/users/routes/AvatarRoutes";
import sessionsRoutes from "@/modules/users/routes/SessionRoutes";
import usersRoutes from "@/modules/users/routes/UserRoutes";
import { Router } from "express";

const routes = Router();

routes.get("/health", (request, response) => {
    return response.json({ message: "Hello World! Dev Kleber" });
});

routes.use("/products", productsRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/avatar", avatarRoutes);

export default routes;
