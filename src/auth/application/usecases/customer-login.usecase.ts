import {
    BadRequestException,
    Injectable
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/domain/entities/auth';
import { InvalidUserNameException } from 'src/auth/domain/exceptions/invalid-username.exception';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { LogInDto } from '../dtos';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';

@Injectable()
export class CustomerLoginUseCase {
    constructor(
        private dataServices: DatabaseServicesContract,
        private readonly dataHashingService: DataHashingContract,
        private readonly authService: AuthService,
    ) { }

    async run(
        logInDto: LogInDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const foundAuth: Auth = await this.dataServices.auth.findOne({
            ref: "CUSTOMER",
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

        const foundCustomer: Customer =
            await this.dataServices.customers.findOne({
                email: foundAuth.userName,
            });

        const foundUser = await this.dataServices.users.findOne({
            uuid: foundCustomer.user,
        });

        const accessToken = await this.authService.generateAccessToken(
            {
                id: foundCustomer.user,
                name: `${foundUser.firstName} ${foundUser.lastName}`,
                profilePicture: foundCustomer.profilePicture,
            },
            '2h',
        );

        const refreshToken = await this.authService.generateRefreshToken({
            token: accessToken,
        });

        await this.dataServices.tokens.save({
            ref: foundCustomer.user,
            token: refreshToken,
        });

        return { accessToken, refreshToken };
    }
}