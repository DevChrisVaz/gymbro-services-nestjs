import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/domain/entities/auth';
import { InvalidUserNameException } from 'src/auth/domain/exceptions/invalid-username.exception';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { LogInDto } from '../dtos';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { CustomerStatus } from 'src/customers/domain/enums/customer-status-enums';
import { AccountUnverifiedException } from 'src/customers/application/exceptions/account-unverified-exception';
import { CustomerCacheServiceContract } from 'src/customers/domain/contracts/customer-cache-service-contract';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';

@Injectable()
export class CustomerLoginUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
    private readonly customerCacheService: CustomerCacheServiceContract,
    private readonly authService: AuthService,
  ) { }

  async run(
    logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const foundAuth: Auth = await this.dataServices.auth.findOne({
      ref: 'CUSTOMER',
      userName: logInDto.userName,
    });

    if (!foundAuth) {
      const cachedCustomer = await this.customerCacheService.getCustomer(
        logInDto.userName,
      );
      if (cachedCustomer) throw new AccountUnverifiedException();
      throw new UserNotFoundException();
    }

    if (
      !(await this.dataHashingService.compare(
        logInDto.password,
        foundAuth.password,
      ))
    )
      throw new WrongPasswordException();

    const foundCustomer: Customer = await this.dataServices.customers.findOne({
      email: foundAuth.userName,
    });

    const foundPerson: IPerson = await this.dataServices.persons.findOne({
      uuid: foundCustomer.person,
    });

    if (foundPerson.status === CustomerStatus.UNVERIFIED)
      throw new AccountUnverifiedException();

    const accessToken = await this.authService.generateAccessToken(
      {
        id: foundCustomer.person,
        name: `${foundPerson.firstName} ${foundPerson.lastName}`,
        profilePicture: foundCustomer.profilePicture,
      },
      '2h',
    );

    const refreshToken = await this.authService.generateRefreshToken({
      token: accessToken,
    });

    await this.dataServices.tokens.save({
      ref: foundCustomer.person,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
