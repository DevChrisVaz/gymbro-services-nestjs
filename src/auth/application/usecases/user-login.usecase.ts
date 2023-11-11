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
import { IUser } from 'src/users/domain/entities/user.entity';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';

@Injectable()
export class UserLoginUseCase {
    constructor(
        private dataServices: DatabaseServicesContract,
        private readonly dataHashingService: DataHashingContract,
        private readonly authService: AuthService,
    ) { }

    async run(
        logInDto: LogInDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {

        const foundAuth: Auth = await this.dataServices.auth.findOne({
            ref: "USER",
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

        const foundUser: IUser = await this.dataServices.users.findOne(
            {
                userName: foundAuth.userName,
            },
        );

        const foundPerson = await this.dataServices.persons.findOne({
            uuid: foundUser.person,
        });

        const foundRole: IUserRole = await this.dataServices.userRoles.findOne({
            user: foundUser.person
        });

        const tokenData: any = {
            id: foundPerson.uuid,
            name: `${foundPerson.firstName} ${foundPerson.lastName}`,
            profilePicture: foundPerson.profilePicture,
            role: foundRole.role
        }

        if (foundRole.gym) tokenData.gym = foundRole.gym;

        const accessToken = await this.authService.generateAccessToken(tokenData, '15m');

        const refreshToken = await this.authService.generateRefreshToken({
            token: accessToken,
        });

        await this.dataServices.tokens.save({
            ref: foundUser.person,
            token: refreshToken,
        });

        return { accessToken, refreshToken };
    }
}
