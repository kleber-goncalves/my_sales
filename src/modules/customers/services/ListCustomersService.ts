import { IPagination } from "@/shared/interfaces/paginationInterface";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListCustomerService {
    constructor(
        @inject("CustomersRepository")
        private readonly customerRepository: ICustomersRepository
    ) { }


    async execute(
        page: number = 1,
        limit: number = 10,
    ): Promise<IPagination<Customer>> {
        const [data, total] = await this.customerRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalpages = Math.ceil(total / limit);

        return {
            data,
            total,
            per_page: limit,
            current_page: page,
            total_pages: totalpages,
            next_page: page < totalpages ? page + 1 : null,
            prev_page: page > 1 ? page - 1 : null,
        } as IPagination<Customer>;
    }
}
