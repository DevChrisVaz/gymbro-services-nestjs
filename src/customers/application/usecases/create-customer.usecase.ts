import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateCustomerDto } from '../dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersService.mapDtoToCustomer(dto);
    const createdCustomer: Customer = await this.dataServices.customers.save(
      customer,
    );
    const auth: Auth = {
      ref: 'CUSTOMER',
      userName: customer.email,
      password: customer.password,
    };
    await this.dataServices.auth.save(auth);
    return this.customersService.serializeCustomer(createdCustomer);
  }
}
