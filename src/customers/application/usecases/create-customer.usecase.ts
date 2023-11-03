import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth';
import { CustomersService } from 'src/customers/customers.service';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateCustomerDto } from '../dto';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { IUser } from 'src/users/domain/entities/User';
import { UsersService } from 'src/users/users.service';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { CustomerAlreadyExistsException } from '../exceptions/customer-already-exists-exception';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
  ) {}

  async run(
    createdCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDTO> {
    const existingCustomer: ICustomer = await this.dataServices.customers.findOne({ email: createdCustomerDto.email });

    if (existingCustomer) throw new CustomerAlreadyExistsException();

    const user: IUser = this.usersService.mapDtoToUser(createdCustomerDto);
    const createdUser: IUser = await this.dataServices.users.save(user);

    const customer: ICustomer =
      this.customersService.mapDtoToCustomer(createdCustomerDto);
    customer.user = createdUser.uuid;
    const createdCustomer: ICustomer = await this.dataServices.customers.save(
      customer,
    );

    const auth: Auth = {
      ref: 'CUSTOMER',
      userName: customer.email,
      password: await this.dataHashingService.hash(createdCustomerDto.password),
    };
    await this.dataServices.auth.save(auth);

    return new CustomerResponseDTO({
      ...createdUser,
      ...createdCustomer,
    });
  }
}
