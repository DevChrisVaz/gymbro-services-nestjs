import { Provider } from '@nestjs/common';
import { DataEncryptionContract } from 'src/encryption/domain/contracts/encryption.contract';
import { CryptoRepository } from './crypto.repository';

export const cryptoProvider: Provider = {
  provide: DataEncryptionContract,
  useClass: CryptoRepository,
};
