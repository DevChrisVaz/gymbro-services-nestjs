import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, UseInterceptors } from '@nestjs/common';
import { CreateGymDto } from './application/dto/create-gym.dto';
import { UpdateGymDto } from './application/dto/update-gym.dto';
import { Public } from 'src/auth/auth.decorators';
import { CreateGymUseCase, DeleteGymUseCase, FindGymUseCase, FindGymsUseCase, UpdateGymUseCase } from './application/usecases';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { IGym } from './domain/entities/gym.entity';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';

@Controller('gyms')
export class GymsController {
  constructor(
    private readonly createGymUseCase: CreateGymUseCase,
    private readonly findGymsUseCase: FindGymsUseCase,
    private readonly findGymUseCase: FindOneUseCaseContract<IGym>,
    private readonly updateGymUseCase: UpdateGymUseCase,
    private readonly deleteGymUseCase: DeleteGymUseCase
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @Post()
  create(@Body() createGymDto: CreateGymDto) {
    return this.createGymUseCase.run(createGymDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.findGymsUseCase.run();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findGymUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.updateGymUseCase.run(id, updateGymDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteGymUseCase.run(id);
  }
}
