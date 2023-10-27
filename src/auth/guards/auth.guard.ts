import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isArray } from 'class-validator';
import { CookieOptions, Request } from 'express';
import { RefreshSessionUseCase } from '../application/usecases/refresh-session.usecase';
import { ITokens } from '../domain/entities/tokens';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private refreshTokenUseCase: RefreshSessionUseCase,
    private readonly databaseServices: DatabaseServicesContract,
    @Inject('APIKEY') private apiKey: string,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      const apikey = this.extractApiKeyFromHeader(request);
      if (apikey) {
        if (apikey === this.apiKey) return true;
      } else {
        throw new UnauthorizedException();
      }
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;

      if (payload.gym) {
        request.user.permitions = await this.databaseServices.branchPermitions.find({
          user: request.user.id
        });
      }

      return true;
    } catch {
      if (!request.cookies.token) throw new UnauthorizedException();
      const tokens: ITokens = await this.refreshTokenUseCase.run({
        accessToken: token,
        refreshToken: request.cookies.token,
      });
      const response = context.switchToHttp().getResponse();
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60,
        path: '/token',
      };
      request.user = this.jwtService.decode(tokens.accessToken);
      response.cookie('token', tokens.refreshToken, cookieOptions);
      response.token = tokens.accessToken;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apikey = request.headers.api_key;
    return isArray(apikey) ? apikey[0] : apikey;
  }
}
