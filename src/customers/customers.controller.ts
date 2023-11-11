import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  Res,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './application/dto';
import {
  CreateCustomerUseCase,
  DeleteCustomerUseCase,
  FindCustomersUseCase,
  GetCustomerSubscriptionsUseCase,
  UpdateCustomerUseCase,
} from './application/usecases';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
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
import { CustomerResponseDTO } from './application/dto/response/customer-response.dto';
import { UserAuthenticatedRequest } from 'src/auth/auth';
import { CustomerLoginUseCase } from 'src/auth/application/usecases/customer-login.usecase';
import { CookieOptions, Response } from 'express';

@ApiSecurity('api_key')
@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findCustomersUseCase: FindCustomersUseCase,
    private readonly findCustomerUseCase: FindOneUseCaseContract<
      Promise<CustomerResponseDTO>
    >,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    private readonly getCustomerSubscriptionsUseCase: GetCustomerSubscriptionsUseCase,
    private readonly customerLoginUseCase: CustomerLoginUseCase
  ) { }

  // @ApiOperation({
  //   summary: "Register a customer for mobile application access"
  // })
  @Public()
  @UseInterceptors(AddUUIDInterceptor)
  @Post('register')
  @ApiCreatedResponse({
    type: CustomerResponseDTO,
  })
  async create(@Body() createCustomerDto: CreateCustomerDto, @Res({ passthrough: true }) res: Response) {
    await this.createCustomerUseCase.run(createCustomerDto);
    const { accessToken, refreshToken } = await this.customerLoginUseCase.run({
      userName: createCustomerDto.email,
      password: createCustomerDto.password
    });

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60,
      path: '/token',
    };

    res.cookie('token', refreshToken, cookieOptions);

    return { token: accessToken };
  }

  @Get()
  @ApiOkResponse({
    type: CustomerResponseDTO,
    isArray: true,
  })
  findAll() {
    return this.findCustomersUseCase.run();
  }

  @Get('profile')
  @ApiOkResponse({
    type: CustomerResponseDTO,
  })
  getProfile(@Request() req: UserAuthenticatedRequest) {
    return this.findCustomerUseCase.run(req.user.id);
  }

  @Patch('profile')
  @ApiOkResponse({
    type: CustomerResponseDTO,
  })
  updateProfile(
    @Request() req: UserAuthenticatedRequest,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.updateCustomerUseCase.run(req.user.id, updateCustomerDto);
  }

  @Get('subscriptions')
  getSubscriptions(@Request() req: UserAuthenticatedRequest) {
    return this.getCustomerSubscriptionsUseCase.run(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CustomerResponseDTO,
  })
  findOne(@Param('id') id: string): Promise<CustomerResponseDTO> {
    return this.findCustomerUseCase.run(id);
  }

  // @UseInterceptors(FindRegistryInterceptor<Promise<CustomerResponseDTO>>)
  // @Patch(':id')
  // @ApiOkResponse({
  //   type: CustomerResponseDTO,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.updateCustomerUseCase.run(id, updateCustomerDto);
  // }

  @UseInterceptors(FindRegistryInterceptor<Promise<CustomerResponseDTO>>)
  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.deleteCustomerUseCase.run(id);
  }
}
