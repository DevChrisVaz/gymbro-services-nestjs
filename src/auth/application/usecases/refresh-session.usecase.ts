import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ITokens } from 'src/auth/domain/entities/tokens';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { SessionExpiredException } from '../exceptions/session-expired.exception';

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly databaseServices: DatabaseServicesContract,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async run(tokens: ITokens): Promise<ITokens> {
    const foundToken = await this.databaseServices.tokens.findOne({
      token: tokens.refreshToken,
    });
    if (!foundToken) throw new UnauthorizedException();

    const accessTokenPayload: any = this.jwtService.decode(tokens.accessToken);
    const refreshTokenPayload = await this.jwtService
      .verifyAsync(tokens.refreshToken)
      .catch(() => {
        this.databaseServices.tokens.delete(tokens.refreshToken);
        throw new SessionExpiredException();
      });

    if (!tokens.accessToken === refreshTokenPayload.token) {
      throw new UnauthorizedException();
    }

    await this.databaseServices.tokens.delete(tokens.refreshToken);

    const accessToken: string = await this.authService.generateAccessToken(
      {
        id: accessTokenPayload.id,
        name: accessTokenPayload.name,
        role: accessTokenPayload.role,
        gym: accessTokenPayload.gym,
      },
      '30s',
    );
    const refreshToken: string = await this.authService.generateRefreshToken({
      token: accessToken,
    });

    await this.databaseServices.tokens.save({
      ref: accessTokenPayload['id'],
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  }
}
