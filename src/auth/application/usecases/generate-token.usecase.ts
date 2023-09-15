import { Injectable } from "@nestjs/common";
import { TokenContract } from "src/auth/domain/entities/token";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";

@Injectable()
export class SaveTokenUseCase {
    constructor(
        private dataServices: DatabaseServicesContract
    ) {}

    async run(token: TokenContract): Promise<TokenContract> {
        const savedToken = await this.dataServices.tokens.save(token);
        return savedToken;
    }
}