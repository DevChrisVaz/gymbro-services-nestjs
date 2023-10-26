import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/domain/entities/auth';
import { InvalidUserNameException } from 'src/auth/domain/exceptions/invalid-username.exception';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IUser } from 'src/users/domain/entities/User';
import { LogInDto } from '../dtos';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
    private readonly authService: AuthService,
  ) { }

  async run(
    logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {

    let accessToken: string,
      refreshToken: string,
      ref: string,
      foundUser: IUser;

    const foundAuth: Auth = await this.dataServices.auth.findOne({
      userName: logInDto.userName,
    });

    if (!foundAuth) throw new InvalidUserNameException();

    if (
      !(await this.dataHashingService.compare(
        logInDto.password,
        foundAuth.password,
      ))
    )
      throw new BadRequestException('Invalid password');

    switch (foundAuth.ref) {
      case 'CUSTOMER':
        const foundCustomer: Customer =
          await this.dataServices.customers.findOne({
            email: foundAuth.userName,
          });

        foundUser = await this.dataServices.users.findOne({
          uuid: foundCustomer.user,
        });

        ref = foundCustomer.user;
        accessToken = await this.authService.generateAccessToken(
          {
            id: foundCustomer.user,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundCustomer.email,
            profilePicture: foundCustomer.profilePicture,
          },
          '2h',
        );

        refreshToken = await this.authService.generateRefreshToken({
          token: accessToken,
        });

        break;
      case 'GYM_USER':
        const foundGYMUser: IGYMUser = await this.dataServices.GYMUsers.findOne(
          {
            userName: foundAuth.userName,
          },
        );

        foundUser = await this.dataServices.users.findOne({
          uuid: foundGYMUser.user,
        });

        ref = foundUser.uuid;

        accessToken = await this.authService.generateAccessToken(
          {
            id: foundUser.uuid,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userName: foundGYMUser.userName,
            profilePicture: foundUser.profilePicture,
            gym: foundGYMUser.gym,
          },
          '15m',
        );

        refreshToken = await this.authService.generateRefreshToken({
          token: accessToken,
        });

        break;
      default:
        throw new UnauthorizedException();
    }

    await this.dataServices.tokens.save({
      ref,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
