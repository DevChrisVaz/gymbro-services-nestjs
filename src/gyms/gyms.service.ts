import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './domain/dto/create-gym.dto';
import { UpdateGymDto } from './domain/dto/update-gym.dto';
import { plainToClass } from 'class-transformer';
import { Gym, SerializedGym } from './domain/entities/gym.entity';

@Injectable()
export class GymsService {
  constructor() {}

  mapDtoToGym(dto: CreateGymDto | UpdateGymDto): Gym {
    return plainToClass(Gym, dto);
  }

  serializeGym(gym: Gym): SerializedGym {
    return new SerializedGym(gym);
  }
}
