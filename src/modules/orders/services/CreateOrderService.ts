import { Product } from "@/modules/products/database/entities/Products";
import { Order } from "../database/entities/Order";
import { customersRepositories } from "@/modules/customers/infra/database/repositories/CustomersRepositories";
import AppError from "@/shared/errors/AppError";
import { productsRepositories } from "@/modules/products/database/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface ICreateOrder {
    customer_id: string;
    products: Product[];
}

export default class CreateOrderService {
    async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
        const customerExists = await customersRepositories.findById(
            Number(customer_id),
        );

        if (!customerExists) {
            throw new AppError(
                "Could not find any customer with the given id.",
                404,
            );
        }

        const existsProducts =
            await productsRepositories.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError(
                "Could not find any products with the given ids.",
                404,
            );
        }

        // Verifica se os produtos existem no banco de dados com os ids fornecidos no pedido
        const existsProductsIds = existsProducts.map((product) => product.id);

        // Verifica se todos os ids do pedido foram encontrados no banco de dados
        const checkInexistentProducts = products.filter(
            (product) => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product ${checkInexistentProducts[0]!.id}.`,
                404,
            );
        }

        // Verifica se tem quantidade suficiente em estoque para cada produto do pedido
        const quantityAvailable = products.filter((product) => {
            const matchInDatabase = existsProducts.filter(
                (p) => p.id === product.id,
            );

            if (
                matchInDatabase.length > 0 &&
                matchInDatabase[0]!.quantity < product.quantity
            ) {
                return true; // Mantém no filtro porque falta stock
            }

            return false;
        });

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0]!.quantity} is not available for product ID ${quantityAvailable[0]!.id}.`,
                409,
            );
        }

        const serializedProducts = products.map((product) => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter((p) => p.id === product.id)[0]!.price,
        }));

        const order = await orderRepositories.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map((product) => ({
            id: product.product_id,
            quantity:
                existsProducts.filter((p) => p.id === product.product_id)[0]!
                    .quantity - product.quantity,
        }));

        await productsRepositories.save(updatedProductQuantity);
        return order;
    }
}
