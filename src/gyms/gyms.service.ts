import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './application/dto/create-gym.dto';
import { UpdateGymDto } from './application/dto/update-gym.dto';
import { plainToInstance } from 'class-transformer';
import { Gym, SerializedGym } from './domain/entities/gym.entity';
import { AddNewUserDto } from './application/dto/add-new-user.dto';
import {
  GYMUser,
  IGYMUser,
  SerializedGYMUser,
} from './domain/entities/gym-user.entity';

@Injectable()
export class GymsService {
  mapDtoToGym(dto: CreateGymDto | UpdateGymDto): Gym {
    return plainToInstance(Gym, dto);
  }

  serializeGym(gym: Gym): SerializedGym {
    return new SerializedGym(gym);
  }

  mapDtoToGYMUser(dto: AddNewUserDto): IGYMUser {
    return plainToInstance(GYMUser, dto);
  }

  serializeGYMUser(gymUser: IGYMUser): SerializedGYMUser {
    return new SerializedGYMUser(gymUser);
  }
}
