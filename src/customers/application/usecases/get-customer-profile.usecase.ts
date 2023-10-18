import { Injectable } from "@nestjs/common";
import { CustomersService } from "src/customers/customers.service";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { CustomerNotFoundException } from "src/customers/domain/exceptions/customer-not-found.exception";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class GetCustomerProfileUseCase {
    constructor(
        private readonly customersService: CustomersService,
        private dataServices: DatabaseServicesContract
    ) { }

    async run(email: string): Promise<Customer> {
        const foundCustomer: Customer = await this.dataServices.customers.findOne({ email });
        if (foundCustomer) {
            return this.customersService.serializeCustomer(foundCustomer);
        }

        throw new CustomerNotFoundException();
    }
}