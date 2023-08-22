import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { UpdateUserDto } from './domain/dto/update-user.dto';
import { UserFactoryService } from './application/user-factory.service';
import { CreateUserUseCase } from './application/usecases/CreateUserUseCase';
import { User } from './domain/entities/User';
import { FindUsersUseCase } from './application/usecases/FindUsersUseCase';
import { FindUserUseCase } from './application/usecases/FindUserUseCase';
import { UpdateUserUseCase } from './application/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from './application/usecases/DeleteUserUseCase';

@Injectable()
export class UsersService {
  constructor(
    private userFactoryService: UserFactoryService,
    private findUsersUseCase: FindUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase    
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    const createdUser: User = await this.createUserUseCase.run(user);
    return createdUser;
  }

  async find(): Promise<User[]> {
    const users: User[] = await this.findUsersUseCase.run();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.findUserUseCase.run(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate: User = this.userFactoryService.updateUser(updateUserDto);
    const updatedUser: User = await this.updateUserUseCase.run(id, userToUpdate);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser: User = await this.deleteUserUseCase.run(id);
    return deletedUser;
  }
}
