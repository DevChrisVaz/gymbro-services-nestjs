import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataEncryptionContract } from "./domain/contracts/encryption.contract";
import { EncryptionServicesContract } from "./domain/contracts/encryption-services.contract";
import { DataHashingContract } from "./domain/contracts/hashing.contract";

@Injectable()
export class EncryptionServices implements EncryptionServicesContract {
    constructor(
        private readonly dataEncryption: DataEncryptionContract,
        private readonly dataHashing: DataHashingContract
    ) {}

    encrypt(data: string): string {
        return this.dataEncryption.encrypt(data);
    }

    decrypt(encryptedData: string): string {
        return this.dataEncryption.decrypt(encryptedData);
    }

    hash(data: string): string {
        return this.dataHashing.hash(data);
    }
}