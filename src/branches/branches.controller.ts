import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBranchDto } from './application/dto/create-branch.dto';
import { UpdateBranchDto } from './application/dto/update-branch.dto';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  FindBranchesUseCase,
  UpdateBranchUseCase,
} from './application/usecases';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { IBranch } from './domain/entities/branch.entity';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { AddAddressUUIDInterceptor } from 'src/addresses/interceptors/add-address-uuid.interceptor';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly findBranchesUseCase: FindBranchesUseCase,
    private readonly findBranchUseCase: FindOneUseCaseContract<IBranch>,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @UseInterceptors(AddAddressUUIDInterceptor)
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.createBranchUseCase.run(createBranchDto);
  }

  @Get()
  findAll() {
    return this.findBranchesUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findBranchUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.updateBranchUseCase.run(id, updateBranchDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IBranch>)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteBranchUseCase.run(id);
  }
}
