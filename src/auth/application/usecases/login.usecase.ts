<<<<<<< HEAD
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Auth } from "src/auth/domain/entities/auth";
import { InvalidUserNameException } from "src/auth/domain/exceptions/invalid-username.exception";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { User } from "src/users/domain/entities/User";
import { LogInDto } from "../dtos";
=======
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/domain/entities/auth';
import { InvalidUserNameException } from 'src/auth/domain/exceptions/invalid-username.exception';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { User } from 'src/users/domain/entities/User';
import { LogInDto } from '../dtos';
>>>>>>> eb6af094e212098cd60d05bcb45d589776c5b601

@Injectable()
export class LoginUseCase {
  constructor(
    private dataServices: DatabaseServicesContract,
    private readonly authService: AuthService,
  ) {}

<<<<<<< HEAD
    async run(logInDto: LogInDto): Promise<{ accessToken: string, refreshToken: string }> {
        let accessToken: string, refreshToken: string, ref: string;
        const foundAuth: Auth = await this.dataServices.auth.findOne(logInDto);
        if (!foundAuth) throw new InvalidUserNameException();
=======
  async run(
    logInDto: LogInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let accessToken: string;
    let refreshToken: string;
    let ref: string;
    const foundAuth: Auth = await this.dataServices.auth.findOne(logInDto);
    if (!foundAuth) throw new InvalidUserNameException();
>>>>>>> eb6af094e212098cd60d05bcb45d589776c5b601

    switch (foundAuth.ref) {
      case 'CUSTOMER':
        const foundCustomer: Customer =
          await this.dataServices.customers.findOne({
            email: foundAuth.userName,
          });

<<<<<<< HEAD
                ref = foundCustomer.uuid;
=======
        accessToken = await this.authService.generateAccessToken(
          {
            firstName: foundCustomer.firstName,
            lastName: foundCustomer.lastName,
            email: foundCustomer.email,
            profilePicture: foundCustomer.profilePicture,
          },
          '2h',
        );

        ref = foundCustomer.uuid;
>>>>>>> eb6af094e212098cd60d05bcb45d589776c5b601

        accessToken = await this.authService.generateAccessToken(
          {
            firstName: foundCustomer.firstName,
            lastName: foundCustomer.lastName,
            email: foundCustomer.email,
            profilePicture: foundCustomer.profilePicture,
          },
          '2h',
        );

<<<<<<< HEAD
                refreshToken = await this.authService.generateRefreshToken({
                    id: foundCustomer.uuid
                });

                break;
            case "USER":
=======
        await this.dataServices.tokens.save({
          ref: foundCustomer.uuid,
          token: refreshToken,
        });
        break;
      case 'USER':
        const foundUser: User = await this.dataServices.users.findOne({
          userName: foundAuth.userName,
        });
>>>>>>> eb6af094e212098cd60d05bcb45d589776c5b601

        ref = foundUser.uuid;

        accessToken = await this.authService.generateAccessToken(
          {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userName: foundUser.userName,
            profilePicture: foundUser.profilePicture,
            rol: foundUser.rol,
          },
          '15m',
        );

        refreshToken = await this.authService.generateRefreshToken({
          id: foundUser.uuid,
        });

<<<<<<< HEAD
                refreshToken = await this.authService.generateRefreshToken({
                    id: foundUser.uuid
                });

                break;
            default:
                throw new UnauthorizedException();
        }

        await this.dataServices.tokens.save({
            ref,
            token: refreshToken
        });

        return { accessToken, refreshToken };
=======
        break;
      default:
        throw new Error();
>>>>>>> eb6af094e212098cd60d05bcb45d589776c5b601
    }

    await this.dataServices.tokens.save({
      ref,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
