import AppError from "@/shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";

interface IDeleteCustomer {
    id: number;
}

export default class DeleteCustomerService {
    constructor(private readonly customerRepository: ICustomersRepository) {}

    async execute({ id }: IDeleteCustomer): Promise<void> {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found", 404);
        }

        await this.customerRepository.remove(customer);
    }
}
