import productsRoutes from "@/modules/products/routes/ProductRoutes";
import avatarRoutes from "@/modules/users/routes/AvatarRoutes";
import sessionsRoutes from "@/modules/users/routes/SessionRoutes";
import usersRoutes from "@/modules/users/routes/UserRoutes";
import express, { Router } from "express";
import  uploadConfig  from '@/config/upload';
import passwordRoutes from "@/modules/users/routes/PasswordRoutes";
import profileRouter from "@/modules/users/routes/ProfileRoutes";
import customersRoutes from "@/modules/customers/routes/CustomerRoutes";
import ordersRoutes from "@/modules/orders/routers/OdersRoutes";

const routes = Router();

routes.get("/health", (request, response) => {
    return response.json({ message: "Hello World! Dev Kleber" });
});

routes.use("/products", productsRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/avatar", avatarRoutes);

// mostar no navegar a imagem
routes.use("/files", express.static(uploadConfig.directory));

routes.use("/password", passwordRoutes);

routes.use("/profiles", profileRouter);

routes.use("/customers", customersRoutes);

routes.use("/orders", ordersRoutes);

export default routes;
