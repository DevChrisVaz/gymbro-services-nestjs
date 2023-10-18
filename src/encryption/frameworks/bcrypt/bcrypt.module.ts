import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bcryptConfig, { configProviders } from './bcrypt.config';
import { bCryptProvider } from './bcrypt.provider';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';

@Module({
  imports: [ConfigModule.forFeature(bcryptConfig)],
  providers: [...configProviders, bCryptProvider],
  exports: [DataHashingContract],
})
export class BCryptModule {}
