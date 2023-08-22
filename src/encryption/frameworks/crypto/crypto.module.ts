import { Module } from "@nestjs/common";
import { EncryptionContract } from "../../domain/contracts/encryption.contract";
import { CryptoRepository } from "./crypto.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import cryptoConfig, { configProviders } from "./crypto.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [cryptoConfig]
        })
    ],
    providers: [
        ConfigService,
        ...configProviders,
        {
            provide: EncryptionContract,
            useClass: CryptoRepository
        }
    ],
    exports: [EncryptionContract]
})
export class CryptoModule {}