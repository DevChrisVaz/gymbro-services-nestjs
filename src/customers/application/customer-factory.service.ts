import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../domain/dto/create-customer.dto";
import { Customer } from "../domain/entities/customer.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class CustomerFactoryService {
    createNewCustomer(createCustomerDto: CreateCustomerDto): Customer {
        let newCustomer: Customer;

        newCustomer.uuid = uuid();
        newCustomer.firstName = createCustomerDto.firstName;
        newCustomer.lastName = createCustomerDto.lastName;
        newCustomer.email = createCustomerDto.email;
        newCustomer.password = createCustomerDto.password;
        newCustomer.birthdate = new Date(createCustomerDto.birthdate);

        return newCustomer;
    }
}