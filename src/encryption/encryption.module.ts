import { Module } from "@nestjs/common";
import { EncryptionServicesContract } from "./domain/contracts/encryption-services.contract";
import { cryptoProvider } from "./frameworks/crypto/crypto.providers";

@Module({
    providers: [
        cryptoProvider
    ],
    exports: [EncryptionServicesContract]
})
export class EncryptionModule {}