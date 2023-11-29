import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UpdateCustomerDto } from '../dto';
import { UsersService } from 'src/users/users.service';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { IPerson } from 'src/users/domain/entities/person.entity';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(
    uuid: string,
    dto: UpdateCustomerDto,
  ): Promise<CustomerResponseDTO> {
    const personToUpdate = this.usersService.mapDtoToPerson(dto);
    const updatedPerson: IPerson = await this.dataServices.persons.update(
      uuid,
      personToUpdate,
    );

    const customerToUpdate = this.customersService.mapDtoToCustomer(dto);
    const updatedCustomer: Customer = await this.dataServices.customers.update(
      uuid,
      customerToUpdate,
    );

    return new CustomerResponseDTO({
      ...updatedPerson,
      ...updatedCustomer,
    });
  }
}
