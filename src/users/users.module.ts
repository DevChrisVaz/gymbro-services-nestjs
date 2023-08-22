import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataModule } from 'src/core/frameworks/data/data.module';
import { UserFactoryService } from './application/user-factory.service';
import { FindUsersUseCase } from './application/usecases/FindUsersUseCase';
import { FindUserUseCase } from './application/usecases/FindUserUseCase';
import { CreateUserUseCase } from './application/usecases/CreateUserUseCase';
import { UpdateUserUseCase } from './application/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from './application/usecases/DeleteUserUseCase';

@Module({
  imports: [
    DataModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    UserFactoryService, 
    FindUsersUseCase,
    FindUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase
  ]
})
export class UsersModule {}
