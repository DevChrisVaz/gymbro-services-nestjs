import { Module } from "@nestjs/common";
import { DataEncryptionContract } from "./domain/contracts/encryption.contract";
import { CryptoRepository } from "src/core/frameworks/encryption/crypto/crypto.repository";
import { EncryptionServicesContract } from "./domain/contracts/encryption-services.contract";
import { cryptoProvider } from "./frameworks/crypto/crypto.providers";

@Module({
    providers: [
        cryptoProvider
    ],
    exports: [EncryptionServicesContract]
})
export class EncryptionModule {}