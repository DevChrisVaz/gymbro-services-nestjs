import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/domain/entities/auth';
import { CustomerCacheServiceContract } from 'src/customers/domain/contracts/customer-cache-service-contract';
import { ICustomerWithPassword } from 'src/customers/domain/entities/customer.entity';
import { CustomerStatus } from 'src/customers/domain/enums/customer-status-enums';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { PersonCacheServiceContract } from 'src/users/domain/contracts/person-cache-service-contract';
import { IPerson } from 'src/users/domain/entities/person.entity';

@Injectable()
export class VerifyCustomerAccountUseCase {
  constructor(
    private readonly databaseServices: DatabaseServicesContract,
    private readonly customerCacheService: CustomerCacheServiceContract,
    private readonly personCacheService: PersonCacheServiceContract,
    private readonly dataHashingService: DataHashingContract,
    private readonly jwtService: JwtService,
  ) {}

  async run(token: string): Promise<void> {
    const { email, code } = await this.jwtService.verifyAsync(token);

    const storedCode = await this.customerCacheService.getVerificationCode(
      email,
    );
    if (storedCode === code) {
      const customer: ICustomerWithPassword =
        await this.customerCacheService.getCustomer(email);
      const person: IPerson = await this.personCacheService.getPerson(
        customer.person,
      );

      await this.databaseServices.persons.save({
        ...person,
        status: CustomerStatus.VERIFIED,
      });

      await this.databaseServices.customers.save(customer);

      const auth: Auth = {
        ref: 'CUSTOMER',
        userName: customer.email,
        password: await this.dataHashingService.hash(customer.password),
      };
      await this.databaseServices.auth.save(auth);

      await this.customerCacheService.removeCustomer(customer.email);
      await this.personCacheService.removePerson(customer.person);
      return;
    }

    throw new UnauthorizedException();
  }
}
