import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateCustomerDto } from '../dto';
import { UsersService } from 'src/users/users.service';
import { CustomerResponseDTO } from '../dto/response/customer-response.dto';
import { CustomerAlreadyExistsException } from '../exceptions/customer-already-exists-exception';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { PhoneAlreadyInUseException } from '../exceptions/phone-already-in-use-exception';
import { CustomerMailerServiceContract } from 'src/customers/domain/contracts/customer-mailer-service-contract';
import { CustomerCacheServiceContract } from 'src/customers/domain/contracts/customer-cache-service-contract';
import { PersonCacheServiceContract } from 'src/users/domain/contracts/person-cache-service-contract';
import { AccountUnverifiedException } from '../exceptions/account-unverified-exception';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private readonly dataServices: DatabaseServicesContract,
    private readonly customerMailerService: CustomerMailerServiceContract,
    private readonly customerCacheService: CustomerCacheServiceContract,
    private readonly personCacheService: PersonCacheServiceContract,
  ) {}

  async run(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDTO> {
    const existingCustomer: ICustomer =
      await this.dataServices.customers.findOne({
        email: createCustomerDto.email,
      });

    if (existingCustomer) throw new CustomerAlreadyExistsException();

    const cachedCustomer: ICustomer =
      await this.customerCacheService.getCustomer(createCustomerDto.email);

    if (cachedCustomer) throw new AccountUnverifiedException();

    const usedPhone = await this.dataServices.customers.findOne({
      phone: createCustomerDto.phone,
    });

    if (usedPhone) throw new PhoneAlreadyInUseException();

    const person: IPerson = this.usersService.mapDtoToPerson(createCustomerDto);
    // const createdPerson: IPerson = await this.dataServices.persons.save({
    //   ...person,
    //   status: CustomerStatus.UNVERIFIED
    // });

    await this.personCacheService.storePerson(person);

    const customer: ICustomer =
      this.customersService.mapDtoToCustomer(createCustomerDto);
    customer.person = person.uuid;

    await this.customerCacheService.storeCustomer({
      ...customer,
      password: createCustomerDto.password,
    });
    // const createdCustomer: ICustomer = await this.dataServices.customers.save(
    //   customer,
    // );

    const code: string = await this.customerMailerService.sendVerificationEmail(
      customer,
      person,
    );

    await this.customerCacheService.storeVerificationCode(customer.email, code);

    return new CustomerResponseDTO({
      ...person,
      ...customer,
    });
  }
}
