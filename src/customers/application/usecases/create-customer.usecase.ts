import { Injectable } from "@nestjs/common";
import { Auth } from "src/auth/domain/entities/auth";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(customer: Customer): Promise<Customer> {
        const createdCustomer: Customer = await this.dataServices.customers.save(customer);
        const auth: Auth = {
            ref: "CUSTOMER",
            userName: customer.email,
            password: customer.password
        };
        const createdAuth = await this.dataServices.auth.save(auth);
        return createdCustomer;
    }
}