import { Injectable } from '@nestjs/common';
import { DataEncryptionContract } from './domain/contracts/encryption.contract';
import { DataHashingContract } from './domain/contracts/hashing.contract';

@Injectable()
export class EncryptionServices {
  constructor(
    private readonly dataEncryption: DataEncryptionContract,
    private readonly dataHashing: DataHashingContract,
  ) {}

  encrypt(data: string): string {
    return this.dataEncryption.encrypt(data);
  }

  decrypt(encryptedData: string): string {
    return this.dataEncryption.decrypt(encryptedData);
  }

  hash(data: string): Promise<string> {
    return this.dataHashing.hash(data);
  }

  compare(hashedData: string, comparison: string): Promise<boolean> {
    return this.dataHashing.compare(hashedData, comparison);
  }
}
