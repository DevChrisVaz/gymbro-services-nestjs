import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerNotFoundException } from 'src/customers/domain/exceptions/customer-not-found.exception';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UpdateCustomerDto } from '../dto';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private dataServices: DatabaseServicesContract,
  ) { }

  async run(uuid: string, dto: UpdateCustomerDto): Promise<Customer> {
    const dataToUpdate = this.customersService.mapDtoToCustomer(dto);
    const updatedCustomer: Customer =
      await this.dataServices.customers.update(uuid, dataToUpdate);
    return this.customersService.serializeCustomer(updatedCustomer);
  }
}
