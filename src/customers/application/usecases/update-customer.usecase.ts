import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UpdateCustomerDto } from '../dto';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/domain/entities/User';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';

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
    const userToUpdate = this.usersService.mapDtoToUser(dto);
    const updatedUser: IUser = await this.dataServices.users.update(
      uuid,
      userToUpdate,
    );

    const customerToUpdate = this.customersService.mapDtoToCustomer(dto);
    const updatedCustomer: Customer = await this.dataServices.customers.update(
      uuid,
      customerToUpdate,
    );

    return new CustomerResponseDTO({
      ...updatedUser,
      ...updatedCustomer,
    });
  }
}
