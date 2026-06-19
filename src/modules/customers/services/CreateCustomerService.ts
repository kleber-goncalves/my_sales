import AppError from "@/shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateUser";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

export default class CreateCustomerService {
    constructor(private readonly customerRepository: ICustomersRepository) { }

    async execute({ name, email }: ICreateCustomer): Promise<Customer> {
        const emailExists = await this.customerRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("O email ja existe", 409);
        }

        const customer = await this.customerRepository.create({ name, email });

        return customer;
    }
}
