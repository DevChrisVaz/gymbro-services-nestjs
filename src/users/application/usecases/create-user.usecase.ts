import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { UsersService } from 'src/users/users.service';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { CreateUserDto } from '../dto';
import { UserResponseDTO } from '../dto/response/user-response.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';
import { Role } from 'src/permitions/domain/enums/role.enum';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
  ) {}

  async run(
    createUserDto: CreateUserDto,
    gymId?: string,
  ): Promise<UserResponseDTO> {
    const existingUser: IUser = await this.dataServices.users.findOne({
      userName: createUserDto.userName,
    });

    if (existingUser) throw new UserAlreadyExistsException();

    const person: IPerson = this.usersService.mapDtoToPerson(createUserDto);
    const createdPerson: IPerson = await this.dataServices.persons.save(person);

    const user: IUser = this.usersService.mapDtoToUser(createUserDto);
    user.person = createdPerson.uuid;
    const createdUser: IUser = await this.dataServices.users.save(user);

    const auth: Auth = {
      ref: 'USER',
      userName: user.userName,
      password: await this.dataHashingService.hash(createUserDto.password),
    };
    await this.dataServices.auth.save(auth);

    const role: IUserRole = {
      user: createdUser.person,
      role: createUserDto.role ?? Role.BASIC,
    };

    if (gymId) role.gym = gymId;

    await this.dataServices.userRoles.save(role);

    return new UserResponseDTO({
      ...createdPerson,
      ...createdUser,
    });
  }
}
