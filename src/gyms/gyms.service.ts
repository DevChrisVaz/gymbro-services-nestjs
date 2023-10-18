import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './application/dto/create-gym.dto';
import { UpdateGymDto } from './application/dto/update-gym.dto';
import { plainToClass } from 'class-transformer';
import { Gym, SerializedGym } from './domain/entities/gym.entity';

@Injectable()
export class GymsService {
  mapDtoToGym(dto: CreateGymDto | UpdateGymDto): Gym {
    return plainToClass(Gym, dto);
  }

  serializeGym(gym: Gym): SerializedGym {
    return new SerializedGym(gym);
  }
}
