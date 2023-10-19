import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import { ITokens } from "src/auth/domain/entities/tokens";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { SessionExpiredException } from "../exceptions/session-expired.exception";

@Injectable()
export class RefreshSessionUseCase {
    constructor(
        private readonly databaseServices: DatabaseServicesContract,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    async run(tokens: ITokens): Promise<ITokens> {
        if(!await this.databaseServices.tokens.findOne({ token: tokens.refreshToken })) throw new UnauthorizedException();
        
        const accessTokenPayload = this.jwtService.decode(tokens.accessToken);
        const refreshTokenPayload = await this.jwtService.verifyAsync(tokens.refreshToken).catch(() => {
            this.databaseServices.tokens.delete(tokens.refreshToken);
            throw new SessionExpiredException();
        });

        if (!tokens.accessToken === refreshTokenPayload) {
            throw new UnauthorizedException();
        }

        await this.databaseServices.tokens.delete(tokens.refreshToken);
        
        const accessToken: string = await this.authService.generateAccessToken(accessTokenPayload, "2h");
        const refreshToken: string = await this.authService.generateRefreshToken(accessToken);

        await this.databaseServices.tokens.save({
            ref: accessTokenPayload["id"],
            token: refreshToken
        });

        return { accessToken, refreshToken };
    }
}