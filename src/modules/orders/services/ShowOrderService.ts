import AppError from "@/shared/errors/AppError";
import { Order } from "../database/entities/Order";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface IShowOrder {
    id: string;
}

export default class ShowOrderService {
    async execute({ id }: IShowOrder): Promise<Order> {
        const order = await orderRepositories.findById(Number(id));

        if (!order) {
            throw new AppError("Order not found");
        }

        return order;
    }
}
