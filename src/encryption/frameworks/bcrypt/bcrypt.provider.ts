import { Provider } from '@nestjs/common';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { BCryptRepository } from './bcrypt.repository';

export const bCryptProvider: Provider = {
  provide: DataHashingContract,
  useClass: BCryptRepository,
};
