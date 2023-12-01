import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';
import { UsersService } from 'src/users/users.service';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { IUser } from 'src/users/domain/entities/user.entity';
import { Role } from 'src/permitions/domain/enums/role.enum';
import { UserAlreadyExistsException } from 'src/users/application/exceptions/user-already-exists-exception';
import { GYMMailerServiceContract } from 'src/gyms/domain/contracts/gym-mailer-service-contract';

@Injectable()
export class CreateGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashing: DataHashingContract,
    private readonly gymMailingService: GYMMailerServiceContract,
  ) {}

  async run(createGymDto: CreateGymDto): Promise<IGym> {
    const existingUser: IUser = await this.dataServices.users.findOne({
      userName: createGymDto.user.userName,
    });
    if (existingUser) throw new UserAlreadyExistsException();

    const gym: IGym = this.gymsService.mapDtoToGym(createGymDto);
    const person: IPerson = this.usersService.mapDtoToPerson(createGymDto.user);
    let user: IUser = this.usersService.mapDtoToUser(createGymDto.user);
    const createdGym: IGym = await this.dataServices.gyms.save(gym);
    const createdPerson = await this.dataServices.persons.save(person);

    user = {
      ...user,
      person: createdPerson.uuid,
    };

    await this.dataServices.users.save(user);

    await this.dataServices.userRoles.save({
      user: person.uuid,
      role: Role.OWNER,
      gym: createdGym.uuid,
    });

    await this.dataServices.auth.save({
      ref: 'USER',
      userName: user.userName,
      password: await this.dataHashing.hash(createGymDto.user.password),
    });

    await this.gymMailingService.sendConfirmRegistrationEmail(
      createdGym,
      createdPerson,
    );

    return this.gymsService.serializeGym(createdGym);
  }
}
