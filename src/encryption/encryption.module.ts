import { Module } from '@nestjs/common';
import { CryptoModule } from './frameworks/crypto/crypto.module';
import { BCryptModule } from './frameworks/bcrypt/bcrypt.module';

@Module({
  imports: [CryptoModule, BCryptModule],
  exports: [CryptoModule, BCryptModule],
})
export class EncryptionModule {}
