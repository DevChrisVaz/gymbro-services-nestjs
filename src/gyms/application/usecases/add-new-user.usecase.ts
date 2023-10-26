import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { IUser } from 'src/users/domain/entities/User';
import { UsersService } from 'src/users/users.service';
import { GymsService } from 'src/gyms/gyms.service';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { AddNewUserDto } from '../dto/add-new-user.dto';
import { GYMUserResponseDTO } from '../dto/response/gym-user-response.dto';

@Injectable()
export class AddNewUserUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly gymsService: GymsService,
    private readonly databaseServices: DatabaseServicesContract,
    private readonly dataHashingService: DataHashingContract,
  ) {}

  async run(addNewUserDTO: AddNewUserDto): Promise<GYMUserResponseDTO> {
    const user: IUser = this.usersService.mapDtoToUser(addNewUserDTO);
    const createdUser: IUser = await this.databaseServices.users.save(user);

    const gymUser: IGYMUser = this.gymsService.mapDtoToGYMUser(addNewUserDTO);
    gymUser.user = createdUser.uuid;
    const createdGYMUser: IGYMUser = await this.databaseServices.GYMUsers.save(
      gymUser,
    );

    await this.databaseServices.auth.save({
      ref: 'GYM_USER',
      userName: gymUser.userName,
      password: await this.dataHashingService.hash(addNewUserDTO.password),
    });
    return new GYMUserResponseDTO({
      ...createdGYMUser,
      ...createdUser,
    });
  }
}
