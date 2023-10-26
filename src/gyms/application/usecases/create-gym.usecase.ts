import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/domain/entities/User';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';

@Injectable()
export class CreateGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
    private readonly dataHashing: DataHashingContract,
  ) { }

  async run(createGymDto: CreateGymDto): Promise<IGym> {
    const gym: IGym = this.gymsService.mapDtoToGym(createGymDto);
    const user: IUser = this.usersService.mapDtoToUser(createGymDto.user);
    let gymUser: IGYMUser = this.gymsService.mapDtoToGYMUser(
      createGymDto.user,
    );
    const createdGym: IGym = await this.dataServices.gyms.save(gym);
    const createdUser = await this.dataServices.users.save(user);
    gymUser = {
      ...gymUser,
      gym: createdGym.uuid,
      user: createdUser.uuid
    }
    await this.dataServices.GYMUsers.save(gymUser);
    await this.dataServices.auth.save({
      ref: 'GYM_USER',
      userName: gymUser.userName,
      password: await this.dataHashing.hash(createGymDto.user.password),
    });
    return this.gymsService.serializeGym(createdGym);
  }
}
