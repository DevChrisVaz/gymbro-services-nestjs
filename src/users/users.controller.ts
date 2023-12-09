import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './application/dto';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { UserResponseDTO } from './application/dto/response/user-response.dto';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { FindUsersUseCase } from './application/usecases/find-users.usecase';
import { UserAuthenticatedRequest } from 'src/auth/auth';
import { FindUserUseCase } from './application/usecases/find-user.usecase';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) { }

  @UseInterceptors(AddUUIDInterceptor)
  @ApiCreatedResponse({
    type: UserResponseDTO,
  })
  @Post()
  create(
    @Req() req: UserAuthenticatedRequest,
    @Query() query: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.createUserUseCase.run(
      createUserDto,
      req.user?.gym ?? query.gym,
    );
  }

  @ApiOkResponse({
    type: UserResponseDTO,
    isArray: true,
  })
  @Get()
  findAll(@Req() req: UserAuthenticatedRequest, @Query() query: any) {
    return this.findUsersUseCase.run((req.user && req.user.gym) ?? query.gym);
  }

  @ApiOkResponse({
    type: UserResponseDTO,
  })
  @Get()
  findOne(@Query() query: any) {
    return this.findUserUseCase.run(query.userId);
  }

  @ApiOkResponse({
    type: UserResponseDTO,
  })
  @Get()
  getProfile(@Req() req: UserAuthenticatedRequest) {
    return this.findUserUseCase.run(req.user.id);
  }
}
