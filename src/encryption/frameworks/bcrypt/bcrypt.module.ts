import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import bcryptConfig, { configProviders } from "./bcrypt.config";
import { EncryptionServicesContract } from "src/encryption/domain/contracts/encryption-services.contract";
import { bCryptProvider } from "./bcrypt.provider";

@Module({
    imports: [
        ConfigModule.forFeature(bcryptConfig)
    ],
    providers: [
        ...configProviders,
        bCryptProvider,
    ],
    exports: [EncryptionServicesContract]
})
export class BCryptModule {};