import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { CreateGymDto } from './domain/dto/create-gym.dto';
import { UpdateGymDto } from './domain/dto/update-gym.dto';
import { Public } from 'src/auth/auth.decorators';
import { CreateGymUseCase, DeleteGymUseCase, FindGymUseCase, FindGymsUseCase, UpdateGymUseCase } from './application/usecases';
import { AddUuidToBodyPipe } from 'src/core/pipes/add-uuid.pipe';

@Controller('gyms')
export class GymsController {
  constructor(
    private readonly createGymUseCase: CreateGymUseCase,
    private readonly findGymsUseCase: FindGymsUseCase,
    private readonly findGymUseCase: FindGymUseCase,
    private readonly updateGymUseCase: UpdateGymUseCase,
    private readonly deleteGymUseCase: DeleteGymUseCase
  ) {}

  @UsePipes(new AddUuidToBodyPipe())
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

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.updateGymUseCase.run(id, updateGymDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteGymUseCase.run(id);
  }
}
