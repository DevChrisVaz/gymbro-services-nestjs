import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  // Req,
  // Query,
} from '@nestjs/common';
import { CreateGymDto } from './application/dto/create-gym.dto';
import { UpdateGymDto } from './application/dto/update-gym.dto';
import {
  CreateGymUseCase,
  DeleteGymUseCase,
  FindGymsUseCase,
  UpdateGymUseCase,
} from './application/usecases';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { IGym } from './domain/entities/gym.entity';
import { FindOneUseCaseContract } from 'src/core/contracts/usecase.contract';
import { FindRegistryInterceptor } from 'src/core/interceptors/find-registry.interceptor';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { AddNewUserUseCase } from './application/usecases/add-new-user.usecase';
import { AddUserUUIDInterceptor } from 'src/users/interceptors/add-user-uuid.interceptor';
import { GYMResponseDTO } from './application/dto/response/gym-response.dto';
import { CreateUserDto } from 'src/users/application/dto';
import { UserResponseDTO } from 'src/users/application/dto/response/user-response.dto';
// import { UserAuthenticatedRequest } from 'src/auth/auth';
import { CreateBranchUseCase } from 'src/branches/application/usecases';
import { AddBranchUUIDInterceptor } from './interceptors/add-branch-uuid.interceptor';
import { AddBranchAddressUUIDInterceptor } from './interceptors/add-branch-address-uuid.interceptor';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('GYMs')
@Controller('gyms')
export class GymsController {
  constructor(
    private readonly createGymUseCase: CreateGymUseCase,
    private readonly findGymsUseCase: FindGymsUseCase,
    private readonly findGymUseCase: FindOneUseCaseContract<IGym>,
    private readonly updateGymUseCase: UpdateGymUseCase,
    private readonly deleteGymUseCase: DeleteGymUseCase,
    private readonly addNewUserUseCase: AddNewUserUseCase,
    private readonly createBranchUseCase: CreateBranchUseCase,
  ) {}

  @Public()
  @UseInterceptors(AddUUIDInterceptor)
  @UseInterceptors(AddUserUUIDInterceptor)
  @UseInterceptors(AddBranchUUIDInterceptor)
  @UseInterceptors(AddBranchAddressUUIDInterceptor)
  @Post()
  @ApiCreatedResponse()
  async create(@Body() createGymDto: CreateGymDto) {
    await this.createGymUseCase.run(createGymDto);
    createGymDto.branch.gym = createGymDto.uuid;
    await this.createBranchUseCase.run(createGymDto.branch);
    return { message: "Te enviamos un correo de confirmación" }
  }

  @Public()
  @Get()
  @ApiOkResponse({
    type: GYMResponseDTO,
    isArray: true,
  })
  findAll() {
    return this.findGymsUseCase.run();
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({
    type: GYMResponseDTO,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findGymUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @Patch(':id')
  @ApiOkResponse({
    type: GYMResponseDTO,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGymDto: UpdateGymDto,
  ) {
    return this.updateGymUseCase.run(id, updateGymDto);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteGymUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @ApiCreatedResponse({
    type: UserResponseDTO,
  })
  @Post('users')
  addNewUser(
    // @Req() req: UserAuthenticatedRequest,
    // @Query() query: any,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDTO> {
    return this.addNewUserUseCase.run(createUserDto);
  }
}
