import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateCustomerDto } from '../dto';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract
  ) {}

  async run(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersService.mapDtoToCustomer(dto);
    customer.password = await this.dataHashingService.hash(customer.password);
    const createdCustomer: Customer = await this.dataServices.customers.save(customer);
    const auth: Auth = {
      ref: 'CUSTOMER',
      userName: customer.email,
      password: customer.password,
    };
    await this.dataServices.auth.save(auth);
    return this.customersService.serializeCustomer(createdCustomer);
  }
}
