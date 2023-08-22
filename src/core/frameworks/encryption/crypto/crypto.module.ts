import { Module } from "@nestjs/common";
import { IEncryptionRepository } from "src/core/domain/repositories/encryption-repository.abstract";

@Module({
    providers: [
        // {
        //     provide: IEncryptionRepository,
        //     useClass: 
        // }
    ]
})
export class CryptoModule {}