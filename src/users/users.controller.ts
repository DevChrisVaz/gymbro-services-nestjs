import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { CreateUserResponseDTO } from './domain/dto/responses/create-user-response.dto';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto): Promise<CreateUserResponseDTO> {
    const createUserResponse = new CreateUserResponseDTO();
    try {
      const createdUser = await this.usersService.create(createUserDto);
      createUserResponse.success = true;
      createUserResponse.createdUser = createdUser;
    } catch (error) {
      createUserResponse.success = false;
    }
    return createUserResponse;
  }

  @Get()
  @MessagePattern("")
  findAll() {
    return this.usersService.find();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.uuid, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
