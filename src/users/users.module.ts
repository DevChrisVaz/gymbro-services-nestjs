import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FindUsersUseCase } from './application/usecases/FindUsersUseCase';
import { CreateUserUseCase } from './application/usecases/CreateUserUseCase';
import { UpdateUserUseCase } from './application/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from './application/usecases/DeleteUserUseCase';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { useCaseProviders } from './application/usecases/providers';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...useCaseProviders,
    FindUsersUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
