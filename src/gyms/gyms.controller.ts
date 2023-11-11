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
  Req,
  Query,
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
// import { FindGYMUsersUseCase } from './application/usecases/find-gym-users.usecase';
import { AddPersonUUIDInterceptor } from 'src/users/interceptors/add-person-uuid.interceptor';
import { GYMResponseDTO } from './application/dto/response/gym-response.dto';
import { CreateUserDto } from 'src/users/application/dto';
import { UserResponseDTO } from 'src/users/application/dto/response/user-response.dto';
import { UserAuthenticatedRequest } from 'src/auth/auth';

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
    // private readonly findGYMUsersUseCase: FindGYMUsersUseCase,
  ) { }

  @Public()
  @UseInterceptors(AddUUIDInterceptor)
  @UseInterceptors(AddPersonUUIDInterceptor)
  @Post()
  @ApiCreatedResponse()
  create(@Body() createGymDto: CreateGymDto) {
    return this.createGymUseCase.run(createGymDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({
    type: GYMResponseDTO,
    isArray: true
  })
  findAll() {
    return this.findGymsUseCase.run();
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({
    type: GYMResponseDTO
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findGymUseCase.run(id);
  }

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @Patch(':id')
  @ApiOkResponse({
    type: GYMResponseDTO
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

  // @UseInterceptors(FindRegistryInterceptor<IGym>)
  // @Patch(':id/activate')
  // activate(@Param('id', ParseUUIDPipe) id: string) {}

  @UseInterceptors(FindRegistryInterceptor<IGym>)
  @ApiCreatedResponse({
    type: UserResponseDTO
  })
  @Post('users')
  addNewUser(
    @Req() req: UserAuthenticatedRequest,
    @Query() query: any,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDTO> {
    return this.addNewUserUseCase.run(createUserDto);
  }

  // @UseInterceptors(FindRegistryInterceptor<IGym>)
  // @Get('users')
  // getUsers(@Req() req: UserAuthenticatedRequest, @Query() query: any) {
  //   return this.findGYMUsersUseCase.run(req.user.gym ?? query.gymId);
  // }
}
