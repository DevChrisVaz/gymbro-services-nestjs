import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';

export class BCryptRepository implements DataHashingContract {
  constructor(@Inject('SALT') private readonly salt: number) {}

  hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.salt);
  }

  compare(comparison: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(comparison, hashedData);
  }
}
