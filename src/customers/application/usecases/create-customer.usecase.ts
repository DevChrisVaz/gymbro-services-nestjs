import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth';
import { CustomersService } from 'src/customers/customers.service';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateCustomerDto } from '../dto';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { UsersService } from 'src/users/users.service';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { CustomerAlreadyExistsException } from '../exceptions/customer-already-exists-exception';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { PhoneAlreadyInUseException } from '../exceptions/phone-already-in-use-exception';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
  ) { }

  async run(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDTO> {
    const existingCustomer: ICustomer = await this.dataServices.customers.findOne({ email: createCustomerDto.email });

    if (existingCustomer) throw new CustomerAlreadyExistsException();

    const usedPhone = await this.dataServices.customers.findOne({ phone: createCustomerDto.phone });

    if(usedPhone) throw new PhoneAlreadyInUseException()

    const person: IPerson = this.usersService.mapDtoToPerson(createCustomerDto);
    const createdPerson: IPerson = await this.dataServices.persons.save(person);

    const customer: ICustomer =
      this.customersService.mapDtoToCustomer(createCustomerDto);
    customer.person = createdPerson.uuid;
    const createdCustomer: ICustomer = await this.dataServices.customers.save(
      customer,
    );

    const auth: Auth = {
      ref: 'CUSTOMER',
      userName: customer.email,
      password: await this.dataHashingService.hash(createCustomerDto.password),
    };
    await this.dataServices.auth.save(auth);

    return new CustomerResponseDTO({
      ...createdPerson,
      ...createdCustomer,
    });
  }
}
