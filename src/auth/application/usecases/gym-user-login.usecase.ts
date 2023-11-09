import {
    BadRequestException,
    Injectable
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/domain/entities/auth';
import { InvalidUserNameException } from 'src/auth/domain/exceptions/invalid-username.exception';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { LogInDto } from '../dtos';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';

@Injectable()
export class GYMUserLoginUseCase {
    constructor(
        private dataServices: DatabaseServicesContract,
        private readonly dataHashingService: DataHashingContract,
        private readonly authService: AuthService,
    ) { }

    async run(
        logInDto: LogInDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {

        const foundAuth: Auth = await this.dataServices.auth.findOne({
            ref: "GYM_USER",
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

        const foundGYMUser: IGYMUser = await this.dataServices.GYMUsers.findOne(
            {
                userName: foundAuth.userName,
            },
        );

        const foundUser = await this.dataServices.users.findOne({
            uuid: foundGYMUser.user,
        });

        const accessToken = await this.authService.generateAccessToken(
            {
                id: foundUser.uuid,
                name: `${foundUser.firstName} ${foundUser.lastName}`,
                profilePicture: foundUser.profilePicture,
                gym: foundGYMUser.gym,
            },
            '15m',
        );

        const refreshToken = await this.authService.generateRefreshToken({
            token: accessToken,
        });

        await this.dataServices.tokens.save({
            ref: foundGYMUser.user,
            token: refreshToken,
        });

        return { accessToken, refreshToken };
    }
}
