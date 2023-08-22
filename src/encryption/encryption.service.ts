import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataEncryptionContract } from "./domain/contracts/encryption.contract";
import { EncryptionServicesContract } from "./domain/contracts/encryption-services.contract";

@Injectable()
export class EncryptionServices implements EncryptionServicesContract {
    constructor(
        private readonly dataEncryption: DataEncryptionContract
    ) {}

    encrypt(data: string): string {
        return this.dataEncryption.encrypt(data);
    }

    decrypt(encryptedData: string): string {
        return this.dataEncryption.decrypt(encryptedData);
    }


}