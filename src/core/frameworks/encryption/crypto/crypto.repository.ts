import crypto from "crypto";
import pkcs7 from "pkcs7-padding";
import { IEncryptionRepository } from "src/core/domain/repositories/encryption-repository.abstract";

export class CryptoRepository implements IEncryptionRepository {

    constructor(
        private readonly algorithm: string,
        private readonly key: Buffer,
        private readonly iv: Buffer,
    ) {}

    encrypt(data: string): string {
        let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(pkcs7.pad(Buffer.from(data)));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    }

    decrypt(data: string): string {
        let encryptedData = Buffer.from(data, "hex");
        let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return pkcs7.unpad(decrypted).toString();
    }
}