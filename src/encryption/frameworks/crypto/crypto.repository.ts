import { Inject } from '@nestjs/common';
import crypto from 'crypto';
import pkcs7 from 'pkcs7-padding';
import { DataEncryptionContract } from '../../domain/contracts/encryption.contract';

export class CryptoRepository implements DataEncryptionContract {
  constructor(
    @Inject('ALGORITHM') private readonly algorithm: string,
    @Inject('KEY') private readonly key: Buffer,
    @Inject('IV') private readonly iv: Buffer,
  ) {}

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(pkcs7.pad(Buffer.from(data)));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  decrypt(data: string): string {
    const encryptedData = Buffer.from(data, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return pkcs7.unpad(decrypted).toString();
  }
}
