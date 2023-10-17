import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CreatePlanDto, UpdatePlanDto } from './application/dto';
import { CreatePlanUseCase, DeletePlanUseCase, FindPlansUseCase, UpdatePlanUseCase } from './application/usecases';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import { IPlan } from './domain/entities/plan.entity';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly findPlanUseCase: FindOneUseCaseContract<IPlan>,
    private readonly findPlansUseCase: FindPlansUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.createPlanUseCase.run(createPlanDto);
  }

  @Get()
  findAll() {
    return this.findPlansUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findPlanUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IPlan>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.updatePlanUseCase.run(id, updatePlanDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IPlan>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePlanUseCase.run(id);
  }
}
