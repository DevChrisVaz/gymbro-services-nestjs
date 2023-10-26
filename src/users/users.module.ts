import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports: [DatabaseModule, EncryptionModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
