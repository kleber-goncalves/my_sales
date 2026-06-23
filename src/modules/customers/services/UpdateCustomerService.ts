import AppError from "@/shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

interface IUpdateCustomer {
    id: number;
    name: string;
    email: string;
}

@injectable()
export default class UpdateCustomerService {
    constructor(
        @inject("CustomersRepository")
        private readonly customerRepository: ICustomersRepository,
    ) {}

    async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found", 404);
        }

        if (email) {
            const customerUpdateEmail =
                await this.customerRepository.findByEmail(email);

            if (customerUpdateEmail && customerUpdateEmail.id !== id) {
                throw new AppError("Email already in use", 409);
            }

            customer.email = email;
        }

        if (name) {
            customer.name = name;
        }

        await this.customerRepository.save(customer);

        return customer;
    }
}
