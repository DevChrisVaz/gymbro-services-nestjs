import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
    private readonly databaseServices: DatabaseServicesContract,
    @Inject('APIKEY') private apiKey: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);

    if (!token) {
      const apikey = this.authService.extractApiKeyFromHeader(request);
      if (apikey) {
        if (apikey === this.apiKey) return true;
      } else {
        throw new UnauthorizedException();
      }
    }

    const payload = await this.jwtService.verifyAsync(token);
    request.user = payload;

    return true;
  }
}
