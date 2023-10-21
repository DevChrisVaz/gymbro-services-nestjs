import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Auth } from "src/auth/domain/entities/auth";
import { InvalidUserNameException } from "src/auth/domain/exceptions/invalid-username.exception";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { User } from "src/users/domain/entities/User";
import { LogInDto } from "../dtos";
import { DataHashingContract } from "src/encryption/domain/contracts/hashing.contract";

@Injectable()
export class LoginUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
    private readonly authService: AuthService,
  ) { }

  async run(logInDto: LogInDto): Promise<{ accessToken: string, refreshToken: string }> {
    let accessToken: string, refreshToken: string, ref: string;
    const foundAuth: Auth = await this.dataServices.auth.findOne({ userName: logInDto.userName });
    if (!foundAuth) throw new InvalidUserNameException();
    if(!await this.dataHashingService.compare(logInDto.password, foundAuth.password)) throw new BadRequestException("Invalid password");

    switch (foundAuth.ref) {
      case 'CUSTOMER':
        const foundCustomer: Customer =
          await this.dataServices.customers.findOne({
            email: foundAuth.userName,
          });


        ref = foundCustomer.uuid;
        accessToken = await this.authService.generateAccessToken(
          {
            id: foundCustomer.uuid,
            firstName: foundCustomer.firstName,
            lastName: foundCustomer.lastName,
            email: foundCustomer.email,
            profilePicture: foundCustomer.profilePicture,
          },
          '2h',
        );

        refreshToken = await this.authService.generateRefreshToken({ token: accessToken });

        break;
      case 'USER':
        const foundUser: User = await this.dataServices.users.findOne({
          userName: foundAuth.userName,
        });

        ref = foundUser.uuid;

        accessToken = await this.authService.generateAccessToken(
          {
            id: foundUser.uuid,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userName: foundUser.userName,
            profilePicture: foundUser.profilePicture,
            rol: foundUser.rol,
          },
          '15m',
        );

        refreshToken = await this.authService.generateRefreshToken({ token: accessToken });

        break;
      default:
        throw new UnauthorizedException();
    }

    await this.dataServices.tokens.save({
      ref,
      token: refreshToken
    });

    return { accessToken, refreshToken };
  }
}
