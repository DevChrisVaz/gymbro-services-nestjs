import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LogInDto } from "src/auth/domain/dtos/log-in.dto";
import { Auth } from "src/auth/domain/entities/auth";
import { InvalidUserNameException } from "src/auth/domain/exceptions/invalid-username.exception";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class LoginUseCase {
    constructor(
        private dataServices: DatabaseServicesContract,
        private readonly authService: AuthService
    ) {}

    async run(logInDto: LogInDto): Promise<Auth> {
        const foundAuth: Auth = await this.dataServices.auth.findOne(logInDto);
        if (!foundAuth) throw new InvalidUserNameException();
        
        // const token = this.authService.generateAccessToken({
        //     userName: 
        // });

        return foundAuth;
    }
}