import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { UsersController } from './users.controller';
import { FindUsersUseCase } from './application/usecases/find-users.usecase';
import { FindUserUseCase } from './application/usecases/find-user.usecase';
import { PersonCacheServiceProvider } from './frameworks/providers/person-cache-service.provider';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUsersUseCase,
    FindUserUseCase,
    UsersService,
    PersonCacheServiceProvider,
  ],
  exports: [UsersService, PersonCacheServiceProvider],
})
export class UsersModule {}
