import AppError from "@/shared/errors/AppError";
import { Customer } from "../database/entities/Customer";
import { customersRepositories } from "../database/repositories/CustomersRepositories";

interface IUpdateCustomer {
    id: number;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
        const customer = await customersRepositories.findById(id);

        if (!customer) {
            throw new AppError("Customer not found", 404);
        }

        if (email) {
            const customerUpdateEmail =
                await customersRepositories.findByEmail(email);

            if (customerUpdateEmail && customerUpdateEmail.id !== id) {
                throw new AppError("Email already in use", 409);
            }

            customer.email = email;
        }

        if (name) {
            customer.name = name;
        }

        await customersRepositories.save(customer);

        return customer;
    }
}
