import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { AddUUIDInterceptor } from 'src/core/interceptors/add-uuid.interceptor';
import { CreateUserUseCase } from './application/usecases/CreateUserUseCase';
import { FindUsersUseCase } from './application/usecases/FindUsersUseCase';
import { DeleteCustomerUseCase } from 'src/customers/application/usecases/delete-customer.usecase';
import { DeleteUserUseCase } from './application/usecases/DeleteUserUseCase';
import { FindUserUseCase } from './application/usecases/FindUserUseCase';
import { UpdateUserUseCase } from './application/usecases/UpdateUserUseCase';

@Controller("users")
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  @UseInterceptors(AddUUIDInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDTO: CreateUserDto) {
    return this.createUserUseCase.run(createUserDTO);
  }

  @Get()
  findAll() {
    return this.findUsersUseCase.run();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findUserUseCase.run(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.run(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUserUseCase.run(id);
  }
}
