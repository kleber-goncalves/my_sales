import AppError from "@/shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomerRepositories";
import CreateCustomerService from "./CreateCustomerService";
import { customerMock } from "../domain/factories/customerFactory";

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomer: CreateCustomerService;

describe("CreateCustomerService", () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
    });

    it("should be 10", async () => {

        const customer = await createCustomer.execute(customerMock);

        expect(customer).toHaveProperty("id");
        expect(customer.name).toBe("John Doe");
        expect(customer.email).toBe("john@gmail.com");
    });

    it("should be 10", async () => {

        await createCustomer.execute(customerMock);

        await expect(
            createCustomer.execute(customerMock),
        ).rejects.toBeInstanceOf(AppError);
    });
});
