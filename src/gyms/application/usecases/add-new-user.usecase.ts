import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { CreateUserDto } from 'src/users/application/dto';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { UserResponseDTO } from 'src/users/application/dto/response/user-response.dto';

@Injectable()
export class AddNewUserUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly databaseServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
  ) {}

  async run(createUserDto: CreateUserDto): Promise<UserResponseDTO> {
    const person: IPerson = this.usersService.mapDtoToPerson(createUserDto);
    const createdPerson: IPerson = await this.databaseServices.persons.save(
      person,
    );

    const user: IUser = this.usersService.mapDtoToUser(createUserDto);
    user.person = createdPerson.uuid;
    const createdUser: IUser = await this.databaseServices.users.save(user);

    await this.databaseServices.auth.save({
      ref: 'USER',
      userName: user.userName,
      password: await this.dataHashingService.hash(createUserDto.password),
    });
    return new UserResponseDTO({
      ...createdUser,
      ...createdUser,
    });
  }
}
