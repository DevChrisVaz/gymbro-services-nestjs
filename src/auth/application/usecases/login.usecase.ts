import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LogInDto } from "src/auth/domain/dtos/log-in.dto";
import { Auth } from "src/auth/domain/entities/auth";
import { InvalidUserNameException } from "src/auth/domain/exceptions/invalid-username.exception";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { User } from "src/users/domain/entities/User";

@Injectable()
export class LoginUseCase {
    constructor(
        private dataServices: DatabaseServicesContract,
        private readonly authService: AuthService
    ) { }

    async run(logInDto: LogInDto): Promise<{ accessToken: string, refreshToken: string }> {
        let accessToken: string;
        let refreshToken: string;
        const foundAuth: Auth = await this.dataServices.auth.findOne(logInDto);
        if (!foundAuth) throw new InvalidUserNameException();

        switch (foundAuth.ref) {
            case "CUSTOMER":
                const foundCustomer: Customer = await this.dataServices.customers.findOne({
                    email: foundAuth.userName
                });

                accessToken = await this.authService.generateAccessToken({
                    firstName: foundCustomer.firstName,
                    lastName: foundCustomer.lastName,
                    email: foundCustomer.email,
                    profilePicture: foundCustomer.profilePicture
                }, "2h");

                refreshToken = await this.authService.generateRefreshToken({
                    id: foundCustomer.uuid
                });

                await this.dataServices.tokens.save({
                    ref: foundCustomer.uuid,
                    token: refreshToken
                });
                break;
            case "USER":
                const foundUser: User = await this.dataServices.users.findOne({
                    userName: foundAuth.userName
                });

                accessToken = await this.authService.generateAccessToken({
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    userName: foundUser.userName,
                    profilePicture: foundUser.profilePicture,
                    rol: foundUser.rol
                }, "15m");

                refreshToken = await this.authService.generateRefreshToken({
                    id: foundUser.uuid
                });

                await this.dataServices.tokens.save({
                    ref: foundUser.uuid,
                    token: refreshToken
                });
                break;
            default:
                throw new Error();
        }

        return { accessToken, refreshToken };
    }
}