import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './domain/dto/create-gym.dto';
import { UpdateGymDto } from './domain/dto/update-gym.dto';
import { FindGymsUseCase } from './application/usecases/find-gyms.usecase';
import { FindGymUseCase } from './application/usecases/find-gym.usecase';
import { CreateGymUseCase } from './application/usecases/create-gym.usecase';
import { UpdateGymUseCase } from './application/usecases/update-gym.usecase';
import { DeleteGymUseCase } from './application/usecases/delete-gym.usecase';
import { IGym } from './domain/entities/gym.entity';
import { GymFactoryService } from './application/gym-factory.service';

@Injectable()
export class GymsService {
  constructor(
    private gymFactoryService: GymFactoryService,
    private findGymsUseCase: FindGymsUseCase,
    private findGymUseCase: FindGymUseCase,
    private createGymUseCase: CreateGymUseCase,
    private updateGymUseCase: UpdateGymUseCase,
    private deleteGymUseCase: DeleteGymUseCase
  ) {}

  async create(createGymDto: CreateGymDto): Promise<IGym> {
    const gym: IGym = this.gymFactoryService.createNewGym(createGymDto);
    const createdGym: IGym = await this.createGymUseCase.run(gym);
    return createdGym;
  }

  async findMany(): Promise<IGym[]> {
    const foundGyms: IGym[] = await this.findGymsUseCase.run();
    return foundGyms;
  }

  async findOne(id: string) {
    const foundGym: IGym = await this.findGymUseCase.run(id);
    return foundGym;
  }

  async update(id: string, updateGymDto: UpdateGymDto) {
    const gym: IGym = this.gymFactoryService.updateGym(updateGymDto);
    const updatedGym: IGym = await this.updateGymUseCase.run(id, gym);
    return updatedGym;
  }

  async remove(id: string) {
    const deletedGym: IGym = await this.deleteGymUseCase.run(id);
    return deletedGym;
  }
}
