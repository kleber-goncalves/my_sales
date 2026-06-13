import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import AppError from '@/shared/errors/AppError';
import CreateOrderService from '../services/CreateOrderService';
export default class OrdersControllers {
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!id || typeof id !== "string") {
            throw new AppError("ID da order inválido ou não fornecido", 400);
        }

        const showOrder = new ShowOrderService();
        const order = await showOrder.execute({ id });
        return response.json(order);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { customer_id, products } = request.body;

        if (!customer_id || typeof customer_id !== "string") {
            throw new AppError("ID do cliente inválido ou não fornecido", 400);
        }
        const createOrder = new CreateOrderService();
        const order = await createOrder.execute({ customer_id, products });
        return response.json(order);
    }
}
