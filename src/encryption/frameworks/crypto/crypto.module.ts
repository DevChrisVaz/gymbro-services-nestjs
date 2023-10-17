import { Module } from '@nestjs/common';
import { DataEncryptionContract } from '../../domain/contracts/encryption.contract';
import { CryptoRepository } from './crypto.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cryptoConfig, { configProviders } from './crypto.config';

@Module({
  imports: [ConfigModule.forFeature(cryptoConfig)],
  providers: [
    ConfigService,
    ...configProviders,
    {
      provide: DataEncryptionContract,
      useClass: CryptoRepository,
    },
  ],
  exports: [DataEncryptionContract],
})
export class CryptoModule {}
