import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { Gym, IGym } from 'src/gyms/domain/entities/gym.entity';
import { GymsService } from 'src/gyms/gyms.service';
import { CreateGymDto } from '../dto/create-gym.dto';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/domain/entities/User';

@Injectable()
export class CreateGymUseCase {
  constructor(
    private readonly gymsService: GymsService,
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(createGymDto: CreateGymDto): Promise<IGym> {
    const gym: IGym = this.gymsService.mapDtoToGym(createGymDto);
    const user: IUser = this.usersService.mapDtoToUser(createGymDto.user);
    const createdGym: IGym = await this.dataServices.gyms.save(gym);
    await this.dataServices.users.save(user);
    return this.gymsService.serializeGym(createdGym);
  }
}
