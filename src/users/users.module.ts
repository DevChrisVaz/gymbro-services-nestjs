import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { UsersController } from './users.controller';
import { FindUsersUseCase } from './application/usecases/find-users.usecase';
import { FindUserUseCase } from './application/usecases/find-user.usecase';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUsersUseCase,
    FindUserUseCase,
    UsersService
  ],
  exports: [UsersService],
})
export class UsersModule { }
