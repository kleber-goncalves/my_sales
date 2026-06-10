import { AppDataSource } from "@/shared/typeorm/data-source";
import { Customer } from "../entities/Customer";

export const customersRepositories = AppDataSource.getRepository(
    Customer,
).extend({
    findByName(name: string): Promise<Customer | null> {
        return this.findOneBy({ name });
    },

    findById(id: number): Promise<Customer | null> {
        return this.findOneBy({ id });
    },

    findByEmail(email: string): Promise<Customer | null> {
        return this.findOneBy({ email });
    },
});
